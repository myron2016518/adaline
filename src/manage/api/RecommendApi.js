import Http from 'manage/common/js/Http.js'
import md5 from 'md5'
import {
    SIGN_KEY
} from 'manage/config.js'

class RecommendApi extends Http {
    /**
     * 获得推荐设置
     * type 模拟：1，回放：2
     * **/
    getRecommend(type) {
        let sign = 'action=getRecommendInfo'
        sign += `&recommendType=${type}`
        sign =  md5(`${md5(sign)}${SIGN_KEY}`)

        const params = {
            recommendType: type,
            sign
        }
        return this.$getMsg('/LearningMachine/User/getRecommendInfo', params);
    }

    setSimulation(level, typeFirst, recommendNum) {
        const recommendType = 1
        let sign = 'action=setRecommend'
        sign += `&level=${level}`
        sign += `&recommendNum=${recommendNum}`
        sign += `&recommendType=${recommendType}`
        sign += `&typeFirst=${typeFirst}`
        sign =  md5(`${md5(sign)}${SIGN_KEY}`)
        const params = {
            recommendType,
            level,
            typeFirst,
            recommendNum,
            sign,
        }
        return this.$postMsg('/LearningMachine/User/setRecommend', params);
    }

    setAdaline(typeFirst, recommendNum) {
        const recommendType = 2
        let sign = 'action=setRecommend'
        sign += `&recommendNum=${recommendNum}`
        sign += `&recommendType=${recommendType}`
        sign += `&typeFirst=${typeFirst}`
        sign =  md5(`${md5(sign)}${SIGN_KEY}`)
        const params = {
            recommendType,
            typeFirst,
            recommendNum,
            sign
        }
        return this.$postMsg('/LearningMachine/User/setRecommend', params);
    }
}

export default new RecommendApi()
