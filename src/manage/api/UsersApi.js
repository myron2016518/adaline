import Http from 'manage/common/js/Http.js'
import md5 from 'md5'
import {SIGN_KEY} from 'manage/config.js'

class UsersApi extends Http {
    /** 分页获取列表 **/
    getList(page, pagesize, userId, rest) {
        const {account} = rest
        let sign = 'action=getUserList'
        if (account != null) {
            sign += `&account=${account}`
        }
        sign += `&page=${page}&pagesize=${pagesize}`
        sign += `&user_id=${userId}`
        sign =  md5(`${md5(sign)}${SIGN_KEY}`)
        const params = {
            page,
            pagesize,
            user_id: userId,
            sign,
        }
        if (account != null) {
            params.account = account
        }
        return this.$get('/LearningMachine/User/getUserList', params);
    }
    /** 新增用户 **/
    add(account, password) {
        let sign = 'action=addUser'
        sign += `&account=${account}&password=${password}`
        sign = md5(`${md5(sign)}${SIGN_KEY}`)
        const params = {
            account,
            password,
            sign
        }
        return this.$post('/LearningMachine/User/addUser', params)
    }
    /** 授权 **/
    auth(user_id, auth_ids) {
        let sign = 'action=addUserAuth'
        sign += `&auth_ids=${auth_ids}&user_id=${user_id}`
        sign = md5(`${md5(sign)}${SIGN_KEY}`)
        const params = {
            user_id,
            auth_ids,
            sign
        }
        return this.$post('/LearningMachine/User/addUserAuth', params)
    }
    /** 权限列表 **/
    authList(user_id) {
        let sign = 'action=getAuthList'
        sign += `&user_id=${user_id}`
        sign = md5(`${md5(sign)}${SIGN_KEY}`)
        const params = {
            user_id,
            sign
        }
        return this.$get('/LearningMachine/User/getAuthList', params)
    }
    editUser(user_id, old_pwd, new_pwd) {
        let sign = 'action=updateUserInfo'
        sign += `&new_pwd=${new_pwd}`
        sign += `&old_pwd=${old_pwd}`
        sign += `&user_id=${user_id}`
        sign = md5(`${md5(sign)}${SIGN_KEY}`)
        const params = {
            user_id,
            old_pwd,
            new_pwd,
            sign
        }
        return this.$post('/LearningMachine/User/updateUserInfo', params)
    }
    /** 删除用户 **/
    delete(user_id) {
        let sign = 'action=delUser'
        sign += `&user_id=${user_id}`
        sign = md5(`${md5(sign)}${SIGN_KEY}`)
        const params = {
            user_id,
            sign
        }
        return this.$post('/LearningMachine/User/delUser', params)
    }
}

export default new UsersApi()
