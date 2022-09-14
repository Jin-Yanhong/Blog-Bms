<template>
	<div class="view">
		<div class="operation">
			<el-row :gutter="10">
				<el-col :span="6">
					<el-button type="primary" @click="handleQuery">
						<el-icon class="el-icon--refresh"><Refresh /></el-icon> Query
					</el-button>
					<el-button type="success" @click="handleCreate">
						<el-icon class="el-icon--plus"><Plus /></el-icon> Create
					</el-button>
				</el-col>
				<el-col :span="6"> </el-col>
			</el-row>
		</div>

		<!--  -->
		<el-table :data="skillList" class="listTable">
			<el-table-column prop="index" label="Index" align="center" />
			<el-table-column prop="name" label="Name" align="center" />
			<el-table-column prop="score" label="Score" align="center" />
			<el-table-column prop="color" label="Color" align="center">
				<template #default="scope">
					<div class="colorBlock" :style="{ backgroundColor: scope.row.color }">{{ scope.row.color }}</div>
				</template>
			</el-table-column>
			<el-table-column label="Operations" width="260" align="center">
				<template #default="scope">
					<el-button type="info" size="small" @click="handleDetail(scope.row)">
						<el-icon class="el-icon--more"><InfoFilled /></el-icon>Detail
					</el-button>
					<el-button type="primary" size="small" @click="handleEdit(scope.row)">
						<el-icon class="el-icon--edit"><Edit /></el-icon>Edit
					</el-button>
					<el-button type="danger" size="small" @click="handleDelete(scope.row)">
						<el-icon class="el-icon--delete"><Delete /></el-icon>Edit
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-button-group class="Pager" size="small">
			<el-button bg @click="PrevPage" :disabled="query.pageNum === 1">
				<el-icon class="el-icon--left"><ArrowLeft /></el-icon>Prev Page
			</el-button>
			<el-button bg @click="NextPage" :disabled="isNextPageDisabled">
				Next Page<el-icon class="el-icon--right"><ArrowRight /></el-icon>
			</el-button>
		</el-button-group>

		<!--  -->
		<el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%">
			<el-form :model="itemForm" class="demo-form-inline" label-position="top">
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="Name"> <el-input v-model="itemForm.name" placeholder="Skill Name" /> </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="Score"> <el-input v-model="itemForm.score" placeholder="Skill score" /> </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="Index"> <el-input v-model="itemForm.index" placeholder="Skill Name" /> </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="Color"> <el-input v-model="itemForm.color" placeholder="Skill score" /> </el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">Cancel</el-button>
					<el-button type="primary" @click="onItemSubmit">Confirm</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { createSkill, deleteSkill, getSkillsList, updateSkill } from '@/api/skills';
import { paginationConfig } from '@/const';
import { dialogType } from '@/enum';
import { queryForm, skill } from '@/type';
import { ArrowLeft, ArrowRight, Delete, Edit, InfoFilled, Plus, Refresh } from '@element-plus/icons-vue';
import { defineComponent, reactive, ref } from '@vue/runtime-core';
import { ElMessage, ElMessageBox } from 'element-plus';

export default defineComponent({
	name: 'view_Skills',
	setup() {
		let query = reactive<queryForm>({ pageSize: paginationConfig.pageSize, pageNum: paginationConfig.pageNum });
		let itemForm = reactive<skill>({ name: '', score: 0, index: 0, color: '' });
		let dialogVisible = ref(false);
		let skillList = reactive<Array<skill>>([]);
		let dialogTitle = ref('');
		let isNextPageDisabled = ref<boolean>(false);
		let dialogType = ref(0);
		return {
			query,
			skillList,
			itemForm,
			dialogVisible,
			dialogTitle,
			dialogType,
			isNextPageDisabled,
		};
	},
	components: {
		ArrowLeft,
		ArrowRight,
		Edit,
		InfoFilled,
		Refresh,
		Plus,
		Delete,
	},
	watch: {
		dialogType: function (nVal, oVal) {
			switch (nVal) {
				case dialogType.create:
					this.dialogTitle = 'Create';
					break;
				case dialogType.detail:
					this.dialogTitle = 'Detail';
					break;
				case dialogType.edit:
					this.dialogTitle = 'Edit';
					break;
				default:
					this.dialogTitle = '';
					break;
			}
		},
	},
	created() {
		this.handleQuery();
	},
	methods: {
		setItemValue(item: skill) {
			this.itemForm.name = item.name;
			this.itemForm.score = item.score;
			this.itemForm.index = item.index;
			this.itemForm.color = item.color;
			this.itemForm._id = item._id;
		},
		handleQuery() {
			getSkillsList(this.query)
				.then((res) => {
					this.skillList = res;
					this.isNextPageDisabled = this.skillList.length < this.query.pageSize;
					this.$forceUpdate();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		handleCreate() {
			this.dialogType = dialogType.create;
			this.setItemValue({
				name: '',
				score: 0,
				index: 0,
				color: '',
			});
			this.dialogVisible = true;
		},
		handleDetail(item: skill) {
			this.dialogType = dialogType.detail;
			this.dialogVisible = true;
			this.setItemValue(item);
		},
		handleEdit(item: skill) {
			this.dialogType = dialogType.edit;
			this.dialogVisible = true;
			this.setItemValue(item);
		},
		handleDelete(item: skill) {
			ElMessageBox.confirm(`Are you sure to delete ${item.name} ?`)
				.then(() => {
					deleteSkill(item._id as string)
						.then((res) => {
							ElMessage({
								message: 'Deleted Successfully!',
								type: 'success',
							});
							this.handleQuery();
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch(() => {
					// catch error
				});
		},
		PrevPage() {
			this.query.pageNum -= 1;
			this.handleQuery();
		},
		NextPage() {
			this.query.pageNum += 1;
			this.handleQuery();
		},
		onItemSubmit() {
			if (this.dialogType === dialogType.create) {
				delete this.itemForm._id;
				createSkill(this.itemForm)
					.then((res) => {
						this.dialogVisible = false;
						ElMessage({
							message: 'Updated Successfully!',
							type: 'success',
						});
						this.handleQuery();
					})
					.catch((err) => {
						console.log(err);
					});
			} else if (this.dialogType === dialogType.edit) {
				updateSkill(this.itemForm._id as string, this.itemForm)
					.then((res) => {
						this.dialogVisible = false;
						ElMessage({
							message: 'Created Successfully!',
							type: 'success',
						});
						this.handleQuery();
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},
	},
});
</script>
<style lang="scss" scoped>
.operation {
	margin-bottom: 10px;
}
.colorBlock {
	color: #fff;
	width: 80px;
	margin: auto;
	border-radius: 4px;
}
.operation,
.listTable {
	:deep(.el-button) {
		span {
			.el-icon {
				margin-right: 4px;
			}
		}
	}
}

.Pager {
	margin: 20px 0;
	float: right;
	&::after {
		content: '';
		clear: both;
		display: table;
	}
}
</style>
