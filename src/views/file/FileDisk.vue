<template>
    <div>
        <div class="operation">
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-button type="primary" @click="handleQuery">
                        <el-icon class="el-icon--refresh"><Refresh /></el-icon> Query
                    </el-button>
                    <el-button type="success" @click="handleUpload">
                        <el-icon class="el-icon--plus"><Plus /></el-icon> Upload
                    </el-button>
                </el-col>
            </el-row>
        </div>

        <!--  -->
        <el-table :data="fileList" class="listTable" border>
            <el-table-column prop="index" label="Index" align="center" width="70" />

            <el-table-column label="Link" align="center">
                <template #default="scope">
                    <div>
                        <a :href="`${assetsUrl}uploadFile/${scope.row.fileName}`" target="_blank" rel="noopener noreferrer">{{ `${assetsUrl}uploadFile/${scope.row.fileName}` }}</a>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="FileName" prop="fileName" align="center" />
            <el-table-column label="Operations" width="260" align="center">
                <template #default="scope">
                    <el-button type="info" size="small" @click="handleFileInfo(scope.row)">
                        <el-icon class="el-icon--infoFilled"><InfoFilled /></el-icon>Info
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">
                        <el-icon class="el-icon--delete"><Delete /></el-icon>Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--  -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%">
            <el-form :model="fileForm" label-position="top" ref="itemFormRef">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="FileName" prop="label"> <el-input readonly v-model="fileForm.fileName" placeholder="FileName" /> </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Size" prop="desc">
                            <el-input readonly v-model="fileForm.size" placeholder="Size">
                                <template #append> MB </template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="Create Time" prop="index"> <el-input readonly v-model="fileForm.createTime" placeholder="CreateTime"></el-input> </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Modified Time" prop="key"> <el-input readonly v-model="fileForm.modifiedTime" placeholder="modifiedTime" /> </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                </span>
            </template>
        </el-dialog>
        <!--  -->
        <el-dialog v-model="uploadDialogVisible" :title="dialogTitle" width="40%">
            <el-upload class="upload-demo" drag :http-request="(e:UploadRequestOptions) => uploadFile(e)">
                <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                <template #tip>
                    <div class="el-upload__tip">
                        <p style="font-size: 16px" v-for="(value, name) in uploaded.file" :key="name">{{ name }}：{{ value }}</p>
                    </div>
                </template>
            </el-upload>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="uploadDialogVisible = false">Cancel</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { listDiskFiles, saveFileToDisk, downloadFileFromDisk, getDiskFileInfo, removeDiskFiles } from '@/api/file';
import { dialogType } from '@/enum';
import { diskFile } from '@/type';
import { Delete, InfoFilled, Plus, Refresh, UploadFilled } from '@element-plus/icons-vue';
import type { UploadRequestOptions } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import { getDate, bitToMbit } from '@/utils';

export default defineComponent({
    name: 'FileDisk',
    setup() {
        const fileForm = reactive<diskFile>({
            fileName: '',
            size: 0,
            createTime: '',
            modifiedTime: '',
        });

        const assetsUrl = process.env.VUE_APP_ASSETS_URL;
        const uploadDialogVisible = ref(false);
        const dialogVisible = ref(false);
        const fileList = reactive<Array<diskFile>>([]);
        const dialogTitle = ref('');
        const dialogType = ref(0);
        const uploaded = reactive({
            file: {},
        });
        return {
            fileList,
            uploadDialogVisible,
            dialogVisible,
            dialogTitle,
            dialogType,
            assetsUrl,
            fileForm,
            uploaded,
        };
    },
    components: {
        Delete,
        Refresh,
        InfoFilled,
        Plus,
        UploadFilled,
    },
    watch: {
        dialogType: function (nVal) {
            switch (nVal) {
                case dialogType.upload:
                    this.dialogTitle = 'Upload';
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
        uploadFile(e: UploadRequestOptions) {
            const formData = new FormData();
            formData.append('file', e.file);
            saveFileToDisk(formData)
                .then((res) => {
                    this.handleQuery();
                    this.uploaded.file = res;
                })
                .catch((err) => {});
        },
        handleQuery() {
            listDiskFiles()
                .then((res) => {
                    this.fileList.length = 0;
                    res.forEach((file: diskFile) => {
                        this.fileList.push(file);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleUpload() {
            this.dialogType = dialogType.upload;
            this.uploadDialogVisible = true;
        },
        handleFileInfo(file: diskFile) {
            getDiskFileInfo(file.fileName)
                .then((res) => {
                    this.dialogType = dialogType.detail;
                    this.dialogVisible = true;
                    this.fileForm.createTime = this.getDate(res.createTime).date;
                    this.fileForm.modifiedTime = this.getDate(res.modifiedTime).date;
                    this.fileForm.fileName = res.fileName;
                    this.fileForm.size = this.bitToMbit(res.size);
                })
                .catch((err) => {});
        },
        handleDelete(file: diskFile) {
            ElMessageBox.confirm(`Are you sure to delete ${file.fileName} ?`)
                .then(() => {
                    removeDiskFiles(file.fileName)
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
        getDate,
        bitToMbit,
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
