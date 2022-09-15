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
		<el-table :data="dictList" class="listTable">
			<el-table-column prop="index" label="Index" align="center" width="60" />
			<el-table-column prop="label" label="Label" align="center" width="300" />
			<el-table-column prop="key" label="Key" align="center" width="60" />
			<el-table-column prop="desc" label="Description" align="center" />
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
						<el-form-item label="Title"> <el-input v-model="itemForm.label" placeholder="dict Title" /> </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="Subtitle"> <el-select v-model="itemForm.value" placeholder="dict Subtitle"></el-select> </el-form-item>
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
import { createDict, deleteDict, getDictContent, getDictList, updateDict } from '@/api/dict';
import { paginationConfig } from '@/const';
import { dialogType } from '@/enum';
import { dict, queryForm } from '@/type';
import { ArrowLeft, ArrowRight, Delete, Edit, InfoFilled, Plus, Refresh } from '@element-plus/icons-vue';
import { defineComponent, reactive, ref } from '@vue/runtime-core';
import { ElMessage, ElMessageBox } from 'element-plus';

export default defineComponent({
	name: 'view_Dict',
	setup() {
		let query = reactive<queryForm>({ pageSize: paginationConfig.pageSize, pageNum: paginationConfig.pageNum });
		let itemForm = reactive<dict>({
			key: 0,
			index: 0,
			label: '',
			desc: '',
		});
		let dialogVisible = ref(false);
		let dictList = reactive<Array<dict>>([]);
		let dialogTitle = ref('');
		let isNextPageDisabled = ref<boolean>(false);
		let dialogType = ref(0);
		return {
			query,
			dictList,
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
		setItemValue(item: dict) {
			this.itemForm._id = item._id;
			this.itemForm.key = item.key;
			this.itemForm.index = item.index;
			this.itemForm.value = item.value;
			this.itemForm.label = item.label;
		},
		handleQuery() {
			getDictList(this.query)
				.then((res) => {
					this.dictList = res;
					this.isNextPageDisabled = this.dictList.length < this.query.pageSize;
					this.$forceUpdate();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		handleCreate() {
			this.dialogType = dialogType.create;
			this.setItemValue({
				key: 0,
				index: 0,
				label: '',
				desc: '',
			});
			this.dialogVisible = true;
		},
		handleDetail(item: dict) {
			getDictContent(item._id as string)
				.then((res) => {
					this.dialogType = dialogType.detail;
					this.dialogVisible = true;
					this.setItemValue(res);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		handleEdit(item: dict) {
			this.dialogType = dialogType.edit;
			this.setItemValue(item);
			this.dialogVisible = true;
		},
		handleDelete(item: dict) {
			ElMessageBox.confirm(`Are you sure to delete ${item.label} ?`)
				.then(() => {
					deleteDict(item._id as string)
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
			switch (this.dialogType) {
				case dialogType.create:
					delete this.itemForm._id;
					createDict(this.itemForm)
						.then(() => {
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
					break;
				case dialogType.edit:
					updateDict(this.itemForm._id as string, this.itemForm)
						.then(() => {
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
					break;
				case dialogType.detail:
					this.dialogVisible = false;
					break;
				default:
					this.dialogVisible = false;
					break;
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
