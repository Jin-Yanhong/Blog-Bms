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
					<el-form
						:model="form"
						:label-width="labelWidth"
						label-position="left"
						ref="loginFormRef"
						:rules="rules"
					>
						<el-form-item
							label="user name"
							prop="userName"
							required
						>
							<el-input
								v-model="form.userName"
								placeholder="your user name"
							/>
						</el-form-item>
						<el-form-item
							label="user password"
							prop="password"
							required
						>
							<el-input
								type="password"
								v-model="form.password"
								placeholder="password"
							/>
						</el-form-item>
						<el-form-item>
							<el-button
								type="primary"
								@click="onSubmit(loginFormRef)"
								>Login</el-button
							>
						</el-form-item>
					</el-form>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import route from "@/router";
import { defineComponent, reactive, ref } from "@vue/runtime-core";
import type { FormInstance, FormRules } from "element-plus";
interface loginForm {
	userName: string;
	password: string;
}

export default defineComponent({
	setup() {
		let form = reactive<loginForm>({
			userName: "",
			password: "",
		});
		let labelWidth = ref("120px");

		const loginFormRef = ref<FormInstance>();

		const rules = reactive<FormRules>({
			userName: [
				{
					required: true,
					message: "Please input user name",
					trigger: "blur",
				},
			],
			password: [
				{
					required: true,
					message: "Please select user password",
					trigger: "change",
				},
			],
		});

		return {
			form,
			rules,
			labelWidth,
			loginFormRef,
		};
	},
	name: "view_Login",
	methods: {
		onSubmit: async (formEl: FormInstance | undefined) => {
			if (!formEl) return;
			await formEl.validate((valid, fields) => {
				if (valid) {
					// TODO: login Api
					// console.log("submit!");
					route.replace("/");
				} else {
					console.log("error submit!", fields);
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
