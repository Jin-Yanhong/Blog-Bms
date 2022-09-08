<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item
            ><a href="/">promotion management</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem } from "element-plus";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    setup() {
        return {};
    },
    name: "Bread_crumb",
    components: {
        ElBreadcrumb,
        ElBreadcrumbItem,
    },
    watch: {},
    methods: {},
});
</script>

<style lang="scss" scoped></style>
