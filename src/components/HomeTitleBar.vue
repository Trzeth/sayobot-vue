<template>
	<v-row no-gutters align="center">
		<v-col cols="6">
			<search-bar class="ml-6" v-on:search="OnSearch"></search-bar>
		</v-col>
		<v-col cols="2">
			<v-spacer></v-spacer>
		</v-col>
		<v-hover>
			<template v-slot:default="{ hover }">
				<v-col cols="4">
					<v-alert class="ma-0" type="info" dark outlined>
						<span class="d-block text-truncate">
							今天早上一个不规范的请求……把跳转程序搞炸了……来自Google
							bot
						</span>
						<v-fade-transition>
							<v-overlay v-if="hover" absolute color="white">
								<v-btn color="info"
									>查看详情<v-icon right
										>mdi-open-in-new</v-icon
									></v-btn
								>
							</v-overlay>
						</v-fade-transition>
					</v-alert>
				</v-col>
			</template>
		</v-hover>
	</v-row>
</template>

<script>
import SearchBar from "./SearchBar.vue";

export default {
	name: "home-title-bar",
	components: { SearchBar },
	methods: {
		OnSearch(val) {
			this.$emit("search", val);
		}
	}
};
</script>

<style>
.v-alert__content {
	overflow: hidden;
}
</style>
