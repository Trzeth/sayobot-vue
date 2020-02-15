<template>
	<v-row class="ma-0" align="center">
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
					今天早上一个不规范的请求……把跳转程序搞炸了……来自Google bot
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
	</v-row>
</template>

<script>
export default {
	name: "home-title-bar"
};
</script>

<style></style>
