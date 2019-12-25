<template>
    <div class="tu-dialog-wrapper" ref="wrapper">
        <el-dialog custom-class="t100-dialog t100u110" :title="title" :visible.sync="visible" :show-close="false"
                   :modal="false" :close-on-click-modal="false">
            <div class="content" :style="{'max-height': contentHeight + 'px'}">
                <p v-html="content"></p>
            </div>
            <template slot="footer" class="dialog-footer">
                <el-button :type="btnSelected === '1' ? 'primary' : 'default'">{{ $t('i18n.certain') }}</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "T100U110",
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
                contentHeight: 0,           // 对话框内容高度，超出则出滚动条
            }
        },
        watch: {
            playId() {
                this.formatData()
            }
        },
        created() {
            this.formatData()
            this.$nextTick(() => {
                this._setPos()
            })
        },
        methods: {
            formatData() {
                this.title = this.typeData.data.title
                this.content = this.typeData.data.content
            },
            /** 设置对话框位置 **/
            _setPos() {
                const wrapper = this.$refs.wrapper
                const wrapHeight = wrapper.clientHeight
                const dialogHeaderHeight = wrapper.getElementsByClassName('el-dialog__header')[0].clientHeight
                const dialogFooterHeight = wrapper.getElementsByClassName('el-dialog__footer')[0].clientHeight
                let result = 0
                if (this._device_ !== 'tablet') {
                    const headerHeight = document.getElementsByTagName('header')[0].clientHeight
                    wrapper.getElementsByClassName('el-dialog__wrapper')[0].style.top = headerHeight + 'px'
                }
                result = wrapHeight - dialogHeaderHeight - dialogFooterHeight
                this.contentHeight = result * 0.8
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
        .content {
            padding: 20px;
            overflow-y: auto;
            pointer-events: auto;
            box-sizing: border-box;
        }
    }
    p {
        font-size: $size-md;
        line-height: $line-height;
    }
    .el-dialog .el-dialog__footer .el-button {
        width: 100%;
    }
</style>

<style lang="scss">
    .t100u110 {
        .el-dialog__body {
            padding: 0 !important;
        }
    }
</style>
