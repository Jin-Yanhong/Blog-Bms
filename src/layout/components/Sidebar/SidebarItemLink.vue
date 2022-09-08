<template>
    <a v-if="$isExternal(to)" :href="to" target="_blank" rel="noopener">
        <slot />
    </a>
    <router-link v-else :to="to">
        <slot />
    </router-link>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
    setup(props) {
        let to = ref("");
        return {
            to,
        };
    },
    props: {
        to: String,
    },
});
</script>
