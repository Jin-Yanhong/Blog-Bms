import AppMain from '@/layout/components/AppMain.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            icon: 'login',
            cache: true,
            show: false,
        },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: AppMain,
        meta: {
            title: '系统概要',
            icon: 'dashboard',
            cache: true,
            show: true,
        },
        children: [
            {
                path: '',
                name: 'dashboard',
                meta: {
                    title: '总览',
                    icon: 'dashboard',
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
        component: AppMain,
        meta: {
            title: '系统管理',
            icon: 'dict',
            cache: true,
            show: false,
        },
        children: [
            {
                path: 'dict',
                name: 'dict',
                meta: {
                    title: '字典管理',
                    icon: 'dict',
                    cache: true,
                    show: true,
                },
                component: () => import('@/views/dict/index.vue'),
            },
        ],
    },
    {
        path: '/content',
        name: 'appMain',
        redirect: '/dashboard',
        component: AppMain,
        meta: {
            title: '内容管理',
            icon: '',
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
                    icon: 'article',
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
                    icon: 'skills',
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
                    icon: 'works',
                    cache: true,
                    show: true,
                },
            },
        ],
    },
    // 匹配不到页面返回 dashboard
    {
        path: '/:pathMatch(.*)*',
        redirect: '/dashboard',
        meta: {
            show: false,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
