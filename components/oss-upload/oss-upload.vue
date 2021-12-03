<template>
	<u-upload 
	:action="action" 
	:max-size="5 * 1024 * 1024" max-count="1"
	:custom-btn="true"
	:show-progress="false"
	:multiple="false"
	:deletable="false"
	:show-upload-list="true"
	:form-data="formData"
	width="0"
	height="0"
	:before-upload="beforeUpload">
	<u-avatar :src="vuex_user.avatar_url" slot="addBtn" size="140"></u-avatar>
	</u-upload>
</template>

<script>
	let _this = {}
	export default {
		name: "oss-upload",
		data() {
			return {
				action: "http:/laravel_shop_api.luwnto.oss-cn-beijing.aliyuncs.com/",
				formData: {}
			};
		},
		created () {
			_this = this;
		},
		methods: {
			/**
			 * 上传前的钩子
			 */
			async beforeUpload(index, list) {
				const ossTOKEN = await this.$u.api.reqOssToken();
				console.log(ossToken);
				return true;
			},
			
		}
	}
</script>

<style lang="scss">

</style>
