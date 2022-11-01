import { login } from '@/api/user';
import { loginForm } from '@/type';
import { clearStorage, getStorage, setStorage } from '@/utils/index';
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        token: getStorage('token'),
    }),
    getters: {
        getToken: (state) => {
            return state.token;
        },
    },
    actions: {
        handleLogout() {
            this.$patch({
                token: '',
            });
            clearStorage();
        },
        async handleLogin(loginForm: loginForm) {
            try {
                const { accessToken = '' } = await login(loginForm);
                setStorage('token', accessToken);
                this.$patch({
                    token: accessToken,
                });
            } catch (error: any) {
                this.$patch({
                    token: '',
                });
                clearStorage();
            }
        },
    },
});
