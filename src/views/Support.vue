<template>
	<v-container style="height:100%">
		<v-row class="fill-height">
			<v-col cols="8">
				<v-row style="position:absolute;z-index:1">
					<v-select
						v-model="currentsupportListObject"
						:items="supportList"
						item-text="title"
						solo
						return-object
					>
						<template v-slot:item="{ item }">
							<v-list-item-content>
								{{ item.title }}
							</v-list-item-content>
						</template>
					</v-select></v-row
				>
				<v-row class="fill-height">
					<v-chart
						:options="chartOptions"
						style="height:100%;width:100%"
						autoresize
					/>
				</v-row>
			</v-col>
			<v-col cols="4">
				<v-sheet elevation="4" style="overflow:hidden">
					<v-row no-gutters>
						<v-col cols="6">
							<v-img
								src="../assets/img/pay-weixin.png"
								aspect-ratio="0.8203125"
							/>
						</v-col>
						<v-col cols="6">
							<v-img
								src="../assets/img/pay-zhifubao.jpg"
								aspect-ratio="0.8203125"
							/> </v-col
					></v-row>
					<v-row class="mx-2 my-2">
						<v-col>
							<p class="text-justify">
								夜妈妈一直在努力的维护着镜像站的正常运行，但是这个日常开销要好多好多钱的哇。所以就——
							</p>
							<h2 class="headline">支持一下小夜吧!</h2>
						</v-col>
					</v-row>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { L2Dwidget } from "live2d-widget";

import axios from "axios";
import ECharts from "vue-echarts";
import "echarts-wordcloud";

export default {
	name: "support",
	components: {
		"v-chart": ECharts
	},
	data: function() {
		return {
			mdata: {
				name: "kesshouban",
				model: "/assert/kanna/Kobayaxi.moc",
				textures: ["/assert/kanna/textures/texture_00.png"]
			},
			currentsupportListObject: null,
			supportList: null,
			chartOptions: {
				series: [
					{
						type: "wordCloud",
						shape: "circle",
						sizeRange: [30, 60],
						rotationRange: [-90, 90],
						rotationStep: 1,
						gridSize: 2,
						drawOutOfBound: false,
						textStyle: {
							normal: {
								color: function(item) {
									return (
										"rgb(" +
										[
											Math.round(Math.random() * 160),
											Math.round(Math.random() * 160),
											Math.round(Math.random() * 160)
										].join(",") +
										")"
									);
								}
							},
							emphasis: {
								shadowBlur: 10,
								shadowColor: "#333"
							}
						},
						data: []
					}
				]
			}
		};
	},
	components: {
		"v-chart": ECharts
	},
	watch: {
		currentsupportListObject: {
			immediate: true,
			handler: function(val) {
				if (!val) return;

				axios.get(val.link).then(response => {
					var supportList = [];
					response.data.data.forEach(element => {
						var object = {
							name: element["id"],
							value: element["money"]
						};
						supportList.push(object);
					});
					this.chartOptions.series[0].data = supportList;
				});
			}
		}
	},
	beforeRouteLeave: function(to, from, next) {
		if (Math.floor(Math.random() * 100) != 11) {
			document.getElementById("live2d-widget").remove();
		}

		next();
	},
	mounted: function() {
		axios
			.get("https://api.sayobot.cn/static/supportlist")
			.then(response => {
				var arr = [];
				response.data.data.forEach(e => {
					arr.push({
						title: e.title,
						link: e.link
					});
				});
				this.supportList = arr;
				this.currentsupportListObject = arr[0];
			});
		L2Dwidget.init({
			model: {
				jsonPath: "/live2d_models/Kobayaxi/model.json",
				scale: 1
			},
			display: {
				superSample: 2,
				width: 200,
				height: 400,
				position: "right",
				hOffset: 100,
				vOffset: -20
			},
			mobile: {
				show: true,
				scale: 0.8,
				motion: true
			},
			name: {
				canvas: "live2dcanvas",
				div: "live2d-widget"
			},
			react: {
				opacity: 1
			},
			dev: {
				border: false
			},
			dialog: {
				enable: false,
				hitokoto: false
			}
		});
	}
};
</script>

<style lang="scss">
.live-2d {
	& canvas {
		width: 100%;
		height: 100%;
	}
}
</style>
