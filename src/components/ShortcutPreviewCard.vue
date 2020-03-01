<template>
	<div
		class="preview-card"
		@mousemove="showOrHideFunc"
		@click="detailClick"
		@mouseout="
			isPreviewCardBackgroundShow = isHeaderShow = true;
			isDetailShow = false;
		"
		:style="{ backgroundImage: previewCardBackgroundSrc }"
	>
		<div class="header" v-if="isHeaderShow">
			<a class="title-artist-warpper">
				<span class="status">{{ approvedStatus }}</span>
				<h2 class="beatmap-title overflow-clip" v-bind:title="title">
					<a @click.stop="detailClick">{{ title }}</a>
				</h2>
				<h3 class="beatmap-artist overflow-clip" v-bind:title="artist">
					<a @click.stop="artistClick">{{ artist }}</a>
				</h3>
				<h3 class="beatmap-lastupdate overflow-clip">
					{{ lastupdate }}
				</h3>
				<h3 class="beatmap-creator overflow-clip" v-bind:title="artist">
					<a @click.stop="creatorClick" class="overflow-clip"
						>@{{ beatmapsetInfo.creator }}</a
					>
				</h3>
			</a>
			<div class="top-right-btn-warpper">
				<span
					class="iconfont play-btn"
					v-bind:class="{
						'icon-caret-right': !isPreviewAudioPlaying,
						'icon-pause': isPreviewAudioPlaying
					}"
					@click.stop="playPreviewAudio"
				></span>
				<a
					class="iconfont icon-download download-btn"
					@click.stop="downloadClick"
					v-bind:href="downloadLink"
				></a>
			</div>
			<ul class="bottom-right-btn-warpper">
				<li :title="'收藏数：' + beatmapsetInfo.favourite_count">
					{{ beatmapsetInfo.favourite_count }}
					<span class="iconfont icon-heart-fill"></span>
				</li>
				<li :title="'这张图被游玩了 ' + beatmapsetInfo.order + ' 次'">
					{{ beatmapsetInfo.order }}
					<span class="iconfont icon-play-circle-fill"></span>
				</li>
			</ul>
		</div>
		<div class="detail" v-if="isDetailShow">
			<div v-if="isBeatmapsetInfoDetailGotIt == false">加载中...</div>
			<div v-if="isBeatmapsetInfoDetailGotIt == true">
				<div class="title-artist-warpper">
					<h3
						class="beatmap-artist overflow-clip"
						v-bind:title="
							beatmapsetInfoDetail.bid_data[
								beatmapsetInfoDetailBidIndex
							].version
						"
					>
						难度名:&nbsp;{{
							beatmapsetInfoDetail.bid_data[
								beatmapsetInfoDetailBidIndex
							].version
						}}
					</h3>
					<h3
						class="beatmap-artist overflow-clip"
						v-bind:title="beatmapsetInfoDetail.bpm"
					>
						bpm:&nbsp;{{ beatmapsetInfoDetail.bpm }}
					</h3>
					<h3
						class="beatmap-artist overflow-clip"
						v-bind:title="
							beatmapsetInfoDetail.bid_data[
								beatmapsetInfoDetailBidIndex
							].AR
						"
					>
						AR:&nbsp;{{
							beatmapsetInfoDetail.bid_data[
								beatmapsetInfoDetailBidIndex
							].AR
						}}
					</h3>
					<h3
						class="beatmap-artist overflow-clip"
						v-bind:title="
							beatmapsetInfoDetail.bid_data[
								beatmapsetInfoDetailBidIndex
							].star
						"
					>
						难度:&nbsp;{{
							Math.round(
								beatmapsetInfoDetail.bid_data[
									beatmapsetInfoDetailBidIndex
								].star * 100
							) / 100
						}}
					</h3>
				</div>
				<div class="bottom-btn-warpper">
					<div
						class="iconfont icon-heart-fill"
						v-for="(bid_data,
						bid_dataIndex) in beatmapsetInfoDetail.bid_data"
						:key="bid_dataIndex"
						:title="bid_data.version"
						@click.stop="
							beatmapsetInfoDetailBidIndex = bid_dataIndex
						"
					></div>
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
		beatmapsetInfo: Object,
		isPreviewAudioPlaying: Boolean
	},
	data: function() {
		return {
			beatmapsetInfoDetail: {},
			isBeatmapsetInfoDetailGetting: false,
			isBeatmapsetInfoDetailGotIt: false,
			beatmapsetInfoDetailBidIndex: 0,
			isPreviewCardBackgroundShow: true,
			isHeaderShow: true,
			isDetailShow: false,

			isPlaying: false,
			isPrePlaying: null
		};
	},
	methods: {
		playPreviewAudio() {
			if (this.isPlaying) {
				this.$emit("stop");
				this.isPlaying = false;
			} else {
				this.isPrePlaying = this.isPreviewAudioPlaying;
				this.$emit("play", this.beatmapsetInfo.sid);
				this.isPlaying = true;
			}
		},
		artistClick() {
			this.$router.push({
				name: "home",
				params: {
					queryMode: "search"
				},
				query: {
					keyword: this.beatmapsetInfo.artist,
					subType: 2
				}
			});
			this.$gtag.event("Search", {
				event_category: "PreviewCard",
				event_label: "Artist"
			});
		},
		creatorClick() {
			this.$router.push({
				name: "home",
				params: {
					queryMode: "search"
				},
				query: {
					keyword: this.beatmapsetInfo.creator,
					subType: 4
				}
			});
			this.$gtag.event("Search", {
				event_category: "PreviewCard",
				event_label: "Creator"
			});
		},
		downloadClick() {
			var label = null;
			switch (this.downloadType) {
				case 0:
					label = "Normal";
					break;
				case 1:
					label = "WithoutVideoLink";
					break;
				case 2:
					label = "MINI";
					break;
			}
			this.$gtag.event("Download", {
				event_category: "PreviewCard",
				event_label: label
			});
		},
		detailClick() {
			this.$router.push({
				name: "home",
				params: {
					queryMode: "beatmapset",
					sid: this.beatmapsetInfo.sid
				}
			});
			this.$emit("stop");
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
				if (
					this.isBeatmapsetInfoDetailGotIt == false &&
					this.isBeatmapsetInfoDetailGetting == false
				) {
					this.isBeatmapsetInfoDetailGetting = true;

					axios
						.get(ApiHelper.GetBeatmapInfo(this.beatmapsetInfo.sid))
						.then(response => {
							if (response.data.status == -1) {
								this.beatmapsetDetail = { bid_data: [] };
								this.PushMessage("未找到 Beatmap", "error", 0);
								return;
							}
							this.beatmapsetInfoDetail = response.data.data;
							this.isBeatmapsetInfoDetailGotIt = true;
						});
				}
				return true;
			} else {
				return false;
			}
		}
	},
	watch: {
		isPreviewAudioPlaying: function(val) {
			if (val == false && this.isPlaying && !this.isPrePlaying)
				this.isPlaying = false;
			this.isPrePlaying = false;
		}
	},
	computed: {
		lastupdate: function() {
			var a = new Date(this.beatmapsetInfo.lastupdate * 1000);
			return (
				a.getUTCFullYear() +
				"年" +
				(a.getUTCMonth() + 1) +
				"月" +
				a.getUTCDate() +
				"日"
			);
		},
		downloadLink: function() {
			return ApiHelper.GetDownloadUri(
				this.beatmapsetInfo.sid,
				this.downloadType,
				this.downloadServer
			);
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
		previewCardBackgroundSrc: function() {
			return (
				"url(" +
				ApiHelper.GetPreviewBackgroundUri(this.beatmapsetInfo.sid) +
				")"
			);
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
		},
		//local storage
		isUnicode: function() {
			return this.$ls.get("isUnicode");
		},
		downloadType: function() {
			return this.$ls.get("downloadType");
		},
		downloadServer: function() {
			return this.$ls.get("downloadServer");
		}
	}
};
</script>

<style lang="scss" scoped>
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
				border-radius: 50%;
				padding: 2px;
				transition: background-color 0.5s
					cubic-bezier(0.075, 0.82, 0.165, 1);

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
}
</style>
