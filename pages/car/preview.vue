<template>
	<view class="preview">
		
			<view class="address_box">
				<view class="content">
					<view class="address">
						<view class="address_title">北京市北京市东城区</view>
						<view class="phone">aaa 15217169848</view>
					</view>
					<view class="icon_box"><u-icon class="u-m-l-70" name="arrow-right"></u-icon></view>
				</view>
			</view>
			
			<!-- 商品 -->
			<view class="goods-box">
				<view class="goods" v-for="goodsItem in goodsList.carts" :key="goodsItem.id">
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
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品数据
				goodsList: [],
			};
		},
		async onShow () {
			// 请求订单预览
			const res = await this.$u.api.reqgoodsPreview()
			console.log(res.data);
			this.goodsList = res.data
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
				justify-content:flex-end;
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
</style>
