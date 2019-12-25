import Http from 'manage/common/js/Http.js';
import md5 from 'md5'

const APP_ID = 'mycar'
const COMMUNICATE_ID = 'ucenter_id'
const VERSION = '1.0.1'               // 版本
const COMMUNICATE_KEY = '24327a6a10c533262a148f52e6d43fae'

export class UserCenterApi extends Http {
    /** 从用户中心获得token **/
    getToken(user_id) {
        let sign = `action=token.get_token&app_id=${APP_ID}&communicate_id=${COMMUNICATE_ID}&user_id=${user_id}&version=${VERSION}${COMMUNICATE_KEY}`
        sign =  md5(sign)
        const params = {
            app_id: APP_ID,
            communicate_id: COMMUNICATE_ID,
            version: VERSION,
            sign: sign,
            user_id: user_id
        }
        return this.$getCenter('/?action=token.get_token', params);
    }
}
