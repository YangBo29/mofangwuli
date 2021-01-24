/**
 * author : yangbo
 * date : 2020/01/08 17:30:08
 * fileName: trans.js
 * description : 转换类公用函数
 **/

import base from './base';
import _ from 'lodash';

const { isString, isNumber, isDate } = base;

// 等比缩放
const scalingImage = (
    imgWidth = 100,
    imgHeight = 100,
    containerWidth = 100,
    containerHeight = 100,
) => {
    let _imgWidth = Number(imgWidth);
    let _imgHeight = Number(imgHeight);
    let _containerWidth = Number(containerWidth);
    let _containerHeight = Number(containerHeight);

    let containerRatio = _containerWidth / _containerHeight;
    let imgRatio = _imgWidth / _imgHeight;
    if (_imgWidth < _containerWidth && _imgHeight < _containerHeight) {
        //
    } else if (imgRatio >= containerRatio) {
        _imgWidth = _containerWidth;
        _imgHeight = _containerWidth / imgRatio;
    } else if (imgRatio < containerRatio) {
        _imgHeight = _containerHeight;
        _imgWidth = _containerHeight * imgRatio;
    }

    let marginLeft = (_containerWidth - Math.round(_imgWidth)) / 2;
    let marginTop = (_containerHeight - Math.round(_imgHeight)) / 2;

    return {
        width: Math.round(_imgWidth),
        marginTop: Math.round(marginTop * 10) / 10,
        marginLeft: Math.round(marginLeft * 10) / 10,
        height: Math.round(_imgHeight),
    };
};

// 替换至指定位置的字符串
const replaceStr = (
    str = '', // 处理字段
    start = 0, // 开始序号 从 0 开始
    count = 0, // 删除项数
    reStr = '', // 替换字段
) => {
    if (!isString(str) || !isString(reStr)) {
        throw new Error("'str' or 'reStr' is against the rules, it must be a string!");
    }

    let _str = str.split('');
    _str.splice(start, count, reStr);
    return _str.join('');
};

// 获取时间差
const deltaTime = (startTime = new Date().getTime(), endTime = new Date().getTime()) => {
    if (!isNumber(startTime) && !isString(startTime) && !isDate(startTime)) {
        throw new Error(
            "'startTime' is against the rules, it must be a number or a string or a Date!",
        );
    }

    if (!isNumber(endTime) && !isString(endTime) && !isDate(endTime)) {
        throw new Error(
            "'endTime' is against the rules, it must be a number or a string or a Date!",
        );
    }

    // 起始时间 和 截止时间 处理结果
    let _startTime = 0;
    let _endTime = 0;

    // 起始时间 根据类型转换
    if (isNumber(startTime)) _startTime = startTime;
    if (isString(startTime)) _startTime = Number(startTime);
    if (isDate(startTime)) _startTime = startTime.getTime();

    // 截止时间 根据类型转换
    if (isNumber(startTime)) _endTime = endTime;
    if (isString(startTime)) _endTime = Number(endTime);
    if (isDate(startTime)) _endTime = endTime.getTime();

    if (String(_startTime).length !== 10 && String(_startTime).length !== 13) {
        throw new Error('Start time length error');
    }

    if (String(_endTime).length !== 10 && String(_endTime).length !== 13) {
        throw new Error('Deadline length error');
    }

    // 时间格式长度 统一处理为13位
    if (String(_startTime).length === 10) _startTime = _startTime * 1000;
    if (String(_endTime).length === 10) _endTime = _endTime * 1000;

    if (Number.isNaN(_startTime) || Number.isNaN(_endTime)) {
        throw new Error('Start time or deadline is not a legal time');
    }

    // 时间差
    let _minus = Math.abs(Math.round((_endTime - _startTime) / 1000));

    let day = Math.floor(_minus / (24 * 60 * 60));
    let hour = Math.floor((_minus - day * 24 * 60 * 60) / 3600);
    let min = Math.floor((_minus - day * 24 * 60 * 60 - hour * 60 * 60) / 60);

    if (day >= 365) {
        return `${Math.floor(day / 365)}年`;
    }

    if (day < 365 && day >= 30) {
        return `${Math.floor(day / 30)}个月`;
    }

    if (day < 365 && day >= 1) {
        return `${day}天`;
    }

    if (day < 1 && hour >= 1) {
        return `${hour}小时`;
    }

    if (day < 1 && hour < 1 && min >= 1) {
        return `${min}分钟`;
    }

    if (day < 1 && hour < 1 && min < 1) {
        return '刚刚';
    }

    return '';
};

const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/*RGB颜色转换为16进制*/
const RGB2HEX = color => {
    if (/^(rgb|RGB)/.test(color)) {
        let aColor = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
        return (
            '#' +
            (
                (1 << 24) +
                (parseInt(aColor[0], 10) << 16) +
                (parseInt(aColor[1], 10) << 8) +
                parseInt(aColor[2], 10)
            )
                .toString(16)
                .slice(1)
        );
    } else if (reg.test(color)) {
        let aNum = color.replace(/#/, '').split('');
        if (aNum.length === 6) {
            return color;
        } else if (aNum.length === 3) {
            let numHex = '#';
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += aNum[i] + aNum[i];
            }
            return numHex;
        }
    } else {
        return color;
    }
};

/*16进制颜色转为RGB格式*/
const HEX2RGB = color => {
    let sColor = color.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            let temp = Number(`0x${sColor.slice(i, i + 2)}`);
            sColorChange.push(temp);
        }
        return sColorChange;
    }
    return sColor;
};

// RGB 颜色转 HSB
const RGB2HSB = (rgbR, rgbG, rgbB) => {
    rgbR = rgbR < 0 ? 0 : rgbR > 255 ? 255 : rgbR;
    rgbG = rgbR < 0 ? 0 : rgbG > 255 ? 255 : rgbG;
    rgbB = rgbB < 0 ? 0 : rgbB > 255 ? 255 : rgbB;

    let max = Math.max(rgbR, rgbG, rgbB);
    let min = Math.min(rgbR, rgbG, rgbB);
    let hsbB = max / 255;
    let hsbS = max === 0 ? 0 : (max - min) / max;
    let hsbH = 0;
    let denominator = max - min === 0 ? 1 : max - min;

    if (max === rgbR && rgbG >= rgbB) {
        hsbH = ((rgbG - rgbB) * 60) / denominator + 0;
    } else if (max === rgbR && rgbG < rgbB) {
        hsbH = ((rgbG - rgbB) * 60) / denominator + 360;
    } else if (max === rgbG) {
        hsbH = ((rgbB - rgbR) * 60) / denominator + 120;
    } else if (max === rgbB) {
        hsbH = ((rgbR - rgbG) * 60) / denominator + 240;
    }
    return [hsbH, hsbS, hsbB];
};

// HSB 颜色转 RGB
const HSB2RGB = (h, s, v) => {
    // h = parseInt(h * 10, 10) / 10;
    // s = parseInt(s * 10, 10) / 10;
    // v = parseInt(v * 10, 10) / 10;
    let r = 0;
    let g = 0;
    let b = 0;
    let i = parseInt((h / 60) % 6, 10);
    let f = h / 60 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
        default:
            break;
    }

    // console.log(
    //     "i:" + i,
    //     "v:" + v,
    //     "f:" + f,
    //     "q:" + q,
    //     "p:" + p,
    //     "t:" + t,
    //     "r:" + r,
    //     "g:" + g,
    //     "b:" + b
    // );
    return [Math.round(r * 255, 10), Math.round(g * 255, 10), Math.round(b * 255, 10)];
};

// 纯色 8位色值转换
const transPureColor = color => {
    if (color.length > 7) {
        let _hex = color.slice(0, 7);
        let _opt = parseInt(color.slice(7), 16);

        _opt = Math.round((_opt / 255) * 100);
        return {
            hex: _hex,
            A: _opt,
        };
    }

    return {
        hex: color,
        A: 100,
    };
};

// 纯色 8位色值转 RGBA
const HEX2RGBA = color => {
    const HEX_A = transPureColor(color);
    const rgb = HEX2RGB(HEX_A.hex);
    const rgba = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${HEX_A.A / 100})`;

    return rgba;
};

// 解析 transform 的 matrix 值
const transMatrix = matrix => {
    return matrix
        .split('(')[1]
        .split(')')[0]
        .split(',');
};

// 数字转换26进制
const Num2En26 = n => {
    if (n === 0) return 'A';
    n = n + 1;
    let ans = '';
    while (n) {
        if (n % 26 === 0) {
            ans += String.fromCharCode(26 + 64);
            n = n / 26 - 1;
        } else {
            ans += String.fromCharCode((n % 26) + 64);
            n = ~~(n / 26);
        }
    }

    return ans
        .split('')
        .reverse()
        .join('');
};

// 渐变色转换
const tranGradual = color => {
    color = color || {
        colorType: 0,
        solidColor: '#FFFFFFFF', // 默认色值
        gradientColor: {
            gradientRotate: 0, // 渐变角度
            gradientColors: ['#FFFFFFFF', '#000000FF'], // 渐变颜色数组
            gradientLocations: [0, 1], // 渐变位置数组
        },
    };

    if (color.colorType === 1) {
        // 返回纯色
        return HEX2RGBA(color.solidColor);
    } else if (color.colorType === 2) {
        // 返回渐变色
        let resColor = [];
        _.get(color, 'gradientColor.gradientColors', []).forEach((c, i) => {
            resColor.push(
                `${HEX2RGBA(c)} ${Math.round(
                    _.get(color, 'gradientColor.gradientLocations', [])[i] * 100,
                )}%`,
            );
        });
        return `linear-gradient(${_.get(color, 'gradientColor.gradientRotate', 0) +
            90}deg,${resColor.join(',')})`;
    }

    return 'transparent';
};

export default {
    scalingImage, // 等比缩放
    replaceStr, // 替换至指定位置的字符串
    deltaTime, // 获取时间差
    RGB2HEX, // RGB 转 HEX(16进制)
    HEX2RGB, // HEX 转 RGB(rgb(0,0,0))
    RGB2HSB, // RGB 转 HSB(h:0-360; s:100%, b: 100%)
    HSB2RGB, // HSB 转 RGB
    HEX2RGBA, // 8位 hex 转 RGBA
    transPureColor, // 纯色 8位色值转换
    transMatrix, // 获取 matrix 值
    Num2En26, // 数字 转 字母
    tranGradual, // 数据色值渐变色转换
};
