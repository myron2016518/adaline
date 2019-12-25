<template>
    <div class="wrapper manage">
        <el-form class="ope-form" ref="ruleForm" :model="ruleForm" inline @keyup.enter.native="submitSearch($event)">
            <el-form-item label="姓名">
                <el-input v-model="ruleForm.userName" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码" clearable></el-input>
            </el-form-item>
            <el-form-item label="Vin">
                <el-input v-model="ruleForm.vin" placeholder="请输入Vin码" clearable></el-input>
            </el-form-item>
            <el-form-item label="序列号">
                <el-input v-model="ruleForm.sn" placeholder="请输入序列号" clearable></el-input>
            </el-form-item>
            <el-form-item label="编号">
                <el-input v-model="ruleForm.baseId" placeholder="请输入编号" clearable></el-input>
            </el-form-item>
            <el-form-item label="软件包id">
                <el-input v-model="ruleForm.softwareId" placeholder="请输入软件包id" clearable></el-input>
            </el-form-item>
            <el-form-item label="提交日期">
                <el-date-picker
                    v-model="ruleForm.submitDate"
                    align="right"
                    :editable="false"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="提交日期"
                    :picker-options="dataPickerOptions"
                    class="data-picker"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="审核结果">
                <el-select v-model="ruleForm.status" placeholder="请选择" clearable>
                    <el-option label="待解析" :value="CHECK_STATUS.not"></el-option>
                    <el-option label="审核中" :value="CHECK_STATUS.wait"></el-option>
                    <el-option label="通过" :value="CHECK_STATUS.yes"></el-option>
                    <el-option label="不通过" :value="CHECK_STATUS.no"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="ruleForm.type" placeholder="请选择" clearable>
                    <el-option label="回放" :value="FILE_TYPE.adaline"></el-option>
                    <el-option label="模拟" :value="FILE_TYPE.simulation"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button ref="searchBtn" style="letter-spacing: 1px;" type="danger"
                           @click="submitSearch($event)">搜索
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
                            <el-form-item label="采集人："><span>{{ props.row.user_name }}</span></el-form-item>
                            <el-form-item label="手机："><span>{{ props.row.phone }}</span></el-form-item>
                            <el-form-item label="诊断时间："><span>{{ props.row.diagnose_start_time_format }}</span>
                            </el-form-item>
                            <el-form-item label="提交时间："><span>{{ props.row.created_format }}</span></el-form-item>
                            <el-form-item label="日志："><span>{{ props.row.file_name }}</span></el-form-item>
                            <el-form-item label="系统个数：" v-if="props.row.file_type === FILE_TYPE.simulation">
                                <span>{{ props.row.sys_num }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="品牌" prop="car_brand"></el-table-column>
                <el-table-column label="车型" prop="car_model"></el-table-column>
                <el-table-column label="年款" prop="car_year" align="center" header-align="center"
                                 min-width="52"></el-table-column>
                <el-table-column label="VIN" prop="vin" align="center" header-align="center"
                                 min-width="166"></el-table-column>
                <el-table-column label="类型" prop="file_type_format" align="center" header-align="center"
                                 min-width="52"></el-table-column>
                <el-table-column label="编号" prop="base_id" align="center" header-align="center"
                                 min-width="54"></el-table-column>
                <el-table-column label="软件包id" prop="software_id" align="center"
                                 header-align="center"></el-table-column>
                <el-table-column label="审核结果" prop="status_format" align="center" header-align="center"
                                 min-width="78"></el-table-column>
                <el-table-column label="操作" align="center" header-align="center" min-width="76">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="openCheckDialog(scope.$index, scope.row)">审核
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer" v-if="list.length > 0">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-size="pagesize"
                layout="total, prev, pager, next, jumper"
                :total="totalNum*1">
            </el-pagination>
        </div>
        <el-dialog ref="checkDialog" :title="checkDialogTitle" :visible.sync="checkDialogVisible"
                   :width="isAdaline ? '1046px' : '460px'"
                   :destroy-on-close="true">
            <iframe
                :src="adalineSrc"
                v-if="isAdaline"
                frameborder="0" width="100%" height="100%" marginheight="0" marginwidth="0"></iframe>
            <div class="alert alert-warning" v-else>
                <h4><i class="fa fa-warning"></i> 提示：</h4>
                模拟数据不在此查看。
            </div>
            <template slot="footer">
                <el-button type="warning" class="big-size" :disabled="curStatus==2"
                           @click="passHandle(false)">不通过
                </el-button>
                <el-button type="danger" class="big-size" :disabled="curStatus==1"
                           @click="passHandle(true)">通过
                </el-button>
            </template>
        </el-dialog>
        <el-dialog ref="remarkDialog" :title="isPass ? '审核结果：通过' : '审核结果：不通过'" :visible.sync="remarkDialogVisible"
                   width="460px"
                   :destroy-on-close="true" :close-on-press-escape="false" :close-on-click-modal="false">
            <template v-if="!isPass">
                <p class="line bold" style="text-indent: 1.3em">不通过的原因：</p>
                <el-radio-group v-model="remarkIndex" @change="onRemarkRadiochange">
                    <p class="line">
                        <el-radio :label="0">{{remarkText[0]}}</el-radio>
                    </p>
                    <p class="line">
                        <el-radio :label="1">{{remarkText[1]}}</el-radio>
                    </p>
                    <p class="line">
                        <el-radio :label="2">{{remarkText[2]}}</el-radio>
                    </p>
                    <p class="line">
                        <el-radio :label="3">{{remarkText[3]}}</el-radio>
                    </p>
                </el-radio-group>
            </template>
            <el-input
                class="textarea"
                v-model="remark" type="textarea" :rows="4"
                clearable maxlength="25" show-word-limit resize="none"
                placeholder="请输入说明">
            </el-input>
            <template slot="footer">
                <el-button class="big-size" @click="remarkDialogVisible = false">取消</el-button>
                <el-button type="danger" class="big-size" @click="onRemarkHandle(baseId, remark)">确定</el-button>
            </template>
        </el-dialog>
        <el-dialog ref="exportDialog" title="导出Excel" :visible.sync="exportDialogVisible"
                   width="872px" :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :destroy-on-close="true">
            <el-form class="export-form" inline :model="exportForm">
                <el-form-item label="姓名">
                    <el-input v-model="exportForm.userName" placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="exportForm.mobile" placeholder="请输入手机号码" clearable></el-input>
                </el-form-item>
                <el-form-item label="Vin">
                    <el-input v-model="exportForm.vin" placeholder="请输入Vin码" clearable></el-input>
                </el-form-item>
                <el-form-item label="序列号">
                    <el-input v-model="exportForm.sn" placeholder="请输入序列号" clearable></el-input>
                </el-form-item>
                <el-form-item label="编号">
                    <el-input v-model="exportForm.baseId" placeholder="请输入编号" clearable></el-input>
                </el-form-item>
                <el-form-item label="软件包id">
                    <el-input v-model="exportForm.softwareId" placeholder="请输入软件包id" clearable></el-input>
                </el-form-item>
                <el-form-item label="提交日期">
                    <el-date-picker
                        v-model="exportForm.submitDate"
                        align="right"
                        :editable="false"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="提交日期"
                        :picker-options="dataPickerOptions"
                        class="data-picker"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="审核结果">
                    <el-select v-model="exportForm.status" placeholder="请选择" clearable>
                        <el-option label="待解析" :value="CHECK_STATUS.not"></el-option>
                        <el-option label="审核中" :value="CHECK_STATUS.wait"></el-option>
                        <el-option label="通过" :value="CHECK_STATUS.yes"></el-option>
                        <el-option label="不通过" :value="CHECK_STATUS.no"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="exportForm.type" placeholder="请选择" clearable>
                        <el-option label="回放" :value="FILE_TYPE.adaline"></el-option>
                        <el-option label="模拟" :value="FILE_TYPE.simulation"></el-option>
                    </el-select>
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
    import md5 from 'md5'
    import {throttle} from 'lodash-es'
    import {configThrottle, formatDate} from 'manage/common/js/util.js'
    import {FILE_TYPE, SERVER_HOST, SIGN_KEY, CHECK_STATUS} from 'manage/config.js'
    import LogApi from 'manage/api/LogApi.js'
    import {UserCenterApi} from 'manage/api/UserCenterApi.js'

    const UserCenterIns = new UserCenterApi()

    const dataPickerOptions = {
        disabledDate(time) {
            return time.getTime() > Date.now();
        },
        shortcuts: [
            {
                text: '今天', onClick(picker) {
                    picker.$emit('pick', new Date());
                }
            },
            {
                text: '昨天', onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                }
            },
            {
                text: '前天', onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 2);
                    picker.$emit('pick', date);
                }
            }
        ]
    }

    export default {
        name: "Handle",
        data() {
            return {
                totalNum: 0,
                pagesize: 10,
                pageNum: 1,
                ruleForm: {             // 搜索表单
                    userName: '',
                    mobile: '',
                    vin: '',
                    sn: '',
                    baseId: '',
                    softwareId: '',
                    status: '',
                    submitDate: '',
                    type: '',
                },
                dataPickerOptions: dataPickerOptions,
                search: {                 // 保存搜索表单
                    userName: '',
                    mobile: '',
                    vin: '',
                    sn: '',
                    baseId: '',
                    softwareId: '',
                    status: '',
                    submitDate: '',
                    type: '',
                },
                listLoading: false,         // 表格列表loading
                listError: '',              // 表格列表接口是否错误
                list: [],                   // 表格列表数据
                checkDialogVisible: false,  // 审核对话框可见性
                checkDialogTitle: '',       // 审核对话框标题
                adalineSrc: '',             // 回放的iframe里src路径
                baseId: '',                 // 当前审核数据的base_id
                isAdaline: true,            // 回放数据还是模拟数据，true回放
                curStatus: '',              // 用于保存审核时当前状态
                remarkDialogVisible: false, // 审核说明对话框可见性
                isPass: false,              // 审核是否通过
                remark: '',                 // 审核说明
                remarkIndex: 3,             // 不通过的原因radio 的值
                remarkText: [
                    '采集的系统信息不全',
                    '采集的功能与要求不一致',
                    '采集的数据有误',
                    '其他',
                ],
                exportDialogVisible: false, // 导出Excel对话框是否显示
                exportForm: {               // 导出Excel表单
                    userName: '',
                    mobile: '',
                    vin: '',
                    sn: '',
                    baseId: '',
                    softwareId: '',
                    status: '',
                    submitDate: '',
                    type: '',
                },
                exportLoading: false,       // 导出
            }
        },
        created() {
            this.FILE_TYPE = FILE_TYPE
            this.CHECK_STATUS = CHECK_STATUS
        },
        activated() {
            this._reset()
            this._renderTable(this.pageNum, this.pagesize, {})
        },
        methods: {
            /** 搜索 **/
            submitSearch: throttle(function (event) {
                const _target = event.target
                if (event.keyCode === 13 && (_target === this.$refs.searchBtn.$el || _target === this.$refs.exportExcelBtn.$el)) {
                    return false;
                }
                for (let key in this.ruleForm) {
                    this.search[key] = this.ruleForm[key]
                }
                this.pageNum = 1
                this._renderTable(this.pageNum, this.pagesize, {
                    ...this.search,
                    submitDate: (this.search.submitDate + '').slice(0, 10),
                })
            }, 1000, configThrottle),
            /** 分页里，页码改变的回调 **/
            handleCurrentChange(pageNum) {
                this.pageNum = pageNum;
                this._renderTable(pageNum, this.pagesize, {
                    ...this.search,
                    submitDate: (this.search.submitDate + '').slice(0, 10),
                })
            },
            /** 打开审核对话框 **/
            openCheckDialog(index, listObj) {
                this.checkDialogVisible = true
                const checkDialogEle = this.$refs.checkDialog.$el
                checkDialogEle.style.bottom = '0'
                this.checkDialogTitle = `当前审核数据：${listObj.file_name}`
                this.$nextTick(() => {
                    if (listObj.file_type === FILE_TYPE.adaline) {
                        const _height = document.documentElement.clientHeight - 40
                        const _headerHeight = checkDialogEle.querySelector('.el-dialog__header').clientHeight
                        const _footerHeight = checkDialogEle.querySelector('.el-dialog__footer').clientHeight
                        checkDialogEle.querySelector('.el-dialog__body').style.height = _height - _headerHeight - _footerHeight + 'px'
                    } else {
                        checkDialogEle.querySelector('.el-dialog__body').style.height = '160px'
                    }
                })
                const baseId = listObj.base_id
                this.baseId = baseId
                this.curStatus = listObj.status
                if (listObj.file_type === FILE_TYPE.adaline) {
                    this.isAdaline = true
                    const model = listObj.car_brand
                    const cc = 13
                    this._getToken(baseId, cc).then((token) => {
                        const mySign = md5(`${baseId}${token}`)
                        const host = `${location.protocol}//${location.host}`
                        this.adalineSrc = `${host}/#/play?base_id=${baseId}&model=${model}&cc=${cc}&sign=${mySign}`
                    })
                } else {
                    this.isAdaline = false
                }
            },
            /** 通过按钮单击 **/
            passHandle(result) {
                this.remarkDialogVisible = true
                this.isPass = result
                this.$refs.remarkDialog.$el.style.bottom = '0'
                this.remark = ''
                this.remarkIndex = 3
            },
            /** 不通过的原因单选按钮改变的事件 **/
            onRemarkRadiochange(val) {
                if (val === 3) {
                    this.remark = ''
                } else {
                    this.remark = this.remarkText[val]
                }
            },
            /** 填写审批说明的确定按钮事件 **/
            onRemarkHandle(baseId, remark) {
                if (this.isPass) {
                    this._setIsPass(baseId, CHECK_STATUS.yes, remark)
                } else {
                    this._setIsPass(baseId, CHECK_STATUS.no, remark)
                }
            },
            /** 打开导出对话框 **/
            onExportExcel() {
                this.exportDialogVisible = true
                this.$refs.exportDialog.$el.style.bottom = '0'
                this.exportForm = {
                    userName: '',
                    mobile: '',
                    vin: '',
                    sn: '',
                    baseId: '',
                    softwareId: '',
                    status: '',
                    submitDate: '',
                    type: '',
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
                    const {userName, mobile, vin, sn, baseId, softwareId, status, submitDate, type} = params
                    const isDown = 1        // 不为空导出
                    let sign = 'action=getLearningLog'
                    if (baseId != null)         sign += `&base_id=${baseId}`
                    if (type != null)           sign += `&file_type=${type}`
                    sign += `&is_down=${isDown}`
                    if (mobile != null)         sign += `&phone=${mobile}`
                    if (sn != null)             sign += `&serial_number=${sn}`
                    if (softwareId != null)     sign += `&software_id=${softwareId}`
                    if (status != null)         sign += `&status=${status}`
                    if (submitDate != null)     sign += `&time=${submitDate}`
                    if (userName != null)       sign += `&user_name=${userName}`
                    if (vin != null)            sign += `&vin=${vin}`
                    sign = md5(`${md5(sign)}${SIGN_KEY}`)
                    let HOST_URL = SERVER_HOST
                    HOST_URL += '/LearningMachine/Index/getLearningLog'
                    HOST_URL += `?sign=${sign}&is_down=${isDown}`
                    if (userName != null)       HOST_URL += `&user_name=${userName}`
                    if (mobile != null)         HOST_URL += `&phone=${mobile}`
                    if (vin != null)            HOST_URL += `&vin=${vin}`
                    if (sn != null)             HOST_URL += `&serial_number=${sn}`
                    if (baseId != null)         HOST_URL += `&base_id=${baseId}`
                    if (softwareId != null)     HOST_URL += `&software_id=${softwareId}`
                    if (status != null)         HOST_URL += `&status=${status}`
                    if (submitDate != null)     HOST_URL += `&time=${submitDate}`
                    if (type != null)           HOST_URL += `&file_type=${type}`
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
                    if (rest[key] !== '' && rest[key] !== 'null') {
                        params[key] = rest[key]
                    }
                }
                this.listLoading = true
                this.$refs.content.scrollTop = 0
                this.listError = ''
                LogApi.getList(pageNum, pagesize, params).then((data) => {
                    this.listLoading = false
                    this.totalNum = data.count
                    const ret = []
                    const result = data.list
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].file_type === FILE_TYPE.adaline) {
                            result[i].file_type_format = '回放'
                        } else if (result[i].file_type === FILE_TYPE.simulation) {
                            result[i].file_type_format = '模拟'
                        } else {
                            result[i].file_type_format = ''
                        }
                        if (result[i].status === CHECK_STATUS.not) {
                            result[i].status_format = '待解析'
                        } else if (result[i].status === CHECK_STATUS.wait) {
                            result[i].status_format = '审核中'
                        } else if (result[i].status === CHECK_STATUS.yes) {
                            result[i].status_format = '通过'
                        } else if (result[i].status === CHECK_STATUS.no) {
                            result[i].status_format = '不通过'
                        }
                        result[i].diagnose_start_time_format = formatDate(new Date(result[i].diagnose_start_time * 1000), 'yyyy-MM-dd hh:mm')
                        result[i].created_format = formatDate(new Date(result[i].created * 1000), 'yyyy-MM-dd hh:mm')
                        ret.push(result[i])
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
            /** 从用户中心获得token **/
            _getToken(baseId, cc) {
                return new Promise((resolve, reject) => {
                    UserCenterIns.getToken(cc).then((data) => {
                        if (data.code === 0) {
                            const token = data.data
                            resolve(token)
                        } else {
                            reject(`${data.msg}. ID：${baseId}`)
                        }
                    }).catch((err) => {
                        reject(`${err}. ID：${baseId}`)
                    })
                })
            },
            /** 改变审核状态 **/
            _setIsPass(baseId, status, remark) {
                LogApi.changeStatus(baseId, status, remark).then((data) => {
                    this.remarkDialogVisible = false
                    this.checkDialogVisible = false
                    let msg = ''
                    let status_format = ''
                    if (status === CHECK_STATUS.yes) {
                        msg = '已设为：通过'
                        status_format = '通过'
                    } else if (status === CHECK_STATUS.no) {
                        msg = '已设为：不通过'
                        status_format = '不通过'
                    }
                    this.$message({
                        type: 'info',
                        message: msg
                    });
                    const list = this.list
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].base_id === baseId) {
                            this.$set(list, i, {
                                ...list[i],
                                status,
                                status_format
                            })
                            break;
                        }
                    }
                    this.curStatus = status
                }).catch((err) => {
                    this.$message({
                        showClose: true,
                        message: err,
                        type: 'error'
                    });
                })
            },
            _reset() {
                this.pageNum = 1
                this.ruleForm = {
                    userName: '',
                    mobile: '',
                    vin: '',
                    sn: '',
                    baseId: '',
                    softwareId: '',
                    status: '',
                    submitDate: '',
                    type: '',
                }
                this.search = {                 // 保存搜索表单
                    userName: '',
                    mobile: '',
                    vin: '',
                    sn: '',
                    baseId: '',
                    softwareId: '',
                    status: '',
                    submitDate: '',
                    type: '',
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

    .el-input, .el-select {
        width: 168px;
    }

    .export-form {
        position: relative;
        padding: 16px 0 0 0;
        .el-form-item {
            margin-bottom: 24px;
        }
        .el-input, .el-select {
            width: 193px;
        }
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
        margin-bottom: 20px;
        font-size: $size-md;
        &:first-child {
            margin-top: 4px;
        }
        &:last-child {
            margin-bottom: 28px;
        }
        &.bold {
            font-weight: 700;
        }
    }
    .textarea {
        margin: 4px 0;
    }
</style>
