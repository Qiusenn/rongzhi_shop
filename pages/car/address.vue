<template>
	<view>
		<view>
			<u-swipe-action btn-width="200" :index="index" v-for="(item, index) in addressData"
				:key="item.id" @click="click" @open="open" :options="options">
				<view class="item u-border-bottom" style="justify-content: space-between;">
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<text class="title u-line-1" style="font-weight: 800;">{{ item.name }} {{item.phone}} <text
								v-if="item.is_default" class="iconDefault">默认</text></text>
						<text class="title u-line-2" style="font-size: 24rpx;">{{item.province}}{{item.city}}{{item.county}}{{item.address}}</text>
					</view>
					<u-icon name="edit-pen" color="#53533e" size="38"></u-icon>
				</view>
			</u-swipe-action>
		</view>
		<view>
			<u-modal v-model="show" @confirm="ConfirmDel(selectDefault)" :show-cancel-button="true" :content="content"></u-modal>
		</view>
		
		<!-- 新建收货地址 -->
		<view class="addAddress" style="padding: 50rpx;position: fixed; bottom: 0;width: 100%;">
			<u-button type="error" shape="circle" @click="gotoAddAddress">+ 新建收货地址</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						id: 1,
						title: '测试地址 1333333333',
					},
					{
						id: 2,
						title: '测试地址 1333333333',
					},
					{
						id: 3,
						title: '测试地址 1333333333',
					}
				],
				addressData: [],
				disabled: false,
				btnWidth: 180,
				show: false,
				selectDefault: 0,
				currentDel: 0,
				options: [{
						text: '默认地址',
						style: {
							backgroundColor: '#007aff',
							fontSize: '12px',
						}
					},
					{
						text: '删除地址',
						style: {
							backgroundColor: '#dd524d',
							fontSize: '12px',
						}
					}
				],
				show: false,
				content: '确认删除地址'
			};
		},
		async onShow () {
			const addressDataRes = await this.$u.api.reqaddressList()
			this.addressData = addressDataRes.data.data
		},
		methods: {
			async click(index, index1) {
				// 打开弹出框
				if (index1 == 1) {
					this.currentDel = index
					this.show = true;
				} else {
					this.list[index].show = false;
					this.selectDefault = index
					console.log(this.selectDefault);
					this.$u.toast(`设置成功`);
					await this.$u.api.setDefaultAddress(this.addressData[this.selectDefault].id)
					const addressDataRes = await this.$u.api.reqaddressList()
					this.addressData = addressDataRes.data.data;
				}
			},
			// setDefaultAddressFn() {
				
			// }
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			async ConfirmDel() {
				console.log(this.addressData[this.currentDel]);
				this.$u.toast(`删除成功`);
				await this.$u.api.deleteAddress(this.addressData[this.currentDel].id)
				if(!this.addressData.length) return;
				this.$u.api.setDefaultAddress(this.addressData[0].id)
				const addressDataRes = await this.$u.api.reqaddressList()
				this.addressData = addressDataRes.data.data;
				
			},
			
			// 去往添加地址
			gotoAddAddress () {
				this.$u.route({
					type: 'navigateTo',
					url: '/pages/car/addAddress'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		padding: 20rpx;
	}

	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}

	.iconDefault {
		background-color: red;
		padding: 5rpx;
		color: white;
		margin-left: 15rpx;
		font-size: 20rpx;
		border-radius: 7rpx;
		font-weight: 100;
	}
</style>
