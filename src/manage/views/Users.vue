<template>
    <div class="wrapper manage">
        <el-form class="ope-form" ref="ruleForm" :model="ruleForm" inline @keyup.enter.native="submitSearch($event)">
            <el-form-item label="用户名">
                <el-input v-model="ruleForm.account" placeholder="请输入用户名" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button ref="searchBtn" style="letter-spacing: 1px;" type="danger" @click="submitSearch($event)">搜索
                </el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <el-button style="letter-spacing: 1px;" type="primary" @click="onAddDialogOpen">新增</el-button>
            </el-form-item>
        </el-form>
        <div ref="content" class="content" v-loading="listLoading">
            <div class="alert alert-warning" v-if="listError">
                <h4><i class="fa fa-warning"></i> 提示：</h4>
                {{listError}}
            </div>
            <el-table
                v-else
                :data="list"
                :stripe="true"
                :highlight-current-row="true"
                height="100%"
                style="width: 100%">
                <el-table-column label="用户名" prop="account" align="center" header-align="center"></el-table-column>

                <el-table-column label="创建时间" prop="created_format" align="center"
                                 header-align="center"></el-table-column>
                <el-table-column label="权限" prop="auth_list_format" align="center"
                                 header-align="center"></el-table-column>
                <el-table-column label="操作" align="center" header-align="center" width="250">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="onAuthDialogOpen(scope.$index, scope.row)">授权</el-button>
                        <el-button size="mini" @click="onEditDialogOpen(scope.row)">修改密码</el-button>
                        <el-button size="mini" @click="onDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-size="pagesize"
                layout="total, prev, pager, next, jumper"
                :total="totalNum*1">
            </el-pagination>
        </div>
        <el-dialog ref="addDialog" title="新增用户" :visible.sync="addDialogVisible"
                   width="400px" :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :destroy-on-close="true">
            <el-form class="form" ref="addRuleForm" :model="addRuleForm" :rules="addRules" label-width="82px">
                <el-form-item class="margin-bottom-md" label="用户名" prop="account">
                    <el-input v-model="addRuleForm.account" placeholder="公司邮件：@cnlaunch.com结尾" clearable></el-input>
                </el-form-item>
                <el-form-item class="margin-bottom-md" label="登录密码" prop="passWd">
                    <el-input v-model="addRuleForm.passWd" placeholder="请输入登录密码" type="password" clearable></el-input>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="addDialogVisible=false">取消</el-button>
                <el-button type="danger" :loading="addUserLoading" @click="onAddDialogSubmit('addRuleForm')">确定
                </el-button>
            </template>
        </el-dialog>
        <el-dialog ref="authDialog" title="用户授权" :visible.sync="authDialogVisible"
                   width="400px" :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :destroy-on-close="true">
            <div class="form" v-loading="authListLoading" style="min-height: 84px">
                <el-checkbox-group v-model="authSelected">
                    <el-checkbox :label="auth.auth_id" v-for="(auth, index) in authList" :key="index">
                        {{auth.auth_name}}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <template slot="footer">
                <el-button @click="authDialogVisible=false">取消</el-button>
                <el-button type="danger" :loading="authLoading" @click="onAuthDialogSubmit">确定</el-button>
            </template>
        </el-dialog>
        <el-dialog ref="editDialog" title="修改密码" :visible.sync="editDialogVisible"
                   width="400px" :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :destroy-on-close="true">
            <el-form class="form" ref="editRuleForm" :model="eidtRuleForm" :rules="editRules" label-width="82px">
                <el-form-item label="用户名">
                    {{eidtRuleForm.account}}
                </el-form-item>
                <el-form-item class="margin-bottom-md" label="原密码" prop="oldPassWd">
                    <el-input v-model="eidtRuleForm.oldPassWd" placeholder="请输入原密码" type="password"
                              clearable></el-input>
                </el-form-item>
                <el-form-item class="margin-bottom-md" label="新密码" prop="passWd">
                    <el-input v-model="eidtRuleForm.passWd" placeholder="请输入新密码" type="password" clearable></el-input>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="editDialogVisible=false">取消</el-button>
                <el-button type="danger" :loading="editLoading" @click="onEditDialogSubmit('editRuleForm')">确定
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import md5 from 'md5'
    import {AUTH_TXT} from 'manage/config.js'
    import {throttle} from 'lodash-es'
    import {configThrottle, formatDate} from 'manage/common/js/util.js'
    import UsersApi from 'manage/api/UsersApi.js'
    import {validateLaunchEmail} from 'manage/common/js/validate.js'

    export default {
        name: "Users",
        data() {
            const validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原密码'));
                } else {
                    if (this.eidtRuleForm.passWd !== '') {
                        this.$refs.editRuleForm.validateField('passWd');
                    }
                    callback();
                }
            };
            const validateNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if (value === this.eidtRuleForm.oldPassWd) {
                    callback(new Error('两次输入密码一致!'));
                } else {
                    callback();
                }
            };
            return {
                totalNum: 0,
                pagesize: 10,
                pageNum: 1,
                ruleForm: {             // 搜索表单
                    account: '',
                },
                search: {               // 保存搜索表单
                    account: '',
                },
                listLoading: false,         // 表格列表loading
                listError: '',              // 表格列表接口是否错误
                list: [],                   // 表格列表数据
                addDialogVisible: false,   // 新增用户对话框是否显示
                addUserLoading: false,     // 新增用户loading
                addRuleForm: {             // 新增用户表单
                    account: '',
                    passWd: '',
                },
                addRules: {                // 新增用户表单验证
                    account: [
                        {required: true, message: '请输入用户名', trigger: 'change'},
                        {validator: validateLaunchEmail, trigger: 'change'},
                    ],
                    passWd: [
                        {required: true, message: '请输入密码', trigger: 'change'},
                        {min: 6, max: 45, message: '密码6-45位', trigger: 'change'}
                    ]
                },
                authDialogVisible: false,   // 授权对话框是否显示
                authLoading: false,         // 授权loading
                authList: [],               // 授权列表
                authSelected: ['1', '2'],           // 用户选择的授权列表
                authListLoading: false,     // 获取授权列表的loading
                authUserId: '',             // 当前授权用户id
                editDialogVisible: false,   // 修改密码对话框是否显示
                editLoading: false,         // 修改密码loading
                editUserId: '',             // 当前修改用户id
                eidtRuleForm: {             // 修改密码表单
                    account: '',
                    oldPassWd: '',
                    passWd: '',
                },
                editRules: {                // 修改密码表单验证
                    oldPassWd: [
                        {min: 6, max: 45, message: '密码6-45位', trigger: 'change'},
                        {validator: validateOldPass, trigger: 'change'},
                    ],
                    passWd: [
                        {min: 6, max: 45, message: '密码6-45位', trigger: 'change'},
                        {validator: validateNewPass, trigger: 'change'},
                    ]
                },
            }
        },
        computed: {
            ...mapGetters([
                '__manage_userid__',
            ]),
        },
        activated() {
            this._reset()
            this.renderTable(this.pageNum, this.pagesize, {})
        },
        methods: {
            /** 渲染表格 **/
            renderTable(pageNum, pagesize, rest) {
                const params = {}
                for (let key in rest) {
                    if (rest[key] !== '' && rest[key] !== 'null') {
                        params[key] = rest[key]
                    }
                }
                this.listLoading = true
                this.$refs.content.scrollTop = 0
                this.listError = ''
                UsersApi.getList(pageNum, pagesize, this.__manage_userid__, params).then((data) => {
                    this.listLoading = false
                    this.totalNum = data.count
                    const result = data.list
                    for (let j = 0; j < result.length; j++) {
                        result[j].created_format = formatDate(new Date(result[j].created * 1000), 'yyyy-MM-dd hh:mm')
                        let _authList = []
                        for (let k = 0; k < result[j].auth_list.length; k++) {
                            if (AUTH_TXT[result[j].auth_list[k].auth_id]) {
                                _authList.push(AUTH_TXT[result[j].auth_list[k].auth_id])
                            }
                        }
                        result[j].auth_list_format = _authList.join('，')
                    }
                    this.list = result
                }).catch((err) => {
                    this.listLoading = false
                    this.list = []
                    if (err === 10002) {
                        this.listError = '错误：缺少参数，Code：10002'
                    } else if (err === 10004) {
                        this.listError = '错误：签名错误，Code：10004'
                    } else {
                        this.listError = err
                    }
                })
            },
            /** 搜索 **/
            submitSearch: throttle(function (event) {
                if (event.keyCode === 13 && event.target === this.$refs.searchBtn.$el) {
                    return false;
                }
                for (let key in this.ruleForm) {
                    this.search[key] = this.ruleForm[key]
                }
                this.pageNum = 1
                this.renderTable(this.pageNum, this.pagesize, this.search)
            }, 1000, configThrottle),
            /** 分页里，页码改变的回调 **/
            handleCurrentChange(pageNum) {
                this.pageNum = pageNum;
                this.renderTable(pageNum, this.pagesize, this.search)
            },
            /** 打开新增用户对话框 **/
            onAddDialogOpen() {
                this.addDialogVisible = true
                this.$refs.addDialog.$el.style.bottom = '0'
                this.addRuleForm.account = ''
                this.addRuleForm.passWd = ''
                this.$nextTick(() => {
                    this.$refs.addRuleForm.clearValidate();
                })
            },
            /** 新增用户 **/
            onAddDialogSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addUserLoading = true
                        UsersApi.add(this.addRuleForm.account, this.addRuleForm.passWd).then((res) => {
                            this.addUserLoading = false
                            this.addDialogVisible = false
                            this.$message({
                                type: 'info',
                                message: `用户：${this.addRuleForm.account} 新增成功！`
                            });
                            this.renderTable(this.pageNum, this.pagesize, this.search)
                        }).catch((err) => {
                            this.addUserLoading = false
                            let errHandle
                            if (err === 10014) {
                                errHandle = `用户名：${this.addRuleForm.account} 已存在！`
                            } else {
                                errHandle = err
                            }
                            this.$message({
                                type: 'error',
                                message: errHandle
                            });
                        })
                    } else {
                        return false
                    }
                });
            },
            /** 打开授权对话框 **/
            onAuthDialogOpen(index, row) {
                this.authDialogVisible = true
                this.$refs.authDialog.$el.style.bottom = '0'
                let _seletAuth = []
                for (let i = 0; i < row.auth_list.length; i++) {
                    _seletAuth.push(row.auth_list[i].auth_id)
                }
                this.authSelected = _seletAuth.slice(0)
                this.authUserId = row.user_id
                this.authListLoading = true
                UsersApi.authList(this.__manage_userid__).then(data => {
                    this.authListLoading = false
                    this.authList = data
                }).catch(err => {
                    this.authListLoading = false
                    this.$message({
                        type: 'error',
                        message: err
                    });
                })
            },
            /** 用户授权 **/
            onAuthDialogSubmit() {
                this.authLoading = true
                UsersApi.auth(this.authUserId, this.authSelected.join(',')).then(res => {
                    this.authLoading = false
                    this.authDialogVisible = false
                    this.$message({
                        type: 'info',
                        message: '操作成功'
                    });
                    this.renderTable(this.pageNum, this.pagesize, this.search)
                }).catch(err => {
                    this.authLoading = false
                    this.$message({
                        type: 'error',
                        message: err
                    });
                })
            },
            /** 打开修改密码对话框 **/
            onEditDialogOpen(row) {
                this.editDialogVisible = true
                this.$refs.editDialog.$el.style.bottom = '0'
                this.editUserId = row.user_id
                this.eidtRuleForm.account = row.account
                this.eidtRuleForm.oldPassWd = ''
                this.eidtRuleForm.passWd = ''
                this.$nextTick(() => {
                    this.$refs.editRuleForm.clearValidate();
                })
            },
            /** 修改密码 **/
            onEditDialogSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editLoading = true
                        UsersApi.editUser(this.editUserId, this.eidtRuleForm.oldPassWd, this.eidtRuleForm.passWd).then(res => {
                            this.editLoading = false
                            this.$message({
                                type: 'info',
                                message: `操作成功！`
                            });
                            this.editDialogVisible = false
                        }).catch(err => {
                            this.editLoading = false
                            this.$message({
                                type: 'error',
                                message: '操作失败！'
                            });
                        })
                    } else {
                        return false;
                    }
                });
            },
            /** 删除用户 **/
            onDelete(index, row) {
                this.$confirm(`真的要删除用户 <span style="color: #cf2828">${row.account}</span> 吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true,
                    type: 'warning'
                }).then(() => {
                    UsersApi.delete(row.user_id).then(res => {
                        this.$message({
                            type: 'info',
                            message: `用户：${row.account} 删除成功！`
                        });
                        this.list.splice(index, 1)
                    }).catch(err => {
                        this.$message({
                            type: 'error',
                            message: err
                        });
                    })
                }).catch(() => {
                });
            },
            _reset() {
                this.pageNum = 1
                this.ruleForm = {
                    account: '',
                }
                this.search = {
                    account: '',
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "~manage/common/scss/variable.scss";

    .ope-form {
        position: relative;
        padding: 16px 16px 0 16px;
        box-shadow: 0 4px 8px 0 rgba(7, 17, 27, .1);
        z-index: 1;
        .el-form-item {
            margin-bottom: 16px;
        }
    }

    .form {
        margin-top: 20px;
        .margin-bottom-md {
            margin-bottom: 24px;
        }
        .el-checkbox {
            margin-bottom: 24px;
        }
    }

</style>
