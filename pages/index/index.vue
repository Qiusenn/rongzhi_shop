<template>
	<view class="content ">
		<u-swiper :list="slides" name="img_url"></u-swiper>
		<!-- 导航栏 -->
		<view class="shop-nav u-m-t-20">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="changeNav"></u-tabs>
		</view>
		
		<!-- 商品 -->
		<view class="wrap u-skeleton">
			<u-row gutter="16 " >
				<u-col span="6" v-for="goods in goodsList" class="u-m-t-20" >
					<!-- <view class="demo-layout bg-purple"> -->
						<!-- 商品组件 -->
						<goods-item :item="goods"/>
					<!-- </view> -->
					
				</u-col>
			</u-row>
		</view>
		<u-skeleton :loading="loading" el-color="#ddd" bg-color="#fff"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图
				slides: [],
				// 商品
				goodsList: [{},{},{},{}],

				list: [
					{name: '默认'}, 
					{name: '销量'}, 
					{name: '推荐'},
					{name: '最新'}
				],
				current: 0,
				page: 1,
				loading: false
			}
		},
		async onLoad() {
			// 异步获取首页数据
			// let res = await this.$u.get('/api/index?page=1')
			// let res = await this.$u.post('/api/auth/wx/bind',{type:'ubind',openid:123456})
			// let res = await this.$u.patch('/api/orders/1/confirm',)
			await this.getIndexData()
			
			// 验证是否登录
			// if(!this.$u.utils.isLogin()) return
		},
		methods: {
			changeNav(index) {
				// 当前导航条下标
				goodsList: [{},{},{},{}],
				
				this.page = 1
				this.current = index;
				this.getIndexData()
			},
			// 获取首页数据函数
			async getIndexData () {
				this.loading = true
				// 获取首页数据
				const params = {
					page: this.page
				}
				if (this.current === 1) params.sales = 1
				if (this.current === 2) params.recommend = 1
				if (this.current === 3) params.new = 1
				let res = await this.$u.api.getIndex(params)
				this.loading = false
				// 获取轮播图
				this.slides = res.data.slides;
				// 获取首页商品数据
				this.goodsList = this.goodsList.pop().title ? [...this.goodsList, ...res.data.goods.data] : res.data.goods.data
			}
		},
		
		// 滚动刷新下一页或者更多商品数据
		onReachBottom () {
			this.page++
			this.getIndexData()
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
