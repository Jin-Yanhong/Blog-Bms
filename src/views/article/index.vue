<template>
	<div class="view">
		<el-form :inline="true" :model="query" class="demo-form-inline">
			<el-form-item label="Skill Name">
				<el-input v-model="query.name" placeholder="Skill Name" />
			</el-form-item>
			<el-form-item label="Skill Type">
				<el-select v-model="query.type" placeholder="Skill Type">
					<el-option label="Front End" value="1" />
					<el-option label="Back End" value="2" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleQuery">Query</el-button>
			</el-form-item>
		</el-form>
		<!--  -->
		<el-table :data="skillList" style="width: 100%">
			<el-table-column prop="name" label="name" />
			<el-table-column prop="score" label="score" />
			<el-table-column prop="index" label="index" />
			<el-table-column prop="color" label="color" />

			<el-table-column label="Operations" width="120">
				<template #default>
					<el-button
						link
						type="primary"
						size="small"
						@click="handleClick"
						>Detail</el-button
					>
					<el-button
						link
						type="primary"
						size="small"
						@click="handleEdit"
						>Edit</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";

interface queryForm {
	name: string;
	type: string;
}

interface skill {
	name: string;
	score: number;
	index: number;
	color: string;
}

export default defineComponent({
	name: "view_Article",
	setup() {
		let query = reactive<queryForm>({
			name: "",
			type: "",
		});

		let skillList: Array<skill> = [
			{
				name: "CSS",
				score: 1,
				index: 1,
				color: "#1266c9",
			},
		];
		return {
			query,
			skillList,
		};
	},
	methods: {
		handleQuery() {},
		handleClick() {},
		handleEdit() {},
	},
});
</script>
<style lang="scss" scoped></style>
