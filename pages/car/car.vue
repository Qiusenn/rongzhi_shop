<template>
	<view>
		<view class="carList" v-for="good in cartsData" :key="good.goods_id">
			<view class="selectShop">
				<u-checkbox-group>
							<u-checkbox 
								@change="checkboxChange(good)"
								shape="circle"
								size="40"
								v-model="good.is_checked ? true : false" 
							></u-checkbox>
						</u-checkbox-group>
			</view>
			<view class="shopInfo">
				<u-image width="35%" class="image" height="240rpx" :src="good.goods.cover_url"></u-image>
				<view class="shop-content">
					<view class="top-message">
						<view class="title">{{good.goods.title}}</view>
						<view class="title-desc u-line-3">{{good.goods.description}}</view>
					</view>
					<view class="bottom-message">
						<view class="price">￥{{good.goods.price}}</view>
						<!-- 计数器 -->
						<u-number-box v-model="good.num" @change="valChange($event,good)"></u-number-box>
						<u-icon name="trash" @click="deleteGoods(good.id)" color="#ff0000" size="48"></u-icon>
					</view>
				</view>
			</view>
		</view>
		
		<view class="navigation">
				<view class="left">
					<u-checkbox-group>
						<u-checkbox v-model="checked" shape="circle" size="40">  全选</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="total">
					合计: <text class="count-style"> ￥<text class="count">{{count}}</text>.00</text>
				</view>
				<view class="right">
					<view class="cart btn u-line-1" @click="gotoPreview">去结算</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 购物车数据
				cartsData: [],
				checked: false,
				// 当前选中数量
			};
		},

		watch: {
			checked (n) {
				// 全选 和 全不选
				this.cartsData.forEach(item => {
					item.is_checked = n ? 1 : 0
				})
			}
		},
		computed: {
			// 计算商品总价
			count () {
				let shopCount = 0
				this.cartsData.forEach((item) => {
					if (item.is_checked) {
						shopCount += item.goods.price
					}
				})
				return shopCount
			}
		},
		async onShow() {
			// 获取购物车商品数据
			const cartsDataInfo = await this.$u.api.reqCartsData()
			// 购物车数据
			this.cartsData = cartsDataInfo.data.data
		},
		methods: {
			// 请求更改购物车数量 
			async valChange(e,val) {
				console.log('当前值为: ' + e.value)
				console.log(val);
				// console.log(val);
				const params = {
					num: e.value
				}
				let res = await this.$u.api.reqCartsNum(val.id,params)
				console.log(res);
			},
			
			// 复选框点击
			async checkboxChange (e) {
				e.is_checked = !e.is_checked
				e.is_checked = e.is_checked ? 1 : 0
				console.log(this.cartsData);
				let flag = this.cartsData.every( item => item.is_checked === 1)
				this.checked = flag
				
				// 过滤出要勾选的商品
				let selectShop = []
				this.cartsData.forEach( item => {
					if(item.is_checked) {
						selectShop.push(item.id)
					}
				})
				const params = {
					cart_ids: selectShop
				}
				let res = await this.$u.api.resetSelectShop(params)
			},
			
			// 移除商品
			async deleteGoods (id) {
				console.log(id);
				await this.$u.api.reqdeldteGoods(id)
				// 获取购物车商品数据
				this.$u.toast('删除成功')
				const cartsDataInfo = await this.$u.api.reqCartsData()
				// 购物车数据
				this.cartsData = cartsDataInfo.data.data
			},
			
			// 去往订单列表
			gotoPreview () {
				this.$u.route({
					type: 'navigateTo',
					url: '/pages/car/preview'
				})
			}
			
			
		}
	}
</script>

<style lang="scss">
	.carList {
		display: flex;
		.selectShop {
			
			width: 120rpx;
			height: 240rpx;
			text-align: center;
			line-height: 240rpx;
		}

		.shopInfo {
			display: flex;
			flex: 1;
			padding: 20rpx;
			margin-right: 20rpx;
			background-color: rgb(244, 244, 244);
			
			.shop-content {
				flex: 1;
				display: flex;
				
				flex-direction: column;
				justify-content: space-between;
				.top-message {
					.title {
						font-weight: 800;
						font-size: 32rpx;
					}
					
					.title-desc {
						color: #909399;
						font-size: 28rpx;
						margin-top: 10px;
						// white-space:w;
						margin-left: 15rpx;
						width: 330rpx;
						// width: 165px;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
				.bottom-message {
					display: flex;
					justify-content: space-around;
				}
			}
		}
	}
	
	.navigation {
		position: fixed;
		bottom: 50px;
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
</style>
