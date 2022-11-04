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
            <el-table-column label="Link" align="center">
                <template #default="scope">
                    <div>
                        <a :href="`${assetsUrl}uploadFile/${scope.row}`" target="_blank" rel="noopener noreferrer">{{ `${assetsUrl}uploadFile/${scope.row}` }}</a>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="FileName" align="center">
                <template #default="scope">
                    <div>
                        {{ scope.row }}
                    </div>
                </template>
            </el-table-column>
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
            <el-form :model="fileForm" readonly label-position="top" ref="itemFormRef">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="FileName" prop="label"> <el-input v-model="fileForm.filename" placeholder="FileName" /> </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="CreateTime" prop="index"> <el-input v-model="fileForm.createTime" placeholder="CreateTime"></el-input> </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="Mode" prop="key"> <el-input v-model="fileForm.mode" placeholder="Mode" /> </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Size" prop="desc"> <el-input v-model="fileForm.size" placeholder="Size"></el-input> </el-form-item>
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
import { listDiskFiles, saveFileToDisk, downloadFileFromDisk, getDiskFileInfo, removeDiskFiles } from '@/api/file';
import { dialogType } from '@/enum';
import { diskFile } from '@/type';
import { Delete, InfoFilled, Plus, Refresh } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    name: 'FileDisk',
    setup() {
        const fileForm = reactive<diskFile>({
            filename: '',
            createTime: '',
            size: 0,
            mode: '',
        });

        const assetsUrl = process.env.VUE_APP_ASSETS_URL;
        const uploadDialogVisible = ref(false);
        const dialogVisible = ref(false);
        const fileList = reactive<Array<string>>([]);
        const dialogTitle = ref('');
        const dialogType = ref(0);

        return {
            fileList,
            uploadDialogVisible,
            dialogVisible,
            dialogTitle,
            dialogType,
            assetsUrl,
            fileForm,
        };
    },
    components: {
        Delete,
        Refresh,
        InfoFilled,
        Plus,
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
            listDiskFiles()
                .then((res) => {
                    this.fileList = res;
                    this.$forceUpdate();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleUpload() {
            this.dialogType = dialogType.upload;
            this.dialogVisible = true;
        },
        handleFileInfo(item: diskFile) {
            getDiskFileInfo(item.filename)
                .then((res) => {
                    this.dialogType = dialogType.detail;
                    this.dialogVisible = true;
                    this.fileForm = res[0];
                    this.$forceUpdate();
                })
                .catch((err) => {});
        },
        handleDelete(item: diskFile) {
            ElMessageBox.confirm(`Are you sure to delete ${item} ?`)
                .then(() => {
                    removeDiskFiles(item.filename)
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
