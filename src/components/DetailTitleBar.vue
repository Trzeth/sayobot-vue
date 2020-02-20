<template>
	<v-row no-gutters align="center">
		<v-btn v-on:click="$emit('back')" icon large light
			><v-icon>mdi-chevron-left</v-icon></v-btn
		>
		<v-label light>{{ title }}</v-label>
	</v-row>
</template>

<script>
export default {
	name: "detail-title-bar",
	props: ["title"]
};
</script>

<style></style>
