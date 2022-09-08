import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 5000,
    // withCredentials: true // send cookies when cross-domain requests
});

// Request interceptors
service.interceptors.request.use(
    (config) => {
        // if (UserModule.token) {
        //   config.headers['X-Access-Token'] = UserModule.token
        // }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// Response interceptors
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code !== 200) {
            ElMessage({
                message: res.message || "Error",
                type: "error",
                duration: 5 * 1000,
            });
            if (res.code === 403) {
                ElMessageBox.confirm(
                    "你已被登出，可以取消继续留在该页面，或者重新登录",
                    "确定登出",
                    {
                        confirmButtonText: "重新登录",
                        cancelButtonText: "取消",
                        type: "warning",
                    }
                ).then(() => {
                    // TODO:RESET TOKEN
                    // UserModule.ResetToken();
                    location.reload(); // To prevent bugs from vue-router
                });
            }
            return Promise.reject(new Error(res.message || "Error"));
        } else {
            return response.data;
        }
    },
    (error) => {
        ElMessage({
            message: error.message,
            type: "error",
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    }
);

export default service;
