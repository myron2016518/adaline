import Http from 'manage/common/js/Http.js'
import md5 from 'md5'
import {SIGN_KEY} from 'manage/config.js'

class RewardApi extends Http {
    getList(page, pagesize, rest) {
        const {userName, mobile, order, payStatus, created} = rest

        let start_time, end_time
        if (created instanceof Array && created.length === 2)  {
            start_time = created[0]
            end_time = created[1]
        }
        let sign = 'action=getRewardList'
        if (end_time != null) {
            sign += `&end_time=${end_time}`
        }
        sign += `&page=${page}&pagesize=${pagesize}`
        if (order != null) {
            sign += `&pay_order_id=${order}`
        }
        if (payStatus != null) {
            sign += `&pay_status=${payStatus}`
        }
        if (mobile != null) {
            sign += `&phone=${mobile}`
        }
        if (start_time != null) {
            sign += `&start_time=${start_time}`
        }
        if (userName != null) {
            sign += `&user_name=${userName}`
        }
        sign =  md5(`${md5(sign)}${SIGN_KEY}`)
        const params = {
            page,
            pagesize,
            sign,
        }
        if (userName != null) {
            params.user_name = userName
        }
        if (mobile != null) {
            params.phone = mobile
        }
        if (order != null) {
            params.pay_order_id = order
        }
        if (payStatus != null) {
            params.pay_status = payStatus
        }
        if (start_time != null) {
            params.start_time = start_time
        }
        if (end_time != null) {
            params.end_time = end_time
        }
        return this.$get('/LearningMachine/Index/getRewardList', params);
    }
    pay(base_id, user_id) {
        const wx_type = 6
        let sign = 'action=index'
        sign += `&base_id=${base_id}`
        sign += `&user_id=${user_id}`
        sign += `&wx_type=${wx_type}`
        sign =  md5(`${md5(sign)}${SIGN_KEY}`)
        const params = {
            base_id,
            user_id,
            wx_type,
            sign,
        }
        return this.$getMsg('/LearningMachine/Pay/index', params);
    }
}

export default new RewardApi()
