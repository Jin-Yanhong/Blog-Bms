import { dict, queryForm } from '@/type';
import request from '@/utils/request';

// 创建字典
export function createDict(doc: dict): Promise<any> {
    return request({
        url: 'dict/createDict',
        method: 'put',
        data: {
            dict: doc,
        },
    });
}
// 获取字典列表
export function getDictList(query: queryForm): Promise<any> {
    return request({
        url: 'dict/getDictList',
        method: 'get',
        params: { ...query },
    });
}

// 获取字典详情
export function getDictContent(id: string): Promise<any> {
    return request({
        url: 'dict/getDictContent/' + id,
        method: 'get',
    });
}

// 字典更新
export function updateDict(id: string, doc: dict): Promise<any> {
    return request({
        url: 'dict/updateDict/' + id,
        method: 'post',
        data: {
            dict: doc,
        },
    });
}

// 字典删除
export function deleteDict(id: string): Promise<any> {
    return request({
        url: 'dict/deletDict/' + id,
        method: 'delete',
    });
}
