import * as types from './mutations_type.js'
import {setManageTokenCache, removeManageTokenCache} from './cache.js'
import {setManageUserInfoCache, removeManageUserInfoCache} from './cache.js'
import {setManageMenuCache, removeManageMenuCache} from './cache.js'

/** 审核平台token **/
export const setManageToken = function ({commit, state}, token) {
    commit(types.SET_MANAGE_TOKEN, setManageTokenCache(token))
}

export const removeManageToken = function ({commit, state}) {
    commit(types.SET_MANAGE_TOKEN, removeManageTokenCache())
}

/** 审核平台userinfo **/
export const setManageUserInfo = function ({commit, state}, obj) {
    commit(types.SET_MANAGE_USER_INFO, setManageUserInfoCache(obj))
    commit(types.SET_MANAGE_ACCOUNT, obj.account)
    commit(types.SET_MANAGE_USERID, obj.userId)
    commit(types.SET_MANAGE_AUTH, obj.auth)
}

export const removeManageUserInfo = function ({commit, state}) {
    commit(types.SET_MANAGE_USER_INFO, removeManageUserInfoCache())
    commit(types.SET_MANAGE_ACCOUNT, '')
    commit(types.SET_MANAGE_USERID, '')
}

/** 审核系统里当前菜单key **/
export const setManageMenu = function ({commit, state}, menuKey) {
    commit(types.SET_MENU, setManageMenuCache(menuKey))
}
export const removeManageMenu = function ({commit, state}) {
    commit(types.SET_MENU, removeManageMenuCache())
}
