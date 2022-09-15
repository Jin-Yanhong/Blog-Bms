<template>
	<template v-if="item.children">
		<ElSubMenu :index="fatherPath + '/' + item.path">
			<template v-slot:title>
				<span>
					<slot name="title"> {{ item.meta.title }} </slot>
				</span>
			</template>
			<SidebarItem v-for="child in item.children" :item="child" :basePath="fatherPath" />
		</ElSubMenu>
	</template>
	<template v-else>
		<ElMenuItem v-if="item.meta.show" :index="fatherPath + '/' + item.path" @click="menuClick(item)">
			<span> {{ item.meta.title }} </span>
		</ElMenuItem>
	</template>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { ElMenuItem, ElSubMenu } from 'element-plus';
import { RouteRecordRaw } from 'vue-router';
export default defineComponent({
	setup(props: any) {
		let { item, basePath: fatherPath } = props;
		return {
			item,
			fatherPath,
		};
	},
	props: {
		item: { type: Object, required: true },
		basePath: { type: String, required: true },
	},
	name: 'SidebarItem',
	components: {
		ElSubMenu,
		ElMenuItem,
	},
	methods: {
		menuClick(item: RouteRecordRaw) {
			let path = this.fatherPath + '/' + item.path;
			this.$router.push(path);
		},
	},
});
</script>

<style lang="scss" scoped></style>
