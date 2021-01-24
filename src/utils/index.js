/**
 * author : yangbo
 * date : 2020/01/08 17:46:41
 * fileName: index.js
 * description : 合并所有公共函数方法
 **/

import store from './store';
import formats from './formats';
import regulars from './regulars';
import trans from './trans';
import base from './base';
import unity from './unity';

const utils = {
    ...base, // 基础函数
    ...store, // 存储类函数
    ...formats, // 格式化类函数
    ...regulars, // 正则类函数
    ...trans, // 转换类公用函数
    ...unity, // 3D 相关函数
};

export default utils;
