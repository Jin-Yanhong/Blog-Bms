<template>
	<div class="view">
		<div class="box">
			<div class="one">1</div>
			<div class="two">2</div>
			<div class="three">3</div>
			<div class="four">4</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from '@vue/runtime-core';
import { ElInput } from 'element-plus';

export default defineComponent({
	name: 'view_dashboard',
	setup(props, ctx) {
		const inputValue = ref('');
		const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3']);
		const inputVisible = ref(false);
		const InputRef = ref<InstanceType<typeof ElInput>>();
		return {
			inputValue,
			dynamicTags,
			inputVisible,
			InputRef,
		};
	},
	methods: {
		handleClose(tag: string) {
			this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
		},
		showInput() {
			this.inputVisible = true;
			nextTick(() => {
				this.InputRef!.input!.focus();
			});
		},
		handleInputConfirm() {
			if (this.inputValue) {
				this.dynamicTags.push(this.inputValue);
			}
			this.inputVisible = false;
			this.inputValue = '';
		},
	},
});
</script>
<style lang="scss" scoped>
.box {
	display: grid;
	grid-template-rows: repeat(2, calc(50% - 5px));
	grid-template-columns: repeat(2, calc(50% - 5px));
	gap: 10px;
	height: 100%;
	background: #fff;
	.one {
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 1;
		grid-column-end: 2;
		background: #0abde3;
	}
	.two {
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 2;
		grid-column-end: 3;
		background: #54a0ff;
	}
	.three {
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 1;
		grid-column-end: 2;
		background: #ee5253;
	}
	.four {
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 2;
		grid-column-end: 3;
		background: #10ac84;
	}
}
</style>
