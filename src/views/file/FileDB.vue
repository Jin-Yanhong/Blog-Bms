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
            <el-table-column prop="index" label="Index" align="center" width="70">
                <template #default="scope">
                    {{ fileList.indexOf(scope.row) + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="filename" label="FileName" align="center" />
            <el-table-column prop="contentType" label="FileType" align="center" />
            <el-table-column prop="uploadDate" label="UploadTime" align="center" />
            <el-table-column label="Operations" width="360" align="center">
                <template #default="scope">
                    <el-button type="info" size="small" @click="handleFileInfo(scope.row)">
                        <el-icon class="el-icon--infoFilled"><InfoFilled /></el-icon>Info
                    </el-button>
                    <el-button type="warning" size="small" @click="handleDownload(scope.row)">
                        <el-icon class="el-icon--download"><Download /></el-icon>Download
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">
                        <el-icon class="el-icon--delete"><Delete /></el-icon>Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--  -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%">
            <el-form :model="fileForm" readonly label-position="top" ref="itemFormRef">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="FileName" prop="label"> <el-input v-model="fileForm.filename" placeholder="FileName" /> </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ContentType" prop="index"> <el-input v-model="fileForm.contentType" placeholder="ContentType"></el-input> </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="ChunkSize" prop="key"> <el-input v-model="fileForm.chunkSize" placeholder="ChunkSize" /> </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Length" prop="desc"> <el-input v-model="fileForm.length" placeholder="Length"></el-input> </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="UploadDate" prop="key"> <el-input v-model="fileForm.uploadDate" placeholder="UploadDate" /> </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ID" prop="desc"> <el-input v-model="fileForm._id" placeholder="ID"></el-input> </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="uploadDialogVisible" :title="dialogTitle" width="40%">
            文件上传
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { listDBFiles, saveFileToDataBase, downloadFileFromDB, getDataBaseFileInfo, removeFileFromDataBase } from '@/api/file';
import { dialogType, fileLocation } from '@/enum';
import { databaseFile } from '@/type';
import { Delete, Download, InfoFilled, Plus, Refresh } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    name: 'FileDB',
    setup() {
        const fileForm = reactive<databaseFile>({
            chunkSize: 0,
            contentType: 'image/jpeg',
            filename: '',
            length: 12800416,
            uploadDate: '',
            _id: '',
        });
        const storageLocation = ref(fileLocation.FileDisk);
        const assetsUrl = process.env.VUE_APP_ASSETS_URL;
        const dialogVisible = ref(false);
        const uploadDialogVisible = ref(false);
        const fileList = reactive<Array<string>>([]);
        const dialogTitle = ref('');
        const dialogType = ref(0);

        return {
            fileList,
            dialogVisible,
            uploadDialogVisible,
            dialogTitle,
            dialogType,
            storageLocation,
            assetsUrl,
            fileForm,
        };
    },
    components: {
        Delete,
        Refresh,
        InfoFilled,
        Plus,
        Download,
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
        handleQuery() {
            listDBFiles()
                .then((res) => {
                    this.fileList.length = 0;
                    res.forEach((file: any) => {
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
        handleDownload(item: databaseFile) {
            ElMessageBox.confirm(`Are you sure to download ${item._id} ?`)
                .then(() => {
                    downloadFileFromDB(item.filename)
                        .then((res) => {
                            window.open(res, '_blank');
                        })
                        .catch((err) => {});
                })
                .catch(() => {});
        },
        handleFileInfo(item: databaseFile) {
            getDataBaseFileInfo(item._id)
                .then((res) => {
                    this.dialogType = dialogType.detail;
                    this.dialogVisible = true;
                    this.fileForm = res[0];
                    this.$forceUpdate();
                })
                .catch((err) => {});
        },
        handleDelete(item: databaseFile) {
            ElMessageBox.confirm(`Are you sure to delete ${item.filename} ?`)
                .then(() => {
                    removeFileFromDataBase(item._id)
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
        onItemSubmit: async function (formEl: FormInstance | undefined) {
            switch (this.dialogType) {
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
