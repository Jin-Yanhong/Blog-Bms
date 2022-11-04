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
import { fileLocation } from '@/enum';
import { defineComponent, ref } from 'vue';
import FileDB from './FileDB.vue';
import FileDisk from './FileDisk.vue';

export default defineComponent({
    name: 'view_File',
    setup() {
        const storageLocation = ref(fileLocation.FileDisk);
        const assetsUrl = process.env.VUE_APP_ASSETS_URL;
        return {
            storageLocation,
            assetsUrl,
        };
    },
    components: {
        FileDB,
        FileDisk,
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
