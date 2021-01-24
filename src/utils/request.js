import { fetch } from 'dva';
import utils from '@utils';

// const root=undefined;

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    console.log(`请求错误 ${response.status}: ${response.url}`, errortext);
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
}

// function jsonBody(body) {
//   let stringBody = '';
//   for (const key in body) {
//     if (stringBody === '') {
//       stringBody += `${key}=${body[key]}`;
//     } else {
//       stringBody += `&${key}=${body[key]}`;
//     }
//   }
//   return stringBody;
// }

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    // const reqUrl=root?`${root}${url}`:url;
    const reqUrl = url;
    const user = utils.getUser();

    const defaultOptions = {
        credentials: 'include',
    };
    const newOptions = { ...defaultOptions, ...options };
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json, text/plain, */*',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: user.accessT ? `bearer ${user.accessT}` : '',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };

            if (newOptions.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                newOptions.body = joinParams(newOptions.body);
            } else {
                newOptions.body = JSON.stringify(newOptions.body);
            }
        } else {
            // TODO formData 方式设置Header会报错
            // newOptions.headers = {
            //     Accept: 'application/json',
            //     Authorization: user.accessT ? `bearer ${user.accessT}` : '',
            //     'Content-Type': 'multipart/form-data',
            //     ...newOptions.headers,
            // };
        }
    }

    if (newOptions.method === 'GET') {
        newOptions.headers = {
            Authorization: user.accessT ? `bearer ${user.accessT}` : '',
            ...newOptions.headers,
        };
    }

    return fetch(reqUrl, newOptions)
        .then(checkStatus)
        .then(async response => {
            // if (newOptions.method === 'DELETE' || response.status === 204) {
            //   return response.text();
            // }

            // 增加服务器返回时间字段
            const res = response.json();
            let result = {};
            let serverTime = new Date(response.headers.get('Date')).getTime();
            await res.then(data => (result = data));

            return {
                ...result,
                serverTime,
            };
        })
        .then(data => {
            // console.log(data);
            return data;
        })
        .catch(e => {
            const status = e.name;
            if (status === 401) {
                return;
            }
            if (status === 401) {
                return;
            }
            if (status === 403) {
                return;
            }
            if (status <= 504 && status >= 500) {
                return;
            }
            if (status >= 404 && status < 422) {
                // window.location.href = "/exception";
            }
        });
}

function joinParams(obj) {
    let ary = [];
    for (let key in obj) {
        ary.push(`${key}=${encodeURIComponent(obj[key])}`);
    }
    return ary.join('&');
}
