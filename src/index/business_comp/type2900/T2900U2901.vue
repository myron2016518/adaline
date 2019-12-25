<template>
    <div class="tu-dialog-wrapper" ref="wrapper">
        <el-dialog custom-class="t100-dialog t2900u2901" :title="title" :visible.sync="visible" :show-close="false"
                   :modal="false" :close-on-click-modal="false">
            <div class="content" :style="{'max-height': contentHeight + 'px'}">
                <div class="item" v-for="(item, index) in menudata" :key="index">
                    <div class="item-label">{{item.title}}</div>
                    <div class="item-content">
                        <el-input :value="item.default" v-if="item.type === 0"></el-input>
                        <el-select :value="item.default" v-else-if="item.type === 1">
                            <el-option
                                v-for="(option, index) in item.data"
                                :key="index"
                                :label="option.title"
                                :value="option.title">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <template slot="footer" class="dialog-footer">
                <el-button :type="btnSelected === '1' ? 'primary' : 'default'">{{ $t('i18n.certain') }}</el-button>
                <el-button :type="btnSelected === '2' ? 'primary' : 'default'">{{ $t('i18n.cancel') }}</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "T2900U2901",
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
                menudata: [],               // 对话框内容数据
                contentHeight: 0,           // 对话框内容高度，超出则出滚动条
            }
        },
        watch: {
            playId() {
                this.formatData()
            }
        },
        mounted() {
            this.formatData()
            this.$nextTick(() => {
                this._setPos()
            })
        },
        methods: {
            formatData() {
                this.title = this.typeData.data.title
                this.menudata = this.typeData.data.menudata
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

    .tu-dialog-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 100px;
        background-color: rgba(7, 17, 27, .1);
    }
    .el-dialog .el-dialog__footer .el-button {
        width: 100%;
    }
    .content {
        overflow-y: auto;
        pointer-events: auto;
        box-sizing: border-box;
    }
    .item {
        margin-bottom: 8px;
        &:last-child {
            margin-bottom: 0;
        }
        .item-label {
            padding-bottom: 8px;
            font-size: $size-md;
            line-height: $line-height;
        }
        .item-content {
        }
    }
    p {

    }
</style>

<style lang="scss">
    @import "~index/common/scss/variable.scss";
    .t2900u2901 {
        .el-dialog__body {
            padding: 20px;
        }
        .el-select {
            width: 100%;
            pointer-events: none;
        }
        .el-input {
            font-size: $size-tn;
        }
    }
</style>
