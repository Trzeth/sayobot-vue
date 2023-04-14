<template>
	<div class="preview-card">
		<header class="header">
			<div class="title-artist-warpper">
				<h2 class="title overflow-clip" v-bind:title="title">
					<a @click="detailClick">{{ title }}</a>
				</h2>
				<h3 class="artist overflow-clip" v-bind:title="artist">
					<a @click="artistClick">{{ artist }}</a>
				</h3>
			</div>

			<div class="download-btn-warpper">
				<a
					@click="downloadClick"
					class="iconfont icon-download download-btn"
				>
				</a>
			</div>
		</header>

		<div class="banner">
			<a @click="detailClick">
				<v-img
					:src="previewCardBackgroundSrc"
					aspect-ratio="3.6"
				></v-img>
			</a>
			<div class="left-top-warpper" :class="{ playing: isPlaying }">
				<span class="status">{{ approvedStatus }}</span>
				<span
					class="play-btn iconfont"
					v-bind:class="{
						'icon-caret-right': !isPlaying,
						'icon-pause': isPlaying,
					}"
					@click="playPreviewAudio"
				></span>
			</div>
		</div>

		<footer class="footer">
			<a @click="creatorClick" class="overflow-clip"
				>@{{ beatmapsetInfo.creator }}</a
			>
			<span class="iconfont icon-heart-fill">{{
				beatmapsetInfo.favourite_count
			}}</span>
			<span class="iconfont icon-play-circle-fill">{{
				beatmapsetInfo.play_count
			}}</span>
		</footer>
	</div>
</template>

<script>
import ApiHelper from "../util/api";
import { mapMutations } from "vuex";

export default {
	name: "preview-card",
	props: {
		beatmapsetInfo: Object,
		isPreviewAudioPlaying: Boolean,
	},
	data: function() {
		return {
			isPlaying: false,
			isPrePlaying: null,
		};
	},
	methods: {
		...mapMutations("downloader", ["add"]),
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
					queryMode: "search",
				},
				query: {
					keyword: this.beatmapsetInfo.artist,
					subType: 2,
				},
			});
			this.$gtag.event("Search", {
				event_category: "PreviewCard",
				event_label: "Artist",
			});
		},
		creatorClick() {
			this.$router.push({
				name: "home",
				params: {
					queryMode: "search",
				},
				query: {
					keyword: this.beatmapsetInfo.creator,
					subType: 4,
				},
			});
			this.$gtag.event("Search", {
				event_category: "PreviewCard",
				event_label: "Creator",
			});
		},
		downloadClick() {
			if (this.$ls.get("isPackageDownload") == "true") {
				this.add(this.beatmapsetInfo);
			} else {
				var aEle = document.createElement("a");
				aEle.href = this.downloadLink;
				aEle.download = "";
				aEle.click();
			}

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
				event_label: label,
			});
		},
		detailClick() {
			this.$router.push({
				name: "home",
				params: {
					queryMode: "beatmapset",
					sid: this.beatmapsetInfo.sid,
				},
			});
			this.$emit("stop");
		},
	},
	watch: {
		isPreviewAudioPlaying: function(val) {
			if (val == false && this.isPlaying && !this.isPrePlaying)
				this.isPlaying = false;
			this.isPrePlaying = false;
		},
	},

	computed: {
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
			return ApiHelper.GetDownloadUri(
				this.beatmapsetInfo.sid,
				this.downloadType,
				this.downloadServer
			);
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
		},
	},
};
</script>

<style lang="scss" scoped>
.preview-card-list {
	.preview-card {
		a {
			text-decoration: none;
			color: #000000;
		}

		a:hover,
		a:visited,
		a:active {
			color: #000000;
		}
	}
}

.preview-card {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;

	.overflow-clip {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&::after {
		background: #ffffff;
		content: "";
		position: absolute;
		top: 0;
		bottom: -1rem;
		left: 0;
		right: 0;
		border-radius: 10px;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
		z-index: -1;
		transition: all 0.3s ease;
	}
	&:hover::after {
		bottom: -2rem;
	}

	.header {
		order: 2;
		display: flex;
		align-items: center;
		.title-artist-warpper {
			flex: 1;
			overflow: hidden;
			margin: 5px 0 0 5px;

			.title {
				width: 95%;
				font-size: 1.3rem;
				font-weight: 600;
			}
			.artist {
				width: 95%;
				color: #262626;
				font-size: 1rem;
				font-weight: 400;
				> a::before {
					content: "#";
					opacity: 0;
					margin-left: -1ch;
					transition: all 0.3s ease;
				}
				> a:hover {
					&::before {
						opacity: 1;
						margin-left: 0;
					}
				}
			}
		}

		.download-btn-warpper {
			.download-btn {
				font-size: 2.5rem;
				color: #bfbfbf;
				transition: color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

				&:hover {
					color: #262626;
				}
			}
		}
	}

	.banner {
		order: 1;
		position: relative;
		border-radius: 10px 10px 0 0;
		overflow: hidden;
		.left-top-warpper {
			position: absolute;
			left: 5px;
			top: 5px;

			&.playing {
				.status {
					opacity: 0 !important;
				}
				.play-btn {
					opacity: 1 !important;
				}
			}

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
		order: 3;
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
		.banner {
			.left-top-warpper {
				.status {
					opacity: 0;
				}
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
