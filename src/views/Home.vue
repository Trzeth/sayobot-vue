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
						v-on:search="search"
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
					<v-tabs
						align-with-title
						v-show="!isCurrentViewOpen"
						v-model="tabNum"
					>
						<v-tab v-for="(tab, index) in tabs" :key="index">
							<v-icon v-if="tab.type == 4" left
								>mdi-feature-search</v-icon
							>
							{{ tab.key ? tab.key : "Untitle" }}
							<v-btn
								class="mr-n2 ml-2"
								x-small
								icon
								v-if="tab.type == 4"
								v-on:click.stop="closeTab(index)"
							>
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</v-tab>
					</v-tabs>
				</v-slide-x-reverse-transition>
			</template>
		</v-app-bar>

		<preview-card-list
			:beatmapsetList="tabs[tabNum].data"
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

			tabNum: 0,
			tabs: [
				{ key: "最新谱面", type: 2, data: [], yOffset: 0 },
				{ key: "热门谱面", type: 1, data: [], yOffset: 0 }
			],
			notices: []
		};
	},
	methods: {
		search(val) {
			var v = {
				key: null,
				data: [],
				optine: [],
				type: 4,
				yOffset: 0
			};

			var last = val[val.length - 1];
			if (last.mode == -1) {
				v.key = last.key;
			}

			val.forEach(e => {
				if (e.mode != -1) v.optine.push(e);
			});

			this.tabs.push(v);

			//还有最新谱面与热门谱面
			this.tabNum = this.tabs.length - 1;
		},
		closeDetailView() {
			this.isCurrentViewOpen = false;
			this.$router.go(-1);
		},
		closeTab(val) {
			this.tabs.splice(val, 1);
			tabNum--;
		},
		updateData() {
			if (this.isUpdated == true) {
				this.isUpdated = false;
				this.offset += this.limit;
				axios
					.get(
						this.toUri(
							this.tabs[this.tabNum],
							this.limit,
							this.offset
						)
					)
					.then(newData => {
						this.tabs[this.tabNum].data = this.tabs[
							this.tabNum
						].data.concat(newData.data.data);

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
			uri += "2=" + params.type;
			if (params.type == 4) {
				var optine = params.optine;
				uri += "&";
				uri += "3=" + params.key;
				var temp = 0;
				temp = this.sum(optine.subType);
				uri += temp ? "&4=" + temp : "";
				temp = this.sum(optine.mode);
				uri += temp ? "&5=" + temp : "";
				temp = this.sum(optine.class);
				uri += temp ? "&6=" + temp : "";
				temp = this.sum(optine.genre);
				uri += temp ? "&7=" + temp : "";
				temp = this.sum(optine.language);
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
		tabNum: {
			immediate: true,
			handler: function(val, pre) {
				if (pre) this.tabs[pre].yOffset = window.pageYOffset;

				if (this.tabs[val].data.length == 0) {
					axios
						.get(this.toUri(this.tabs[val], this.limit))
						.then(response => {
							console.log(val);

							this.tabs[val].data = response.data.data;
							this.isUpdated = true;
						});
				}

				this.$vuetify.goTo(this.tabs[val].yOffset);
			}
		},
		"$route.params.queryMode": {
			immediate: true,
			handler: function() {}
		},
		"$route.query": {
			immediate: true,
			deep: true,
			handler: function() {}
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
