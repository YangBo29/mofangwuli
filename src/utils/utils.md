### 公共函数内容

> 文件夹
base,       // 基础函数文件夹
store,      // 存储类函数文件夹
formats,    // 格式化类函数文件夹
regulars,   // 正则类函数文件夹
trans,      // 转换类公用函数文件夹

> 函数
setUser,         // 设置用户信息
getUser,         // 获取用户信息
clearUser,       // 注销用户
scalingImage,    // 等比缩放
replaceStr,      // 替换至指定位置的字符串
deltaTime,       // 获取时间差
RGB2HEX,         // RGB 转 HEX(16进制)
HEX2RGB,         // HEX 转 RGB(rgba(0,0,0,1))
RGB2HSB,         // RGB 转 HSB(h:0-360; s:100%, b: 100%)
HSB2RGB,         // HSB 转 RGB
regGath,         // 正则集合 ———— “姓名判断,校验国内手机号,校验邮箱,校验密码,校验确认密码,校验数字验证码,校验字母验证码,校验身份证,校验纳税识别号”
regPhone,        // 校验国内手机号
regEmail,        // 校验邮箱
regPassword,     // 校验密码
regNumCode,      // 校验数字验证码
regLetterCode,   // 校验字母验证码
regIdCard,       // 校验身份证
regIdentify,     // 校验纳税识别号
regName,         // 校验姓名
regFNumber,      // 校验浮点数
isArray,         // 判断是否是数组
isFn,            // 判断是否是函数
isNumber,        // 判断是否是数字
isString,        // 判断是否是字符串
isObject,        // 判断是否是对象
isDate,          // 判断是否是个时间对象
isEmptyObject,   // 判断是否是空对象
isExist,         // 判断是否是 null 或 undefined
zeroize,         // 补零
trim,            // 去除前后空格
stopEvent,       // 阻止冒泡事件
transTimestamp,  // 时间戳转换
numFormat,       // 千分位
guid,            // uuid
ccid,            // 32位 id
bytesToSize,     // 处理内存单位
noop,            // 空函数
_get,            // 重写 lodash 的 _.get 方法， 对null 进行处理