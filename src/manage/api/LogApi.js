import Http from 'manage/common/js/Http.js';
import md5 from 'md5'
import {SIGN_KEY} from 'manage/config.js'

class LogApi extends Http {
    // 审核功能获得表格列表
    getList(page, pagesize, rest) {
        const {userName, mobile, vin, sn, baseId, softwareId, status, submitDate, type} = rest
        let sign = 'action=getLearningLog'
        if (baseId != null) {
            sign += `&base_id=${baseId}`
        }
        if (type != null) {
            sign += `&file_type=${type}`
        }
        sign += `&page=${page}&pagesize=${pagesize}`
        if (mobile != null) {
            sign += `&phone=${mobile}`
        }
        if (sn != null) {
            sign += `&serial_number=${sn}`
        }
        if (softwareId != null) {
            sign += `&software_id=${softwareId}`
        }
        if (status != null) {
            sign += `&status=${status}`
        }
        if (submitDate != null) {
            sign += `&time=${submitDate}`
        }
        if (userName != null) {
            sign += `&user_name=${userName}`
        }
        if (vin != null) {
            sign += `&vin=${vin}`
        }
        sign =  md5(`${md5(sign)}${SIGN_KEY}`)
        const params = {
            page,
            pagesize,
            sign: sign,
        }
        if (userName != null) {
            params.user_name = userName
        }
        if (mobile != null) {
            params.phone = mobile
        }
        if (vin != null) {
            params.vin = vin
        }
        if (sn != null) {
            params.serial_number = sn
        }
        if (baseId != null) {
            params.base_id = baseId
        }
        if (softwareId != null) {
            params.software_id = softwareId
        }
        if (status != null) {
            params.status = status
        }
        if (submitDate != null) {
            params.time = submitDate
        }
        if (type != null) {
            params.file_type = type
        }
        return this.$get('/LearningMachine/Index/getLearningLog', params);
    }
    // 审核，改变审核状态
    changeStatus(base_id, status, remark) {
        let sign = 'action=changeLogStatus'
        sign += `&base_id=${base_id}&remark=${remark}&status=${status}`
        sign =  md5(`${md5(sign)}${SIGN_KEY}`)
        const params = {
            base_id,
            status,
            remark,
            sign,
        }
        return this.$get('/LearningMachine/Index/changeLogStatus', params)
    }
}

export default new LogApi()
