<template>
    <div class="bg-wrapper manage">
        <div class="login-form-wrapper">
            <div class="logo">
                <div class="logo-text">数据采集审核</div>
            </div>
            <el-form class="form" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="68px">
                <el-form-item class="margin-bottom-md" label="用户名" prop="account">
                    <el-input v-model="ruleForm.account" placeholder="请输入您的用户名" clearable
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item class="margin-bottom-lg" label="密码" prop="passWd">
                    <el-input v-model="ruleForm.passWd" placeholder="请输入您的密码" type="password" clearable
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item class="margin-bottom-md" label-width="12px">
                    <el-button ref="submitBtn" class="submit-btn" type="danger"
                               @click="submitForm('ruleForm')" :loading="loginLoading">登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {trim, getRandomStr} from 'manage/common/js/util.js'
    import LoginApi from 'manage/api/LoginApi.js'
    import {validateAccount} from 'manage/common/js/validate.js'
    import {AUTH} from 'manage/config.js'

    export default {
        name: "Login",
        data() {
            return {
                loginLoading: false,
                ruleForm: {
                    account: '',
                    passWd: ''
                },
                rules: {
                    account: [
                        {required: true, message: '请输入用户名', trigger: 'change'},
                        {min: 2, max: 40, message: '用户名2-40位', trigger: 'change'}
                    ],
                    passWd: [
                        {required: true, message: '请输入密码', trigger: 'change'},
                        {min: 6, max: 45, message: '密码6-45位', trigger: 'change'}
                    ]
                }
            }
        },
        activated() {

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loginLoading = true;
                        let paraArr = [
                            trim(this.ruleForm.account),
                            this.ruleForm.passWd
                        ];
                        this.userLogin(paraArr);
                    } else {
                        return false;
                    }
                });
            },
            /** 登录 **/
            userLogin(paraArr) {
                LoginApi.login(...paraArr).then((res) => {
                    const [account, passWd] = paraArr
                    this.setManageToken(getRandomStr(20, 4))
                    const _auth = []
                    for (let i = 0; i < res.auth_list.length; i++) {
                        _auth.push(res.auth_list[i].auth_id)
                    }
                    _auth.push('7')
                    this.setManageUserInfo({
                        account,
                        userId: res.user_id,
                        auth: _auth
                    })
                    let _path
                    if (_auth.includes(AUTH.log)) {
                        _path = '/log'
                    } else if (_auth.includes(AUTH.handle)) {
                        _path = '/handle'
                    } else if (_auth.includes(AUTH.reward)) {
                        _path = '/reward'
                    } else if (_auth.includes(AUTH.recommend)) {
                        _path = '/recommend'
                    } else if (_auth.includes(AUTH.feedback)) {
                        _path = '/feedback'
                    } else if (_auth.includes(AUTH.users)) {
                        _path = '/users'
                    } else {
                        _path = '/404'
                    }
                    if (_path === '/404') {
                        this.loginLoading = false;
                        this.$message({
                            showClose: true,
                            message: '你没有页面访问权限！',
                            type: 'error'
                        });
                    } else {
                        setTimeout(() => {
                            this.loginLoading = false;
                            this.$router.replace({
                                path: _path
                            });
                        }, 500)
                        // this.$nextTick(() => {
                        //
                        // })
                    }
                }).catch((err) => {
                    this.loginLoading = false;
                    this.$message({
                        showClose: true,
                        message: err,
                        type: 'error'
                    });
                })
            },
            ...mapActions([
                'setManageToken',
                'setManageUserInfo'
            ])
        },
    }
</script>

<style scoped lang="scss">
    @import "~manage/common/scss/variable.scss";

    .bg-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 100%;
        overflow: auto;
        background: url('~manage/common/images/login_bg.png') no-repeat 50%;
        background-size: cover;
        .login-form-wrapper {
            padding: 30px 48px;
            width: 384px;
            min-height: 300px;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px 0 rgba(0, 0, 0, .2);
            .logo {
                margin-top: 20px;
                width: 100%;
                .logo-text {
                    font-size: 22px;
                    font-family: Tahoma;
                    color: $color-danger;
                    text-align: center;
                    font-weight: bold;
                    letter-spacing: 1px;
                }
            }
            .form {
                margin-top: 48px;
                .margin-bottom-md {
                    margin-bottom: 30px;
                }
                .margin-bottom-lg {
                    margin-bottom: 60px;
                }
                .submit-btn {
                    width: 100%;
                    font-size: $size-lg;
                    letter-spacing: 1px;
                }
            }
        }
    }
</style>
