<template>
    <div class="view">
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="Approved by">
                <el-input v-model="form.user" placeholder="Approved by" />
            </el-form-item>
            <el-form-item label="Activity zone">
                <el-input v-model="form.password" placeholder="Approved by" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";

interface loninForm {
    user: string;
    password: string;
}
export default defineComponent({
    setup() {
        let form = reactive<loninForm>({
            user: "",
            password: "",
        });
        return {
            form,
        };
    },
    name: "view_Skills",
    methods: {
        onSubmit() {
            //
        },
    },
});
</script>
<style lang="scss" scoped></style>
