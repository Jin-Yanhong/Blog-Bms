import request from '@/utils/request';

// 列出磁盘下所有文件
export function listDiskFiles(): Promise<any> {
    return request({
        url: 'files/listDiskFiles',
        method: 'get',
    });
}
// 上传文件至磁盘
export function saveFileToDisk(data: FormData): Promise<any> {
    return request({
        url: 'files/saveFileToDisk',
        method: 'post',
        data,
    });
}
// 磁盘文件下载
export function downloadFileFromDisk(fileName: string): Promise<any> {
    return request({
        url: `files/downloadFileFromDisk/${fileName}`,
        method: 'get',
    });
}
// 磁盘文件属性
export function getDiskFileInfo(fileName: string): Promise<any> {
    return request({
        url: `files/getDiskFileInfo/${fileName}`,
        method: 'get',
    });
}

// 删除磁盘下指定文件
export function removeDiskFiles(fileName: string): Promise<any> {
    return request({
        url: `files/removemDiskFile/${fileName}`,
        method: 'delete',
    });
}

/**  数据库文件 **/

// 删除磁盘下指定文件
export function listDBFiles(): Promise<any> {
    return request({
        url: '/files/listDBFiles',
        method: 'get',
    });
}

// 上传文件到数据库
export function saveFileToDataBase(data: FormData): Promise<any> {
    return request({
        url: '/files/saveFileToDataBase',
        method: 'post',
        data,
    });
}

//
export function downloadFileFromDB(fileName: string): Promise<any> {
    return request({
        url: `/files/downloadFileFromDB/${fileName}`,
        method: 'get',
    });
}

// 数据库文件详情
export function getDataBaseFileInfo(id: string): Promise<any> {
    return request({
        url: `/files/getDataBaseFileInfo/${id}`,
        method: 'get',
    });
}

// 数据库文件删除
export function removeFileFromDataBase(id: string): Promise<any> {
    return request({
        url: `/files/removeFileFromDataBase/${id}`,
        method: 'delete',
    });
}
