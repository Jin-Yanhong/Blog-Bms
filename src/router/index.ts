import Layout from '@/layout/index.vue';
import { useUserStore } from '@/store/user';
import { ElMessage } from 'element-plus';
import NProgress from 'nprogress';
import { createRouter, createWebHashHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import 'nprogress/nprogress.css';

const whiteList = ['/login'];

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            cache: true,
            show: false,
        },
    },
    {
        path: '/',
        redirect: '/dashboard',
        name: 'root',
        component: Layout,
        meta: {
            title: '系统概要',
            icon: 'Odometer',
            cache: true,
            show: true,
        },
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                meta: {
                    title: '总览',
                    icon: 'PieChart',
                    cache: true,
                    show: true,
                },
                component: () => import('@/views/dashboard/index.vue'),
            },
        ],
    },
    {
        path: '/system',
        name: 'system',
        redirect: '/system/dict',
        component: Layout,
        meta: {
            title: '系统管理',
            icon: 'Setting',
            cache: true,
            show: false,
        },
        children: [
            {
                path: 'dict',
                name: 'dict',
                meta: {
                    title: '字典管理',
                    icon: 'Notebook',
                    cache: true,
                    show: true,
                },
                component: () => import('@/views/dict/index.vue'),
            },
        ],
    },
    {
        path: '/content',
        name: 'content',
        redirect: '/content/article',
        component: Layout,
        meta: {
            title: '内容管理',
            icon: 'Collection',
            cache: true,
            show: false,
        },
        children: [
            {
                path: 'article',
                name: 'article',
                component: () => import('@/views/article/index.vue'),
                meta: {
                    title: '文章管理',
                    icon: 'Document',
                    cache: true,
                    show: true,
                },
            },
            {
                path: 'skills',
                name: 'skills',
                component: () => import('@/views/skills/index.vue'),
                meta: {
                    title: '技能管理',
                    icon: 'Box',
                    cache: true,
                    show: true,
                },
            },
            {
                path: 'works',
                name: 'works',
                component: () => import('@/views/works/index.vue'),
                meta: {
                    title: '作品管理',
                    icon: 'Basketball',
                    cache: true,
                    show: true,
                },
            },
        ],
    },
    {
        path: '/file',
        name: 'file',
        redirect: '/file',
        component: Layout,
        meta: {
            title: '文件管理',
            icon: 'files',
            cache: true,
            show: false,
        },
        children: [
            {
                path: '',
                name: 'index',
                component: () => import('@/views/file/index.vue'),
                meta: {
                    title: '附件管理',
                    icon: 'Document',
                    cache: true,
                    show: true,
                },
            },
        ],
    },
    // 匹配不到页面返回 dashboard
    {
        path: '/:pathMatch(.*)*',
        name: 'redirect',
        redirect: '/dashboard',
        meta: {
            show: false,
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
});

// FIXME: 此处仅用于部署 github pages
if (process.env.NODE_ENV === 'development') {
    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
        NProgress.start();
        if (useUserStore().getToken) {
            if (to.path === '/login') {
                next({ path: '/' });
                NProgress.done();
            } else {
                try {
                    next();
                } catch (err: any) {
                    useUserStore().handleLogout();
                    ElMessage.error(err.message || 'Has Error');
                    next('/login');
                    NProgress.done();
                }
            }
        } else {
            if (whiteList.indexOf(to.path) !== -1) {
                next();
            } else {
                next('/login');
                NProgress.done();
            }
        }
    });
}

router.afterEach((to: RouteLocationNormalized) => {
    NProgress.done();

    document.title = 'BMS' + ' | ' + to.meta?.title;
});
export default router;
