// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
const install = (Vue, vm) => {
	vm.$u.api = {};
	// 此处使用了传入的params参数，一切自定义即可
	
	// 首页
	vm.$u.api.getIndex = (params = {}) => vm.$u.get('api/index', params);
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
}

export default {
	install
}