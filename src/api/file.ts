import request from '@/utils/request';

// 列出磁盘下所有文件
export function listDiskFiles(): Promise<any> {
    return request({
        url: 'files/listDiskFiles',
        method: 'get',
    });
}
// 列出磁盘下所有文件
export function listDBFiles(): Promise<any> {
    return request({
        url: 'files/listDBFiles',
        method: 'get',
    });
}

// 删除磁盘下指定文件
export function removeDiskFiles(fileName: string): Promise<any> {
    return request({
        url: `files/rmDiskFile/${fileName}`,
        method: 'delete',
    });
}
