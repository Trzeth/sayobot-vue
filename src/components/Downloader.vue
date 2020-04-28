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
import JSZip from "jszip";
import ApiHelper from "../util/api";
import axios from "axios";
import FileSaver from "file-saver";

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
			var zip = new JSZip();
			this.beatmapset.forEach((beatmap) => {
				zip.file(
					beatmap.sid +
						" " +
						beatmap.artist +
						" - " +
						beatmap.title +
						".osz",
					beatmap.data
				);
			});
			this.loading = true;

			zip.generateAsync({ type: "blob" }).then((content) => {
				FileSaver.saveAs(content, "example.zip");
				this.loading = false;
			});
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
	watch: {
		beatmapset: {
			handler: function(val, pre) {
				if (pre && val.length < pre.length) return;

				var beatmap = val[val.length - 1];
				axios({
					url: ApiHelper.GetDownloadUri(
						beatmap.sid,
						this.downloadType,
						this.downloadServer
					),
					method: "GET",
					responseType: "blob", // important
				}).then((response) => {
					beatmap.data = response.data;
				});
			},
		},
	},
};
</script>

<style></style>
