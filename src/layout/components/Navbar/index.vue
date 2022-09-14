<template>
	<div class="navbar">顶部导航栏</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
	name: 'nav_Bar',
});
</script>
<style lang="scss" scoped>
@import '@/style/variables.scss';

.navbar {
	bottom: 1px solid $border-color;
}
</style>
