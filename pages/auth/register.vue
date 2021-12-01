<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">注册</view>
			<input class="u-border-bottom u-m-t-30 u-m-b-30" type="text" v-model="name" placeholder="请输入名字" />
			<input class="u-border-bottom u-m-t-30 u-m-b-30" type="email" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom u-m-t-30 u-m-b-30" type="password" v-model="password" placeholder="请输入密码" />
			<input class="u-border-bottom u-m-t-30 u-m-b-30" type="password" v-model="password_confirmation" placeholder="请再次输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "",
				email: "",
				password: "",
				password_confirmation: ""
			}
		},
		computed: {
			// 提交按钮样式设置
			inputStyle() {
				let style = {};
				if (this.$u.test.email(this.email) && this.password.length >= 4 && this.password === this.password_confirmation && this.name.length) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		
		methods: {
			// 注册
			async submit () {
				if (!this.$u.test.email(this.email) || this.password.length < 4 || this.password !== this.password_confirmation || !this.name.length) return
				const params = {
					name: this.name,
					email: this.email,
					password: this.password,
					password_confirmation:this.password_confirmation
				}
				// 请求注册
				let registerRes = await this.$u.api.reqUserRegister(params)
				if(registerRes.statusCode === 201) {
					this.$u.toast("注册成功")
					// 返回之前页面
					setTimeout(() => {
						uni.navigateBack()
					},1500)
				}
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
	}
</style>
