<template>
    <el-dialog ref="exportDialog" title="导出Excel" :visible.sync="visible"
               width="902px" :close-on-click-modal="false"
               :close-on-press-escape="false"
               :destroy-on-close="true" @close="onCloee">
        <el-form class="export-form" inline :model="ruleForm">
            <el-form-item label="反馈类型">
                <el-select v-model="ruleForm.type" placeholder="请选择" clearable>
                    <el-option label="模拟" :value="FEEDBACK_TYPE.simulation"></el-option>
                    <el-option label="回放" :value="FEEDBACK_TYPE.adaline"></el-option>
                    <el-option label="其他" :value="FEEDBACK_TYPE.other"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="ruleForm.status" placeholder="请选择" clearable>
                    <el-option label="未解决" :value="STATUS.not"></el-option>
                    <el-option label="已解决" :value="STATUS.yes"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="反馈时间">
                <el-date-picker class="data-picker" v-model="ruleForm.feedBackDate" :picker-options="dataPickerOptions"
                                align="right" :editable="false" type="date" value-format="yyyy-MM-dd"
                                placeholder="反馈时间">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button @click="onCloee">取消</el-button>
            <el-button type="danger" @click="onExportSubmit">确定</el-button>
        </template>
    </el-dialog>
</template>

<script>
    import {throttle} from 'lodash-es';
    import {configThrottle, formatDate} from 'manage/common/js/util.js';
    import {SERVER_HOST, SIGN_KEY} from 'manage/config.js'

    export default {
        name: 'ExportDialog',
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
            FEEDBACK_TYPE: {
                type: Object,
            },
            STATUS: {
                type: Object,
            },
            dataPickerOptions: {
                type: Object,
            },
        },
        data() {
            return {
                ruleForm: {
                    type: '',
                    status: '',
                    feedBackDate: '',
                },
            };
        },
        methods: {
            /** 导出表单提交 **/
            onExportSubmit: throttle(function(event) {
                const form = this.ruleForm;
                let isRequired = false;
                const params = {};
                for (let key in form) {
                    if (form[key] !== '' && form[key] !== 'null' && form[key] !== null) {
                        params[key] = form[key];
                        isRequired = true;
                    }
                }
                if (!isRequired) {
                    this.$message({
                        type: 'error',
                        message: '请选择导出条件！',
                    });
                } else {
                    // const {userName, mobile, order, payStatus, created} = params;
                    // let start_time, end_time;
                    // if (created instanceof Array && created.length === 2) {
                    //     start_time = created[0];
                    //     end_time = created[1];
                    // }
                    // const isDown = 1;        // 不为空导出
                    // let sign = 'action=getRewardList';
                    // if (end_time != null) {
                    //     sign += `&end_time=${end_time}`;
                    // }
                    // sign += `&is_down=${isDown}`;
                    // if (order != null) {
                    //     sign += `&pay_order_id=${order}`;
                    // }
                    // sign = md5(`${md5(sign)}${SIGN_KEY}`);
                    // let HOST_URL = SERVER_HOST;
                    // HOST_URL += '/LearningMachine/Index/getRewardList';
                    // HOST_URL += `?sign=${sign}&is_down=${isDown}`;
                    // if (userName != null) {
                    //     HOST_URL += `&user_name=${userName}`;
                    // }
                    // window.open(HOST_URL, '_blank');
                    setTimeout(() => {
                        this.$emit('close');
                    }, 1000);
                }
            }, 1000, configThrottle),
            onCloee() {
                this.$emit('close');
            },
        },
    };
</script>

<style scoped>

</style>