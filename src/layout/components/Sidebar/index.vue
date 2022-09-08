<template>
    <div class="sidebar">
        <el-menu mode="vertical">
            <SidebarItem v-for="route in routerList" :item="route" />
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
    methods: {},
});
</script>
<style lang="scss" scoped>
.sidebar {
    width: 200px;
    border-right: solid 1px var(--el-menu-border-color);

    :deep(.el-menu) {
        border: none;
    }
}
</style>
