<template>
	<div>
		<v-app-bar color="white" light app elevate-on-scroll>
			<v-text-field
				flat
				solo-inverted
				hide-details
				prepend-inner-icon="mdi-magnify"
				label="Search"
				class="hidden-sm-and-down ml-6"
			/>
			<v-spacer></v-spacer>

			<v-hover>
				<template v-slot:default="{ hover }">
					<v-alert class="ma-0" type="info" dark outlined>
						今天早上一个不规范的请求……把跳转程序搞炸了……来自Google
						bot
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
				</template>
			</v-hover>
			<template v-slot:extension>
				<v-tabs align-with-title>
					<v-tab>最新谱面</v-tab>
					<v-tab>热门谱面</v-tab>
					<v-tab>
						<v-icon left>mdi-feature-search</v-icon>
						Miku
					</v-tab>
				</v-tabs>
			</template>
		</v-app-bar>
		<preview-card-list
			v-bind:beatmapsetList="beatmapsetList"
			v-on:reach-bottom="updateData"
		></preview-card-list>

		<v-navigation-drawer
			v-model="isCurrentViewOpen"
			app
			temporary
			right
			width="60%"
		>
			<detail-crad
				v-bind:is="currentView"
				v-bind:isOpen.sync="isCurrentViewOpen"
				v-bind:optine="popupViewOptine"
			></detail-crad>
		</v-navigation-drawer>
	</div>
</template>

<script>
import axios from "axios";

/* Components */
import PreviewCardList from "@/components/PreviewCardList";
import DetailCard from "@/components/popupViews/DetailCard.vue";

export default {
	name: "Home",
	components: {
		PreviewCardList,
		DetailCard
	},
	data: function() {
		return {
			hover: false,
			isAlertVisible: false,
			isUpdated: false,
			isCurrentViewOpen: false,
			currentView: null,
			popupViewOptine: null,
			support: {
				total: 0,
				target: 0,
				percentage: 0
			},
			isFirstView: true,
			navFixed: false,
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
			notices: [],
			isPullUpLoad: false,
			isHeaderScroll: 0
		};
	},
	methods: {
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
		isCurrentViewOpen: {
			handler: function() {
				if (this.isCurrentViewOpen == false) this.$router.go(-1);
			}
		},
		"$route.params.queryMode": {
			immediate: true,
			handler: function() {
				switch (this.$route.params.queryMode) {
					case "hot":
						//判定是否相等 防止视图刷新
						//Finding a better way to detail with
						this.current.mode == 1 ? 0 : (this.current.mode = 1);
						break;
					case "new":
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
					this.currentView = "detail-card";
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
		axios.get("https://api.sayobot.cn/static/support").then(response => {
			var data = response.data.data;
			this.support.total = data.total;
			this.support.target = data.target;
			this.support.percentage =
				(this.support.total / this.support.target) * 100;
		});
	}
};
</script>

<style></style>
