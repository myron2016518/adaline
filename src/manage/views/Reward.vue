<template>
    <div class="wrapper manage">
        <el-form class="ope-form" ref="ruleForm" :model="ruleForm" inline @keyup.enter.native="submitSearch($event)">
            <el-form-item label="采集人">
                <el-input v-model="ruleForm.userName" placeholder="请输入采集人姓名" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码" clearable></el-input>
            </el-form-item>
            <el-form-item label="支付单号">
                <el-input v-model="ruleForm.order" placeholder="请输入支付单号" clearable></el-input>
            </el-form-item>
            <el-form-item label="发放状态">
                <el-select v-model="ruleForm.payStatus" placeholder="请选择" clearable>
                    <el-option label="待发放" :value="REWARD_STATUS.wait"></el-option>
                    <el-option label="已发放" :value="REWARD_STATUS.yes"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="生成时间">
                <el-date-picker
                    v-model="ruleForm.created"
                    type="datetimerange"
                    :editable="false"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button ref="searchBtn" style="letter-spacing: 1px;" type="danger" @click="submitSearch($event)">搜索
                </el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <el-button ref="exportExcelBtn" type="success" style="letter-spacing: 1px;" @click="onExportExcel">导出
                </el-button>
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
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="table-expand">
                            <el-form-item label="发放人："
                                          v-if="props.row.pay_status === REWARD_STATUS.yes"><span>{{ props.row.account }}</span>
                            </el-form-item>
                            <el-form-item label="发放时间："
                                          v-if="props.row.pay_status === REWARD_STATUS.yes"><span>{{ props.row.pay_time_format }}</span>
                            </el-form-item>
                            <el-form-item label="日志："><span>{{ props.row.file_name }}</span></el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="采集人" prop="user_name"></el-table-column>
                <el-table-column label="手机" prop="phone" align="center" header-align="center"
                                 min-width="110"></el-table-column>
                <el-table-column label="收款账号" prop="pay_type_format" align="center" header-align="center"
                                 min-width="78"></el-table-column>
                <el-table-column label="类型" prop="file_type_format" align="center"
                                 header-align="center" min-width="52"></el-table-column>
                <el-table-column label="奖励金额" prop="pay_fee" align="center" header-align="center"
                                 min-width="78"></el-table-column>
                <el-table-column label="支付单号" prop="pay_order_id" align="center"
                                 header-align="center" min-width="142"></el-table-column>
                <el-table-column label="生成时间" prop="created_format" align="center"
                                 header-align="center" min-width="136"></el-table-column>
                <el-table-column label="发放状态" prop="pay_status_format" align="center"
                                 header-align="center" min-width="78"></el-table-column>
                <el-table-column label="操作" align="center" header-align="center" min-width="76">
                    <template slot-scope="scope">
                        <el-button
                            size="mini" :disabled="scope.row.pay_status === REWARD_STATUS.yes"
                            @click="openRewardDialog(scope.row)">发放
                        </el-button>
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
        <el-dialog ref="rewardDialog" title="发放奖励" :visible.sync="rewardDialogVisible"
                   width="400px" :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :destroy-on-close="true">
            <p class="line strong red margin-bottom">提示：发放前，请仔细确认以下信息。</p>
            <p class="line">采集人：{{confirm.userName}}</p>
            <p class="line">手机：{{confirm.mobile}}</p>
            <p class="line">品牌/车型：{{confirm.brand}}{{confirm.model}}</p>
            <p class="line" v-if="confirm.fileType === FILE_TYPE.simulation">数据类型：模拟</p>
            <p class="line" v-else-if="confirm.fileType === FILE_TYPE.adaline">数据类型：回放</p>
            <p class="line" v-if="confirm.fileType === FILE_TYPE.simulation">系统个数：{{confirm.systemCount}}</p>
            <p class="line margin-bottom">奖励金额：{{confirm.rewardMoney}}元</p>
            <template slot="footer">
                <el-button class="big-size" @click="rewardDialogVisible=false">取消</el-button>
                <el-button class="big-size" type="danger" @click="rewardYesHandle" :loading="rewardLoading">同意发放
                </el-button>
            </template>
        </el-dialog>
        <el-dialog ref="exportDialog" title="导出Excel" :visible.sync="exportDialogVisible"
                   width="886px" :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :destroy-on-close="true">
            <el-form class="export-form" inline :model="exportForm">
                <el-form-item label="采集人">
                    <el-input v-model="exportForm.userName" placeholder="请输入采集人姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="exportForm.mobile" placeholder="请输入手机号码" clearable></el-input>
                </el-form-item>
                <el-form-item label="支付单号">
                    <el-input v-model="exportForm.order" placeholder="请输入支付单号" clearable></el-input>
                </el-form-item>
                <el-form-item label="发放状态">
                    <el-select v-model="exportForm.payStatus" placeholder="请选择" clearable>
                        <el-option label="待发放" :value="REWARD_STATUS.wait"></el-option>
                        <el-option label="已发放" :value="REWARD_STATUS.yes"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生成时间">
                    <el-date-picker
                        v-model="exportForm.created"
                        type="datetimerange"
                        :editable="false"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="exportDialogVisible=false">取消</el-button>
                <el-button type="danger" @click="onExportSubmit">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import md5 from 'md5'
    import {throttle} from 'lodash-es'
    import {configThrottle, formatDate} from 'manage/common/js/util.js'
    import RewardApi from 'manage/api/RewardApi.js'
    import {FILE_TYPE, SERVER_HOST, SIGN_KEY} from 'manage/config.js'

    const REWARD_STATUS = {     // 奖励发放状态
        yes: '1',    // 已发放
        wait: '0',   // 待发放
    }

    export default {
        name: "Reward",
        data() {
            return {
                totalNum: 0,
                pagesize: 10,
                pageNum: 1,
                ruleForm: {             // 搜索表单
                    userName: '',
                    mobile: '',
                    order: '',
                    payStatus: '',
                    created: '',
                },
                search: {               // 保存搜索表单
                    userName: '',
                    mobile: '',
                    order: '',
                    payStatus: '',
                    created: '',
                },
                listLoading: false,         // 表格列表loading
                listError: '',              // 表格列表接口是否错误
                list: [],                   // 表格列表数据
                rewardSelect: null,         // 同意发放的数据
                rewardDialogVisible: false, // 发放奖励对话框是否显示
                rewardLoading: false,       // 发放对话框loading
                confirm: {                  // 发放对话框显示的内容
                    userName: '',               // 采集人
                    mobile: '',                 // 手机
                    brand: '',                  // 品牌
                    model: '',                  // 车型
                    fileType: '',               // 数据类型
                    systemCount: 0,             // 系统个数
                    rewardMoney: 0,             // 奖励发放的金额
                },
                exportDialogVisible: false, // 导出Excel对话框是否显示
                exportForm: {               // 导出Excel表单
                    userName: '',
                    mobile: '',
                    order: '',
                    payStatus: '',
                    created: '',
                },
                exportLoading: false,       // 导出
            }
        },
        computed: {
            ...mapGetters([
                '__manage_userid__',
            ]),
        },
        created() {
            this.FILE_TYPE = FILE_TYPE
            this.REWARD_STATUS = REWARD_STATUS
        },
        activated() {
            this._reset()
            this._renderTable(this.pageNum, this.pagesize, {})
        },
        methods: {
            /** 搜索 **/
            submitSearch: throttle(function (event) {
                const _target = event.target
                if (event.keyCode === 13 && (_target === this.$refs.searchBtn.$el || _target === this.$refs.batchRewardBtn.$el || _target === this.$refs.exportExcelBtn.$el)) {
                    return false;
                }
                for (let key in this.ruleForm) {
                    this.search[key] = this.ruleForm[key]
                }
                this.pageNum = 1
                this._renderTable(this.pageNum, this.pagesize, this.search)
            }, 1000, configThrottle),
            /** 分页里，页码改变的回调 **/
            handleCurrentChange(pageNum) {
                this.pageNum = pageNum;
                this._renderTable(pageNum, this.pagesize, this.search)
            },
            /** 打开发放对话框 **/
            openRewardDialog(row) {
                this.rewardDialogVisible = true
                this.$refs.rewardDialog.$el.style.bottom = '0'
                this.confirm.rewardMoney = 0
                this.rewardSelect = row
                this.confirm.userName = row.user_name
                this.confirm.mobile = row.phone
                this.confirm.brand = row.car_brand
                this.confirm.model = row.car_model
                this.confirm.fileType = row.file_type
                if (row.file_type === FILE_TYPE.adaline) {
                    this.confirm.systemCount = row.sys_num
                }
                this.confirm.rewardMoney += row.pay_fee * 1
            },
            /** 同意发放 **/
            rewardYesHandle() {
                this.$confirm('确定同意发放?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    type: 'warning'
                }).then(() => {
                    this._rewardStream(this.rewardSelect)
                }).catch(() => {
                });
            },
            // 调用发放奖励接口
            _rewardStream(row) {
                this.rewardLoading = true
                RewardApi.pay(row.base_id, this.__manage_userid__).then((data) => {
                    this.rewardLoading = false
                    this.$message({
                        type: 'info',
                        message: `支付单号：${row.pay_order_id} 奖励发放成功`,
                    });
                    this.rewardDialogVisible = false
                    this._renderTable(this.pageNum, this.pagesize, this.search)
                }).catch(msg => {
                    this.rewardLoading = false
                    this.$message({
                        type: 'error',
                        message: msg,
                        duration: 5000,
                        showClose: true,
                    });
                })
            },
            /** 打开导出对话框 **/
            onExportExcel() {
                this.exportDialogVisible = true
                this.$refs.exportDialog.$el.style.bottom = '0'
                this.exportForm = {
                    userName: '',
                    mobile: '',
                    order: '',
                    payStatus: '',
                    created: '',
                }
            },
            /** 导出表单提交 **/
            onExportSubmit: throttle(function (event) {
                const form = this.exportForm
                let isRequired = false
                const params = {}
                for (let key in form) {
                    if (form[key] !== '' && form[key] !== 'null' && form[key] !== null) {
                        params[key] = form[key]
                        isRequired = true
                    }
                }
                if (!isRequired) {
                    this.$message({
                        type: 'error',
                        message: '请选择导出条件！'
                    });
                } else {
                    const {userName, mobile, order, payStatus, created} = params
                    let start_time, end_time
                    if (created instanceof Array && created.length === 2) {
                        start_time = created[0]
                        end_time = created[1]
                    }
                    const isDown = 1        // 不为空导出
                    let sign = 'action=getRewardList'
                    if (end_time != null) {
                        sign += `&end_time=${end_time}`
                    }
                    sign += `&is_down=${isDown}`
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
                    sign = md5(`${md5(sign)}${SIGN_KEY}`)
                    let HOST_URL = SERVER_HOST
                    HOST_URL += '/LearningMachine/Index/getRewardList'
                    HOST_URL += `?sign=${sign}&is_down=${isDown}`
                    if (userName != null) {
                        HOST_URL += `&user_name=${userName}`
                    }
                    if (mobile != null) {
                        HOST_URL += `&phone=${mobile}`
                    }
                    if (order != null) {
                        HOST_URL += `&pay_order_id=${order}`
                    }
                    if (payStatus != null) {
                        HOST_URL += `&pay_status=${payStatus}`
                    }
                    if (start_time != null) {
                        HOST_URL += `&start_time=${start_time}`
                    }
                    if (end_time != null) {
                        HOST_URL += `&end_time=${end_time}`
                    }
                    window.open(HOST_URL, '_blank');
                    setTimeout(() => {
                        this.exportDialogVisible = false
                    }, 1000)
                }
            }, 1000, configThrottle),
            /** 渲染表格 **/
            _renderTable(pageNum, pagesize, rest) {
                const params = {}
                for (let key in rest) {
                    if (rest[key] !== '' && rest[key] !== 'null' && rest[key] !== null) {
                        params[key] = rest[key]
                    }
                }
                this.listLoading = true
                this.$refs.content.scrollTop = 0
                this.listError = ''
                RewardApi.getList(pageNum, pagesize, params).then((data) => {
                    this.listLoading = false
                    this.totalNum = data.count
                    const result = data.list
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].file_type === FILE_TYPE.adaline) {
                            result[i].file_type_format = '回放'
                        } else if (result[i].file_type === FILE_TYPE.simulation) {
                            result[i].file_type_format = '模拟'
                        } else {
                            result[i].file_type_format = ''
                        }
                        if (result[i].pay_status === REWARD_STATUS.wait) {
                            result[i].pay_status_format = '待发放'
                        } else if (result[i].pay_status === REWARD_STATUS.yes) {
                            result[i].pay_status_format = '已发放'
                        } else {
                            result[i].pay_status_format = ''
                        }
                        result[i].created_format = formatDate(new Date(result[i].created * 1000), 'yyyy-MM-dd hh:mm')
                        if (result[i].pay_time && result[i].pay_time !== '0') {
                            result[i].pay_time_format = formatDate(new Date(result[i].pay_time * 1000), 'yyyy-MM-dd hh:mm')
                        } else {
                            result[i].pay_time_format = ''
                        }
                        if (result[i].openid && result[i].openid !== '' && result[i].openid !== 'null') {
                            result[i].pay_type_format = '微信'
                        } else {
                            result[i].pay_type_format = '支付宝'
                        }
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
            _reset() {
                this.pageNum = 1
                this.ruleForm = {
                    userName: '',
                    mobile: '',
                    order: '',
                    payStatus: '',
                    created: '',
                }
                this.search = {
                    userName: '',
                    mobile: '',
                    order: '',
                    payStatus: '',
                    created: '',
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

    .export-form {
        position: relative;
        padding: 16px 0 0 0;
        .el-form-item {
            margin-bottom: 24px;
        }
    }

    .el-select {
        width: 193px;
    }

    .table-expand {
        font-size: 0;
    }

    .table-expand .el-form-item__label {
        width: 90px;
        color: #99a9bf;
    }

    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .big-size {
        font-size: $size-md;
    }

    .line {
        margin-bottom: 16px;
        font-size: $size-md;
        &.strong {
            font-weight: 700;
        }
        &.red {
            color: #cf2828;
        }
        &.margin-bottom {
            margin-bottom: 20px;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
</style>
