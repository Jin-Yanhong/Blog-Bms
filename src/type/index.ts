export interface loginForm {
    password: string;
    user_name: string;
}

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
export interface article {
    title: string;
    subTitle: string;
    date: string;
    groupId: number;
    author: string;
    index: number;
    content: string;
    _id?: string;
}

export interface work {
    index: number;
    name: string;
    desc: string;
    tag: Array<string>;
    technology: Array<string>;
    screenShortUrl: string;
    _id?: string;
}

export interface dictKey {
    key: number;
    index: number;
    desc: string;
    label: string;
    value?: Array<dictValue>;
    _id?: string;
}

export interface diskFile {
    filename: string;
    createTime: string;
    size: number;
    mode: string;
}

export interface databaseFile {
    chunkSize: number;
    contentType: string;
    filename: string;
    length: number;
    uploadDate: string;
    _id: string;
}

export interface dictValueList {
    value: Array<dictValue>;
}

export interface dictValue {
    label: string;
    value: number;
}
