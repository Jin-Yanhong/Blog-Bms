import { article, queryForm } from '@/type';
import request from '@/utils/request';

// 创建文章
export function createArticle(doc: article): Promise<any> {
    return request({
        url: 'article/createArticle',
        method: 'put',
        data: {
            article: doc,
        },
    });
}
// 获取文章列表
export function getArticleList(query: queryForm): Promise<any> {
    return request({
        url: 'article/getArticleList',
        method: 'get',
        params: { ...query },
    });
}

// 获取文章详情
export function getArticleContent(id: string): Promise<any> {
    return request({
        url: 'article/getArticleContent/' + id,
        method: 'get',
    });
}

// 文章更新
export function updateArticle(id: string, doc: article): Promise<any> {
    return request({
        url: 'article/updateArticle/' + id,
        method: 'post',
        data: {
            article: doc,
        },
    });
}

// 文章删除
export function deleteArticle(id: string): Promise<any> {
    return request({
        url: 'article/deleteArticle/' + id,
        method: 'delete',
    });
}
