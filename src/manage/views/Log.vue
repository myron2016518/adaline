<template>
    <div class="wrapper manage">
        <el-form class="ope-form" ref="ruleForm" :model="ruleForm" inline @keyup.enter.native="submitSearch($event)">
            <el-form-item label="姓名"><el-input v-model="ruleForm.userName" placeholder="请输入姓名" clearable></el-input></el-form-item>
            <el-form-item label="手机"><el-input v-model="ruleForm.mobile" placeholder="请输入手机号码" clearable></el-input></el-form-item>
            <el-form-item label="Vin"><el-input v-model="ruleForm.vin" placeholder="请输入Vin码" clearable></el-input></el-form-item>
            <el-form-item label="序列号"><el-input v-model="ruleForm.sn" placeholder="请输入序列号" clearable></el-input></el-form-item>
            <el-form-item label="编号"><el-input v-model="ruleForm.baseId" placeholder="请输入编号" clearable></el-input></el-form-item>
            <el-form-item label="软件包id"><el-input v-model="ruleForm.softwareId" placeholder="请输入软件包id" clearable></el-input></el-form-item>
            <el-form-item label="提交日期">
                <el-date-picker
                    v-model="ruleForm.submitDate"
                    align="right"
                    :editable="false"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="提交日期"
                    :picker-options="dataPickerOptions"
                    class="data-picker">
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
<!--            <el-form-item style="float: right">-->
<!--                <el-button ref="exportExcelBtn" type="success" style="letter-spacing: 1px;" @click="onUploadLog">上传-->
<!--                </el-button>-->
<!--            </el-form-item>-->
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
                            <el-form-item label="品牌："><span>{{ props.row.car_brand }}</span></el-form-item>
                            <el-form-item label="车型："><span>{{ props.row.car_model }}</span></el-form-item>
                            <el-form-item label="年款："><span>{{ props.row.car_year }}</span></el-form-item>
                            <el-form-item label="采集人："><span>{{ props.row.user_name }}</span></el-form-item>
                            <el-form-item label="手机："><span>{{ props.row.phone }}</span></el-form-item>
                            <el-form-item label="诊断时间："><span>{{ props.row.diagnose_start_time_format }}</span></el-form-item>
                            <el-form-item label="系统个数：" v-if="props.row.file_type === FILE_TYPE.simulation"><span>{{ props.row.sys_num }}</span></el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="日志" prop="file_name" header-align="center" min-width="248"></el-table-column>
                <el-table-column label="VIN" prop="vin" align="center" header-align="center" min-width="166"></el-table-column>
                <el-table-column label="类型" prop="file_type_format" align="center" header-align="center" min-width="52"></el-table-column>
                <el-table-column label="编号" prop="base_id" align="center" header-align="center" min-width="54"></el-table-column>
                <el-table-column label="软件包id" prop="software_id" align="center" header-align="center"></el-table-column>
                <el-table-column label="审核结果" prop="status_format" align="center" header-align="center" min-width="78"></el-table-column>
                <el-table-column label="提交时间" prop="created_format" align="center" header-align="center" min-width="132"></el-table-column>
                <el-table-column label="操作" align="center" header-align="center" min-width="76">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="onDownloadLog(scope.$index, scope.row)">下载</el-button>
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
        <el-dialog ref="uploadDialog" title="日志上传" :visible.sync="uploadDialogVisible"
                   width="460px" :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :destroy-on-close="true">

            <template slot="footer">
                <el-button @click="uploadDialogVisible=false">取消</el-button>
                <el-button type="danger" @click="onUploadLogSubmit">确定</el-button>
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
        name: "Log",
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
                uploadDialogVisible: false, // 日志上传对话框是否显示
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
            /** 打开日志上传对话框 **/
            onUploadLog() {
                this.uploadDialogVisible = true
                this.$refs.uploadDialog.$el.style.bottom = '0'
            },
            /** 日志上传表单提交 **/
            onUploadLogSubmit: throttle(function (event) {

            }, 1000, configThrottle),
            /** 日志下载 **/
            onDownloadLog: throttle(function (index, row) {
                const created = formatDate(new Date(row.created * 1000), 'yyyy-MM-dd')
                let _url
                if (row.file_type === FILE_TYPE.adaline) {
                    _url = `${SERVER_HOST}/Public/PlayBack/${created}/${row.file_name}`
                } else if (row.file_type === FILE_TYPE.simulation) {
                    _url = `${SERVER_HOST}/Public/LearningMachine/${created}/${row.file_name}`
                } else {
                    return false
                }
                window.open(_url, '_blank')
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
