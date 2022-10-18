<template>
    <div class="app-container">
        <div>
            <div class="loginForm">
                <el-card shadow="never">
                    <template #header>
                        <div class="card-header">
                            <span>Welcome to {{ AppName }}</span>
                        </div>
                    </template>
                    <el-form :model="form" :label-width="labelWidth" label-position="left" ref="loginFormRef" :rules="rules">
                        <el-form-item label="User Name" prop="user_name" required>
                            <el-input v-model="form.user_name" autocomplete="off" placeholder="your user name" />
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
import type { FormInstance, FormRules } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    setup () {
        const form = reactive<loginForm>({
            user_name: 'admin',
            password: 'admin',
        });
        const AppName = ref<string>('');
        const user = useUserStore();
        const labelWidth = ref('140px');
        const loginFormRef = ref<FormInstance>();

        const backgroundImg = ref<string>('');
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
            AppName,
            backgroundImg,
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
    created () {
        this.AppName = process.env.VUE_APP_NAME as string;
    },
});
</script>
<style lang="scss" scoped>
.app-container {
    height: 100vh;
    overflow: hidden;
    background-position: 0 0;
    background-repeat: none;
    background-size: 100%;
    background-image: url(@/assets/loginBg.jpeg);

    .loginForm {
        margin: 300px auto 0 auto;
        width: 400px;
        :deep(.el-form-item__content) {
            width: calc(100% - v-bind(labelWidth));
        }
    }
}
</style>
