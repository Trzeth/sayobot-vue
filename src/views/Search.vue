<template>
	<v-container>
		<v-row align="end">
			<v-btn
				large
				class="d-md-none mr-2"
				@click="$emit('update:isDrawerOpen', !isDrawerOpen)"
				icon
				><v-icon>mdi-menu</v-icon></v-btn
			>
			<h2 class="display-1 mr-5">一个临时用来存放图包信息的页面</h2>
			<span class="title">
				你如果有任何建议的话在群内 @Trzeth 就OK了
			</span>
		</v-row>
		<v-row class="mt-12">
			<v-col>
				<v-row>
					<v-btn-toggle dense v-model="type" mandatory>
						<v-btn>常规</v-btn>
						<v-btn>月赛</v-btn>
						<v-btn>主题</v-btn>
						<v-btn>艺术家/专辑</v-btn>
					</v-btn-toggle>
					<v-checkbox
						class="my-0 ml-12"
						label="打包下载"
						v-model="packageDownload"
					></v-checkbox>
				</v-row>
				<v-row
					><v-btn @click="readOsudb()"></v-btn
					><v-file-input v-model="file"></v-file-input
				></v-row>
				<v-row>
					<v-list>
						<v-list-item v-for="p in packages" :key="p.packageId">
							<v-list-item-content>
								{{ p.title }}
							</v-list-item-content>
							<v-list-item-action>
								<v-row>
									<v-btn
										target="_blank"
										class="mx-5"
										:href="
											'https://osu.ppy.sh/beatmaps/packs/' +
												p.packageId
										"
										text
									>
										<v-icon left>mdi-open-in-new</v-icon>
										详情
									</v-btn>
									<v-btn
										outlined
										@click="download(p)"
										:color="p.done ? 'success' : ''"
										:loading="p.loading"
									>
										{{ p.done ? "已完成" : "下载" }}
										<v-icon right v-if="p.done"
											>mdi-check</v-icon
										>
									</v-btn>
								</v-row>
							</v-list-item-action>
						</v-list-item>
					</v-list>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ApiHelper from "../util/api";
import ZIP from "../util/zip-stream";
import StreamSaver from "streamsaver";
import axios from "axios";
import OsuDBParser from "osu-db-parser";
var Buffer = require("buffer/").Buffer;

export default {
	name: "search",
	props: ["isDrawerOpen"],
	data: function() {
		return {
			type: null,
			packages: null,
			packageDownload: true,
			file: null,
		};
	},
	watch: {
		type: {
			immediate: true,
			handler: function() {
				var uri = null;
				switch (this.type) {
					case 0:
						uri = "/package_data/standard1-4.json";
						break;
					case 1:
						uri = "/package_data/chart1-4.json";
						break;
					case 2:
						uri = "/package_data/theme1-4.json";
						break;
					case 3:
						uri = "/package_data/artist1-6.json";
						break;
					default:
						return;
				}
				axios.get(uri).then((response) => {
					this.packages = response.data;
				});
			},
		},
	},
	methods: {
		async readOsudb() {
			let osuCollectionBuffer = Buffer.from(
				await this.file.arrayBuffer()
			);
			let collectionDB, osuCollectionData;
			try {
				collectionDB = new OsuDBParser(null, osuCollectionBuffer);
				osuCollectionData = collectionDB.getCollectionData();
			} catch (e) {
				collectionDB = new OsuDBParser(osuCollectionBuffer);
				osuCollectionData = collectionDB.getOsuDBData();
			}

			console.log(osuCollectionData);
		},
		download(p) {
			this.$set(p, "done", false);

			if (this.packageDownload) {
				this.$set(p, "loading", true);

				const fileStream = StreamSaver.createWriteStream(
					p.title + ".zip"
				);

				const readableZipStream = new ZIP({
					async pull(ctrl) {
						// Gets executed everytime zip.js asks for more data
						var promise = [];
						p.beatmap.forEach((s) => {
							promise.push(
								new Promise(async (resolve) => {
									const res = await fetch(
										ApiHelper.GetDownloadUri(
											s,
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
						p.loading = false;
						p.done = true;
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
									p.loading = false;
									p.done = true;
							  }
							: writer.write(res.value).then(pump)
					);

				pump();
			} else {
				var aEles = [];
				var index = 0;
				p.beatmap.forEach((s) => {
					aEles[index] = document.createElement("a");
					let aEle = aEles[index++];
					aEle.download = "";
					//aEle.target = "_blank";
					aEle.href = ApiHelper.GetDownloadUri(
						s,
						this.downloadType,
						this.downloadServer
					);
					let e = document.createEvent("MouseEvents");
					e.initEvent("click", false, false); // 初始化事件对象
					aEle.dispatchEvent(e);
				});
			}
		},
	},
};
</script>

<style></style>
