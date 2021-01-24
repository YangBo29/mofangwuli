/**
 * author : yangbo
 * date : 2020/01/09 15:45:07
 * fileName: store.js
 * description : 存储类函数
 **/

import Cookie from 'js-cookie';

// 保存用户信息
const setUser = params => {
    let str = Cookie.get('user') || localStorage.getItem('user') || '{}';
    let _temp = JSON.parse(str);
    let _user = { ..._temp, ...params };

    Cookie.set('user', JSON.stringify(_user), { expires: 90 });
    localStorage.setItem('user', JSON.stringify(_user));
};

// 获取用户信息
const getUser = () => {
    let str = Cookie.get('user') || localStorage.getItem('user') || '';
    return str ? JSON.parse(str) : str;
};

// 注销操作
const clearUser = () => {
    Cookie.remove('user');
    localStorage.clear();
};

// 保存token信息
const setToken = params => {
    let str = Cookie.get('token') || localStorage.getItem('token') || '{}';
    let _temp = JSON.parse(str);
    let _token = { ..._temp, ...params };

    Cookie.set('token', JSON.stringify(_token), { expires: 90 });
    localStorage.setItem('token', JSON.stringify(_token));
};

// 获取token信息
const getToken = () => {
    let str = Cookie.get('token') || localStorage.getItem('token') || '';
    return str ? JSON.parse(str) : str;
};

// 注销操作
const clearToken = () => {
    Cookie.remove('token');
    localStorage.removeItem('token');
};
export default {
    setUser, // 设置用户信息
    getUser, // 获取用户信息
    clearUser, // 注销用户
    setToken,
    getToken,
    clearToken,
};
