import { queryForm, work } from '@/type';
import request from '@/utils/request';

// 创建文章
export function createWork(doc: work): Promise<any> {
    return request({
        url: 'work/createWork',
        method: 'put',
        data: {
            work: doc,
        },
    });
}
// 获取文章列表
export function getWorkList(query: queryForm): Promise<any> {
    return request({
        url: 'work/getWorkList',
        method: 'get',
        params: { ...query },
    });
}

// 获取文章详情
export function getWorkContent(id: string): Promise<any> {
    return request({
        url: 'work/getWorkContent/' + id,
        method: 'get',
    });
}

// 文章更新
export function updateWork(id: string, doc: work): Promise<any> {
    return request({
        url: 'work/updateWork/' + id,
        method: 'post',
        data: {
            work: doc,
        },
    });
}

// 文章删除
export function deleteWork(id: string): Promise<any> {
    return request({
        url: 'work/deleteWork/' + id,
        method: 'delete',
    });
}
