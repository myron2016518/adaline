<template>
    <el-dialog title="问题已解决？" :visible.async="visible"
               width="400px" :close-on-click-modal="false"
               :close-on-press-escape="false"
               :destroy-on-close="true" @close="onCloee">
        <el-form class="form" ref="resolveForm" :model="ruleForm" :rules="rules" label-width="0">
            <el-form-item prop="suggest" style="margin-bottom: 14px">
                <el-input
                        class="resolve-dialog-textarea" v-model="ruleForm.suggest"
                        type="textarea" placeholder="问题已解决，感谢反馈。" resize="none" rows="4"></el-input>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button @click="onCloee">取消</el-button>
            <el-button type="danger" :loading="loading" @click="onSubmit('resolveForm')">提交</el-button>
        </template>
    </el-dialog>
</template>

<script>
    export default {
        name: 'ResolvedDialog',
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                loading: false,
                ruleForm: {
                    suggest: '',
                },
                rules: {
                    suggest: [
                        {required: true, message: '请输入反馈内容', trigger: 'change'},
                        {min: 8, max: 100, message: '反馈内容8-100位', trigger: 'change'},
                    ],
                },
            };
        },
        watch: {
            visible(newValue, oldValue) {
                if (newValue) {
                    this._reset();
                }
            },
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;

                    } else {
                        return false;
                    }
                });
            },
            onCloee() {
                this.$emit('close');
            },
            _reset() {
                this.loading = false;
                this.ruleForm.suggest = '';
                this.$nextTick(() => {
                    this.$refs.resolveForm.clearValidate();
                })
            },
        },
    };
</script>

<style lang="scss">
    .resolve-dialog-textarea {
        .el-textarea__inner {
            padding: 8px 12px;
            font-size: 14px;
        }
    }
</style>