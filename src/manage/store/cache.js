import { Base64 } from 'js-base64'
import {getCacheItem, setCacheItem} from 'manage/common/js/util.js'
const __TOKEN__ = 'adaline_token'
const __CACHE_NAME__ = 'adaline_manage'
const __CACHE_MENU__ = 'adaline_menu'

/** 审核平台token **/
export function getManageTokenCache() {
    return sessionStorage.getItem(__TOKEN__) || '';
}
export function setManageTokenCache(token) {
    sessionStorage.setItem(__TOKEN__, token);
    return token;
}
export function removeManageTokenCache() {
    sessionStorage.removeItem(__TOKEN__);
    return '';
}

/** 审核平台userinfo **/
export function getManageUserInfoCache() {
    let userInfo = sessionStorage.getItem(__CACHE_NAME__)
    if (userInfo != null) {
        userInfo = JSON.parse(Base64.decode(userInfo))
        return userInfo || ''
    }
    return ''
    // return getCacheItem(__CACHE_NAME__) || ''
}
export function getManageUserInfoItemCache(item) {
    let userInfo = sessionStorage.getItem(__CACHE_NAME__)
    if (userInfo != null) {
        userInfo = JSON.parse(Base64.decode(userInfo))
        return userInfo[item] || ''
    }
    // if (getCacheItem(__CACHE_NAME__) != null) {
    //     return getCacheItem(__CACHE_NAME__)[item] || ''
    // }
    return ''
}
export function setManageUserInfoCache(obj) {
    sessionStorage.setItem(__CACHE_NAME__, Base64.encode(JSON.stringify(obj)));
    // setCacheItem(__CACHE_NAME__, obj)
    return obj;
}
export function removeManageUserInfoCache() {
    sessionStorage.removeItem(__CACHE_NAME__);
    return '';
}

/** 审核系统里当前菜单key **/
export function getManageMenuCache() {
    return getCacheItem(__CACHE_MENU__) || ''
}
export function setManageMenuCache(menuKey) {
    setCacheItem(__CACHE_MENU__, menuKey)
    return menuKey
}
export function removeManageMenuCache() {
    sessionStorage.removeItem(__CACHE_MENU__)
    return ''
}
