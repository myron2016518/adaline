import {trim} from 'manage/common/js/util.js'

/** 基于 element 的 验证 账号(手机号码、电子邮箱) **/
export function validateAccount(rule, value, callback) {
    const _value   = trim(value);
    const regTel   = /^1[34578]\d{9}$/g.test(_value);                                              // 手机号码
    const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(_value);   // 电子邮箱
    if (_value === '') {

    } else if (!regTel && !regEmail) {
        callback(new Error('请填写正确格式的 手机号、邮箱'));
    } else if (_value.length > 45) {
        callback(new Error('账号最多45位'));
    } else {
        callback();
    }
}

/** 基于 element 的 验证邮箱（公司邮箱格式） **/
export function validateLaunchEmail(rule, value, callback) {
    const _value = trim(value);
    const regEmail = /^([A-Za-z0-9_\-\.])+\@cnlaunch\.com$/.test(_value);   // 电子邮箱
    if (_value === '') {
        callback();
    } else if (!regEmail) {
        callback(new Error('公司邮件：@cnlaunch.com结尾'));
    } else {
        callback();
    }
}
