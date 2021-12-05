<template>
	<view class="container">
		<view class="order-status">
			<text class="order-status-total">共{{orderGoods.length}}件商品</text>
			<text class="status">未支付</text>
		</view>

		<!-- 地址 -->
		<view class="address">
			<view class="address_title">
				{{orderAddress.province}}{{orderAddress.city}}{{orderAddress.county}}{{orderAddress.address}}
			</view>
			<view class="phone">{{ orderAddress.name }} {{orderAddress.phone}}</view>
		</view>


		<!-- 商品 -->
		<view class="goods-box">
			<view class="goods" v-for="goodItem in orderGoods" :key="goodItem.id">
				<template>
					<u-image width="20%" height="200rpx" :src="goodItem.goods.cover_url"></u-image>
				</template>
				<view class="content-box">
					<view class="title">{{goodItem.goods.title}}</view>
					<view class="price-container">
						<text class="price-box">￥<text class="price">{{goodItem.price}}</text></text>
						<text>x <text class="num">{{goodItem.num}}</text></text>
					</view>
				</view>
			</view>
		</view>

		<!-- 订单编号以及下单时间和下单总额 -->
		<view class="order-desc">
			<view class="orderSerial">订单编号：<text class="serial">{{goodsAll.order_no}}</text></view>
			<view class="orderSerial">下单时间：<text class="serial">{{goodsAll.updated_at}}</text></view>
			<view class="orderSerial shopTotal">商品总额：<text class="count">￥{{goodsAll.amount}}</text></view>
		</view>


		<!-- 支付订单 -->
		<view class="navigation">
			<view class="total">
				合计: <text class="count-style"> ￥<text class="count">{{goodsAll.amount}}</text>.00</text>
			</view>
			<view class="right">
				<view class="cart btn u-line-1">立即支付</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前订单id
				currentOrderId: null,
				// 商品地址
				orderAddress: [],
				// 商品数组
				orderGoods: [],
				// 商品总数据
				goodsAll: []
			};
		},
		async onLoad(options) {
			this.currentOrderId = options.orderId
			const res = await this.$u.api.reqOrderDetail(this.currentOrderId)
			console.log(res.data);
			this.goodsAll = res.data
			this.orderAddress = res.data.address
			this.orderGoods = res.data.orderDetails.data
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 20rpx;

		.order-status {
			display: flex;
			width: 100%;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			justify-content: space-between;

			.order-status-total {
				font-weight: 800;
				font-size: 35rpx;
			}

			.status {
				padding: 10rpx;
				border-radius: 10rpx;
				color: white;
				background-color: rgb(232, 17, 39);
			}
		}

		// 地址
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

		.goods-box {
			margin-top: 30rpx;
			width: 100%;
			// padding: 0 20rpx;

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

		.order-desc {
			margin-top: 30rpx;
			width: 100%;

			.orderSerial {
				font-weight: 800;
				font-size: 35rpx;

				.serial {
					margin-left: 15rpx;
					font-size: 30rpx;
					color: rgb(94, 94, 94);
				}
			}

			.shopTotal {
				margin-top: 30rpx;

				.count {
					color: rgb(188, 42, 53);
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
			}
		
			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}
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
	}
</style>
