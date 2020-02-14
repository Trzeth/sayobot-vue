<template>
	<div class="support">
		<div class="left" v-on:click.stop>
			<!--十分奇怪的bug ref 1-->
			<v-chart
				:options="supportListOptions"
				style="height:100%;width:100%"
			/>
		</div>

		<div class="right" v-on:click.stop>
			<img src="../assets/img/pay-weixin.png" />
			<img src="../assets/img/pay-zhifubao.jpg" />
			<h2>支持一下小夜吧!</h2>
		</div>
	</div>
</template>

<script>
import axios from "axios";

import ECharts from "vue-echarts";
import "echarts-wordcloud";

export default {
	name: "support",
	data: function() {
		return {
			supportList: [],
			supportListOptions: {}
		};
	},
	components: {
		"v-chart": ECharts
	},
	mounted: function() {
		axios
			.get("https://api.sayobot.cn/static/supportlist")
			.then(response => {
				axios.get(response.data.data[0].link).then(response => {
					var supportList = [];
					response.data.data.forEach(element => {
						var object = {
							name: element["id"],
							value: element["money"]
						};
						supportList.push(object);
					});

					this.supportListOptions = {
						series: [
							{
								type: "wordCloud",

								// The shape of the "cloud" to draw. Can be any polar equation represented as a
								// callback function, or a keyword present. Available presents are circle (default),
								// cardioid (apple or heart shape curve, the most known polar equation), diamond (
								// alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

								shape: "circle",

								// A silhouette image which the white area will be excluded from drawing texts.
								// The shape option will continue to apply as the shape of the cloud to grow.

								// Text size range which the value in data will be mapped to.
								// Default to have minimum 12px and maximum 60px size.
								sizeRange: [30, 100],

								// Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

								rotationRange: [-90, 90],
								rotationStep: 45,

								// size of the grid in pixels for marking the availability of the canvas
								// the larger the grid size, the bigger the gap between words.

								autoSize: {
									enable: true,
									minSize: 14
								},
								// set to true to allow word being draw partly outside of the canvas.
								// Allow word bigger than the size of the canvas to be drawn
								drawOutOfBound: true,

								// Global text style
								textStyle: {
									normal: {
										// Color can be a callback function or a color string
										color: function() {
											// Random color
											return (
												"rgb(" +
												[
													Math.round(
														Math.random() * 160
													),
													Math.round(
														Math.random() * 160
													),
													Math.round(
														Math.random() * 160
													)
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
								data: supportList
							}
						]
					};
				});
			});
	}
};
</script>

<style lang="scss">
.support {
	display: flex;

	//十分奇怪的bug ref 1
	//Do not touch it's magic

	height: 100%;
	width: 100%;
	.left {
		overflow: hidden;
		flex: 2;
		margin: 20px;
		border-radius: 25px;
		background: #ffffff;
	}
	.right {
		flex: 1;
		margin: 20px;
		border-radius: 25px;
		background: #ffffff;
		overflow: hidden;

		img {
			display: inline-block;
			width: 50%;
			height: auto;
		}
	}
}
@media screen and (max-width: 480px) {
	.support {
		.left {
			display: none;
		}
		.right {
			flex: none;
			width: 80%;
			max-height: 322px;
			border-radius: 10px;
		}
	}
}
</style>
