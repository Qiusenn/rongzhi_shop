const install = (Vue, vm) => {
	/**
	 * 是否登录
	 */
	const isLogin = () => {
		const token = vm.vuex_token
		if (!token) {
			vm.$u.toast('请登录')
			setTimeout(() => {
				vm.$u.route({
					type: 'redirectTo',
					url:'pages/auth/login'
				})
			},1500)

			// 获取跳转到登录页面之前的路由，存储到localStorage 用于页面回源跳转
			const currentPage = getCurrentPages().pop()
			// 回源路由、回源params参数
			const {route, options} = currentPage
			// 拼接params参数
			let params = ""
			let currentParamsArr = Object.keys(options);
			if (currentParamsArr.length !== 0) {
				params = currentParamsArr.reduce( (pre, item) => {
					return `${pre}${item}=${options[item]}&`
				},'?').slice(0,-1)
			}
			uni.setStorageSync('currentPage', route + params);
			
			return false
		}
		return true;
	}
	
	
	vm.$u.utils = {
		isLogin,

	}
}


export default {
	install
}