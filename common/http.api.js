// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
const install = (Vue, vm) => {
	vm.$u.api = {};
	// 此处使用了传入的params参数，一切自定义即可
	
	// 首页
	vm.$u.api.getIndex = (params = {}) => vm.$u.get('api/index', params);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	// 登录
	vm.$u.api.reqUserLogin = (params) => vm.$u.post('api/auth/login', params)
	
	// 请求用户数据
	vm.$u.api.reqUserInfo = () => vm.$u.get('api/user')
	
	// 获取商品id
	vm.$u.api.goodsInfo = (id) => vm.$u.get(`/api/goods/${id}`)
	
	// 退出登录
	vm.$u.api.logout = () => vm.$u.post('/api/auth/logout')
	
	// 修改用户信息
	vm.$u.api.reqUserInfoUpdata = (params) => vm.$u.put('api/user',params)
	
	// 请求修改api
	vm.$u.api.reqOssToken = () => vm.$u.get('/api/auth/oss/token')
	
	// 注册
	vm.$u.api.reqUserRegister = (params) => vm.$u.post('api/auth/register',params)
	
	// 收藏
	vm.$u.api.collect = (id) => vm.$u.post(`/api/collects/goods/${id}`)
	
	// 添加购物车	
	vm.$u.api.addCarts = (params) => vm.$u.post(`/api/carts`,params)
	
	// 获取购物车列表 
	vm.$u.api.reqCartsList = () => vm.$u.get('/api/carts')
	
	// 获取商品数据  
	vm.$u.api.reqGoodsList = (params = {}) => vm.$u.get('/api/goods', params)
	
	// 获取购物车商品数据  /api/carts
	vm.$u.api.reqCartsData = () => vm.$u.get('/api/carts?include=goods')
	
	// 购物车数量变化 https://api.shop.eduwork.cn/api/carts/8411?num=9
	vm.$u.api.reqCartsNum = (id,params) => vm.$u.put(`/api/carts/${id}`, params)
	
	// 移除购物车  https://api.shop.eduwork.cn/api/carts/8409
	vm.$u.api.reqdeldteGoods = (id) => vm.$u.delete(`/api/carts/${id}`)
	
	// 重新勾选购物车  				https://api.shop.eduwork.cn/api/carts/checked?cart_ids=[8427]
	vm.$u.api.resetSelectShop = (params) => vm.$u.patch(`/api/carts/checked`,params)
	
	// 订单预览 https://api.shop.eduwork.cn/api/orders/preview
	vm.$u.api.reqgoodsPreview = () => vm.$u.get('/api/orders/preview')
	
	// 添加地址 https://api.shop.eduwork.cn/api/address
	vm.$u.api.addAddress = (params) => vm.$u.post(`/api/address`,params)
	
	// 获取地址列表 https://api.shop.eduwork.cn/api/address
	vm.$u.api.reqaddressList = () => vm.$u.get('/api/address')
	
	// 删除地址 https://api.shop.eduwork.cn/api/address/1416
	vm.$u.api.deleteAddress = (addressId) => vm.$u.delete(`/api/address/${addressId}`)
	
	// 设置默认地址  /api/address/{address}/default
	vm.$u.api.setDefaultAddress = (id) => vm.$u.patch(`/api/address/${id}/default`)
	
	// 提交订单  https://api.shop.eduwork.cn/api/orders?address_id=1422
	vm.$u.api.commitOrder = (addressId) => vm.$u.post(`/api/orders`,addressId)
	
	// 获取支付二维码  https://api.shop.eduwork.cn/api/orders/4277/pay?type=aliyun
	vm.$u.api.reqErweima = (orderId) => vm.$u.get(`/api/orders/${orderId}/pay?type=aliyun`)
	  
	// 轮询请求 支付状态  /api/orders/{order}/status
	vm.$u.api.reqPayStatus = (orderId) => vm.$u.get(`/api/orders/${orderId}/status`)
	
	// 获取订单详情  https://api.shop.eduwork.cn/api/orders/4300?include=orderDetails.goods,address
	vm.$u.api.reqOrderDetail = (orderId) => vm.$u.get(`/api/orders/${orderId}?include=orderDetails.goods,address`)

	// 所有订单列表  https://api.shop.eduwork.cn/api/orders?include=orderDetails.goods&page=1
	vm.$u.api.reqOrderList = (page = 1) => vm.$u.get(`/api/orders?include=orderDetails.goods&page=${page}`)
	
}

export default {
	install
}