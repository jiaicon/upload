import { message } from 'antd';
import fetch from './request';

const getBanner = (options) => {
    fetch('/api/banner', { method: 'GET' })
        .then((res) => {
            console.log('请求结果', res);
            if (typeof res === 'object' && 'status' in res && res.status === 0) {
                options.success && typeof options.success === 'function' && options.success(res);
            } else {
                options.failed && typeof options.failed === 'function' && options.failed();
                message.error('请求失败，请配置url或检查网络');
                console.warn('The request failed. Configure the URL or check the network');
            }
        });
};
const putBanner = (id, data, options) => {
    // drag为移动的id,hover为移动的序号
    fetch(`/api/banner/${id}`, { method: 'PUT', data: { ...data } })
        .then((res) => {
            console.log('请求结果', res);
            if (typeof res === 'object' && 'status' in res && res.status === 0) {
                options.success && typeof options.success === 'function' && options.success(res);
            } else {
                options.failed && typeof options.failed === 'function' && options.failed(res);
                message.error('请求失败，请配置url或检查网络');
                console.warn('The request failed. Configure the URL or check the network');
            }
        });
};
const postBanner = (data, options) => {
    fetch('/api/banner', { method: 'POST', data: { ...data } })
        .then((res) => {
            console.log('请求结果', res);
            if (typeof res === 'object' && 'status' in res && res.status === 0) {
                options.success && typeof options.success === 'function' && options.success(res);
            } else {
                options.failed && typeof options.failed === 'function' && options.failed();
                message.error('请求失败，请配置url或检查网络');
                console.warn('The request failed. Configure the URL or check the network');
            }
        });
};
const delBanner = (id, options) => {
    fetch(`/api/banner/${id}`, { method: 'DELETE' })
        .then((res) => {
            console.log('请求结果', res);
            if (typeof res === 'object' && 'status' in res && res.status === 0) {
                options.success && typeof options.success === 'function' && options.success(res);
            } else {
                options.failed && typeof options.failed === 'function' && options.failed();
                message.error('请求失败，请配置url或检查网络');
                console.warn('The request failed. Configure the URL or check the network');
            }
        });
};


// 排序
function createComparisonFunction(propertyName) {
    return function (object1, object2) {
        const value1 = object1[propertyName];
        const value2 = object2[propertyName];
        if (value1 < value2) {
            return -1;
        } if (value1 > value2) {
            return 1;
        } 
            return 0;
    };
}

export {
    getBanner,
    putBanner,
    postBanner,
    delBanner,
    createComparisonFunction
};
