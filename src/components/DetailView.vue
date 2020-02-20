<template>
	<div class="detail-card">
		<div
			class="img-warpper elevation-4"
			:style="{ backgroundImage: detailCardBackgroundSrc }"
		>
			<v-container style="position: relative;" justify="center">
				<v-row align="end">
					<v-col>
						<v-row>
							<span
								class="play-btn iconfont"
								v-bind:class="{
									inited: isWsInited,
									'icon-caret-right': !isWsPlaying,
									'icon-pause': isWsPlaying
								}"
								@click="play"
							></span>
							<span
								class="progress-bar"
								v-bind:class="{ inited: isWsInited }"
								>{{ length(currentDuration) }} /
								{{ length(totalDuration) }}</span
							>
						</v-row>
						<v-row>
							<div ref="waveform" class="waveform"></div>
						</v-row>
						<v-row>
							<label class="display-1 mb-5">{{ title }}</label>
						</v-row>
						<v-row>
							<h2 class="headline" @click="artistClick">
								{{ artist }}
							</h2>
						</v-row>
						<v-row>
							<h2 class="title" @click="creatorClick">
								{{ beatmapsetDetail.creator }}
							</h2>
						</v-row>
						<v-row class="mt-5">
							<v-btn class="ma-1"
								><v-icon>mdi-heart-outline</v-icon></v-btn
							>
							<v-btn class="ma-1">
								<v-icon left>mdi-download</v-icon>下载</v-btn
							>
							<v-btn class="ma-1">
								<v-icon left>mdi-download</v-icon
								>不带视频</v-btn
							>
							<v-btn class="ma-1">
								<v-icon left>mdi-download</v-icon>Mini</v-btn
							>
						</v-row>
					</v-col>
					<v-spacer></v-spacer>
					<v-col>
						<v-row>
							<v-chip-group>
								<v-chip
									v-for="(beatmap,
									index) in beatmapsetDetail.bid_data"
									@click="currentBeatmapIndex = index"
									v-bind:key="beatmap.bid"
								>
									{{ star(beatmap.star) }}*
								</v-chip>
							</v-chip-group>
						</v-row>
						<v-row>
							<v-col
								><span
									class="iconfont icon-time-circle"
									title="Length"
									>{{
										length(currentBeatmapDetail.length)
									}}</span
								></v-col
							>
							<v-col
								><span class="iconfont icon-bell" title="BPM">{{
									beatmapsetDetail.bpm
								}}</span></v-col
							>
							<v-col>
								<span
									class="iconfont icon-circle circle"
									title="Circles"
									>{{ currentBeatmapDetail.circles }}</span
								>
							</v-col>
							<v-col>
								<span
									class="iconfont icon-sliders"
									title="Sliders"
									>{{ currentBeatmapDetail.sliders }}</span
								>
							</v-col>
							<v-col>
								<v-icon></v-icon>
								<span
									class="iconfont icon-spinner3 circle"
									title="Spinners"
									>{{ currentBeatmapDetail.spinners }}</span
								>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="6"
								><v-row>Circle Size</v-row>
								<v-row>Overall Difficulty</v-row>
								<v-row>HP Drain</v-row>
								<v-row>Approach Rate</v-row>
								<v-row>Aim</v-row>
								<v-row>Speed</v-row>
							</v-col>

							<v-col cols="6">
								<v-row>
									{{ currentBeatmapDetail.CS }}
								</v-row>
								<v-row>
									{{ currentBeatmapDetail.OD }}
								</v-row>
								<v-row>
									{{ currentBeatmapDetail.HP }}
								</v-row>
								<v-row>
									{{ currentBeatmapDetail.AR }}
								</v-row>
								<v-row>
									{{ currentBeatmapDetail.aim }}
								</v-row>
								<v-row>
									{{ currentBeatmapDetail.speed }}
								</v-row>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-container>
		</div>
		<v-container>
			<v-row
				><v-col cols="8">
					<v-row style="position: relative">
						<v-btn-toggle class="ml-6" borderless mandatory>
							<v-btn disabled>
								<v-icon left>mdi-format-align-left</v-icon
								>移动曲线</v-btn
							>
							<v-btn disabled
								><v-icon left>mdi-format-align-left</v-icon
								>手速曲线</v-btn
							>
						</v-btn-toggle>
						<v-overlay absolute color="transprant"
							><v-btn light elevation="10">
								<v-icon left>mdi-sticker-remove-outline</v-icon
								>数据不可用</v-btn
							></v-overlay
						>
						<v-chart :options="polar" autoresize> </v-chart> </v-row
				></v-col>
				<v-spacer></v-spacer>
				<v-col cols="auto">
					<v-list>
						<v-subheader>PP</v-subheader>
						<v-list-item>Max pp(none mode)</v-list-item>
						<v-list-item>谱面的移动pp</v-list-item>
						<v-list-item>铺面的手速pp</v-list-item>
						<v-list-item>铺面的acc PP</v-list-item>
					</v-list>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import axios from "axios";
import WaveSurfer from "wavesurfer.js";
import ProgressBar from "./ProgressBar.vue";
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";

export default {
	name: "detail-view",
	data: function() {
		let data = [];

		for (let i = 0; i <= 360; i++) {
			let t = (i / 180) * Math.PI;
			let r = Math.sin(2 * t) * Math.cos(2 * t);
			data.push([r, i]);
		}
		return {
			currentBeatmapIndex: 0,
			beatmapsetDetail: {
				//去除 error
				bid_data: [{}]
			},
			isWsInited: false,
			isWsPlaying: false,
			totalDuration: 0,
			currentDuration: 0,
			polar: {
				title: {
					text: "ECharts 入门示例"
				},
				tooltip: {},
				legend: {
					data: ["销量"],
					padding: 0,
					left: 0
				},
				grid: {
					left: 24
				},
				xAxis: {
					show: true,
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					}
				},
				yAxis: {
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
						name: "销量",
						type: "line",
						data: [5, 20, 36, 10, 10, 20]
					}
				]
			}
		};
	},
	localStorage: {
		isUnicode: {
			type: Boolean,
			default: false
		},
		volume: {
			type: Number,
			default: 1.0
		}
	},
	components: {
		ProgressBar,
		"v-chart": ECharts
	},
	props: ["optine", "isOpen"],
	mounted: function() {
		this.init();
	},
	watch: {
		currentBeatmapIndex: function() {
			this.$router.replace({
				query: {
					sid: this.beatmapsetDetail.sid,
					bid: this.currentBeatmapDetail.bid
				}
			});
		},
		isOpen: {
			handler: function(newV, oldV) {
				this.pause();
			}
		},
		optine: {
			immediate: true,
			handler: function(newOptine, oldOptine) {
				if (
					this.optine &&
					(!oldOptine || newOptine.sid != oldOptine.sid)
				) {
					this.isWsInited = false;
					if (this.ws) this.ws.empty();
					axios
						.get(
							"https://api.sayobot.cn/v2/beatmapinfo" +
								"?0=" +
								this.optine.sid
						)
						.then(response => {
							this.beatmapsetDetail = response.data.data;
						});
				}
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

		downloadLink: function() {
			return (
				"https://txy1.sayobot.cn/download/osz/" +
				this.beatmapsetDetail.sid
			);
		},
		detailCardBackgroundSrc: function() {
			if (this.optine) {
				console.log(this.optine.sid);
				var src =
					"url(https://cdn.sayobot.cn:25225/beatmaps/${sid}/covers/cover.jpg)";
				return src.replace("${sid}", this.optine.sid);
			}
		},
		currentBeatmapDetail: function() {
			return this.beatmapsetDetail.bid_data[this.currentBeatmapIndex];
		}
	},
	methods: {
		length: function(value) {
			var second = 0,
				minute = 0;
			var length = parseFloat(value);
			second = length % 60;
			minute = (length - second) / 60;
			return minute + ":" + second;
		},
		valueToPectange(value) {
			return value * 10 + "%";
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
		star: function(num) {
			return parseFloat(num).toFixed(2);
		}
	}
};
</script>

<style lang="scss">
.echarts {
	width: 100%;
}
.detail-card {
	.img-warpper {
		position: relative;
		background-position: 50%;
		background-size: cover;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 112px;
		color: #000000;
		//box-shadow: 0 0 5px 5px rgba(155, 155, 155, 0.8);

		&::before {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			content: "";
			background-image: linear-gradient(
				rgba(218, 218, 218, 0.3),
				rgba(238, 238, 238, 0.5)
			);
		}

		.left {
			flex: 1;
			padding: 10px 0 0 10px;
			position: relative;

			.play-btn {
				cursor: pointer;
				margin: 10px;
				font-size: 5rem;
				position: absolute;
				z-index: 1;
				transition: font-size 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

				&.inited {
					margin: 0;
					font-size: 2rem;
				}
				&.playing {
					visibility: hidden;
				}
			}

			.play-btn ~ .waveform {
				visibility: collapse;
			}
			.play-btn.inited ~ .waveform {
				visibility: visible;
			}

			.progress-bar {
				position: absolute;
				right: 0;
				text-align: right;
				visibility: hidden;

				&.inited {
					visibility: visible;
				}
			}

			.waveform {
				top: 2rem;
				position: relative;
				z-index: 0;
			}
		}
		.right {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			width: 300px;
			text-align: right;

			.beatmapset-detail {
				.iconfont {
					display: inline-block;

					&.circle:before {
						font-size: 1rem;
					}
					&:before {
						margin-right: 4px;
						font-size: 1.2rem;
					}
				}
			}

			ul {
				flex: 1;
				list-style-type: none;
				padding: 0;

				.mode-li {
					cursor: pointer;
					margin: 0 5px;
					padding: 5px 10px;
					border-radius: 20px;
					display: inline-block;
					text-align: center;
					color: #ffffff;
					background: #f563a4;
				}
			}

			.beatmap-detail-table {
				.title {
					white-space: nowrap;
				}
				.progress {
					padding: 5px;
					width: 100%;
				}
				.value {
					min-width: 33px;
					text-align: center;
				}
			}
		}
	}

	.down {
	}
	.download-btn {
		text-decoration: none;
		display: block;
		cursor: pointer;
		color: #bfbfbf;
		font-size: 5rem;
		text-align: center;
		transition: color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

		&:hover {
			color: #000000;
		}
	}
}

@media screen and (max-width: 800px) {
	.detail-card-warpper {
		max-width: 100%;
	}
}
</style>
