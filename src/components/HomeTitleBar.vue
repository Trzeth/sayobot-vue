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
		<v-col cols="0" md="2">
			<v-spacer></v-spacer>
		</v-col>
		<v-col cols="4" class="d-none d-md-flex">
			<v-menu open-on-hover>
				<template v-slot:activator="{ on }">
					<template>
						<v-sheet v-on="on" style="overflow:hidden">
							<v-alert
								class="ma-0"
								:type="
									notices
										? types[notices[0].importance]
										: null
								"
								dark
								outlined
							>
								<span class="d-block text-truncate">
									{{ notices ? notices[0].content : "" }}
								</span>
							</v-alert>
						</v-sheet>
					</template>
				</template>

				<v-list>
					<v-subheader>公告栏</v-subheader>
					<template v-for="(notice, index) in notices">
						<v-divider
							:key="'d' + index"
							v-if="index != 0"
						></v-divider>
						<v-list-item :key="index">
							<v-list-item-content>
								<v-row no-gutters justify="space-between">
									<h2 class="title">{{ notice.title }}</h2>
									<v-icon :color="types[notice.importance]">{{
										icons[notice.importance]
									}}</v-icon>
								</v-row>
								<p class="body-1 my-1">{{ notice.content }}</p>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list>
			</v-menu>
		</v-col>
	</v-row>
</template>

<script>
import axios from "axios";

import SearchBar from "./SearchBar.vue";

export default {
	name: "home-title-bar",
	components: { SearchBar },
	data: function() {
		return {
			notices: null,
			icons: [
				"mdi-information",
				"mdi-exclamation",
				"mdi-alert",
				"mdi-check-circle"
			],
			types: ["info", "warning", "error", "success"]
		};
	},
	methods: {
		OnSearch(val) {
			this.$emit("search", val);
		}
	},
	mounted: function() {
		axios.get("https://api.sayobot.cn/static/notice").then(response => {
			this.notices = response.data.data;
		});

		// axios.get("https://api.sayobot.cn/static/support").then(response => {
		// 	var data = response.data.data;
		// 	this.support.total = data.total;
		// 	this.support.target = data.target;
		// 	this.support.percentage =
		// 		(this.support.total / this.support.target) * 100;
		// });
	}
};
</script>

<style>
.v-alert__content {
	overflow: hidden;
}
.v-menu__content {
	max-width: 0;
	max-height: 50%;
}
</style>
