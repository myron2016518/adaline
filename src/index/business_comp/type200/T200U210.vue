<template>
    <div class="tu-dialog-wrapper">
        <el-dialog custom-class="t200-dialog-small" :title="title" :visible.sync="visible" :show-close="false"
                   :modal="false" :close-on-click-modal="false">
            <el-input :value="content"></el-input>
            <template slot="footer" class="dialog-footer">
                <el-button :type="btnSelected === '1' ? 'primary' : 'default'">{{ $t('i18n.certain') }}</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "T200U210",
        props: {
            playId: {
                type: String,
                default: ''
            },
            typeData: {
                type: Object,
                default() {
                    return {}
                }
            },
            btnSelected: {
                type: String,
                default: '0'
            }
        },
        data() {
            return {
                visible: true,
                title: '',                  // 对话框标题
                content: '',                // 对话框内容
            }
        },
        watch: {
            playId() {
                this.formatData()
            }
        },
        created() {
            this.formatData()
        },
        methods: {
            formatData() {
                this.title = this.typeData.data.title
                this.content = this.typeData.data.content
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "~index/common/scss/variable.scss";
    @import "~index/common/scss/mixin.scss";

    .tu-dialog-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 100px;
        background-color: rgba(7, 17, 27, .1);
    }
    @media (min-width: 768px) {
        .t300-dialog {
            width: 360px;
        }
    }
    .el-dialog .el-dialog__footer .el-button {
        width: 100%;
    }

    p {
        font-size: $size-md;
        line-height: $line-height;
    }
</style>
