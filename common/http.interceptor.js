// /common/http.interceptor.js

// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'https://api.shop.eduwork.cn', // 请求的本域名
		method: 'POST',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: true, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {
			'content-type': 'application/json;charset=UTF-8'
		},
	});

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		config.header.Authorization = "Bearer " + vm.vuex_token

		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;

		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;

		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		// const token = uni.getStorageSync('token');
		// config.header.token = token;
		// config.header.Token = 'xxxxxx';

		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		if (config.url == '/user/login') config.header.noToken = true;
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}

	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// 数据 和 状态码
		const {
			data,
			statusCode
		} = res
		console.log(res);
		if (statusCode < 400) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			return res;
		} else if (statusCode == 401) {
			// 假设201为token失效，这里跳转登录
			if (data.message == "Unauthorized") {
				vm.$u.toast('账号或密码错误');
			} else {
			// vm.$u.toast(data.message);
			// 回退到登录页
			this.$u.utils.isLogin()
			}
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
				vm.$u.route('/pages/user/login')
			}, 1500)
			return false;
		}else if (statusCode === 400) {
			vm.$u.toast(data.message);
			return false
		} else if (statusCode === 422) {
			if(data.message === "The given data was invalid.") {
				// vm.$u.toast(data.errors.email[0]);
				vm.$u.toast(data.errors.num[0]);
				// console.log(data);
			}
			// vm.$u.toast(data.errors.type[0]);
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
				// vm.$u.route('/pages/user/login')
			}, 1500)
			return false;
		} else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	},
	// vm.$u.patch = (url, params = {}, hander = {}) => {
	// 	const _params = {
	// 		...params,
	// 		_methods: 'PATCH'
	// 	}
	// 	return vm.$u.post(url, _params, hander)
	// }
	
	// 增加patch请求
		vm.$u.patch = (url, params = {}, header = {}) => {
			// 模拟patch请求
			const _params = {
				...params,
				_method: 'PATCH'
			}
			return vm.$u.post(url, _params, header)
		}
}

export default {
	install
}
