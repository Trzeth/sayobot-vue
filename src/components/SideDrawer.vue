<template>
	<div
		:style="{
			left: left + 'px',
			top: top,
			bottom: bottom,
			right: right,
			position: 'fixed'
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
		}
	}
};
</script>

<style></style>
