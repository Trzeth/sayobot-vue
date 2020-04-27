<template>
	<div>
		<v-app-bar
			:color="!isCurrentViewOpen ? 'white' : 'transparent'"
			:flat="isCurrentViewOpen"
			height="64"
			light
			app
			elevate-on-scroll
		>
			<v-slide-x-reverse-transition mode="out-in">
				<keep-alive>
					<home-title-bar
						v-if="!isCurrentViewOpen"
						key="main"
						@search="search"
						@toggle-sidebar="
							$emit('update:isDrawerOpen', !isDrawerOpen)
						"
					></home-title-bar>
					<detail-title-bar
						v-else
						key="detail"
						@back="closeDetailViewAndBack"
						:title="detailViewOptine.sid"
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
							{{ tab.keyword ? tab.keyword : "Untitle" }}
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
			:end="tabs[tabNum].end"
			v-on:reach-bottom="updateData"
		></preview-card-list>

		<v-slide-x-reverse-transition>
			<side-drawer v-show="isCurrentViewOpen" :left="sideDrawerLeft">
				<detail-view
					:isOpen="isCurrentViewOpen"
					:optine="detailViewOptine"
					@back="closeDetailViewAndBack"
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
		SideDrawer,
	},
	props: ["isDrawerOpen", "isDrawerMini"],
	data: function() {
		return {
			isUpdated: false,
			isCurrentViewOpen: false,
			detailViewOptine: null,

			limit: 24,
			preTabNum: 0,
			tabNum: 0,
			tabs: [
				{
					keyword: "最新谱面",
					type: 2,
					data: [],
					yOffset: 0,
					offset: 0,
					end: false,
				},
				{
					keyword: "热门谱面",
					type: 1,
					data: [],
					yOffset: 0,
					offset: 0,
					end: false,
				},
			],
			notices: [],
		};
	},
	computed: {
		sideDrawerLeft() {
			if (!this.isDrawerOpen || this.isSm) return 0;
			if (this.isDrawerMini) return 56;
			return 256;
		},
		isSm() {
			switch (this.$vuetify.breakpoint.name) {
				case "xs":
				case "sm":
					return true;
				case "md":
				case "lg":
				case "xl":
					return false;
				default:
					return false;
			}
		},
	},
	watch: {
		"$route.params": {
			immediate: true,
			handler: function(val) {
				var queryMode = val.queryMode;
				if (!queryMode) {
					this.$router.replace({
						name: "home",
						params: {
							queryMode: "new",
						},
					});
					return;
				}
				var query = this.$route.query;

				switch (queryMode) {
					case "new":
						this.closeDetailView();

						this.tabNum = 0;
						break;
					case "hot":
						this.closeDetailView();

						this.tabNum = 1;
						break;
					case "search":
						this.closeDetailView();

						if (
							!query.subType &&
							!query.mode &&
							!query.class &&
							!query.other &&
							!query.keyword
						) {
							if (this.tabs.length == 2)
								this.$router.replace({
									name: "home",
									params: {
										queryMode: "new",
									},
								});
						} else {
							this.search(query);
							this.$router.replace({
								name: "home",
								params: {
									queryMode: "search",
								},
							});
						}
						break;
					case "beatmapset":
						//??? 浏览器输入时为 字符串 push 为 bool
						if (query && (query.bid == "true" || query.bid)) {
							this.detailViewOptine = {
								sid: null,
								bid: val.sid,
							};
						} else {
							this.detailViewOptine = {
								sid: val.sid,
								bid: null,
							};
						}

						this.openDetailView();
						break;
				}
			},
		},
		tabNum: {
			immediate: true,
			handler: function(val, pre) {
				if (this.tabs[pre]) {
					this.tabs[pre].yOffset = window.pageYOffset;
					this.preTabNum = pre;
				}
				if (this.tabs[val].data.length == 0) {
					this.isUpdated = false;

					axios
						.get(this.toUri(this.tabs[val], this.limit))
						.then((response) => {
							this.tabs[val].data = response.data.data;

							if (
								response.data.status == -1 ||
								response.data.endid == 0
							)
								this.tabs[this.tabNum].end = true;
							else
								this.tabs[this.tabNum].offset =
									response.data.endid;

							this.isUpdated = true;
						});
				}
				var path = this.typeToStr(this.tabs[val].type);
				if (
					!this.isCurrentViewOpen &&
					this.$route.params.queryMode != path
				)
					this.$router.push(path);
				this.$nextTick(() => {
					this.$vuetify.goTo(this.tabs[val].yOffset);
				});
			},
		},
	},
	methods: {
		search(val) {
			// {
			// 	subType: null,
			// 	mode: null,
			// 	class: null,
			// 	other: null,
			// 	keyword: null
			// };
			if (
				!val.subType &&
				!val.mode &&
				!val.class &&
				!val.other &&
				!val.keyword
			)
				return;

			var v = val;
			val.data = [];
			val.yOffset = 0;
			val.offset = 0;
			val.type = 4;
			val.end = false;

			this.tabs.push(v);

			this.tabNum = this.tabs.length - 1;
		},
		openDetailView() {
			this.isCurrentViewOpen = true;
			this.$emit("update:isTouchLess", true);
			document.getElementsByTagName("html")[0].style.overflow = "hidden";
		},
		closeDetailViewAndBack() {
			this.closeDetailView();

			if (window.history.length > 1) {
				this.$router.go(-1);
			} else {
				this.$router.push("/home");
			}
		},
		closeDetailView() {
			this.isCurrentViewOpen = false;
			this.$emit("update:isTouchLess", false);
			document.getElementsByTagName("html")[0].style.overflow = "auto";
		},
		closeTab(val) {
			this.tabs.splice(val, 1);
			if (val < this.tabNum) {
				this.tabNum--;
			} else if (val == this.tabNum) {
				if (this.preTabNum < this.tabs.length) {
					this.tabNum = this.preTabNum;
				} else {
					//应该为 default 值
					this.tabNum = 0;
				}
			}
		},
		updateData() {
			if (this.isUpdated == true) {
				this.isUpdated = false;
				if (!this.tabs[this.tabNum].end) {
					axios
						.get(this.toUri(this.tabs[this.tabNum], this.limit))
						.then((newData) => {
							this.tabs[this.tabNum].data = this.tabs[
								this.tabNum
							].data.concat(newData.data.data);

							if (newData.data.endid == 0)
								this.tabs[this.tabNum].end = true;
							else
								this.tabs[this.tabNum].offset =
									newData.data.endid;

							this.isUpdated = true;
						});
				}
			}
		},
		toUri(params, limit) {
			// {
			// 	subType: null,
			// 	mode: null,
			// 	class: null,
			// 	other: null,
			// 	keyword: null
			// };

			var host = "https://api.sayobot.cn";
			var uri = host + "/beatmaplist";
			uri += "?0=" + limit;
			uri += "&";
			if (params.offset == null) params.offset = 0;
			uri += "1=" + params.offset;
			uri += "&";
			uri += "2=" + params.type;
			if (params.type == 4) {
				uri += "&3=" + (params.keyword ? params.keyword : "");
				if (params.subType) uri += "&4=" + params.subType;
				if (params.mode) uri += "&5=" + params.mode;
				if (params.class) uri += "&6=" + params.class;
				if (params.genre) uri += "&7=" + params.class;
				if (params.language) uri += "&8=" + params.class;
				if (params.other) uri += "&9=" + '"' + params.other + '"';
			}
			return uri;
		},
		typeToStr(type) {
			switch (type) {
				case 1:
					return "hot";
				case 2:
					return "new";
				case 4:
					return "search";
			}
		},
	},
};
</script>

<style lang="scss">
.v-app-bar {
	min-height: 113.6px !important;
	height: auto !important;
	& .v-toolbar__content {
		min-height: 65.6px !important;
		height: auto !important;
	}
}
</style>
