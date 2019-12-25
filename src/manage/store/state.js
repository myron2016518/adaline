import {getManageTokenCache} from './cache.js'
import {getManageUserInfoCache, getManageUserInfoItemCache} from './cache.js'
import {getManageMenuCache} from './cache.js'

const state = {
    __manage_token__: getManageTokenCache(),                   // 审核系统里的登录前端生成的token，用于判断用户登录
    __manage_userinfo__: getManageUserInfoCache(),             // 审核系统里记录的用户信息
    __manage_account__: getManageUserInfoItemCache('account'), // 审核系统里记录的登录账号
    __manage_userid__: getManageUserInfoItemCache('userId'),   // 审核系统里记录的用户id
    __manage_auth__: getManageUserInfoItemCache('auth'),       // 审核系统里的权限列表
    __menu_key__: getManageMenuCache(),                        // 审核系统里当前菜单key
}

export default state
