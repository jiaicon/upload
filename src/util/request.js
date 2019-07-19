function isPlainObject(o) {
    return typeof o === 'object' && o.constructor === Object;
}

/**
 *
 * @param {string} requestUrl
 * @param {object} requestOptions
 *    @param {string}   method
 *    @param {object}   headers
 *    @param {boolean}  loaƒding       是否显示默认 loading
 *    @param {boolean}  noRedirect    接口返回未登录(token失效)是否自动跳转登录页
 *    @param {string}   successWords  接口调用成功后的提示语
 */
export default function request(requestUrl, requestOptions = {}) {
    let url = requestUrl;
    const options = {
        ...requestOptions
    };
    // window.apiHost
    if (url.indexOf('http') !== 0) {
        url = window.apiHost || `http://localhost:40004${url}`;
    }

    if (!options.method) {
        options.method = 'POST';
    }

    if (options.loading !== false) {
        options.loading = true;
    }

    // 自定义头必须设置 mode 为 cors
    options.mode = 'cors';

    // 处理 data，value 支持基本类型之外还支持数组以及单层结构的 plain object 对于数组数据，例如{url:['1','2']} 会转换为
    // url[]=1&&url[]=2 对于对象数据，例如 {url:{protocol: 'http', query:'a'}} 会转化为
    // url[protocol]=http&&url[query]=a
    const data = options.data || {};
    const keys = Object.keys(data);
    const params = [];
    keys.forEach((key) => {
        const value = data[key];
        if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
                value.forEach(v => params.push(
                        `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`
                    ));
            } else if (isPlainObject(value)) {
                for (const k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                        params.push(
                            `${encodeURIComponent(key)}[${encodeURIComponent(
                                k
                            )}]=${encodeURIComponent(value[k])}`
                        );
                    }
                }
            } else {
                params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        }
    });
    options.headers = {};
    if (options.method === 'POST') {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        options.body = params.join('&');
    } else {
        url = `${url}?${params.join('&')}`;
    }

    if (!options.credentials) {
        options.credentials = 'include';
        // 临时调试用 options.credentials = 'same-origin';
    }

    console.log('开始请求-', url, options);

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => response.json())
            .then((json) => {
                if ('status' in json && json.status === 0) {
                    console.log('请求成功-', url, json);
                    resolve(json);
                } else {
                    console.log('请求返回失败-', url, json);

                    reject(json);
                }
            })
            .catch((error) => {
                console.log('请求失败-', url, error);
                reject(error);
            });
    });

    // TODO: 如果没有经纬度信息则需要调用微信 JSSDK 获取经纬度之后再发起请求，对调用者透明 return fetch(url, options)
}
