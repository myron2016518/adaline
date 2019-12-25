/** Nginx做反向代理的前缀识别 **/
export const PROXY_PREFIX = '/proxy_adaline'
/** Nginx做反向代理的前缀识别（用户中心） **/
export const PROXY_PREFIX_CENTER = '/proxy_user_center'
/** 审核平台的接口签名key **/
export const SIGN_KEY = '894B988B1DF0A10EEF7719163FE72376'
/** 审核平台里的日志类型 **/
export const FILE_TYPE = {
    simulation: '1',        // 模拟
    adaline: '2'            // 回放
}
export const AUTH = {
    handle: '2',
    reward: '3',
    users: '4',
    recommend: '5',
    log: '6',
    feedback: '7',
}

export const AUTH_TXT = {
    '2': '日志审核',
    '3': '奖励发放',
    '4': '用户管理',
    '5': '推荐设置',
    '6': '日志解析',
    '7': '用户反馈',
}

export const CHECK_STATUS = {
    not: '0',       // 待解析
    yes: '1',       // 通过
    no: '2',        // 不通过
    wait: '3',      // 审核中
}


// export const SERVER_HOST = (process.env.NODE_ENV === 'development') ? 'http://aittest.x431.com' : 'http://ait.golo365.com'
export const SERVER_HOST = function () {
    if (process.env.NODE_ENV === 'development') {
        return 'http://aittest.x431.com'
    } else if (location.hostname.indexOf('test') > -1) {
        return 'http://aittest.x431.com'
    } else {
        return 'http://ait.golo365.com'
    }
}()
