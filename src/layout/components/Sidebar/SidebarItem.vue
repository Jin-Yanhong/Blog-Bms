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
        <ElMenuItem v-if="item.meta.show">
            <span>
                {{item.meta.title}}
            </span>
        </ElMenuItem>
    </template>
</template>

<script lang="ts">
import { defineComponent, } from "@vue/runtime-core";
import { ElSubMenu, ElMenuItem } from "element-plus";

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
    methods: {},
});
</script>

<style lang="scss" scoped>

</style>
