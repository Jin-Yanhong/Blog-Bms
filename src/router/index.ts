import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AppMain from "@/layout/components/AppMain.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index.vue"),
        meta: {
            title: "login",
            icon: "login",
            cache: true,
            show: false,
        },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: AppMain,
        meta: {
            title: "dashboard",
            icon: "dashboard",
            cache: true,
            show: false,
        },
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: "dashboard",
                    icon: "dashboard",
                    cache: true,
                    show: true,
                },
                component: () => import("@/views/dashboard/index.vue"),
            },
        ],
    },
    {
        path: "/",
        name: "appMain",
        redirect: "/article",
        component: AppMain,
        meta: {
            title: "内容管理",
            icon: "login",
            cache: true,
            show: false,
        },
        children: [
            {
                path: "article",
                name: "article",
                component: () => import("@/views/article/index.vue"),
                meta: {
                    title: "article",
                    icon: "article",
                    cache: true,
                    show: true,
                },
            },
            {
                path: "skills",
                name: "skills",
                component: () => import("@/views/skills/index.vue"),
                meta: {
                    title: "skills",
                    icon: "skills",
                    cache: true,
                    show: true,
                },
            },
            {
                path: "works",
                name: "works",
                component: () => import("@/views/works/index.vue"),
                meta: {
                    title: "works",
                    icon: "works",
                    cache: true,
                    show: true,
                },
            },
        ],
    },
    // 匹配不到页面返回 dashboard
    {
        path: "/:pathMatch(.*)*",
        name: "404",
        redirect: "/dashboard",
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
