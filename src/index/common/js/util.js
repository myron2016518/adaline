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
