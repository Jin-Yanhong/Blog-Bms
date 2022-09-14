export interface queryForm {
    name?: string;
    type?: string;
    pageSize: number;
    pageNum: number;
}

export interface skill {
    name: string;
    score: number;
    index: number;
    color: string;
    _id?: string;
}
