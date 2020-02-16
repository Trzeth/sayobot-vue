<template>
	<v-row class="ma-0" align="center">
		<v-btn v-on:click="$emit('back')" icon large
			><v-icon>mdi-chevron-left</v-icon></v-btn
		>
	</v-row>
</template>

<script>
export default {
	name: "detail-title-bar"
};
</script>

<style></style>
