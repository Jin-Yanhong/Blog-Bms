import { loginForm } from '@/type';
import request from '@/utils/request';

export function login (loginForm: loginForm): Promise<any> {
    return request({
        url: 'user/login',
        method: 'post',
        data: { ...loginForm },
    });
}
