<template>
	<!-- 商品组件 -->
	<navigator class="goods-item" :url="'/pages/goods/show?id='+item.id">
		<u-image class="u-skeleton-fillet" width="100%" height="300rpx" :src="item.cover_url" :fade="true" duration="450"></u-image>
		<view class="title u-text-center u-m-t-10 u-m-b-20 u-line-1 u-skeleton-rect ">
			{{item.title || '商品列表'}}
		</view>
		<view class="describe">
			<view class="price u-skeleton-rect">
				￥ {{item.price}}
			</view>
			<view class="sales u-skeleton-rect ">
				销量：{{item.sales}}
			</view>
		</view>
	</navigator>
	
</template>

<script>
	export default {
		name:"goods-item",
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
.goods-item {
		padding: 10px;
		.title {
			font-weight: 800;
			font-size: 32rpx;
		}
		.describe {
			display: flex;
			justify-content: space-between;
			.price {
				color: red;
				width: 40%;
			}
			.sales {
				color: #999;
				width: 40%;

			}
		}
	}
</style>
