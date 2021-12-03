<template>
	<view>
		<view class="u-p-l-30 u-p-r-30">
			<u-form :model="form"  :error-type="errorType" ref="uForm">
				<u-form-item label="姓名" prop="name" required>
					<u-input v-model="form.name" />
				</u-form-item>
			</u-form>
			<u-button @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				errorType: ['message'],
				form: {
					name: '',
					intro: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					intro: [{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}]
				}
			};
		},
		
		methods: {
				submit() {
					this.$refs.uForm.validate(async (valid) => {
						if (valid) {
							console.log('验证通过');
						} else {
							console.log('验证失败');
						}
					});
				}
			},
			// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
			onReady() {
				this.$refs.uForm.setRules(this.rules);
				this.form.name = this.vuex_user.name
			}
	}
</script>

<style lang="scss">

</style>
