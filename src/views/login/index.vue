<template>
	<div class="app-container">
		<div>
			<div class="loginForm">
				<el-card shadow="never">
					<template #header>
						<div class="card-header">
							<span>System Login</span>
						</div>
					</template>
					<el-form :model="form" :label-width="labelWidth" label-position="left" ref="loginFormRef" :rules="rules">
						<el-form-item label="User Name" prop="user_name" required>
							<el-input v-model="form.user_name" placeholder="your user name" />
						</el-form-item>
						<el-form-item label="User Password" prop="password" required>
							<el-input type="password" v-model="form.password" placeholder="password" />
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit(loginFormRef)">Login</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import route from '@/router';
import { useUserStore } from '@/store/user';
import { loginForm } from '@/type';
import { defineComponent, reactive, ref } from '@vue/runtime-core';
import type { FormInstance, FormRules } from 'element-plus';

export default defineComponent({
	setup() {
		let form = reactive<loginForm>({
			password: '',
			user_name: '',
		});
		const user = useUserStore();
		let labelWidth = ref('140px');
		const loginFormRef = ref<FormInstance>();
		const rules = reactive<FormRules>({
			user_name: [
				{
					required: true,
					message: 'Please input user name',
					trigger: 'blur',
				},
			],
			password: [
				{
					required: true,
					message: 'Please select user password',
					trigger: 'change',
				},
			],
		});

		return {
			form,
			rules,
			labelWidth,
			loginFormRef,
			user,
		};
	},
	name: 'view_Login',
	methods: {
		onSubmit: async function (formEl: FormInstance | undefined) {
			if (!formEl) return;
			await formEl.validate((valid, fields) => {
				if (valid) {
					this.user.handleLogin(this.form);
					setTimeout(() => {
						route.replace('/');
					}, 200);
				}
			});
		},
	},
});
</script>
<style lang="scss" scoped>
.app-container {
	.loginForm {
		margin: 100px auto;
		width: 400px;
		:deep(.el-form-item__content) {
			width: calc(100% - v-bind(labelWidth));
		}
	}
}
</style>
