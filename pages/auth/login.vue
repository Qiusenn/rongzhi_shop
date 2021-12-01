<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">登录</view>
			<input class="u-border-bottom" type="email" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom u-m-t-30 u-m-b-30" type="password" v-model="password" placeholder="请输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">密码登录</view>
				<view class="issue">遇到问题</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: ''
			}
		},
		computed: {
			// 提交按钮样式设置
			inputStyle() {
				let style = {};
				if (this.$u.test.email(this.email) && this.password.length >= 4) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			// 提交
			async submit() {
				if (!this.$u.test.email(this.email) || !this.password.length >= 4) return;
				const params = {
					email: this.email,
					password: this.password
				}
				// 请求登录.获取用户token
				let res = await this.$u.api.reqUserLogin(params)
				// 向vuex缓存token
				this.$u.vuex("vuex_token", res.data.access_token)
				let loginUserInfo = await this.$u.api.reqUserInfo()
				this.$u.toast('登录成功');
				// console.log(loginUserInfo.data);
				this.$u.vuex("vuex_user", loginUserInfo.data)
				const page = uni.getStorageSync('currentPage') || 'pages/index/index'
				setTimeout(() => {
					this.$u.route({
						type: 'reLaunch',
						url: page
					})
				}, 1500)

			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
