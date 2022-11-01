<template>
    <div class="view">
        <div class="operation">
            <el-row :gutter="10">
                <el-col :span="10">
                    <span> Select Storage Location : </span>
                    <el-select v-model="storageLocation">
                        <el-option value="LocalDisk" label="LocalDisk"> </el-option>
                        <el-option value="DataBase" label="DataBase"> </el-option>
                    </el-select>
                </el-col>
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
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%"> 上传文件 </el-dialog>
    </div>
</template>
<script lang="ts">
import { listDBFiles, listDiskFiles, removeDiskFiles } from '@/api/file';
import { dialogType, fileLocation } from '@/enum';
import { fileItem } from '@/type';
import { Delete, InfoFilled, Plus, Refresh } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    name: 'view_File',
    setup() {
        const fileForm = reactive<fileItem>({
            name: '',
            type: '',
        });
        const storageLocation = ref(fileLocation.LocalDisk);
        const assetsUrl = process.env.VUE_APP_ASSETS_URL;
        const dialogVisible = ref(false);
        const fileList = reactive<Array<string>>([]);
        const dialogTitle = ref('');
        const dialogType = ref(0);

        return {
            fileList,
            dialogVisible,
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
        storageLocation: function (nVal) {
            this.handleQuery();
        },
    },
    created() {
        this.handleQuery();
    },
    methods: {
        handleQuery() {
            if (this.storageLocation == fileLocation.LocalDisk) {
                listDiskFiles()
                    .then((res) => {
                        this.fileList = res.files;
                        this.$forceUpdate();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                listDBFiles()
                    .then((res) => {
                        this.fileList = res.files;
                        this.$forceUpdate();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        handleUpload() {
            this.dialogType = dialogType.upload;
            this.dialogVisible = true;
        },
        handleFileInfo(item: string) {},
        handleDelete(item: string) {
            ElMessageBox.confirm(`Are you sure to delete ${item} ?`)
                .then(() => {
                    removeDiskFiles(item)
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
