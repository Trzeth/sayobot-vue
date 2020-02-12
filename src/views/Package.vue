<template>
	<div class="title-warpper">
		<div>
			<div class="keep-out">
				<div class="line"></div>
				<h2>Under Construction</h2>
				<div class="line"></div>
			</div>
			<div class="title">
				<h1>osu.sh</h1>
				<h2>
					osu!
					<router-link class="package-link" to="/home"
						># 图包站</router-link
					>
				</h2>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "package"
};
</script>

<style lang="scss" scoped>
.title-warpper {
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	text-align: center;

	> div {
		flex: 1;
	}
	.keep-out {
		margin-bottom: 30px;
		.line {
			width: 120%;
			margin-left: -10%;
			transform: skewX(-45deg);

			border-top: 20px dashed yellow;
			background: black;
		}
		h2 {
			background: yellow;
			margin: 0;
			padding: 10px 0;
			font-size: 3rem;
			font-weight: 500;
		}
	}
	.title {
		h1 {
			font-size: 3.2rem;
			font-weight: 400;
			letter-spacing: 2px;
		}
		h2 {
			margin: 15px 10px 20px 0;
			letter-spacing: 1px;
			font-size: 2.5rem;
			font-weight: 300;
			color: #909090;

			.package-link {
				font-weight: 400;
				display: inline-block;
				color: #909090;

				text-decoration: none;
				padding: 0 15px;
				transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
				border-radius: 0;
			}
			.package-link:visited {
				color: #909090;
			}
			.package-link:hover {
				color: #8f8f8f;
				background: #e5e5e5;
			}
		}
	}
}
</style>
