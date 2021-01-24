/**
 * author : yangbo
 * date : 2020/01/08 17:32:00
 * fileName: regular.js
 * description : 正则类函数
 **/

// 正则
const regPhone = /^[1][3-9][0-9]{9}$/;
const regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
const regPassword = (s, e) =>
    new RegExp(`^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{${s},${e}}$`);
const regNumCode = c => new RegExp(`^\\\d{${c}}$`);
const regLetterCode = c => new RegExp(`^[a-z]{${c}}$`);
const regIdCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
const regIdentify = [
    /^[\da-z]{10,15}$/i,
    /^\d{6}[\da-z]{10,12}$/i,
    /^[a-z]\d{6}[\da-z]{9,11}$/i,
    /^[a-z]{2}\d{6}[\da-z]{8,10}$/i,
    /^\d{14}[\dx][\da-z]{4,5}$/i,
    /^\d{17}[\dx][\da-z]{1,2}$/i,
    /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i,
    /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i,
    /^[\d]{6}[\da-z]{13,14}$/i,
];
const regName = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/;
const regFNumber = /^\d+(\.\d+)?$/;

const regGath = {
    // 校验国内手机号
    phone: phone => {
        let flag = regPhone.test(String(phone));

        return {
            flag,
            msg: flag ? '手机号校验成功！' : '请填写有效的手机号码！',
        };
    },
    // 校验邮箱
    email: email => {
        let flag = regEmail.test(String(email));

        return {
            flag,
            msg: flag ? '邮箱校验成功！' : '请填写有效的邮箱！',
        };
    },
    // 校验密码
    password: (password, s = 8, e = 16) => {
        let flag = regPassword(s, e).test(String(password));

        return {
            flag,
            msg: flag ? '密码校验成功！' : '密码需至少8位数字与大小写字母的组合！',
        };
    },
    // 校验确认密码
    rePassword: (p, rp) => {
        if (p === '' || rp === '') {
            return {
                flag: false,
                msg: '密码不能为空！',
            };
        } else if (p !== rp) {
            return {
                flag: false,
                msg: '两次密码不一致！',
            };
        }

        return {
            flag: true,
            msg: '密码确认成功！',
        };
    },
    // 校验数字验证码
    numCode: (code, c = 6) => {
        let flag = regNumCode(c).test(code);

        return {
            flag,
            msg: flag ? '验证码校验成功！' : '验证码格式错误！',
        };
    },
    // 校验字母验证码
    letterCode: (code, c = 6) => {
        let flag = regLetterCode(c).test(code.toLowerCase());

        return {
            flag,
            msg: flag ? '验证码校验成功！' : '验证码格式错误！',
        };
    },
    // 校验身份证
    idCard: id => {
        let flag = regIdCard.test(id);

        return {
            flag,
            msg: flag ? '身份证校验成功！' : '身份证格式错误！',
        };
    },
    // 校验纳税识别号
    identify: identify => {
        let flag = regIdentify.some(item => item.test(identify));

        return {
            flag,
            msg: flag ? '纳税人识别号校验成功！' : '纳税人识别号格式错误！',
        };
    },
    // 姓名判断
    name: name => {
        let flag = regName.test(name);

        return {
            flag,
            msg: flag ? '姓名校验成功！' : '姓名格式错误！',
        };
    },
};

// 私有部署: 输入内容正则表达式
const _regName = /^[\u4e00-\u9fa5a-zA-Z0-9@_\.]{1,20}$/; // /^[\u4e00-\u9fa5a-zA-Z0-9\.]{1,20}$/
const _regAccount = /^[a-zA-Z0-9@_\.]{6,20}$/; // /^[a-zA-Z0-9_@\.]{6,20}$/
const _regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/; ///^[a-zA-Z0-9]{6,20}$/

const privateReg = {
    folderName: (str = '') => {
        if (str === '') {
            return {
                flag: false,
                msg: '名称不能为空',
            };
        }

        let flag = _regName.test(String(str));

        return {
            flag,
            msg: flag ? '' : '20个字符以内，支持输入汉字、字母、下划线、小数点和@符号',
        };
    },
    userName: (str = '') => {
        if (str === '') {
            return {
                flag: false,
                msg: '名称不能为空',
            };
        }

        let flag = _regName.test(String(str));

        return {
            flag,
            msg: flag ? '' : '1-20个字符，支持输入汉字、字母、下划线、小数点和@符号',
        };
    },
    account: (str = '') => {
        if (str === '') {
            return {
                flag: false,
                msg: '账号不能为空',
            };
        }

        let flag = _regAccount.test(String(str));

        return {
            flag,
            msg: flag ? '' : '6-20个字符，支持数字、字母、下划线、小数点和@符号',
        };
    },
    password: (str = '') => {
        if (str === '') {
            return {
                flag: false,
                msg: '密码不能为空',
            };
        }

        let flag = _regPassword.test(String(str));

        return {
            flag,
            msg: flag ? '' : '6-20个字符，字母和数字的组合',
        };
    },
};

const regDevice = () => {
    const ua = navigator.userAgent;
    console.log(ua);
    let flag = ua.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Macintosh|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
    );
    if (!flag) return false;
    if (ua.indexOf('Macintosh') > -1) {
        try {
            document.createEvent('TouchEvent');
            return true;
        } catch (e) {
            return false;
        }
    } else {
        return true;
    }
};

export default {
    regGath, // 正则集合[姓名判断,校验国内手机号,校验邮箱,校验密码,校验确认密码,校验数字验证码,校验字母验证码,校验身份证,校验纳税识别号]
    regPhone, // 校验国内手机号
    regEmail, // 校验邮箱
    regPassword, // 校验密码
    regNumCode, // 校验数字验证码
    regLetterCode, // 校验字母验证码
    regIdCard, // 校验身份证
    regIdentify, // 校验纳税识别号
    regName, // 校验姓名
    regFNumber, // 校验浮点数
    privateReg, // 私有部署，输入校验
    regDevice, // 验证是否为移动端
};
