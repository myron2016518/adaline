import * as types from './mutations_type.js'

const mutations = {
    [types.SET_MANAGE_TOKEN](state, token) {
        state.__manage_token__ = token
    },
    [types.SET_MANAGE_USER_INFO](state, obj) {
        state.__manage_userinfo__ = obj
    },
    [types.SET_MANAGE_ACCOUNT](state, account) {
        state.__manage_account__ = account
    },
    [types.SET_MANAGE_USERID](state, userId) {
        state.__manage_userid__ = userId
    },
    [types.SET_MANAGE_AUTH](state, authListArr) {
        state.__manage_auth__ = authListArr
    },
    [types.SET_MENU](state, menuKey) {
        state.__menu_key__ = menuKey
    }
}

export default mutations
