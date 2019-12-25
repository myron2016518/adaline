/** 获得URL参数 **/
export function getUrlString(name) {
    return decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

/** 获得浏览器的语言 **/
export function getLanguage() {
    const lan = (navigator.language || navigator.userLanguage).toLowerCase();
    if (lan.indexOf('en') > -1) {
        return 'en'
    } else if (lan.indexOf('zh-cn') > -1) {
        return 'zh-cn'
    } else if (lan.indexOf('zh-tw') > -1) {
        return 'zh-tw'
    } else if (lan.indexOf('de') > -1) {
        return 'de'
    } else if (lan.indexOf('es') > -1) {
        return 'es'
    } else if (lan.indexOf('it') > -1) {
        return 'it'
    } else if (lan.indexOf('ja') > -1) {
        return 'ja'
    } else {
        return 'en'
    }
}

export function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

export function os() {
    const ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    let device = 'pc';
    if (isTablet) {
        device = 'tablet'
    } else if (isAndroid || isPhone) {
        device = 'mobile'
    } else if (isPc) {
        device = 'pc'
    }
    return device;
}

export function isIe() {
    return !!window.ActiveXObject || "ActiveXObject" in window
}

export const configThrottle = {
    'leading': true,
    'trailing': false
}

export function formatDate(date, formatStr) {
    if (/(y+)/.test(formatStr)) {
        formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let obj = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in obj) {
        if (new RegExp(`(${k})`).test(formatStr)) {
            let str = obj[k] + '';
            formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return formatStr;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

export function getRandomStr(len, pos) {
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'k', 'l', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let res = '';
    const _randomNum = Math.floor(Math.random() * 10)
    for (let i = 0; i < len; i++) {
        if (i === pos - 1) {
            res += _randomNum;
        } else if (i === len - pos) {
            res += 10 - _randomNum
        } else {
            let id = Math.floor(Math.random() * arr.length);
            res += arr[id];
        }
    }
    return res;
}

/** 获得sessionStorage缓冲 **/
export function getCacheItem (key) {
    let value;
    try {
        value = sessionStorage.getItem(key);
        if (value != null) {
            value = JSON.parse(value);
        }
    } catch (ex) {
        if (process.env.NODE_ENV === 'development') {
            console.error('sessionStorage.getItem报错, ', ex.message);
        }
    } finally {
        return value;
    }
}

/** 设置sessionStoragee缓冲 **/
export function setCacheItem (key, value) {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
    } catch (ex) {
        if (process.env.NODE_ENV === 'development') {
            console.error('sessionStorage.setItem报错, ', ex.message);
        }
    }
}
