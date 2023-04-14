<template>
	<v-row no-gutters align="center" class="fill-height">
		<v-col cols="12" md="6">
			<v-row class="fill-height flex-nowrap" style="max-height:100%">
				<v-btn class="d-md-none" @click="$emit('toggle-sidebar')" icon
					><v-icon>mdi-menu</v-icon></v-btn
				>
				<search-bar
					class="ml-2 ml-md-6 mr-4 mr-md-0"
					v-on:search="OnSearch"
				></search-bar>
			</v-row>
		</v-col>
		<v-col cols="0" md="1">
			<v-spacer></v-spacer>
		</v-col>
		<v-col md="1" class="d-none d-md-block">
			<downloader></downloader>
		</v-col>
		<v-col cols="4" class="d-none d-md-flex">
			<notice-bar></notice-bar>
		</v-col>
	</v-row>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import NoticeBar from "./NoticeBar";
import Downloader from "./Downloader";

export default {
	name: "home-title-bar",
	components: { SearchBar, NoticeBar, Downloader },
	methods: {
		OnSearch(val) {
			this.$emit("search", val);
		},
	},
};
</script>
