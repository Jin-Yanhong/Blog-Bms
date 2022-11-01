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
        <el-table :data="articleList" class="listTable">
            <el-table-column prop="index" label="Index" align="center" width="60" />
            <el-table-column prop="title" label="Title" align="center" />
            <el-table-column prop="subTitle" label="SubTitle" align="center" />
            <el-table-column prop="author" label="Author" align="center" />
            <el-table-column prop="groupId" label="Sort" align="center" />
            <el-table-column prop="date" label="Date" align="center" />
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
                        <el-form-item label="Title"> <el-input v-model="itemForm.title" placeholder="Article Title" /> </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Subtitle"> <el-input v-model="itemForm.subTitle" placeholder="Article Subtitle" /> </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="Author"> <el-input v-model="itemForm.author" placeholder="Article Author" /> </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Date"> <el-input v-model="itemForm.date" placeholder="Article Date" /> </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="Sort"> <el-input v-model="itemForm.groupId" placeholder="Article Sort" /> </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Index"> <el-input v-model="itemForm.index" placeholder="Article Name" /> </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="Content"> <el-input v-model="itemForm.content" placeholder="Article Content" /> </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="onItemSubmit(itemFormRef)">Confirm </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { createArticle, deleteArticle, getArticleContent, getArticleList, updateArticle } from '@/api/article';
import { paginationConfig } from '@/const';
import { dialogType } from '@/enum';
import { article, queryForm } from '@/type';
import { ArrowLeft, ArrowRight, Delete, Edit, InfoFilled, Plus, Refresh } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    name: 'view_Article',
    setup() {
        const query = reactive<queryForm>({ pageSize: paginationConfig.pageSize, pageNum: paginationConfig.pageNum });
        const itemForm = reactive<article>({ title: '', subTitle: '', date: '', groupId: 0, author: '', index: 0, content: '' });
        const dialogVisible = ref(false);
        const articleList = reactive<Array<article>>([]);
        const dialogTitle = ref('');

        const itemFormRef = ref<FormInstance>();

        const formDisabled = ref<boolean>(false);

        const rules = reactive<FormRules>({
            title: [{ required: true, message: 'Please input title', trigger: 'change' }],
            subTitle: [{ required: true, message: 'Please input subTitle', trigger: 'change' }],
            date: [{ required: true, message: 'Please input date', trigger: 'change' }],
            groupId: [{ required: true, message: 'Please input groupId', trigger: 'change' }],
            author: [{ required: true, message: 'Please input author', trigger: 'change' }],
            index: [{ required: true, message: 'Please input index', trigger: 'change' }],
            content: [{ required: true, message: 'Please input content', trigger: 'change' }],
        });
        const isNextPageDisabled = ref<boolean>(false);
        const dialogType = ref(0);
        return {
            query,
            articleList,
            itemForm,
            dialogVisible,
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
    },
    methods: {
        setItemValue(item: article) {
            this.itemForm._id = item._id;
            this.itemForm.title = item.title;
            this.itemForm.subTitle = item.subTitle;
            this.itemForm.date = item.date;
            this.itemForm.groupId = item.groupId;
            this.itemForm.author = item.author;
            this.itemForm.index = item.index;
            this.itemForm.content = item.content;
        },
        handleQuery() {
            getArticleList(this.query)
                .then((res) => {
                    this.articleList = res;
                    this.isNextPageDisabled = this.articleList.length < this.query.pageSize;
                    this.$forceUpdate();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleCreate() {
            this.dialogType = dialogType.create;
            this.setItemValue({
                title: '',
                subTitle: '',
                date: '',
                groupId: 0,
                author: '',
                index: 0,
                content: '',
            });
            this.dialogVisible = true;
        },
        handleDetail(item: article) {
            getArticleContent(item._id as string)
                .then((res) => {
                    this.dialogType = dialogType.detail;
                    this.dialogVisible = true;
                    this.setItemValue(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleEdit(item: article) {
            getArticleContent(item._id as string)
                .then((res) => {
                    this.dialogType = dialogType.edit;
                    this.dialogVisible = true;
                    this.setItemValue(res);
                    this.itemForm._id = item._id;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleDelete(item: article) {
            ElMessageBox.confirm(`Are you sure to delete ${item.title} ?`)
                .then(() => {
                    deleteArticle(item._id as string)
                        .then(() => {
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
                .catch((err) => {
                    console.log(err);
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
                            createArticle(this.itemForm)
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
                        }
                    });
                    break;
                case dialogType.edit:
                    if (!formEl) return;
                    await formEl.validate((valid, fields) => {
                        if (valid) {
                            updateArticle(this.itemForm._id as string, this.itemForm)
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
