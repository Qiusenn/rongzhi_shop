<template>
	<view class="content">
		<text>center</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			// 验证是否登录
			this.$u.utils.isLogin();
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
</style>
