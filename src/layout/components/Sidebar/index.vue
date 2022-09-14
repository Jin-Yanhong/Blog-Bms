<template>
	<div class="sidebar">
		<!-- :default-active="currentRouter" -->
		<el-menu :background-color="bgColor" active-text-color="#ffd04b" class="el-menu-vertical-demo" text-color="#fff" mode="vertical" @open="handleOpen" @close="handleClose">
			<SidebarItem v-for="route in routerList" :item="route" />
		</el-menu>
	</div>
</template>

<script lang="ts">
import { routes } from '@/router';
import { Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue';
import { defineComponent, ref } from '@vue/runtime-core';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
	setup() {
		const routerList = routes;
		let currentRouter = ref('/dashboard');
		const bgColor = '#545c64';
		return {
			bgColor,
			routerList,
			currentRouter,
		};
	},
	name: 'Side_bar',
	components: {
		Document,
		IconMenu,
		Setting,
		SidebarItem,
	},
	methods: {
		handleOpen: (key: string, keyPath: string[]) => {},
		handleClose: (key: string, keyPath: string[]) => {},
	},
	watch: {
		$route: function (nVal, oVal) {},
	},
});
</script>
<style lang="scss" scoped>
.sidebar {
	border-right: solid 1px var(--el-menu-border-color);
	background-color: v-bind(bgColor);
	:deep(.el-menu) {
		border: none;
	}
}
</style>
