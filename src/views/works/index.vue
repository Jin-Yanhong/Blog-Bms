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
        <el-table :data="workList" class="listTable">
            <el-table-column prop="index" label="Index" align="center" width="60" />
            <el-table-column prop="name" label="Name" align="center" />
            <el-table-column prop="desc" label="Description" align="center" />
            <el-table-column prop="technology" label="Technology" align="center">
                <template #default="scope">
                    <el-tag size="small" v-for="item in scope.row.technology" v-bind:key="item._id" effect="dark">{{ fieldTranslate(workItem.techList, item, 'value', 'label') }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="tag" label="Tag" align="center">
                <template #default="scope">
                    <el-tag size="small" v-for="item in scope.row.tag" v-bind:key="item._id" type="success" effect="dark">{{ fieldTranslate(workItem.tagList, item, 'value', 'label') }}</el-tag>
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
            <el-form :model="itemForm" :disabled="formDisabled" label-position="top" ref="itemFormRef" :rules="rules">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="Name" prop="name" required> <el-input v-model="itemForm.name" placeholder="Work Name" /> </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ScreenShortUrl" prop="screenShortUrl" required> <el-input v-model="itemForm.screenShortUrl" placeholder="Work ScreenShortUrl" /> </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="Tag" prop="tag" required>
                            <el-select v-model="itemForm.tag" placeholder="Work Tag" :multiple="true">
                                <el-option v-for="tag in workItem.tagList" :key="tag.value" :value="tag.value" :label="tag.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Technology" prop="technology" required>
                            <el-select v-model="itemForm.technology" placeholder="Work Technology" :multiple="true">
                                <el-option v-for="tech in workItem.techList" :key="tech.value" :value="tech.value" :label="tech.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="Description" prop="desc" required> <el-input type="textarea" :autosize="false" :resize="'none'" :rows="6" v-model="itemForm.desc" placeholder="Work Description" /> </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Index" prop="index" required> <el-input-number v-model="itemForm.index" placeholder="Work Description" /> </el-form-item>
                    </el-col>
                </el-row>
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
import { createWork, deleteWork, getWorkList, updateWork } from '@/api/work';
import { paginationConfig } from '@/const';
import { dialogType } from '@/enum';
import { dictValue, queryForm, work } from '@/type';
import { useDict } from '@/utils';
import { fieldTranslate } from '@/utils/index';
import { ArrowLeft, ArrowRight, Delete, Edit, InfoFilled, Plus, Refresh } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    name: 'view_Works',
    setup() {
        interface workDict {
            tagList: dictValue[];
            techList: dictValue[];
        }
        const query = reactive<queryForm>({ pageSize: paginationConfig.pageSize, pageNum: paginationConfig.pageNum });
        const itemForm = reactive<work>({
            index: 0,
            name: '',
            desc: '',
            tag: [],
            technology: [],
            screenShortUrl: '',
        });
        const workItem = reactive<workDict>({
            tagList: [],
            techList: [],
        });

        const itemFormRef = ref<FormInstance>();

        const formDisabled = ref<boolean>(false);

        const rules = reactive<FormRules>({
            index: [{ required: true, message: 'Please input index', trigger: 'change' }],
            name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
            desc: [{ required: true, message: 'Please input desc', trigger: 'change' }],
            tag: [{ required: true, message: 'Please input tag', trigger: 'change' }],
            technology: [{ required: true, message: 'Please input technology', trigger: 'blur' }],
            screenShortUrl: [{ required: true, message: 'Please input screenShortUrl', trigger: 'blur' }],
        });
        const dialogVisible = ref(false);
        const workList = reactive<Array<work>>([]);
        const dialogTitle = ref('');
        const isNextPageDisabled = ref<boolean>(false);
        const dialogType = ref(0);
        return {
            query,
            workList,
            itemForm,
            dialogVisible,
            workItem,
            dialogTitle,
            dialogType,
            isNextPageDisabled,
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
        dialogType: function (nVal, oVal) {
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
        // ???????????????
        useDict(1).then((dict) => {
            this.workItem.techList = dict.value;
        });
        // ????????????
        useDict(2).then((dict) => {
            this.workItem.tagList = dict.value;
        });
    },
    methods: {
        setItemValue(item: work) {
            this.itemFormRef?.resetFields();
            this.itemForm.name = item.name;
            this.itemForm.desc = item.desc;
            this.itemForm.tag = item.tag;
            this.itemForm.technology = item.technology;
            this.itemForm.screenShortUrl = item.screenShortUrl;
        },
        handleQuery() {
            getWorkList(this.query)
                .then((res) => {
                    this.workList = res;
                    this.isNextPageDisabled = this.workList.length < this.query.pageSize;
                    this.$forceUpdate();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleCreate() {
            this.dialogType = dialogType.create;
            this.setItemValue({
                index: 0,
                name: '',
                desc: '',
                tag: [],
                technology: [],
                screenShortUrl: '',
            });
            this.dialogVisible = true;
        },
        handleDetail(item: work) {
            this.dialogType = dialogType.detail;
            this.dialogVisible = true;
            this.setItemValue(item);
        },
        handleEdit(item: work) {
            this.dialogType = dialogType.edit;
            this.dialogVisible = true;
            this.setItemValue(item);
            this.itemForm._id = item._id;
        },
        handleDelete(item: work) {
            ElMessageBox.confirm(`Are you sure to delete ${item.name} ?`)
                .then(() => {
                    deleteWork(item._id as string)
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
        onItemSubmit: async function (formEl: FormInstance | undefined) {
            switch (this.dialogType) {
                case dialogType.create:
                    if (!formEl) return;
                    await formEl.validate((valid, fields) => {
                        if (valid) {
                            delete this.itemForm._id;
                            createWork(this.itemForm)
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
                        }
                    });
                    break;
                case dialogType.edit:
                    if (!formEl) return;
                    await formEl.validate((valid, fields) => {
                        if (valid) {
                            updateWork(this.itemForm._id as string, this.itemForm)
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
        fieldTranslate,
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

    :deep(.cell) {
        span {
            .el-icon {
                margin-right: 4px;
            }
        }
        .el-tag {
            margin: 0 2px;
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
