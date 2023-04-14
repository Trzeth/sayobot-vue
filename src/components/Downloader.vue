<template>
	<div class="downloader">
		<v-menu
			open-on-click
			offset-x
			:close-on-content-click="false"
			:min-width="width"
			:max-width="width"
		>
			<template v-slot:activator="{ on }">
				<v-row justify="end" no-gutters>
					<v-btn
						class="mr-2"
						icon
						outlined
						v-on:click="getWidth()"
						v-on="on"
					>
						<v-icon>mdi-download</v-icon>
					</v-btn>
				</v-row>
			</template>
			<v-list>
				<v-list-item>
					<v-checkbox
						label="启用打包下载"
						v-model="isPackageDownload"
					></v-checkbox>
				</v-list-item>
				<v-divider></v-divider>
				<v-subheader
					>下载列表
					<v-spacer></v-spacer>
					<v-btn
						@click="save()"
						outlined
						:loading="loading"
						color="primary"
					>
						<v-icon left>mdi-content-save</v-icon>
						保存到本地
					</v-btn>
				</v-subheader>
				<v-list-item v-for="b in beatmapset" :key="b.sid">
					{{ b.artist + " - " + b.title }}
				</v-list-item>
				<v-list-item v-if="beatmapset.length == 0"
					>是空的哟</v-list-item
				>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
import { mapState } from "vuex";
import ApiHelper from "../util/api";
import ZIP from "../util/zip-stream";
import StreamSaver from "streamsaver";

export default {
	name: "downloader",
	data: function() {
		return {
			width: 0,
			loading: false,
		};
	},
	methods: {
		getWidth() {
			this.width = document.getElementsByClassName(
				"notice-bar"
			)[0].offsetWidth;
		},
		save() {
			this.loading = true;

			const fileStream = StreamSaver.createWriteStream("Package.zip");
			var beatmapset = this.beatmapset;

			const readableZipStream = new ZIP({
				async pull(ctrl) {
					// Gets executed everytime zip.js asks for more data
					var promise = [];

					beatmapset.forEach((s) => {
						promise.push(
							new Promise(async (resolve) => {
								const res = await fetch(
									ApiHelper.GetDownloadUri(
										s.sid,
										this.downloadType,
										this.downloadServer
									)
								);

								const stream = () => res.body;

								var regex = /filename=([\s\S]*)/g;
								var matches = regex.exec(res.url);

								const name = decodeURI(matches[1]) + ".osz";
								ctrl.enqueue({ name, stream });
								resolve();
							})
						);
					});
					Promise.all(promise).then(() => {
						ctrl.close();
					});
				},
			});

			// more optimized
			if (window.WritableStream && readableZipStream.pipeTo) {
				return readableZipStream.pipeTo(fileStream).then(() => {
					this.loading = false;
				});
			}

			// less optimized
			const writer = fileStream.getWriter();
			const reader = readableZipStream.getReader();
			const pump = () =>
				reader.read().then((res) =>
					res.done
						? () => {
								writer.close();
								this.loading = false;
						  }
						: writer.write(res.value).then(pump)
				);

			pump();
		},
	},
	computed: {
		...mapState("downloader", ["beatmapset"]),

		//local storage
		downloadType: function() {
			return this.$ls.get("downloadType");
		},
		downloadServer: function() {
			return this.$ls.get("downloadServer");
		},
		isPackageDownload: {
			get() {
				return this.$ls.get("isPackageDownload") == "true"
					? true
					: false;
			},
			set(val) {
				this.$ls.set("isPackageDownload", val);
				return val;
			},
		},
	},
};
</script>

<style></style>
