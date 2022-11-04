<template>
    <div class="view">
        <div class="operation">
            <el-row :gutter="10">
                <el-col :span="10">
                    <span> Select Storage Location : </span>
                    <el-select v-model="storageLocation">
                        <el-option value="FileDisk" label="LocalDisk"> </el-option>
                        <el-option value="FileDB" label="DataBase"> </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <component :is="storageLocation" />
    </div>
</template>
<script lang="ts">
import { dialogType, fileLocation } from '@/enum';
import { fileItem } from '@/type';
import { Plus, Refresh } from '@element-plus/icons-vue';
import { defineComponent, reactive, ref } from 'vue';
import FileDB from './FileDB.vue';
import FileDisk from './FileDisk.vue';

export default defineComponent({
    name: 'view_File',
    setup() {
        const fileForm = reactive<fileItem>({
            name: '',
            type: '',
        });
        const storageLocation = ref(fileLocation.FileDisk);
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
        FileDB,
        FileDisk,
        Refresh,
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
        handleQuery() {},
        handleUpload() {
            this.dialogType = dialogType.upload;
            this.dialogVisible = true;
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
