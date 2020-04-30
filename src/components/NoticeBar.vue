<template>
	<div class="notice-bar">
		<v-menu open-on-hover :close-on-content-click="false">
			<template v-slot:activator="{ on }">
				<template>
					<v-sheet v-on="on" style="overflow:hidden">
						<v-alert
							class="ma-0"
							style="flex:1"
							:type="
								notices ? types[notices[0].importance] : null
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
					<v-divider :key="'d' + index" v-if="index != 0"></v-divider>
					<v-list-item :key="index">
						<v-list-item-content>
							<v-row
								no-gutters
								justify="space-between"
								align="center"
							>
								<h2 class="title">{{ notice.title }}</h2>
								<v-col cols="auto">
									<v-row align="center" no-gutters>
										<h2
											class="subtitle-1 mr-1"
											style="margin-bottom:2px"
										>
											{{ notice.date }}
										</h2>
										<v-icon
											:color="types[notice.importance]"
											>{{
												icons[notice.importance]
											}}</v-icon
										>
									</v-row>
								</v-col>
							</v-row>
							<pre
								class="body-1 my-1"
								style="white-space: pre-wrap"
								>{{ notice.content }}</pre
							>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-menu>
		<v-overlay
			v-if="isNeedToConfirm"
			:value="isOverlayOpen"
			z-index="6"
			v-app
		>
			<v-sheet
				class="white grey--text text--darken-4 ma-5"
				style="max-width:500px"
				light
			>
				<v-container>
					<v-col>
						<v-row no-gutters justify="space-between">
							<h2 class="title">{{ notices[0].title }}</h2>
							<v-icon :color="types[notices[0].importance]">{{
								icons[notices[0].importance]
							}}</v-icon>
						</v-row>
						<pre
							class="body-1 my-1"
							style="white-space: pre-wrap"
							>{{ notices[0].content }}</pre
						>
						<v-row class="mt-5" no-gutters>
							<v-checkbox
								v-if="confirmType == 2"
								v-model="isAgree"
								class="ma-0"
								label="我已阅读并同意"
							></v-checkbox>
							<v-spacer></v-spacer>
							<v-btn
								:disabled="confirmType == 2 ? !isAgree : false"
								light
								color="primary"
								@click="OnClick"
								>确定</v-btn
							>
						</v-row>
					</v-col>
				</v-container>
			</v-sheet>
		</v-overlay>
	</div>
</template>

<script>
import axios from "axios";
import md5 from "spark-md5";

export default {
	name: "notice-bar",
	data: function() {
		return {
			notices: null,
			icons: [
				"mdi-information",
				"mdi-exclamation",
				"mdi-alert",
				"mdi-check-circle",
			],
			types: ["info", "warning", "error", "success"],
			isNeedToConfirm: false,
			isOverlayOpen: false,
			isAgree: false,
			noticeMd5: null,
			confirmType: 0,
		};
	},
	computed: {
		//local storage

		lastConfirmedNotice: {
			get() {
				return this.$ls.get("lastConfirmedNotice");
			},
			set(val) {
				this.$ls.set("lastConfirmedNotice", val);
				return val;
			},
		},
	},
	watch: {
		isOverlayOpen: {
			immediate: true,
			handler: function(val) {
				if (val)
					document.getElementsByTagName("html")[0].style.overflow =
						"hidden";
				else
					document.getElementsByTagName("html")[0].style.overflow =
						"auto";
			},
		},
	},
	methods: {
		OnClick() {
			this.isOverlayOpen = false;
			this.lastConfirmedNotice = this.noticeMd5;
			this.isNeedToConfirm = false;
		},
	},
	mounted: function() {
		axios.get("https://api.sayobot.cn/static/notice").then((response) => {
			this.notices = response.data.data;

			var lastImportance = this.notices[0].importance;
			if (lastImportance == 1 || lastImportance == 2) {
				var str = md5.hash(JSON.stringify(this.notices[0]));
				if (str != this.lastConfirmedNotice) {
					this.isNeedToConfirm = true;
					this.noticeMd5 = str;
					this.confirmType = lastImportance;
					this.isOverlayOpen = true;
				}
			}
		});
	},
	directives: {
		app: {
			inserted: function(el) {
				document.getElementById("app").appendChild(el);
			},
		},
	},
};
</script>

<style lang="scss">
.notice-bar {
	overflow: hidden;

	.v-alert__content {
		overflow: hidden;
	}
}

.v-menu__content {
	max-width: 0;
	max-height: 50%;
}
</style>
