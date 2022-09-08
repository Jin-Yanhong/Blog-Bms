<template>
    <template v-if="true">
        <sidebar-item-link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
            <el-menu-item index="0">
                <span>
                    <slot name="title"> title </slot>
                </span>
            </el-menu-item>
        </sidebar-item-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
        <template v-slot:title>
            <span>
                <slot name="title"> title </slot>
            </span>
        </template>
        <template>
            <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :is-collapse="isCollapse"
                :is-first-level="false" :base-path="resolvePath(child.path)" class="nest-menu" />
        </template>
    </el-submenu>
</template>

<script lang="ts">
import path from 'path'
import SidebarItemLink from "./SidebarItemLink.vue";
import { defineComponent } from "@vue/runtime-core";
import { RouteRecord } from "vue-router";
import { isExternal } from "@/utils/validate";

export default defineComponent({
    setup(props: any) {
        let { item, isCollapse, isFirstLevel, basePath, } = props
        return {

            item,
            isCollapse,
            isFirstLevel,
            basePath,
        };
    },
    props: {
        item: { type: RouteRecord, required: true, },
        isCollapse: { type: Boolean, default: false, },
        isFirstLevel: { type: Boolean, default: true },
        basePath: { type: String, default: '' },
    },

    name: "SidebarItem",
    components: {
        SidebarItemLink,
    },
    methods: {
        resolvePath(routePath: string) {
            if (isExternal(routePath)) {
                return routePath;
            }
            if (isExternal(this.basePath)) {
                return this.basePath;
            }
            return path.resolve(this.basePath, routePath);
        },
    },
});
</script>

<style lang="scss" scoped>

</style>
