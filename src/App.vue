<template>
	<v-app>
		<v-navigation-drawer
			v-model="isDrawerOpen"
			:mini-variant="isDrawerMiniNotSm"
			:touchless="isTouchLess"
			app
			mobile-break-point="960"
		>
			<v-list>
				<v-list-item three-line v-show="!isDrawerMiniNotSm">
					<v-btn
						:block="!isDrawerMiniNotSm"
						text
						x-large
						color="pink accent-2"
						dark
						:icon="isDrawerMiniNotSm"
					>
						<v-icon>mdi-tag-heart</v-icon>
						<label>V Mirror</label>
					</v-btn>
				</v-list-item>
				<v-list-item three-line v-show="isDrawerMiniNotSm">
					<v-list-item-icon>
						<v-icon color="pink accent-2">mdi-tag-heart</v-icon>
					</v-list-item-icon>
				</v-list-item>
				<v-list-item v-show="!isDrawerMiniNotSm">
					<v-carousel
						cycle
						height="108"
						hide-delimiters
						show-arrows-on-hover
					>
						<v-carousel-item v-for="(slide, i) in slides" :key="i">
							<v-sheet :color="colors[i]" height="100%">
								<v-row
									class="fill-height"
									align="center"
									justify="center"
								>
									<div class="display-3">
										{{ slide }}
									</div>
								</v-row>
							</v-sheet>
						</v-carousel-item>
					</v-carousel>
				</v-list-item>
				<v-list-item-group>
					<v-list-item></v-list-item>
					<v-list-item to="/home">
						<v-list-item-icon>
							<v-icon>mdi-home</v-icon>
						</v-list-item-icon>
						<v-list-item-content>首页</v-list-item-content>
					</v-list-item>
					<v-list-item to="/search">
						<v-list-item-icon>
							<v-icon>mdi-package</v-icon>
						</v-list-item-icon>
						<v-list-item-content>图包</v-list-item-content>
					</v-list-item>
					<v-list-item to="/support">
						<v-list-item-icon>
							<v-icon>mdi-heart</v-icon>
						</v-list-item-icon>
						<v-list-item-content>支持</v-list-item-content>
					</v-list-item>
					<v-list-item to="/setting">
						<v-list-item-icon>
							<v-icon>mdi-settings</v-icon>
						</v-list-item-icon>
						<v-list-item-content>设置</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>

			<template v-slot:append v-if="!isSm">
				<div style="height:44px">
					<v-row
						no-gutters
						:justify="isDrawerMiniNotSm ? 'center' : 'end'"
					>
						<v-btn
							icon
							large
							@click="isDrawerMini = !isDrawerMini"
							:class="isDrawerMiniNotSm ? '' : 'mr-2'"
						>
							<v-icon v-show="!isDrawerMini"
								>mdi-chevron-left</v-icon
							>
							<v-icon v-show="isDrawerMini"
								>mdi-chevron-right</v-icon
							>
						</v-btn>
					</v-row>
				</div>
			</template>
		</v-navigation-drawer>

		<v-content>
			<router-view
				:isDrawerOpen.sync="isDrawerOpen"
				:isDrawerMini="isDrawerMiniNotSm"
				:isTouchLess.sync="isTouchLess"
			/>
		</v-content>
	</v-app>
</template>

<script>
export default {
	name: "App",
	data: function() {
		return {
			isDrawerMini: null,
			isDrawerOpen: null,
			isTouchLess: false,
			colors: [
				"indigo",
				"warning",
				"pink darken-2",
				"red lighten-1",
				"deep-purple accent-4",
				"indigo",
				"warning",
			],
			slides: ["V", "M", "I", "R", "R", "O", "R"],
		};
	},
	watch: {
		isDrawerMini: {
			handler: function(val) {
				if (val == null) return;
				this.$ls.set("isDrawerMini", val);
			},
		},
	},
	computed: {
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
		isDrawerMiniNotSm() {
			return this.isSm ? false : this.isDrawerMini;
		},
	},
	mounted() {
		this.isDrawerMini =
			this.$ls.get("isDrawerMini") == "true" ? true : false;
	},
};
</script>

<style scss>
/* Hard Code */
.v-navigation-drawer {
	transition: transform, -webkit-transform !important;
}
.v-content {
	transition: none !important;
}
</style>
