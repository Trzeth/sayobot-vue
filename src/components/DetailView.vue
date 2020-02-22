<template>
	<div class="detail-card">
		<div
			class="up-warpper elevation-4"
			:style="{ backgroundImage: 'url(' + detailCardBackgroundSrc + ')' }"
		>
			<v-container style="position: relative;">
				<v-row align="end">
					<v-col cols="12" sm="8">
						<v-row no-gutters>
							<a
								class="display-1 mb-5 font-weight-medium black--text"
								@click="titleClick"
								>{{ title }}</a
							>
						</v-row>
						<v-row no-gutters>
							<a
								class="headline black--text"
								@click="artistClick"
							>
								{{ artist }}
							</a>
						</v-row>
						<v-row no-gutters>
							<a class="title black--text" @click="creatorClick">
								{{ beatmapsetDetail.creator }}
							</a>
						</v-row>
						<v-row no-gutters class="mt-5">
							<v-btn class="ma-1"
								><v-icon>mdi-heart-outline</v-icon></v-btn
							>
							<v-btn class="ma-1" :href="downloadLink">
								<v-icon left>mdi-download</v-icon>下载</v-btn
							>
							<v-btn
								class="ma-1"
								:href="downloadWithoutVideoLink"
							>
								<v-icon left>mdi-download</v-icon
								>不带视频</v-btn
							>
							<v-btn class="ma-1" :href="downloadMiniLink">
								<v-icon left>mdi-download</v-icon>Mini</v-btn
							>
							<v-btn
								class="ma-1"
								:href="officialLink"
								target="_blank"
							>
								<v-icon left>mdi-open-in-new</v-icon
								>打开官方页面</v-btn
							>

							<v-btn class="ma-1" @click="OnCopyLink">
								<v-icon left>mdi-content-copy</v-icon
								>复制链接</v-btn
							>
						</v-row>
					</v-col>
					<v-col cols="12" sm="4">
						<v-sheet class="mb-5 px-2 py-2">
							<v-row no-gutters justify="space-between">
								<v-col
									style="cursor: pointer;"
									:cols="!isWsInited ? 12 : 'auto'"
									@click="play"
								>
									<span
										class="play-btn iconfont"
										v-bind:class="{
											inited: isWsInited,
											'icon-caret-right': !isWsPlaying,
											'icon-pause': isWsPlaying
										}"
									></span>
								</v-col>
								<v-col v-show="isWsInited" cols="auto">
									<span
										>{{ length(currentDuration) }} /
										{{ length(totalDuration) }}</span
									>
								</v-col>
							</v-row>
							<v-expand-transition>
								<v-row no-gutters v-show="isWsInited">
									<div ref="waveform" class="waveform"></div>
								</v-row>
							</v-expand-transition>
						</v-sheet>
						<v-sheet elevation="5" class="py-2 px-2">
							<v-row justify="center">
								<v-chip-group
									v-model="currentBeatmapIndex"
									mandatory
									active-class="pink accent-2 white--text"
								>
									<v-chip
										v-for="(beatmap,
										index) in beatmapsetDetail.bid_data"
										:key="beatmap.bid"
										:value="index"
									>
										{{ star(beatmap.star)
										}}<v-icon right small>mdi-star</v-icon>
									</v-chip>
								</v-chip-group>
							</v-row>
							<v-row justify="space-between">
								<v-col cols="auto">
									<v-icon class="iconfont"
										>icon-time-circle</v-icon
									>
									{{
										length(currentBeatmapDetail.length)
									}}</v-col
								>
								<v-col cols="auto">
									<v-icon class="iconfont">icon-bell</v-icon>
									{{ beatmapsetDetail.bpm }}</v-col
								>
								<v-col cols="auto">
									<v-icon class="iconfont"
										>icon-circle</v-icon
									>
									{{ currentBeatmapDetail.circles }}
								</v-col>
								<v-col cols="auto">
									<v-icon class="iconfont"
										>icon-sliders</v-icon
									>
									{{ currentBeatmapDetail.sliders }}
								</v-col>
								<v-col cols="auto">
									<v-icon class="iconfont"
										>icon-spinner3</v-icon
									>
									{{ currentBeatmapDetail.spinners }}
								</v-col>
							</v-row>
							<v-row justify="center" dense>
								<v-col>
									<v-row justify="space-between" dense>
										<v-col cols="auto">Circle Size</v-col>
										<v-col cols="auto">{{
											currentBeatmapDetail.CS
										}}</v-col>
									</v-row>
									<v-row justify="space-between" dense>
										<v-col cols="auto"
											>Overall Difficulty</v-col
										>
										<v-col cols="auto">{{
											currentBeatmapDetail.OD
										}}</v-col>
									</v-row>
									<v-row justify="space-between" dense>
										<v-col cols="auto">HP Drain</v-col>
										<v-col cols="auto">{{
											currentBeatmapDetail.HP
										}}</v-col>
									</v-row>
								</v-col>
								<v-divider class="mx-2" vertical></v-divider>
								<v-col>
									<v-row justify="space-between" dense>
										<v-col cols="auto">Approach Rate</v-col>
										<v-col cols="auto">{{
											currentBeatmapDetail.AR
										}}</v-col>
									</v-row>
									<v-row justify="space-between" dense>
										<v-col cols="auto">Aim</v-col>
										<v-col cols="auto">{{
											currentBeatmapDetail.aim
										}}</v-col>
									</v-row>
									<v-row justify="space-between" dense>
										<v-col cols="auto">Speed</v-col>
										<v-col cols="auto">{{
											currentBeatmapDetail.speed
										}}</v-col>
									</v-row>
								</v-col>
							</v-row>
						</v-sheet>
					</v-col>
				</v-row>
			</v-container>
		</div>
		<v-container>
			<v-row
				><v-col cols="12" sm="8">
					<v-row>
						<v-btn-toggle
							class="ml-6"
							borderless
							mandatory
							v-model="chartIndex"
						>
							<v-btn :disabled="!isChartAvailable[0]">
								<v-icon left>mdi-format-align-left</v-icon
								>移动曲线</v-btn
							>
							<v-btn :disabled="!isChartAvailable[1]"
								><v-icon left>mdi-format-align-left</v-icon
								>手速曲线</v-btn
							>
						</v-btn-toggle>
					</v-row>
					<v-row style="position: relative">
						<v-overlay
							absolute
							color="transprant"
							v-if="!isChartAvailable[0] && !isChartAvailable[1]"
							><v-btn light elevation="10">
								<v-icon left>mdi-sticker-remove-outline</v-icon
								>数据不可用</v-btn
							></v-overlay
						>
						<v-chart
							:options="chartOptine"
							autoresize
							style="width:100%"
						>
						</v-chart> </v-row
				></v-col>
				<v-spacer></v-spacer>
				<v-col cols="12" sm="4">
					<v-list>
						<v-subheader>额外信息</v-subheader>
						<v-list-item>
							Beatmap ID:{{ currentBeatmapDetail.bid }}
						</v-list-item>
						<v-list-item>
							300打击延迟:{{ currentBeatmapDetail.hit300windows }}
						</v-list-item>
						<v-list-item>
							最大连击数: {{ currentBeatmapDetail.maxcombo }}
						</v-list-item>
						<v-list-item>
							游玩次数: {{ currentBeatmapDetail.playcount }}
						</v-list-item>
						<v-list-item>
							通过次数: {{ currentBeatmapDetail.passcount }}
						</v-list-item>
						<v-subheader>PP</v-subheader>
						<v-list-item
							>最大 PP(None Mode):{{
								currentBeatmapDetail.pp
							}}</v-list-item
						>
						<v-list-item
							>谱面的移动 PP:{{
								currentBeatmapDetail.pp_aim
							}}</v-list-item
						>
						<v-list-item
							>铺面的手速 PP:{{
								currentBeatmapDetail.pp_speed
							}}</v-list-item
						>
						<v-list-item
							>铺面的Acc PP:{{
								currentBeatmapDetail.pp_acc
							}}</v-list-item
						>
					</v-list>
				</v-col>
			</v-row>
		</v-container>
		<v-snackbar
			v-model="snackBar.isOpen"
			@click="snackBar.isOpen = false"
			:color="snackBar.color"
			:timeout="snackBar.timeOut"
		>
			{{ snackBar.text }}
			<v-btn text>
				关闭
			</v-btn>
		</v-snackbar>
	</div>
</template>

<script>
import axios from "axios";
import ApiHelper from "../util/api";
import WaveSurfer from "wavesurfer.js";
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";

export default {
	name: "detail-view",
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
	components: {
		"v-chart": ECharts
	},
	props: ["optine", "isOpen"],
	data: function() {
		return {
			localOptine: null,

			snackBar: {
				isOpen: false,
				color: null,
				text: null,
				timeOut: null
			},
			currentBeatmapIndex: 0,

			beatmapsetDetail: {
				//去除 error
				bid_data: [{}]
			},

			isWsInited: false,
			isWsPlaying: false,
			totalDuration: 0,
			currentDuration: 0,

			isChartAvailable: [false, false],
			chartIndex: 0,

			chartOptine: {
				title: {
					text: "难度曲线"
				},
				tooltip: {},
				grid: {
					left: 24
				},
				xAxis: {
					type: "category",
					show: true,
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					}
				},
				yAxis: {
					type: "value",
					show: true,
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					}
				},
				series: [
					{
						data: null,
						type: "line",
						smooth: true
					}
				]
			}
		};
	},
	mounted: function() {
		this.init();
	},
	watch: {
		isOpen: {
			handler: function() {
				this.pause();
				this.snackBar.isOpen = false;
			}
		},
		optine: {
			immediate: true,
			handler: function(newOptine) {
				if (this.isNewDetail(newOptine, this.localOptine)) {
					this.isWsInited = false;
					this.currentBeatmapIndex = 0;
					this.currentDuration = 0;
					this.totalDuration = 0;
					this.chartOptine.series[0].data = null;

					if (this.ws) this.ws.empty();

					this.localOptine = _.clone(newOptine);

					var uri = "https://api.sayobot.cn/v2/beatmapinfo?0=";
					if (this.localOptine.sid) {
						uri += this.localOptine.sid;
					} else {
						uri += this.localOptine.bid + "&1=1";
					}

					axios.get(uri).then(response => {
						if (response.data.status == -1) {
							this.beatmapsetDetail = { bid_data: [] };
							this.PushMessage("未找到 Beatmap", "error", 0);
							return;
						}

						this.beatmapsetDetail = response.data.data;

						this.beatmapsetDetail.bid_data.sort((a, b) => {
							return Number.parseFloat(a.star) >
								Number.parseFloat(b.star)
								? 1
								: -1;
						});

						if (!this.localOptine.sid) {
							this.localOptine.sid = this.beatmapsetDetail.sid;
							this.$router.replace({
								name: "home",
								params: {
									queryMode: "beatmapset",
									sid: this.localOptine.sid
								}
							});
						}

						this.currentBeatmapIndex =
							this.beatmapsetDetail.bid_data.length - 1;
					});
				}
			}
		},
		chartIndex: {
			handler: function(val) {
				var curBeatmap = this.beatmapsetDetail.bid_data[
					this.currentBeatmapIndex
				];

				if (val == 0 && this.isChartAvailable[val]) {
					this.chartOptine.series[0].data = curBeatmap.strain_aimArr;
				} else {
					if (this.isChartAvailable[1]) {
						this.chartOptine.series[0].data =
							curBeatmap.strain_speed;
					}
				}
			}
		},
		currentBeatmapIndex: function(newV) {
			var curBeatmap = this.beatmapsetDetail.bid_data[newV];
			if (!curBeatmap) return;

			if (!curBeatmap.strain_aimArr && !curBeatmap.strain_speedArr) {
				if (curBeatmap.strain_aim == "") {
					this.isChartAvailable[0] = false;
				} else {
					curBeatmap.strain_aimArr = this.stringToArr(
						curBeatmap.strain_aim
					);
					this.isChartAvailable[0] = true;
				}
				if (curBeatmap.strain_speed == "") {
					this.isChartAvailable[1] = false;
				} else {
					curBeatmap.strain_speedArr = this.stringToArr(
						curBeatmap.strain_speed
					);
					this.isChartAvailable[1] = true;
				}
			} else {
				this.isChartAvailable[0] = curBeatmap.strain_aimArr
					? true
					: false;
				this.isChartAvailable[1] = curBeatmap.strain_speedArr
					? true
					: false;
			}

			var index = this.chartIndex;
			var isAva = false;
			if (this.isChartAvailable[index]) {
				isAva = true;
			} else {
				index = index ? 1 : 0;
				isAva = this.isChartAvailable[index];
			}

			if (isAva) {
				this.chartOptine.series[0].data = !index
					? curBeatmap.strain_aimArr
					: curBeatmap.strain_speedArr;
			}
		}
	},
	computed: {
		title: function() {
			if (this.isUnicode == true && this.beatmapsetDetail.titleU != "") {
				return this.beatmapsetDetail.titleU;
			} else {
				return this.beatmapsetDetail.title;
			}
		},
		artist: function() {
			if (this.isUnicode == true && this.beatmapsetDetail.artistU != "") {
				return this.beatmapsetDetail.artistU;
			} else {
				return this.beatmapsetDetail.artist;
			}
		},
		detailCardBackgroundSrc: function() {
			if (this.localOptine && this.localOptine.sid) {
				return ApiHelper.GetPreviewBackgroundUri(this.localOptine.sid);
			}
			return null;
		},
		currentBeatmapDetail: function() {
			if (
				!this.beatmapsetDetail ||
				!this.beatmapsetDetail.bid_data[this.currentBeatmapIndex]
			)
				return {};
			return this.beatmapsetDetail.bid_data[this.currentBeatmapIndex];
		},
		downloadLink: function() {
			if (this.localOptine && this.localOptine.sid) {
				return ApiHelper.GetDownloadUri(
					this.localOptine.sid,
					0,
					this.downloadServer
				);
			}
			return null;
		},
		downloadWithoutVideoLink: function() {
			if (this.localOptine && this.localOptine.sid) {
				return ApiHelper.GetDownloadUri(
					this.localOptine.sid,
					1,
					this.downloadServer
				);
			}
			return null;
		},
		downloadMiniLink: function() {
			if (this.localOptine && this.localOptine.sid) {
				return ApiHelper.GetDownloadUri(
					this.localOptine.sid,
					2,
					this.downloadServer
				);
			}
			return null;
		},
		officialLink: function() {
			if (this.localOptine && this.localOptine.sid) {
				ApiHelper.GetOfficialUri(
					this.localOptine.sid,
					this.beatmapsetDetail.bid_data[this.currentBeatmapIndex].bid
				);
			}
			return null;
		}
	},
	methods: {
		PushMessage(message, color, timeout = 6000) {
			this.snackBar.timeOut = timeout;
			this.snackBar.text = message;
			this.snackBar.color = color;
			this.snackBar.isOpen = true;
		},
		OnCopyLink() {
			var input = document.createElement("textarea");
			input.innerHTML = document.location.href;
			document.body.appendChild(input);
			input.select();
			document.execCommand("copy");
			document.body.removeChild(input);

			this.PushMessage("复制至剪切板", "success");
		},
		isNewDetail(newOptine, oldOptine) {
			if (!newOptine) return false;
			if (!oldOptine) return true;

			if (
				oldOptine.bid &&
				newOptine.bid &&
				oldOptine.bid == newOptine.bid
			)
				return false;

			if (!newOptine.sid) return true;
			if (newOptine.sid != oldOptine.sid) return true;

			return false;
		},
		stringToArr(str) {
			if (!str || str == "") return null;

			var arr = [];
			for (var i = 0; i != str.length; i++) {
				arr.push(str[i] - "0");
			}
			return arr;
		},
		length(value) {
			var second = 0,
				minute = 0;
			var length = Number.parseFloat(value);
			second = length % 60;
			minute = (length - second) / 60;
			second = second.toFixed("0");

			return minute + ":" + (second < 10 ? "0" : "") + second;
		},
		init() {
			this.ws = WaveSurfer.create({
				container: this.$refs.waveform,
				height: 128,
				barWidth: 2,
				barHeight: 1,
				barGap: null
			});
			this.ws.setVolume(this.volume);
		},
		intiWaveSurfer() {
			var src =
				process.env.NODE_ENV == "development"
					? "/audio/${sid}.mp3"
					: "https://cdn.sayobot.cn:25225/preview/${sid}.mp3";
			src = src.replace("${sid}", this.beatmapsetDetail.sid);
			this.ws.load(src);
			this.ws.on("play", () => {
				this.isWsPlaying = true;
			});
			this.ws.on("pause", () => {
				this.isWsPlaying = false;
			});
			this.ws.on("ready", () => {
				this.ws.play();
				this.totalDuration = parseFloat(this.ws.getDuration()).toFixed(
					1
				);
			});
			this.ws.on("audioprocess", value => {
				this.currentDuration = parseFloat(value).toFixed(1);
			});
			this.ws.on("seek", value => {
				this.currentDuration = parseFloat(
					value * this.totalDuration
				).toFixed(1);
			});
		},
		play() {
			if (!this.isWsInited) {
				this.intiWaveSurfer();
				this.isWsInited = true;
				this.isWsPlaying = true;
			} else {
				this.ws.playPause();
			}
		},
		pause() {
			if (this.ws) this.ws.pause();
		},
		titleClick() {
			this.$router.push({
				name: "home",
				params: {
					queryMode: "search"
				},
				query: {
					keyword: this.beatmapsetDetail.title,
					subType: 1
				}
			});
		},
		artistClick() {
			this.$router.push({
				name: "home",
				params: {
					queryMode: "search"
				},
				query: {
					keyword: this.beatmapsetDetail.artist,
					subType: 2
				}
			});
		},
		creatorClick() {
			this.$router.push({
				name: "home",
				params: {
					queryMode: "search"
				},
				query: {
					keyword: this.beatmapsetDetail.creator,
					subType: 4
				}
			});
		},
		star(num) {
			return parseFloat(num).toFixed(2);
		}
	}
};
</script>

<style lang="scss">
.detail-card {
	.up-warpper {
		position: relative;
		background-position: 50%;
		background-size: cover;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 112px;
		color: #000000;

		&::before {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			content: "";
			background-image: linear-gradient(
				rgba(218, 218, 218, 0.3),
				rgba(238, 238, 238, 0.6)
			);
		}

		.play-btn {
			margin: 0 auto;
			box-sizing: border-box;
			width: 2rem;
			font-size: 2rem;
			display: block;

			&.inited {
				margin: 0;
			}
		}

		.waveform {
			width: 100%;
			position: relative;
			z-index: 0;
			height: 128px;

			> wave {
				overflow: hidden !important;
			}
		}
	}
}
</style>
