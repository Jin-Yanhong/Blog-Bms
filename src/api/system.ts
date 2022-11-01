import request from '@/utils/request';

// 获取bing wallpaper
export function getBingWallpaper(): Promise<any> {
    return request({
        url: 'links/bingWallpaper',
        method: 'get',
    });
}
