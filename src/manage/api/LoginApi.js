import Http from 'manage/common/js/Http.js'

class LoginApi extends Http {
    // login(userName, passwd) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             if (userName === 'admin' && passwd === '123456') {
    //                 resolve()
    //             } else {
    //                 reject('用户名或者密码不正确')
    //             }
    //         }, 1000)
    //     })
    // }
    login(userName, passwd) {
        const params = {
            account: userName,
            password: passwd
        }
        return new Promise((resolve, reject) => {
            this.$post('/LearningMachine/User/login', params).then((data) => {
                resolve(data)
            }).catch((err) => {
                if (err === 10001) {
                    reject('用户名或密码不正确')
                } else {
                    reject(err)
                }
            })
        })
    }
}

export default new LoginApi()
