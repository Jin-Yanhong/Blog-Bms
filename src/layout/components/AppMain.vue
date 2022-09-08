<template>
    <div class="app-container">
        <Sidebar class="sidebar" />
        <Navbar class="navbar" />
        <router-view class="appView" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Sidebar from "./Sidebar/index.vue";
import Navbar from "./Navbar/index.vue";
export default defineComponent({
    setup() {
        return {};
    },
    name: "App_Main",
    components: {
        Sidebar,
        Navbar,
    },
});
</script>
<style lang="scss" scoped>
.app-container {
    display: grid;
    grid-template-rows: [r1] 80px [r2] calc(100vh - 80px) [r3];
    grid-template-columns: [r1] 200px [r2] calc(100vw - 200px) [r3];
    grid-auto-flow: row;
    grid-template-areas:
        "a b"
        "c d";

    .sidebar {
        grid-row-start: 1;
        grid-row-end: 3;
        grid-column-start: 1;
        grid-column-end: 2;
    }
    .navbar {
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start: 2;
        grid-column-end: 3;
    }
    .appView {
        grid-row-start: 2;
        grid-row-end: 3;
        grid-column-start: 2;
        grid-column-end: 2;
    }
}
</style>
