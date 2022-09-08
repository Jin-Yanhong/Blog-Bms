<template>
    <template v-if="item.children">
        <ElSubMenu :index="item.path">
            <template v-slot:title>
                <span>
                    <slot name="title"> {{item.meta.title}} </slot>
                </span>
            </template>
            <SidebarItem v-for="child in item.children" :item="child" />
        </ElSubMenu>
    </template>
    <template v-else>
        <ElMenuItem v-if="item.meta.show" @click="menuClick(item)">
            <span>
                {{item.meta.title}}
            </span>
        </ElMenuItem>
    </template>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent, } from "@vue/runtime-core";
import { ElSubMenu, ElMenuItem } from "element-plus";
import { RouteRecordRaw } from "vue-router";

export default defineComponent({
    setup(props: any) {
        let { item, } = props
        return {
            item,
        };
    },
    props: {
        item: { type: Object, required: true, },

    },
    name: "SidebarItem",
    components: {
        ElSubMenu,
        ElMenuItem,

    },
    methods: {

        menuClick(menuItem: RouteRecordRaw) {
            console.log(menuItem)
            this.$router.push(menuItem.path)
        }
    },
});
</script>

<style lang="scss" scoped>

</style>
