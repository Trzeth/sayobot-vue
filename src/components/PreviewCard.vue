<template>
	<div class="preview-card">
		<header class="header">
			<div class="title-artist-warpper">
				<h2 class="title overflow-clip" v-bind:title="title">
					<router-link v-bind:to="beatmapsetInfoLink">{{
						title
					}}</router-link>
				</h2>
				<h3 class="artist overflow-clip" v-bind:title="artist">
					<router-link v-bind:to="searchArtistLink">{{
						artist
					}}</router-link>
				</h3>
			</div>

			<div class="download-btn-warpper" v-on:click.stop>
				<a
					class="iconfont icon-download download-btn"
					v-bind:href="downloadLink"
				></a>
			</div>
		</header>

		<div class="banner">
			<router-link v-bind:to="beatmapsetInfoLink">
				<img v-bind:src="previewCardBackgroundSrc" />
			</router-link>
			<div class="left-top-warpper">
				<span class="status">{{ approvedStatus }}</span>
				<span
					class="play-btn iconfont"
					v-bind:class="{
						'icon-caret-right': !isPreviewAudioPlaying,
						'icon-pause': isPreviewAudioPlaying
					}"
					@click="playPreviewAudio"
				></span>

				<audio ref="preview" preload="none">
					<source v-bind:src="previewAudioSrc" type="audio/mp3" />
				</audio>
			</div>
		</div>
		<footer class="footer">
			<router-link v-bind:to="searchCreatorLink" class="overflow-clip"
				>@{{ beatmapsetInfo.creator }}</router-link
			>
			<span class="iconfont icon-heart-fill">{{
				beatmapsetInfo.favourite_count
			}}</span>
			<span class="iconfont icon-play-circle-fill">{{
				beatmapsetInfo.order
			}}</span>
		</footer>
	</div>
</template>

<script>
export default {
	name: "preview-card",
	props: {
		beatmapsetInfo: Object,
		isUnicode: Boolean,
		useCDN: Boolean
	},
	data: function() {
		return {
			isPreviewAudioPlaying: false
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
		}
	},
	localStorage: {
		volume: {
			type: Number,
			default: 1.0
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
		previewAudioSrc: function() {
			var src = "https://cdn.sayobot.cn:25225/preview/${sid}.mp3";
			src = src.replace("${sid}", this.beatmapsetInfo.sid);
			return src;
		},
		beatmapsetInfoLink: function() {
			return "beatmapset?sid=" + this.beatmapsetInfo.sid;
		},
		searchArtistLink: function() {
			return "search?keyword=" + this.beatmapsetInfo.artist;
		},
		searchCreatorLink: function() {
			return "search?keyword=" + this.beatmapsetInfo.creator;
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
			var uri =
				"https://txy1.sayobot.cn/download/osz/" +
				this.beatmapsetInfo.sid;
			if (this.useCDN == true) {
				uri += "?server=CDN";
			}
			return uri;
		},
		previewCardBackgroundSrc: function() {
			var src =
				"https://cdn.sayobot.cn:25225/beatmaps/${sid}/covers/cover.jpg";
			return src.replace("${sid}", this.beatmapsetInfo.sid);
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
		a {
			text-decoration: none;
			color: rgba(0, 0, 0, 0.5);
			text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
				font-style: italic;
			}
			.artist {
				width: 95%;
				color: #262626;
				font-size: 1rem;
				font-weight: 400;
				font-style: italic;
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
		padding-top: 28%;
		height: 0;
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

		img {
			position: absolute;
			width: 100%;
			height: auto;
			top: 0;
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

@media screen and (max-width: 480px) {
	.preview-card {
	}
}
</style>
