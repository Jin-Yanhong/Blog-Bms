import { queryForm, skill } from "@/type";
import request from "@/utils/request";

export function getSkillsList(query: queryForm): Promise<any> {
	return request({
		url: "skills/getSkillsList",
		method: "get",
		params: { ...query },
	});
}

export function createSkill(doc: skill): Promise<any> {
	return request({
		url: "skills/createSkill",
		method: "put",
		data: {
			skill: doc,
		},
	});
}

export function updateSkill(id: string, doc: skill): Promise<any> {
	return request({
		url: "skills/updateSkill/" + id,
		method: "post",
		data: {
			skill: doc,
		},
	});
}

export function deleteSkill(id: string): Promise<any> {
	return request({
		url: "skills/deleteSkill/" + id,
		method: "delete",
	});
}
