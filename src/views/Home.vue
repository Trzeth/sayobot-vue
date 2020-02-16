<template>
	<div>
		<v-app-bar
			:color="!isCurrentViewOpen ? 'white' : 'transparent'"
			light
			app
			:flat="isCurrentViewOpen"
			elevate-on-scroll
		>
			<v-slide-x-reverse-transition mode="out-in">
				<keep-alive>
					<home-title-bar
						v-if="!isCurrentViewOpen"
						key="main"
					></home-title-bar>
					<detail-title-bar
						v-else
						key="detail"
						v-on:back="closeDetailView"
					></detail-title-bar>
				</keep-alive>
			</v-slide-x-reverse-transition>

			<template v-slot:extension>
				<v-slide-x-reverse-transition>
					<v-tabs align-with-title v-show="!isCurrentViewOpen">
						<v-tab>最新谱面</v-tab>
						<v-tab>热门谱面</v-tab>
						<v-tab>
							<v-icon left>mdi-feature-search</v-icon>
							Miku
						</v-tab>
					</v-tabs>
				</v-slide-x-reverse-transition>
			</template>
		</v-app-bar>

		<preview-card-list
			:beatmapsetList="beatmapsetList"
			v-on:reach-bottom="updateData"
		></preview-card-list>

		<v-slide-x-reverse-transition>
			<side-drawer v-show="isCurrentViewOpen">
				<detail-view
					:isOpen="isCurrentViewOpen"
					:optine="popupViewOptine"
				></detail-view>
			</side-drawer>
		</v-slide-x-reverse-transition>
	</div>
</template>

<script>
import axios from "axios";

/* Components */
import PreviewCardList from "@/components/PreviewCardList";
import DetailView from "@/components/DetailView.vue";
import HomeTitleBar from "@/components/HomeTitleBar.vue";
import DetailTitleBar from "@/components/DetailTitleBar.vue";
import SideDrawer from "@/components/SideDrawer";

export default {
	name: "Home",
	components: {
		PreviewCardList,
		DetailView,
		HomeTitleBar,
		DetailTitleBar,
		SideDrawer
	},
	data: function() {
		return {
			isUpdated: false,
			isCurrentViewOpen: false,
			popupViewOptine: null,
			limit: 24,
			offset: 0,
			//Binding to SearchBar changed with input
			searchOptine: {
				keyword: "",
				subType: [],
				mode: [],
				class: [],
				genre: [],
				language: [],
				other: ""
			},
			//Current View SearchOptine
			current: {
				mode: "",
				searchOptine: {}
			},
			beatmapsetList: [],
			notices: []
		};
	},
	methods: {
		closeDetailView() {
			this.isCurrentViewOpen = false;
			this.$router.go(-1);
		},
		updateData() {
			if (this.isUpdated == true) {
				this.isUpdated = false;
				this.offset += this.limit;
				axios
					.get(this.toUri(this.current, this.limit, this.offset))
					.then(newData => {
						this.beatmapsetList = this.beatmapsetList.concat(
							newData.data.data
						);
						this.isUpdated = true;
					});
			}
		},
		toUri(params, limit, offset = 0) {
			var host = "https://api.sayobot.cn";
			var uri = host + "/beatmaplist";
			uri += "?0=" + limit;
			uri += "&";
			uri += "1=" + offset;
			uri += "&";
			uri += "2=" + params.mode;
			if (params.mode == 4) {
				var searchOptine = params.searchOptine;
				uri += "&";
				uri += "3=" + searchOptine.keyword;
				var temp = 0;
				temp = this.sum(searchOptine.subType);
				uri += temp ? "&4=" + temp : "";
				temp = this.sum(searchOptine.mode);
				uri += temp ? "&5=" + temp : "";
				temp = this.sum(searchOptine.class);
				uri += temp ? "&6=" + temp : "";
				temp = this.sum(searchOptine.genre);
				uri += temp ? "&7=" + temp : "";
				temp = this.sum(searchOptine.language);
				uri += temp ? "&8=" + temp : "";
				// To do other paramer
			}
			return uri;
		},
		sum(params) {
			var sum = 0;
			if (params != null) {
				params.forEach(element => {
					sum += Number(element);
				});
			}
			return sum;
		}
	},
	watch: {
		"$route.params.queryMode": {
			immediate: true,
			handler: function() {
				switch (this.$route.params.queryMode) {
					case "hot":
						//判定是否相等 防止视图刷新
						//Finding a better way to detail with
						this.isCurrentViewOpen = false;
						this.current.mode == 1 ? 0 : (this.current.mode = 1);
						break;
					case "new":
						this.isCurrentViewOpen = false;
						this.current.mode == 2 ? 0 : (this.current.mode = 2);
						break;
					case "search":
						this.isCurrentViewOpen = false;
						//Watch by "$route.query"
						break;
					case "beatmapset":
						//Handled by "$route.query"
						break;
				}
			}
		},
		"$route.query": {
			immediate: true,
			deep: true,
			handler: function() {
				//Only watch search mode
				if (this.$route.params.queryMode == "search") {
					var query = this.$route.query;
					//Finding a better way to detail with
					//防止触发页面刷新
					//console.log(this.current.mode);
					//console.log(this.searchOptine.keyword);
					//console.log(query.keyword);
					if (
						this.current.mode != 4 ||
						this.current.searchOptine.keyword != query.keyword
					) {
						this.current.mode = 4;
						this.searchOptine.keyword = query.keyword;
						this.current.searchOptine = this._.clone(
							this.searchOptine
						);
					}
				}
				if (this.$route.params.queryMode == "beatmapset") {
					var query = this.$route.query;
					this.popupViewOptine = { sid: query.sid };
					this.isCurrentViewOpen = true;
				}
			}
		},
		current: {
			immediate: true,
			deep: true,
			handler: function() {
				axios
					.get(this.toUri(this.current, this.limit))
					.then(response => {
						this.beatmapsetList = response.data.data;
						this.isUpdated = true;
					});
			}
		}
	},
	created: function() {
		axios.get("https://api.sayobot.cn/static/notice").then(response => {
			this.notices = response.data.data[0];
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

<style></style>
