import request from "@/utils/request";

export function getArticleList(pageSize: number, pageNum: number): Promise<any> {
	return request({
		url: "article/getArticleList",
		method: "get",
		params: {
			pageSize: pageSize,
			pageNum: pageNum,
		},
	});
}

export function getArticleContentById(id: string): Promise<any> {
	return request({
		url: "article/getArticleContentById/" + id,
		method: "get",
	});
}

export function updateArticleContentById(id: string, docs: any): Promise<any> {
	return request({
		url: "article/updateArticleContentById/" + id,
		method: "get",
		data: {
			...docs,
		},
	});
}
