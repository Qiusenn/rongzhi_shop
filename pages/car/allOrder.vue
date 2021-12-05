<template>
	<view class="container">

		<view class="goods-card" v-for="(orderDetail, index) in orderDetailsData" :key="index" v-if="orderDetail.orderDetails.data.length">
			<view class="order-status">
				<text class="order-status-total">共{{orderDetail.orderDetails.data.length}}件商品</text>
				<text class="status">未支付</text>
			</view>

			<!-- 商品 -->
			<view class="goods-box" v-for="order in orderDetail.orderDetails.data">
				<view class="goods">
					<template>
						<u-image width="20%" height="200rpx" :src="order.goods.cover_url"></u-image>
					</template>
					<view class="content-box">
						<view class="title">{{order.goods.title}}</view>
						<view class="price-container">
							<text class="price-box">￥<text class="price">{{order.goods.price}}</text></text>
							<text>x <text class="num">{{order.num}}</text></text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 时间 -->
				<view class="order-status">
					<text class="order-status-total goods-time">{{orderDetail.created_at}}</text>
					<text class="status goPay">去付款</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderDetailsData: [],
				page: 1
			};
		},
		
		async onReady() {
			let pageData = await this.$u.api.reqOrderList()
			this.page = pageData.data.meta.pagination.total_pages
			const res = await this.$u.api.reqOrderList(this.page)
			this.orderDetailsData = [...this.orderDetailsData ,...(res.data.data.reverse())]
		},
		
		async onReachBottom() {
			if (!this.page) return this.$u.toast('没有更多数据了')
			this.page--
			const res = await this.$u.api.reqOrderList(this.page)
			this.orderDetailsData = [...this.orderDetailsData ,...(res.data.data.reverse())]
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		padding: 0 20rpx;
		padding-bottom: 40rpx;
		.goods-card {
			width: 100%;
			padding: 20rpx;
			border-radius: 15rpx;
			// background-color: pink;
			box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, .2);
			&:nth-child(n+2) {
				margin-top: 30rpx;
			}
			.order-status {
				display: flex;
				width: 100%;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				justify-content: space-between;
				align-items: center;
				
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
				
				.goods-time {
					font-size: 25rpx;
					font-weight: 200;
					color: rgb(157, 157, 157);
				}
				
				.goPay {
					background-color: rgb(6, 185, 84);
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
			
		}
	}
</style>
