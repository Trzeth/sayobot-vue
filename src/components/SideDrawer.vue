<template>
	<div
		:style="{
			background: color,
			left: left + 'px',
			top: top,
			bottom: bottom,
			right: right,
			position: 'fixed',
			overflow: 'auto'
		}"
	>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "side-drawer",
	props: {
		left: {
			type: Number,
			default: 256
		},
		top: {
			type: Number,
			default: 0
		},
		bottom: {
			type: Number,
			default: 0
		},
		right: {
			type: Number,
			default: 0
		},
		color: {
			type: String,
			default: "#ffffff"
		}
	}
};
</script>

<style></style>
