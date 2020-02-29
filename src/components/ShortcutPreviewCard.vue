<template>
	<div class="preview-card" @mousemove="showOrHideFunc" @mouseout="isPreviewCardBackgroundShow = isHeaderShow = true; isDetailShow = false">
		<!-- <div class="preview-card" @mousemove="showOrHideFunc"> -->
		<router-link v-bind:to="beatmapsetInfoLink">
			<v-img class="preview-card-background" :src="previewCardBackgroundSrc" v-show="isPreviewCardBackgroundShow"></v-img>
		</router-link>
		<div class="header" v-show="isHeaderShow">
			<router-link class="title-artist-warpper" v-bind:to="beatmapsetInfoLink">
				<span class="status">{{ approvedStatus }}</span>
				<h2 class="beatmap-title overflow-clip" v-bind:title="title">
					<router-link v-bind:to="beatmapsetInfoLink">{{title}}</router-link>
				</h2>
				<h3 class="beatmap-artist overflow-clip" v-bind:title="artist">
					<router-link v-bind:to="searchArtistLink">{{artist}}</router-link>
				</h3>
				<h3 class="beatmap-lastupdate overflow-clip">{{lastupdate}}</h3>
				<h3 class="beatmap-creator overflow-clip" v-bind:title="artist">
					<router-link v-bind:to="searchCreatorLink" class="overflow-clip">@{{ beatmapsetInfo.creator }}</router-link>
				</h3>
			</router-link>
			<div class="top-right-btn-warpper">
				<span class="iconfont play-btn" v-bind:class="{'icon-caret-right': !isPreviewAudioPlaying, 'icon-pause': isPreviewAudioPlaying}" @click="playPreviewAudio"></span>
				<audio ref="preview" preload="none">
					<source v-bind:src="previewAudioSrc" type="audio/mp3" />
				</audio>
				<a class="iconfont icon-download download-btn" v-bind:href="downloadLink"></a>
			</div>
			<ul class="bottom-right-btn-warpper">
				<li :title="'收藏数：' + beatmapsetInfo.favourite_count">
					{{beatmapsetInfo.favourite_count}}
					<span class="iconfont icon-heart-fill"></span>
				</li>
				<li :title="'这张图被游玩了 ' + beatmapsetInfo.order + ' 次'">
					{{beatmapsetInfo.order}}
					<span class="iconfont icon-play-circle-fill"></span>
				</li>
			</ul>
		</div>
		<div class="detail" v-show="isDetailShow">
			<div v-if="isBeatmapsetInfoDetailGotIt == false">加载中...</div>
			<div v-if="isBeatmapsetInfoDetailGotIt == true">
				<div class="title-artist-warpper">
					<h3 class="beatmap-artist overflow-clip" v-bind:title="beatmapsetInfoDetail.bid_data[beatmapsetInfoDetailBidIndex].version">难度名:&nbsp;{{beatmapsetInfoDetail.bid_data[beatmapsetInfoDetailBidIndex].version}}</h3>
					<h3 class="beatmap-artist overflow-clip" v-bind:title="beatmapsetInfoDetail.bpm">bpm:&nbsp;{{beatmapsetInfoDetail.bpm}}</h3>
					<h3 class="beatmap-artist overflow-clip" v-bind:title="beatmapsetInfoDetail.bid_data[beatmapsetInfoDetailBidIndex].AR">AR:&nbsp;{{beatmapsetInfoDetail.bid_data[beatmapsetInfoDetailBidIndex].AR}}</h3>
					<h3 class="beatmap-artist overflow-clip" v-bind:title="beatmapsetInfoDetail.bid_data[beatmapsetInfoDetailBidIndex].star">难度:&nbsp;{{Math.round(beatmapsetInfoDetail.bid_data[beatmapsetInfoDetailBidIndex].star * 100) / 100}}</h3>
				</div>
				<div class="bottom-btn-warpper">
					<div class="iconfont icon-heart-fill" v-for="(bid_data,bid_dataIndex) in beatmapsetInfoDetail.bid_data" :key="bid_dataIndex" :title="bid_data.version" @click="beatmapsetInfoDetailBidIndex = bid_dataIndex"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import ApiHelper from "../util/api";

export default {
	name: "shortcut-preview-card",
	props: {
		beatmapsetInfo: Object
	},
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
			beatmapsetInfoDetail: {},
			isBeatmapsetInfoDetailGetting: false,
			isBeatmapsetInfoDetailGotIt: false,
			beatmapsetInfoDetailBidIndex: 0,
			isPreviewAudioPlaying: false,
			isPreviewCardBackgroundShow: true,
			isHeaderShow: true,
			isDetailShow: false
		};
	},
	methods: {
		playPreviewAudio() {
			var preview = this.$refs.preview;
			if (this.isPreviewAudioPlaying) {
				this.isPreviewAudioPlaying = false;
				preview.pause();
			} else {
				this.isPreviewAudioPlaying = true;
				preview.play();
			}
		},
		showOrHideFunc(e) {
			if (e.ctrlKey == true && e.altKey == true) {
				this.isPreviewCardBackgroundShow = true;
				this.isHeaderShow = false;
				this.isDetailShow = false;
			} else if (e.ctrlKey == true && e.altKey == false) {
				this.isPreviewCardBackgroundShow = false;
				this.isHeaderShow = true;
				this.isDetailShow = false;
			} else if (e.ctrlKey == false && e.altKey == true) {
				this.isPreviewCardBackgroundShow = false;
				this.isHeaderShow = false;
				this.isDetailShow = true;
				this.isDetailShowFunc();
			}
		},
		isDetailShowFunc: function() {
			if (this.isDetailShow == true) {
				if (this.isBeatmapsetInfoDetailGotIt == false && this.isBeatmapsetInfoDetailGetting == false) {
					this.isBeatmapsetInfoDetailGetting = true;
					var uri = "https://api.sayobot.cn/v2/beatmapinfo?0=" + this.beatmapsetInfo.sid;
					axios.get(uri).then(response => {
						if (response.data.status == -1) {
							this.beatmapsetDetail = { bid_data: [] };
							this.PushMessage("未找到 Beatmap", "error", 0);
							return;
						}
						this.beatmapsetInfoDetail = response.data.data;
						this.isBeatmapsetInfoDetailGotIt = true;
						// this.beatmapsetDetail = response.data.data;
						// this.beatmapsetDetail.bid_data.sort((a, b) => {
						// 	return Number.parseFloat(a.star) > Number.parseFloat(b.star) ? 1 : -1;
						// });
						// if (!this.beatmapsetInfo.sid) {
						// 	this.beatmapsetInfo.sid = this.beatmapsetDetail.sid;
						// 	this.$router.replace({
						// 		name: "home",
						// 		params: {
						// 			queryMode: "beatmapset",
						// 			sid: this.beatmapsetInfo.sid
						// 		}
						// 	});
						// }
						// this.currentBeatmapIndex = this.beatmapsetDetail.bid_data.length - 1;
					});
				}
				// console.log(this.beatmapsetInfoDetail);
				return true;
			} else {
				return false;
			}
		}
	},
	watch: {
		volume: function() {
			this.$refs.preview.volume = this.volume;
		}
	},
	mounted: function() {
		this.$refs.preview.onended = () => {
			this.isPreviewAudioPlaying = false;
		};
	},
	computed: {
		lastupdate: function() {
			var a = new Date(this.beatmapsetInfo.lastupdate * 1000);
			return a.getUTCFullYear() + "年" + (a.getUTCMonth() + 1) + "月" + a.getUTCDate() + "日";
		},
		beatmapsetInfoLink: function() {
			return "beatmapset/" + this.beatmapsetInfo.sid;
		},
		searchArtistLink: function() {
			return "search?subType=2&keyword=" + encodeURIComponent(this.beatmapsetInfo.artist);
		},
		searchCreatorLink: function() {
			return "search?subType=4&keyword=" + encodeURIComponent(this.beatmapsetInfo.creator);
		},
		title: function() {
			if (this.isUnicode == true && this.beatmapsetInfo.titleU != "") {
				return this.beatmapsetInfo.titleU;
			} else {
				return this.beatmapsetInfo.title;
			}
		},
		artist: function() {
			if (this.isUnicode == true && this.beatmapsetInfo.artistU != "") {
				return this.beatmapsetInfo.artistU;
			} else {
				return this.beatmapsetInfo.artist;
			}
		},
		downloadLink: function() {
			return ApiHelper.GetDownloadUri(this.beatmapsetInfo.sid, this.downloadType, this.downloadServer);
		},
		previewAudioSrc: function() {
			return ApiHelper.GetPreviewAudioUri(this.beatmapsetInfo.sid);
		},
		previewCardBackgroundSrc: function() {
			return ApiHelper.GetPreviewBackgroundUri(this.beatmapsetInfo.sid);
		},
		approvedStatus: function() {
			var status;
			switch (this.beatmapsetInfo.approved) {
				case 0:
					status = "Pending";
					break;
				case 1:
					status = "Ranked";
					break;
				case 2:
					status = "Approved";
					break;
				case 3:
					status = "Qualified";
					break;
				case 4:
					status = "Loved";
					break;
				case -1:
					status = "WIP";
					break;
				case -2:
					status = "Graveyard";
					break;
			}
			return status;
		}
	}
};
</script>

<style lang="scss">
.preview-card-list {
	.preview-card {
		height: 94px;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
		border-radius: 10px;
		a {
			text-decoration: none;
			color: #fff;
		}

		a:hover,
		a:visited,
		a:active {
			color: #fff;
		}
	}
}

.preview-card {
	background-size: cover;
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.5);
	// .preview-card-background {
	// 	transition: all 0.5s;
	// }
	// &:hover {
	// 	.preview-card-background {
	// 		transform: scale(1.05);
	// 	}
	// }

	.overflow-clip {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.detail {
		position: absolute;
		top: 3px;
		left: 3px;
		right: 3px;
		bottom: 0;
		order: 1;

		.title-artist-warpper {
			color: #fff;
			flex: 1;
			overflow: hidden;
			text-shadow: 0px 0px 6px #000;
			line-height: 1.1rem;

			.status {
				background: rgba(0, 0, 0, 0.5);
				color: white;
				padding: 2px 10px;
				font-size: 0.8rem;
				border-radius: 15px;
			}

			.beatmap-title {
				font-size: 0.8rem;
				width: 95%;
				font-weight: 600;
			}

			.beatmap-artist {
				font-size: 0.7rem;
				width: 95%;
				font-weight: 500;

				> a::before {
					content: "# ";
					opacity: 0;
					margin-left: -1.5ch;
					transition: all 0.3s ease;
				}

				> a:hover {
					&::before {
						opacity: 1;
						margin-left: 0;
					}
				}
			}

			.beatmap-lastupdate {
				font-size: 0.7rem;
				width: 95%;
				font-weight: 500;
			}

			.beatmap-creator {
				font-size: 0.7rem;
				width: 95%;
				font-weight: 500;
			}
		}

		.top-right-btn-warpper {
			position: absolute;
			line-height: 1.8rem;
			right: 0;

			.download-btn {
				font-size: 1.8rem;
				color: #d26;
				border-radius: 10px;
				transition: background-color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

				&:hover {
					background-color: rgba(255, 255, 255, 0.5);
				}
			}

			.play-btn {
				font-size: 1.8rem;
				color: #ffffff;
				transition: all 0.3s ease;
				cursor: pointer;
				text-shadow: 0 0 5px rgba(0, 0, 0, 1);
				opacity: 0;

				&:hover {
					color: #ffcc22;
				}
			}
		}

		.bottom-right-btn-warpper {
			position: absolute;
			right: 0;
			bottom: 0;
			line-height: 0.9rem;
			color: #fff;
			list-style: none;
			text-align: right;
		}
		.bottom-btn-warpper {
			position: absolute;
			bottom: 0;
			color: #fff;
			list-style: none;
			display: flex;
		}
	}

	.header {
		position: absolute;
		top: 3px;
		left: 3px;
		right: 3px;
		order: 1;
		display: flex;

		.title-artist-warpper {
			color: #fff;
			flex: 1;
			overflow: hidden;
			text-shadow: 0px 0px 6px #000;
			line-height: 1.1rem;

			.status {
				background: rgba(0, 0, 0, 0.5);
				color: white;
				padding: 2px 10px;
				font-size: 0.8rem;
				border-radius: 15px;
			}

			.beatmap-title {
				font-size: 0.8rem;
				width: 95%;
				font-weight: 600;
			}

			.beatmap-artist {
				font-size: 0.7rem;
				width: 95%;
				font-weight: 500;

				> a::before {
					content: "# ";
					opacity: 0;
					margin-left: -1.5ch;
					transition: all 0.3s ease;
				}

				> a:hover {
					&::before {
						opacity: 1;
						margin-left: 0;
					}
				}
			}

			.beatmap-lastupdate {
				font-size: 0.7rem;
				width: 95%;
				font-weight: 500;
			}

			.beatmap-creator {
				font-size: 0.7rem;
				width: 95%;
				font-weight: 500;
			}
		}

		.top-right-btn-warpper {
			position: absolute;
			line-height: 1.8rem;
			right: 0;

			.download-btn {
				font-size: 1.8rem;
				color: #d26;
				border-radius: 10px;
				transition: background-color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

				&:hover {
					background-color: rgba(255, 255, 255, 0.5);
				}
			}

			.play-btn {
				font-size: 1.8rem;
				color: #ffffff;
				transition: all 0.3s ease;
				cursor: pointer;
				text-shadow: 0 0 5px rgba(0, 0, 0, 1);
				opacity: 0;

				&:hover {
					color: #ffcc22;
				}
			}
		}

		.bottom-right-btn-warpper {
			position: absolute;
			right: 0;
			bottom: 0;
			line-height: 0.9rem;
			color: #fff;
			list-style: none;
			text-align: right;
		}
	}

	.banner {
		position: relative;
		border-radius: 10px 10px 0 0;
		overflow: hidden;

		.left-top-warpper {
			position: absolute;
			left: 5px;
			top: 5px;

			.status {
				position: absolute;

				display: block;
				background: rgba(0, 0, 0, 0.5);
				color: white;
				padding: 2px 10px;
				font-size: 0.8rem;
				border-radius: 15px;
				transition: opacity 0.3s ease;
			}

			.play-btn {
				position: absolute;
				font-size: 3.2rem;
				color: #ffffff;
				opacity: 0;
				transition: all 0.3s ease;
				cursor: pointer;
				text-shadow: 0 0 5px rgba(0, 0, 0, 1);

				&:hover {
					color: #ffcc22;
				}
			}
		}
	}

	.footer {
		position: absolute;
		bottom: -1.5rem;
		left: 5px;
		right: 5px;
		order: 2;
		display: flex;

		> a,
		span {
			display: block;
			transform: translateY(-50%);
			opacity: 0;
			transition: all 0.5s ease;
			margin-right: 10px;
			border-radius: 5px;
		}

		:nth-child(1) {
			cursor: pointer;
			color: #d26;

			&:hover,
			&:active,
			&:visited {
				color: #d26;
			}
		}

		:nth-child(2) {
			color: #666;
			transition-delay: 0.1s;
		}

		:nth-child(3) {
			color: #666;

			transition-delay: 0.2s;
		}
	}

	&:hover {
		.header {
			.top-right-btn-warpper {
				.play-btn {
					opacity: 1;
				}
			}
		}

		.footer {
			> a,
			span {
				opacity: 1;

				transform: translateY(0);
			}
		}
	}
}
</style>