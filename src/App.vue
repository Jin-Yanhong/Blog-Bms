<template>
	<router-view />
	<keep-alive></keep-alive>
</template>
<script lang="ts">
import { useUserStore } from '@/store/user';
import { clearStorage } from '@/utils/index';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
	name: 'App',
	setup() {
		const user = useUserStore();
		return {
			user,
		};
	},
	created() {},
	beforeDestroy() {
		clearStorage();
	},
});
</script>
<style lang="scss"></style>
