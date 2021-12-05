<template>
	<view class="preview">

		<view class="address_box" @click="gotoSetAddAddress">
			<view class="content">
				<view class="address">
					<view class="address_title">
						{{defaultAddress.province}}{{defaultAddress.city}}{{defaultAddress.county}}{{defaultAddress.address}}
					</view>
					<view class="phone">{{ defaultAddress.name }} {{defaultAddress.phone}}</view>
				</view>
				<view class="icon_box">
					<u-icon class="u-m-l-70" name="arrow-right"></u-icon>
				</view>
			</view>
		</view>

		<!-- 商品 -->
		<view class="goods-box">
			<view class="goods" v-for="goodsItem in goodsList.carts" :key="goodsItem.id"
				@click="gotoShopInfo(goodsItem)">
				<template>
					<u-image width="20%" height="200rpx" :src="goodsItem.goods.cover_url"></u-image>
				</template>
				<view class="content-box">
					<view class="title">{{goodsItem.goods.title}} </view>
					<view class="price-container">
						<text class="price-box">￥<text class="price">{{goodsItem.goods.price}}</text></text>
						<text>x <text class="num">{{goodsItem.num}}</text></text>
					</view>
				</view>
			</view>
		</view>

		<view class="none" v-if="!goodsList.carts">
			暂无订单
		</view>

		<!-- 支付订单 -->
		<view class="navigation">
			<view class="total">
				合计: <text class="count-style"> ￥<text class="count">{{total}}</text>.00</text>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="payGoods">提交订单并支付</view>
			</view>
		</view>

		<!-- 支付二维码遮罩层 -->
		<template>
			<u-mask :show="show" @click="leavePage">
				<view class="warp">
					<view class="rect" @tap.stop>
						<u-image width="100%" height="500rpx" :src="`https://api.shop.eduwork.cn/${this.erweima}`">
						</u-image>
					</view>
				</view>
			</u-mask>
		</template>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品数据
				goodsList: [],
				// 默认地址
				defaultAddress: [],
				total: 0,
				show: false,
				erweima: '',
				orderId: null
			};
		},
		onLoad(options) {
			this.total = options.total

		},
		async onShow() {
			// 请求订单预览
			const res = await this.$u.api.reqgoodsPreview()
			this.goodsList = res.data
			let reqAddress = res.data.address
			this.defaultAddress = reqAddress.filter(item => item.is_default === 1)[0]
			console.log(this.defaultAddress);
			console.log(this.goodsList.carts.length);
		},

		methods: {
			gotoSetAddAddress() {
				this.$u.route({
					type: 'navigateTo',
					url: '/pages/car/address'
				})
			},

			// 去往商品详情
			gotoShopInfo(goods) {
				this.$u.route({
					type: 'navigateTo',
					url: '/pages/goods/show',
					params: {
						id: goods.goods_id
					}
				})
			},

			// 提交支付 获取支付二维码
			async payGoods() {
				console.log(this.defaultAddress.id);
				// 获取当前地址id
				const params = {
					address_id: this.defaultAddress.id
				}
				// // 提交订单
				const orderData = await this.$u.api.commitOrder(params)
				if (!orderData) return
				// 订单id
				this.orderId = orderData.data.id
				// 获取支付二维码

				const payData = await this.$u.api.reqErweima(this.orderId)
				this.erweima = payData.data.qr_code_url
				// 弹出支付二维码
				this.show = true	
				this.$u.toast('请使用支付宝沙箱扫码支付')
				let payStatusCode = 1
				this.timer = setInterval(async () => {
				let payStatus = await this.$u.api.reqPayStatus(this.orderId)
				},1000)
			},

			// 点击遮罩层退出当前支付页面
			leavePage() {
				clearInterval(this.timer)
				this.$u.route({
					type: 'reLaunch',
					url: '/pages/car/orderDetail',
					params: {
						orderId: this.orderId
					}
				})
			}
		}



	}
</script>

<style lang="scss">
	.preview {
		width: 100%;

		.address_box {
			padding: 20rpx 40rpx;
			padding-bottom: 0;
			width: 100%;
			display: flex;

			.content {
				display: flex;
				width: 100%;
				padding-bottom: 20rpx;
				border-bottom: 1px solid #ebeff8;

				.address {
					width: 80%;
					display: flex;
					flex-direction: column;

					.address_title {
						font-weight: 800;
						font-size: 35rpx;
					}

					.phone {
						margin-top: 20rpx;
						color: rgb(168, 168, 168);
						font-size: 25rpx;
					}
				}
			}

			.icon_box {
				display: flex;
				justify-content: flex-end;
				align-items: center;
			}
		}

		.goods-box {
			margin-top: 30rpx;
			width: 100%;
			padding: 0 20rpx;

			.goods {
				padding: 10rpx 15rpx;
				width: 100%;
				background-color: rgb(247, 247, 247);
				display: flex;

				.content-box {
					display: flex;
					flex: 1;
					padding: 10rpx 0;
					padding-left: 20rpx;
					flex-direction: column;
					justify-content: space-between;

					.title {
						font-weight: 800;
						font-size: 30rpx;
					}

					.price-container {
						display: flex;
						justify-content: space-between;

						.price-box {
							color: rgb(241, 12, 32);

							.price {
								font-size: 40rpx;
							}
						}

						.num {
							margin-left: 10rpx;
						}
					}
				}
			}
		}
	}

	.navigation {
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 30rpx;
		width: 100%;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;

		.total {
			margin-left: 25rpx;
			font-weight: 800;

			.count-style {
				color: rgb(236, 13, 32);

				.count {
					font-size: 40rpx;
				}
			}
		}

		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				margin: 0 30rpx;

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #ff7900;
			}
		}
	}

	.none {
		width: 100%;
		color: red;
		text-align: center;
		font-size: 50rpx;
		line-height: 150rpx;
	}

	// 二维吗
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 250px;
		height: 250px;
		background-color: #fff;
	}
</style>
