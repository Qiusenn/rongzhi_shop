<template>
	<view class="add-address" style="padding: 0 30rpx;">
		<template>
			<u-form :model="form" ref="uForm">
				<u-form-item label-width="150" label="联系姓名">
					<u-input v-model="form.name" />
				</u-form-item>
				<u-form-item label-width="150" label="联系电话">
					<u-input v-model="form.phone" />
				</u-form-item>
				<u-form-item label-width="150" label="选择城市">
					<u-input v-model="form.city" @click="value = true" type="select" />
				</u-form-item>
				<u-form-item label-width="150" label="详细地址">
					<u-input v-model="form.address" />
				</u-form-item>
				<u-form-item label-width="150" label="是否默认">
					<u-switch slot="right" v-model="isDefault"></u-switch>
				</u-form-item>
			</u-form>
			<u-button type="success" class="u-m-t-30" @click="resetAddress">修改地址</u-button>
		</template>

		<template>
			<view class="u-demo">
				<view class="u-demo-wrap">
					<view class="u-demo-area">
						<city-select v-model="value" @city-change="cityChange"></city-select>
						<view class="u-demo-result-line">{{ form.city ? form.city : 'Picker值' }}</view>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import citySelect from '../../components/u-city-select/u-city-select.vue';
	export default {
		data() {
			return {
				form: {
					name: '',
					phone: '',
					city: '',
					address: ''
				},
				radio: '',
				isDefault: false,

				height: 30,
				bgColor: this.$u.color.bgColor,
				marginTop: 30,
				marginBottom: 30,
				value: false,
			};
		},
		
		methods: {
				cityChange(e) {
					this.form.city = e.province.label + '-' + e.city.label + '-' + e.area.label;
				},
				
				/**
				 * 修改地址
				 */
				async resetAddress () {
					console.log(this.form.city);
					this.form.city.split('-')
					const addressParams = {
						name: this.form.name,
						address: this.form.address,
						phone: this.form.phone,
						province: this.form.city.split('-')[0],
						city: this.form.city.split('-')[1],
						county: this.form.city.split('-')[2],
						is_default: this.isDefault ? 1 : 0
					}
					await this.$u.api.addAddress(addressParams);
					this.$u.toast('添加成功')
					setTimeout( () => {
						this.$u.route({
							type: 'navigateBack'
						})
					},1500)
				}
			},
			
			

		components: {
			citySelect
		},
	};
</script>

<style lang="scss">
  .btn-wrap {
  		margin: 100rpx 30rpx;
  	}
</style>
