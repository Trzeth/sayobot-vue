<template>
	<v-app>
		<v-navigation-drawer :mini-variant="miniDrawer" app>
			<v-list>
				<v-list-item three-line v-show="!miniDrawer">
					<v-btn
						:block="!miniDrawer"
						text
						x-large
						color="pink accent-2"
						dark
						:icon="miniDrawer"
					>
						<v-icon>mdi-tag-heart</v-icon>
						<label>V Mirror</label>
					</v-btn>
				</v-list-item>
				<v-list-item three-line v-show="miniDrawer">
					<v-list-item-icon>
						<v-icon color="pink accent-2">mdi-tag-heart</v-icon>
					</v-list-item-icon>
				</v-list-item>
				<v-list-item v-show="!miniDrawer">
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

			<template v-slot:append>
				<div style="height:44px">
					<v-btn
						icon
						large
						absolute
						right
						@click="miniDrawer = !miniDrawer"
					>
						<v-icon v-show="!miniDrawer">mdi-chevron-left</v-icon>
						<v-icon v-show="miniDrawer">mdi-chevron-right</v-icon>
					</v-btn>
				</div>
			</template>
		</v-navigation-drawer>

		<v-content>
			<router-view />
		</v-content>
	</v-app>
</template>

<script>
export default {
	name: "App",

	data: function() {
		return {
			miniDrawer: null,
			colors: [
				"indigo",
				"warning",
				"pink darken-2",
				"red lighten-1",
				"deep-purple accent-4"
			],
			slides: ["First", "Second", "Third", "Fourth", "Fifth"]
		};
	}
};
</script>
