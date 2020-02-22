<template>
	<v-app>
		<v-navigation-drawer
			v-model="isDrawerOpen"
			:mini-variant="isDrawerMini"
			app
			mobile-break-point="960"
		>
			<v-list>
				<v-list-item three-line v-show="!isDrawerMini">
					<v-btn
						:block="!isDrawerMini"
						text
						x-large
						color="pink accent-2"
						dark
						:icon="isDrawerMini"
					>
						<v-icon>mdi-tag-heart</v-icon>
						<label>V Mirror</label>
					</v-btn>
				</v-list-item>
				<v-list-item three-line v-show="isDrawerMini">
					<v-list-item-icon>
						<v-icon color="pink accent-2">mdi-tag-heart</v-icon>
					</v-list-item-icon>
				</v-list-item>
				<v-list-item v-show="!isDrawerMini">
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
				<v-list-item></v-list-item>
				<v-list-item-group>
					<v-list-item to="/home">
						<v-list-item-icon>
							<v-icon>mdi-home</v-icon>
						</v-list-item-icon>
						<v-list-item-content>首页</v-list-item-content>
					</v-list-item>
					<v-list-item to="/search">
						<v-list-item-icon>
							<v-icon>mdi-layers-search</v-icon>
						</v-list-item-icon>
						<v-list-item-content>高级搜索</v-list-item-content>
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
					<v-btn
						icon
						large
						absolute
						right
						@click="isDrawerMini = !isDrawerMini"
					>
						<v-icon v-show="!isDrawerMini">mdi-chevron-left</v-icon>
						<v-icon v-show="isDrawerMini">mdi-chevron-right</v-icon>
					</v-btn>
				</div>
			</template>
		</v-navigation-drawer>

		<v-content>
			<router-view
				:isDrawerOpen.sync="isDrawerOpen"
				:isDrawerMini="isDrawerMini"
			/>
		</v-content>
	</v-app>
</template>

<script>
export default {
	name: "App",

	data: function() {
		return {
			isDrawerOpen: null,
			isDrawerMini: null,
			colors: [
				"indigo",
				"warning",
				"pink darken-2",
				"red lighten-1",
				"deep-purple accent-4",
				"indigo",
				"warning"
			],
			slides: ["V", "M", "I", "R", "R", "O", "R"]
		};
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
			}
		}
	}
};
</script>
