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
            hiden: false,
        },
    },
    {
        path: "/",
        name: "appMain",
        redirect: "/dashboard",
        component: AppMain,
        children: [
            {
                path: "article",
                name: "article",
                component: () => import("@/views/article/index.vue"),
                meta: {
                    title: "article",
                    icon: "article",
                    cache: true,
                    hiden: false,
                },
            },
            {
                path: "dashboard",
                name: "dashboard",
                component: () => import("@/views/dashboard/index.vue"),
                meta: {
                    title: "dashboard",
                    icon: "dashboard",
                    cache: true,
                    hiden: false,
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
                    hiden: false,
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
                    hiden: false,
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
            hide: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
