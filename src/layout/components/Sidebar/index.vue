<template>
    <div class="sidebar">
        <el-menu default-active="1">
            <SidebarItem> </SidebarItem>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Document, Menu as IconMenu, Setting } from "@element-plus/icons-vue";
import SidebarItem from "./SidebarItem.vue";
import { routes } from "@/router";

export default defineComponent({
    setup() {
        const routerList = routes;

        return {
            routerList,
        };
    },
    name: "Side_bar",
    components: {
        Document,
        IconMenu,
        Setting,
        SidebarItem,
    },
    methods: {
        handleOpen(key: string, keyPath: string[]) {
            console.log(key, keyPath);
        },
        handleClose(key: string, keyPath: string[]) {
            console.log(key, keyPath);
        },
    },
});
</script>
<style lang="scss" scoped>
.sidebar {
    width: 200px;
    // box-sizing: border-box;
    border-right: solid 1px var(--el-menu-border-color);

    // 穿透组件样式
    :deep(.el-menu) {
        border: none;
    }
}
</style>
