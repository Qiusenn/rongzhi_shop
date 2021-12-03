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
	
}

export default {
	install
}