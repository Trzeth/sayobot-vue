<template>
	<div class="setting">
		<div class="setting-page">
			<h2>设置</h2>

			<div class="selection">
				<v-switch v-model="isUnicode">
					<template v-slot:label>
						<label
							class="title"
							:class="
								(isUnicode && 'black--text') || 'grey--text'
							"
							>使用 Unicode 标题</label
						>
					</template>
				</v-switch>
			</div>
			<div class="selection">
				<v-switch v-model="useCDN">
					<template v-slot:label>
						<label
							class="title"
							:class="(useCDN && 'black--text') || 'grey--text'"
							>使用CDN加速</label
						>
					</template>
				</v-switch>
			</div>
			<div class="selection">
				<v-switch v-model="isAutoSelet" disabled>
					<template v-slot:label>
						<label
							class="title"
							:class="
								(isAutoSelet && 'black--text') || 'grey--text'
							"
							>自动选择最适合难度</label
						>
					</template>
				</v-switch>
				<span class="note">打开图谱面板后，符合条件的图谱</span>
			</div>
			<div class="selection">
				<label class="title" for="is-auto-select-checkbox"
					>调整预览音频声音</label
				>
				<span class="note">调整后将在网站全局生效</span>
				<v-slider
					min="0"
					max="1"
					step="0.01"
					v-model="volume"
					thumb-label
				></v-slider>
			</div>
		</div>

		<div class="about-page">
			<h2>关于</h2>

			<p>
				Sayobot.cn是全球最大、地图存储量最多（超过2000GB）的第三方osu!镜像站，
				致力于为广大玩家提供osu!周边的服务，包括但不限于osu!地图的搜索下载、提供osu!外设（小键盘和数位板）、图包&皮肤分享/下载、osu!
				QQ机器人等。本网站由_BlackC（夜麻麻）和 SoulDee & Trzeth
				等人共同维护（SoulDee & Trzeth：_BlackC你的API又双叒叕炸掉了）
			</p>

			<h2>Alpha Test Version -- Start at 2019.8</h2>
			<h2>
				Source:
				<a href="https://github.com/Trzeth/sayobot-vue"
					>@Trzeth/sayobot-vue</a
				>
			</h2>
		</div>
	</div>
</template>

<script>
export default {
	name: "setting",
	localStorage: {
		isUnicode: {
			type: Boolean,
			default: false
		},
		isAutoSelet: {
			type: Boolean,
			default: false
		},
		useCDN: {
			type: Boolean,
			default: false
		},
		volume: {
			type: Number,
			default: 1.0
		}
	}
};
</script>

<style lang="scss">
.setting {
	> div {
		padding: 20px;
	}
	h2 {
		font-size: 1.5rem;
		font-weight: 400;
	}
	.selection {
		margin: 10px 0 0 5px;
		padding-left: 20px;

		input[type="checkbox"] {
			float: left;
			margin: 5px 0 0 -20px;
		}
		.title {
			font-size: 1.2rem;
			font-weight: 500;
		}
		.note {
			font-size: 1rem;
			font-weight: 500;
			margin-top: 2px;
			display: block;
		}
	}

	.about-page {
		margin-top: 20px;

		p {
			margin-top: 10px;
			text-indent: 2rem;
			line-height: 2rem;
		}
	}
}
</style>
