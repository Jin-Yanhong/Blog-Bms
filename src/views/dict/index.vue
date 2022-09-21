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
		<el-table :data="dictList" class="listTable" border>
			<el-table-column prop="index" label="Index" align="center" width="70" />
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
			<el-form :model="itemForm" :disabled="formDisabled" label-position="top" ref="itemFormRef" :rules="rules">
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="Label" prop="label" required> <el-input v-model="itemForm.label" placeholder="Dict Title" /> </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="Index" prop="index" required> <el-input v-model="itemForm.index" placeholder="Dict Subtitle"></el-input> </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="Key" prop="key" required> <el-input v-model="itemForm.key" placeholder="Dict Key" /> </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="Desc" prop="desc" required> <el-input v-model="itemForm.desc" placeholder="Dict Subtitle"></el-input> </el-form-item>
					</el-col>
				</el-row>
				<span class="el-form-item__label"> Value </span>
				<div class="valueContainer">
					<p class="flex felx-center" v-for="tag in itemForm.value" :key="tag.value">
						<span style="flex-grow: 2"> <el-input v-model="tag.label"></el-input> </span>
						<span style="flex-grow: 2"><el-input readonly v-model="tag.value"></el-input></span>
						<span>
							<el-button type="danger" @click="handleTagDelete(tag)">
								<el-icon><Delete /></el-icon>
							</el-button>
						</span>
					</p>
					<p>
						<el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
						<el-button v-else class="button-new-tag ml-1" @click="showInput"> + Add New Tag </el-button>
					</p>
				</div>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">Cancel</el-button>
					<el-button type="primary" @click="onItemSubmit(itemFormRef)">Confirm</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { createDict, deleteDict, getDictContent, getDictList, updateDict } from '@/api/dict';
import { paginationConfig } from '@/const';
import { dialogType } from '@/enum';
import { dictKey, dictValue, queryForm } from '@/type';
import { ArrowLeft, ArrowRight, Delete, Edit, InfoFilled, Plus, Refresh } from '@element-plus/icons-vue';
import { defineComponent, nextTick, reactive, ref } from '@vue/runtime-core';
import type { FormInstance, FormRules } from 'element-plus';
import { ElInput, ElMessage, ElMessageBox } from 'element-plus';

export default defineComponent({
	name: 'view_Dict',
	setup() {
		let query = reactive<queryForm>({ pageSize: paginationConfig.pageSize, pageNum: paginationConfig.pageNum });
		let itemForm = reactive<dictKey>({
			key: 0,
			index: 0,
			label: '',
			desc: '',
			value: [],
		});
		const inputValue = ref('');
		const inputVisible = ref(false);
		const InputRef = ref<InstanceType<typeof ElInput>>();
		const itemFormRef = ref<FormInstance>();

		const formDisabled = ref<boolean>(false);

		const rules = reactive<FormRules>({
			key: [{ required: true, message: 'Please input key', trigger: 'change' }],
			index: [{ required: true, message: 'Please input index', trigger: 'blur' }],
			label: [{ required: true, message: 'Please input label', trigger: 'change' }],
			desc: [{ required: true, message: 'Please input desc', trigger: 'change' }],
			value: [{ required: true, message: 'Please input value', trigger: 'blur' }],
		});
		let dialogVisible = ref(false);
		let dictList = reactive<Array<dictValue>>([]);
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
			inputValue,
			inputVisible,
			InputRef,
			itemFormRef,
			rules,
			formDisabled,
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
		dialogType: function (nVal) {
			switch (nVal) {
				case dialogType.create:
					this.formDisabled = false;
					this.dialogTitle = 'Create';
					break;
				case dialogType.detail:
					this.formDisabled = true;
					this.dialogTitle = 'Detail';
					break;
				case dialogType.edit:
					this.formDisabled = false;
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
		setItemValue(item: dictKey) {
			this.itemFormRef?.resetFields();
			this.itemForm._id = item._id;
			this.itemForm.key = item.key;
			this.itemForm.index = item.index;
			this.itemForm.label = item.label;
			this.itemForm.desc = item.desc;
			this.itemForm.value = item.value;
		},
		handleQuery() {
			getDictList(this.query)
				.then(res => {
					this.dictList = res;
					this.isNextPageDisabled = this.dictList.length < this.query.pageSize;
					this.$forceUpdate();
				})
				.catch(err => {
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
				value: [],
			});
			this.dialogVisible = true;
		},
		handleDetail(item: dictKey) {
			this.setItemValue(item);
			getDictContent(item._id as string)
				.then(res => {
					this.dialogType = dialogType.detail;
					this.dialogVisible = true;
					this.itemForm.value = res.value;
				})
				.catch(err => {
					console.log(err);
				});
		},
		handleEdit(item: dictKey) {
			this.setItemValue(item);
			getDictContent(item._id as string)
				.then(res => {
					this.dialogType = dialogType.edit;
					this.dialogVisible = true;
					this.itemForm.value = res.value;
				})
				.catch(err => {
					console.log(err);
				});
		},
		handleDelete(item: dictKey) {
			ElMessageBox.confirm(`Are you sure to delete ${item.label} ?`)
				.then(() => {
					deleteDict(item._id as string)
						.then(res => {
							ElMessage({
								message: 'Deleted Successfully!',
								type: 'success',
							});
							this.handleQuery();
						})
						.catch(err => {
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
		onItemSubmit: async function (formEl: FormInstance | undefined) {
			switch (this.dialogType) {
				case dialogType.create:
					if (!formEl) return;
					await formEl.validate((valid, fields) => {
						if (valid) {
							delete this.itemForm._id;
							createDict(this.itemForm)
								.then(() => {
									this.dialogVisible = false;
									ElMessage({
										message: 'Created Successfully!',
										type: 'success',
									});
									this.handleQuery();
								})
								.catch(err => {
									console.log(err);
								});
						}
					});
					break;
				case dialogType.edit:
					if (!formEl) return;
					await formEl.validate((valid, fields) => {
						if (valid) {
							updateDict(this.itemForm._id as string, this.itemForm)
								.then(() => {
									this.dialogVisible = false;
									ElMessage({
										message: 'Created Successfully!',
										type: 'success',
									});
									this.handleQuery();
								})
								.catch(err => {
									console.log(err);
								});
						}
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
		handleTagDelete(tag: dictValue) {
			this.itemForm.value?.splice(this.itemForm.value?.indexOf(tag), 1);
			console.dir(this.itemForm.value);
		},
		showInput() {
			this.inputVisible = true;
			nextTick(() => {
				this.InputRef!.input!.focus();
			});
		},
		handleInputConfirm() {
			if (this.inputValue) {
				this.itemForm?.value?.push({
					label: this.inputValue,
					value: this.itemForm?.value?.length + 1,
				});
			}
			this.inputVisible = false;
			this.inputValue = '';
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

.valueContainer {
	max-height: 300px;
	overflow-y: auto;
	border-radius: 4px;
	border: 1px solid var(--el-border-color);
	p {
		padding: 10px;
		width: calc(100% - 22px);
		& > span {
			margin: 0 4px;
		}
		&:nth-last-child(1) {
			/* 偶数 */
			margin: 0;
			border-top: 1px solid var(--el-border-color);
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
