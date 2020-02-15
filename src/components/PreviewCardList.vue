<template>
	<div class="preview-card-list-warpper grey lighten-4">
		<div class="preview-card-list">
			<preview-card
				v-for="beatmapset in beatmapsetList"
				v-bind:key="beatmapset.sid"
				v-bind:beatmapsetInfo="beatmapset"
				v-bind:isUnicode="isUnicode"
				v-bind:useCDN="useCDN"
			></preview-card>
			<div class="preview-card-skeleton" v-intersect="OnIntersect">
				<v-skeleton-loader
					type="image"
					style="height:0;padding-top: 28%;position: relative;"
				></v-skeleton-loader>
				<v-skeleton-loader
					type="heading"
					style="margin:15px 5px 10px 5px"
				></v-skeleton-loader>
				<v-skeleton-loader
					type="text"
					style="margin:12px 5px 0 5px"
				></v-skeleton-loader>
			</div>
		</div>
	</div>
</template>

<script>
import PreviewCard from "./PreviewCard";

export default {
	name: "preview-card-list",
	components: {
		PreviewCard
	},
	localStorage: {
		isUnicode: {
			type: Boolean,
			default: false
		},
		useCDN: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		OnIntersect(entries, observer) {
			if (entries[0].isIntersecting == true) this.$emit("reach-bottom");
		}
	},
	props: ["beatmapsetList"]
};
</script>
<style lang="scss">
.preview-card-list {
	.preview-card-skeleton {
		position: relative;
		width: 100%;
		height: 100%;
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
		}
	}
	.v-skeleton-loader--is-loading {
		overflow: visible;
	}
	.v-skeleton-loader__image {
		height: 100%;
		position: absolute;
		width: 100%;
		top: 0;
		border-radius: 10px 10px 0 0;
	}
	.v-skeleton-loader__heading {
		border-radius: 4px;
		width: 50%;
	}
	.v-skeleton-loader__text {
		border-radius: 2px;
		width: 80%;
	}
}
.preview-card-list-warpper {
	padding: 3rem 2rem;
	.preview-card-list {
		position: relative;
		z-index: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		align-items: start;
		grid-gap: 3rem 3rem;
	}
}
</style>
