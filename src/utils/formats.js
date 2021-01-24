/**
 * author : yangbo
 * date : 2020/01/08 17:33:35
 * fileName: formats.js
 * description : 格式化类函数
 **/

import base from './base';
import md5 from 'md5';

const { isNumber, isString, isDate, zeroize, trim } = base;

// 时间戳转换
const transTimestamp = (time = '', format = 'Y-M-D^h:m:s', separator = '') => {
    if (!isNumber(time) && !isString(time) && !isDate(time)) {
        throw new Error("'time' is against the rules, it must be a number or a string or a Date!");
    }
    // 时间戳处理结果
    let _t = 0;
    // 分隔符结果
    let _sep = 'GMT';
    if (isNumber(time)) _t = time;
    if (isString(time)) _t = Number(time);
    if (isDate(time)) _t = time.getTime();

    // 时间格式长度 统一处理为13位
    if (String(_t).length === 10) _t = _t * 1000;

    // 分隔符默认处理
    if (separator !== '') {
        _sep = separator;
    }

    // 时间戳解析
    let _Date = new Date(_t);
    let year = _Date.getFullYear();
    let month = _Date.getMonth() + 1;
    let day = _Date.getDate();
    let hour = _Date.getHours();
    let minute = _Date.getMinutes();
    let second = _Date.getSeconds();

    // 转换所得结果存储
    let parmas = {
        Y: year,
        M: zeroize(month),
        D: zeroize(day),
        h: zeroize(hour),
        m: zeroize(minute),
        s: zeroize(second),
    };

    // 单位存储
    let unit = {
        Y: '年',
        M: '月',
        D: '日',
        h: '时',
        m: '分',
        s: '秒',
    };

    // 日期格式判断依据
    // let _YMD = ['Y', 'M', 'D'];
    // 时间格式判断依据
    let _hms = ['h', 'm', 's'];

    // 返回结果格式处理
    let _f = trim(format).split(/\^/g);
    let _part1 = _f[0];
    let _part2 = _f[1] ? _f[1] : '';

    // 两部分分别处理
    let _part1_ary = _part1 ? _part1.split(/[-:]/g) : [];
    let _part2_ary = _part2 ? _part2.split(/[-:]/g) : [];

    //  分段结果
    let result1 = '';
    let result2 = '';

    // 分段处理函数
    let fnGroup = {
        fn1: ary =>
            ary
                .map((t, i) => {
                    if (!t) return '';
                    if (i === ary.length - 1) {
                        return parmas[t];
                    }
                    return parmas[t] + _sep;
                })
                .join(''),
        fn2: ary =>
            ary
                .map((t, i) => {
                    if (!t) return '';
                    if (i === ary.length - 1) {
                        return parmas[t];
                    }
                    return parmas[t] + ':';
                })
                .join(''),
    };

    // 没有传递分隔符
    if (_sep === 'GMT') {
        if (_part1_ary.length > 0) {
            result1 = _part1_ary
                .map(t => {
                    return parmas[t] + unit[t];
                })
                .join('');
        }
        if (_part2_ary.length > 0) {
            result2 = _part2_ary
                .map(t => {
                    return parmas[t] + unit[t];
                })
                .join('');
        }
    } else {
        // 有分隔符传入
        if (_part1_ary.length > 0) {
            result1 = _part1_ary.some(t => !_hms.includes(t))
                ? fnGroup.fn1(_part1_ary)
                : fnGroup.fn2(_part1_ary);
        }
        if (_part2_ary.length > 0) {
            result2 = fnGroup.fn2(_part2_ary);
        }
    }

    return trim(result1 + ' ' + result2);
};

// uuid
const guid = (key = false) => {
    let res = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (Math.random() * 16) | 0;
        let v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    return key ? res : res.replace(/-/g, '');
};

// 组件 id
const ccid = () => {
    let res = 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (Math.random() * 16) | 0;
        let v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });

    let timestamp = Math.floor(Math.random() * 1000000000000);
    return md5(res + timestamp);
};

// 千分位
const numFormat = (
    s = 0, // 需要处理数字
    n = 0, // 小数点后保留位数
) => {
    n = n >= 0 && n <= 20 ? n : 2;
    s =
        n === 0
            ? '' + parseInt((s + '').replace(/[^\d\.-]/g, ''), 10)
            : parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n);
    let l = s
        .split('.')[0]
        .split('')
        .reverse();
    let r = s.split('.')[1] ? `.${s.split('.')[1]}` : '';
    let t = '';

    // 按规则处理
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
    }

    return (
        t
            .split('')
            .reverse()
            .join('') + r
    );
};

// 处理内存单位
const bytesToSize = bytes => {
    if (!bytes) return '0 KB';
    let REFER = 1024.0; // 基数常量
    let _bytes = Number(bytes);
    if (_bytes < REFER) return _bytes + ' KB'; // KB 级别
    if (_bytes < Math.pow(REFER, 2)) return (_bytes / REFER).toFixed(2) + ' MB'; // MB  级别
    if (_bytes < Math.pow(REFER, 3)) return (_bytes / Math.pow(REFER, 2)).toFixed(2) + ' GB'; // GB 级别
    if (_bytes < Math.pow(REFER, 4)) return (_bytes / Math.pow(REFER, 3)).toFixed(2) + ' TB'; // TB 级别
    return (_bytes / Math.pow(REFER, 4)).toFixed(2) + ' PB'; // PB 级别
};

// base64转Blob
const dataURItoBlob = base64Data => {
    let byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(base64Data.split(',')[1]);
    } else {
        byteString = unescape(base64Data.split(',')[1]);
    }
    let mimeString = base64Data
        .split(',')[0]
        .split(':')[1]
        .split(';')[0];
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
};

export default {
    transTimestamp, // 时间戳转换
    numFormat, // 千分位
    guid, // uuid
    ccid, // 32位 id
    bytesToSize, // 处理内存单位
    dataURItoBlob, // base64转Blob
};
