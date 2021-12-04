<template>
	<view class="show">
		<u-image width="50%" height="400rpx" style="margin: 0 auto 0;" :src="goodsInfo.cover_url"></u-image>
		<view style="font-weight: 800;font-size: 40rpx; margin-top: 40rpx;">{{goodsInfo.title}}</view>
		<view class="content">
			<view class="price">￥ {{goodsInfo.price}}</view>
			<view class="sales">销量：{{goodsInfo.sales}}</view>
		</view>

		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<u-row gutter="16 " v-if="current === 2">
			<u-col span="6" v-for="goods in goodsList" class="u-m-t-20">
				<!-- <view class="demo-layout bg-purple"> -->
				<!-- 商品组件 -->
				<goods-item :item="goods" />
				<!-- </view> -->

			</u-col>
		</u-row>
		<!-- 评论 -->
		<view v-if="current === 1">
			<view class="comment" v-for="(res, index) in commentList" :key="res.id">
				<view class="left">
					<image :src="res.user.avatar_url" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="name">{{ res.user.name }}</view>
						<view class="like" :class="{ highlight: res.isLike }">
							<view class="num">{{ res.likeNum }}</view>
							<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a"
								@click="getLike(index)"></u-icon>
							<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
						</view>
					</view>
					<view class="content">{{ res.content }}</view>
					<view class="reply-box">
						<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
							<view class="username">{{ item.name }}</view>
							<view class="text">{{ item.contentStr }}</view>
						</view>
					</view>
					<view class="bottom">
						{{ res.created_at }}
						<view class="reply">回复</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 副文本 -->
		<view class="u-content u-p-d-80" v-if="current === 0">
			<u-parse :html="goodsInfo.details"></u-parse>

		</view>

		<!-- 购物车 -->
		<view class="navigation" style="position: fixed; bottom: 0; width: 100%; display: flex; height: 70px;">
			<view class="left">
				<view class="item" @click="collect">
					<block v-if="isCllect !== 0">
						<u-icon name="star" color="#2979ff" size="40"></u-icon>
						<view class="text u-line-1" style="color: #2979ff;">已收藏</view>
					</block>
					<block v-else>
						<u-icon name="star" color="black" size="40"></u-icon>
						<view class="text u-line-1" style="color: black;">未收藏</view>
					</block>
				</view>

				<view class="item" style="position: relative;margin-left: 45rpx;" @click="gotoCar">
					<u-badge type="error" :count="cartsList" :offset="[-8,12]"></u-badge>
					<u-icon name="shopping-cart" color="#ff5500" size="40"></u-icon>
					<view class="text u-line-1" style="color: #ff5500;" >购物车</view>
				</view>

			</view>
			<view class="right">
				<view class="car" @click="addCarts">加入购物车</view>
				<view class="buy">立即购买</view>
			</view>
		</view>
	</view>



</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '商品详情'
				}, {
					name: '商品评论',
					count: 999
				}, {
					name: '推荐商品',

				}],
				current: 0,
				// 评论
				commentList: [],
				// 商品详情
				goodsInfo: [],
				// 商品列表
				goodsList: [{},{},{},{}],
				content: `
									<p>露从今夜白，月是故乡明</p>
								`,
				isCllect: 0,
				goodsId: null,
				cartsList: 0
			}
		},
		async onLoad(options) {
			const res = await this.$u.api.goodsInfo(options.id);
			this.goodsId = options.id
			this.commentList = res.data.goods.comments
			this.isCllect = res.data.goods.is_collect
			this.list[1].count = this.commentList.length
			this.goodsInfo = res.data.goods
			this.goodsList = res.data.like_goods
			// this.getComment();
			
			// 获取购物车列表
			const resList = await this.$u.api.reqCartsList()
			this.cartsList = resList.data.data.length;
		},
		methods: {
			change(index) {
				this.current = index;
				console.log(this.current);
			},

			// 收藏
			collect() {
				this.$u.api.collect(this.goodsId)
				if (!this.isCllect) {
					this.$u.toast('收藏成功')
					this.isCllect = 1
				} else {
					this.$u.toast('取消收藏')
					this.isCllect = 0
				}

			},
			getLike(index) {
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if (this.commentList[index].isLike == true) {
					this.commentList[index].likeNum++;
				} else {
					this.commentList[index].likeNum--;
				}
			},
			// 添加购物车

			async addCarts() {
				if (this.$u.utils.isLogin()) {
					const params = {
						goods_id: this.goodsId
					}
					const res = await this.$u.api.addCarts(params)
					this.$u.toast('添加购物车成功')
					const resList = await this.$u.api.reqCartsList()
					this.cartsList = resList.data.data.length;
				}
			},
			
			// 跳转到购物车
			gotoCar () {
				this.$u.route({
					type: 'switchTab',
					url: 'pages/car/car'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.show {
		.content {
			display: flex;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			justify-content: space-between;
			padding: 0 25rpx;

			.price {
				color: red;
				font-size: 40rpx;
				font-weight: 800;
			}

			.sales {
				color: #999;
			}
		}
	}

	.comment {
		display: flex;
		padding: 30rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}

		.u-content {
			margin-top: 100rpx;
		}
	}

	.navigation {
		background-color: white;
		// justify-content: center;
		justify-content: space-between;
		padding: 0 30rpx;
		align-items: center;

		.left {
			text-align: center;
			display: flex;
		}

		.right {
			display: flex;

			.car {
				color: white;
				font-size: 30rpx;
				height: 80rpx;
				padding: 0 20rpx;
				text-align: center;
				line-height: 80rpx;
				margin-right: 25rpx;
				color: #F4F4F5;
				background-color: rgb(228, 59, 20);
				border-radius: 40rpx;
			}

			.buy {
				color: white;
				font-size: 30rpx;
				height: 80rpx;
				padding: 0 20rpx;
				color: #F4F4F5;
				text-align: center;
				line-height: 80rpx;
				background-color: rgb(255, 111, 0);
				border-radius: 40rpx;
			}
		}
	}
</style>
