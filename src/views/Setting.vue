<template>
	<v-container>
		<v-col>
			<v-row>
				<v-btn
					large
					class="d-md-none mr-2"
					@click="$emit('update:isDrawerOpen', !isDrawerOpen)"
					icon
					><v-icon>mdi-menu</v-icon></v-btn
				>
				<h2 class="headline">设置</h2>
			</v-row>
			<v-row>
				<v-list>
					<v-subheader>显示</v-subheader>
					<v-list-item>
						<v-switch v-model="isUnicode">
							<template v-slot:label>
								<label
									class="title"
									:class="
										(isUnicode && 'black--text') ||
											'grey--text'
									"
									>使用 Unicode 标题</label
								>
							</template>
						</v-switch>
					</v-list-item>
					<v-subheader>声音</v-subheader>
					<v-list-item>
						<v-list-item-content>
							<h2 class="title">预览音频大小</h2>
							<v-slider
								prepend-icon="mdi-volume-high"
								min="0"
								max="1"
								step="0.01"
								v-model="volume"
								thumb-label
							></v-slider>
						</v-list-item-content>
					</v-list-item>
					<v-subheader>下载</v-subheader>
					<v-list-item>
						<v-list-item-content>
							<h2 class="title">线路</h2>

							<v-select
								v-model="serverListObject"
								:items="serverList"
								item-text="server_nameU"
								return-object
								class="mt-2"
								outlined
							>
								<template v-slot:item="{ item }">
									<v-list-item-content>
										<v-list-item-title>
											{{ item.server_nameU }}
										</v-list-item-title>
										<v-list-item-subtitle>
											{{ item.server_name }}
										</v-list-item-subtitle>
									</v-list-item-content>
								</template>
							</v-select>
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>
							<h2 class="title">默认下载 Beatmap 模式</h2>

							<v-select
								v-model="downloadType"
								:items="downloadTypeList"
								item-text="title"
								item-value="type"
								class="mt-2"
								outlined
							>
								<template v-slot:item="{ item }">
									<v-list-item-content>
										<v-list-item-title>
											{{ item.title }}
										</v-list-item-title>
										<v-list-item-subtitle
											v-if="item.subtitle"
										>
											{{ item.subtitle }}
										</v-list-item-subtitle>
									</v-list-item-content>
								</template>
							</v-select>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-row>

			<v-row>
				<h2 class="headline">关于</h2>
				<div class="ml-4 mt-8">
					<p>
						Sayobot.cn是全球最大、地图存储量最多（超过2000GB）的第三方osu!镜像站，
						致力于为广大玩家提供osu!周边的服务，包括但不限于osu!地图的搜索下载、提供osu!外设（小键盘和数位板）、图包&皮肤分享/下载、osu!
						QQ机器人等。
					</p>

					<h3 class="subtitle-1">
						Beta Test Version -- Start at 2020.2
					</h3>
					<h3 class="subtitle-1">
						Source:
						<a href="https://github.com/Trzeth/sayobot-vue"
							>@Trzeth/sayobot-vue</a
						>
					</h3>
				</div>
			</v-row>
		</v-col>
	</v-container>
</template>

<script>
import axios from "axios";
import ApiHelper from "../util/api";

export default {
	name: "setting",
	localStorage: {
		isUnicode: {
			type: Boolean,
			default: false
		},
		volume: {
			type: Number,
			default: 1.0
		},
		downloadType: {
			type: Number,
			default: 0
		},
		downloadServer: {
			type: String,
			default: "0"
		}
	},
	data: function() {
		return {
			serverListObject: null,
			serverList: null,
			downloadTypeList: [
				{
					type: 0,
					title: "完整"
				},
				{
					type: 1,
					title: "不包含视频"
				},
				{
					type: 2,
					title: "MINI",
					subtitle: "不包含视频与Storyboard"
				}
			]
		};
	},
	watch: {
		serverListObject: function(val) {
			this.downloadServer = val.server;
		}
	},
	mounted: function() {
		axios.get(ApiHelper.GetServerListUri()).then(response => {
			this.serverList = response.data.data;
			var index = this.serverList.findIndex(e => {
				return e.server == this.downloadServer;
			});
			this.serverListObject = this.serverList[index];
		});
	}
};
</script>

<style lang="scss"></style>
