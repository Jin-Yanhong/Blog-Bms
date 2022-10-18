import { useDictByKey } from '@/api/dict';
import { dictValue, dictValueList } from '@/type';

/**
 *
 * @param key 字典key
 * @returns
 */
export async function useDict (key: number) {
    const dict: Promise<dictValueList> = await useDictByKey(key);
    return dict;
}

/**
 *
 * @param collection 翻译需要对照的数据
 * @param value 待翻译的值
 * @param collectionField 对照集合中的字段 默认 'value'
 * @param collectionLabel 对照集合中的字段名称 默认 'label'
 * @returns
 */
export function fieldTranslate (collection: Array<dictValue>, value: number, collectionField: keyof dictValue = 'value', collectionLabel: keyof dictValue = 'label') {
    if (collection && value && value.toString().length) {
        if (Object.prototype.toString.call(collection) === '[object Array]') {
            const checked = collection.find((ele: dictValue) => {
                return ele[collectionField] == value;
            });
            const tips = (checked && checked[collectionLabel]) || 'Error';
            return tips;
        } else {
            console.log('fieldTranslate Error: the type of the first parameter must be array!');
            return '';
        }
    } else {
        console.log('fieldTranslate Error: please check function parameters!');
        return '';
    }
}

export function getDate () {
    const date = new Date();
    return {
        date: `${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()} 周${'日一二三四五六'.charAt(date.getDay())}`,
        imageIndex: date.getDay() + 1,
    };
}

export function getStorage (key: string): string {
    const str: string = window.localStorage.getItem(key) ?? '';
    try {
        if (str) {
            return JSON.parse(str)[key];
        } else {
            return '';
        }
    } catch (error: any) {
        return '';
    }
}

export function setStorage (key: string, value: any): void {
    const str = JSON.stringify({
        [key]: value,
    });
    window.localStorage.setItem(key, str);
}

export function clearStorage (): void {
    window.localStorage.clear();
}
