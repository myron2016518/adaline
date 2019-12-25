<template>
    <div class="tu-wrapper">
        <div class="center-block" ref="wrapper">
            <base-bc-title :title="$t('i18n.actionTest')"></base-bc-title>
            <div class="el-table el-table--striped el-table--border tu-table fixed">
                <table class="el-table__body" style="width: 100%">
                    <colgroup>
                        <col :width="columnWidth[0]" />
                        <col :width="columnWidth[1]" />
                        <col :width="columnWidth[2]" />
                    </colgroup>
                    <thead>
                    <tr>
                        <th><div class="cell">{{ $t('i18n.dataStreamName') }}</div></th>
                        <th><div class="cell">{{ $t('i18n.value') }}</div></th>
                        <th><div class="cell">{{ $t('i18n.unit') }}</div></th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="el-table el-table--striped el-table--border tu-table scroll">
                <table class="el-table__body" style="width: 100%">
                    <colgroup>
                        <col :width="columnWidth[0]">
                        <col :width="columnWidth[1]">
                        <col :width="columnWidth[2]">
                    </colgroup>
                    <tbody>
                    <tr class="el-table__row"
                        v-if="menudata.length === 0">
                        <td colspan="3"><div class="cell no-data">{{ $t('i18n.noData') }}</div></td>
                    </tr>
                    <tr class="el-table__row"
                        :class="{'el-table__row--striped': item.striped, 'current-row': item.current}"
                        v-else
                        v-for="(item, index) in menudata" :key="index">
                        <td><div class="cell">{{item.data.title}}</div></td>
                        <td><div class="cell">{{item.data.value}}</div></td>
                        <td><div class="cell">{{item.data.unit}}</div></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-group">
                <el-button :type="btnChecked.includes(index + 1 + '') ? 'primary' : 'default'"
                           v-for="(item, index) in buttondata" :key="index">
                    {{item.title}}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseBcTitle from 'index/base_comp/bcTitle/BaseBcTitle.vue'

    export default {
        name: "T600U600",
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
            listSelected: {
                type: String,
                default: '0',
            },
            btnSelected: {
                type: String,
                default: '0'
            }
        },
        data() {
            return {
                menudata: [],                       // tr数据（格式化后）
                buttondata: [],                     // 按钮数据
                columnWidth: ['600', '200', '200'], // 列宽度
            }
        },
        computed: {
            /**
             * 当前选中的行
             * 因为formatData函数，因为数据是从1开始，所以减一
             * **/
            curRowKey() {
                return this.listSelected * 1 - 1
            },
            btnChecked() {
                return this.btnSelected.split(',')
            },
        },
        created() {
            this.formatData()
        },
        mounted() {
            // 解决IE浏览器每行因为没设宽度而不是100%的问题
            const wrapperWidth = this.$refs.wrapper.clientWidth - 2
            this.columnWidth = [wrapperWidth * 0.6, wrapperWidth * 0.2, wrapperWidth * 0.2]
            this._scrollTo()
        },
        watch: {
            playId() {
                this.formatData()
                this._scrollTo()
            }
        },
        methods: {
            formatData() {
                if (this.typeData.data.menudata.length > 0) {
                    let menudata = this.typeData.data.menudata
                    let _ret = []
                    for (let j = 0; j < menudata.length; j++) {
                        let _tr = {
                            current: false,     // 当前行
                            striped: false,     // 隔行换色
                            data: menudata[j]
                        }
                        _ret.push(_tr)
                    }
                    /** 设置当前行、隔行换色 **/
                    for (let i = 0; i < _ret.length; i++) {
                        // 当前行
                        if (this.curRowKey === i) {
                            _ret[i].current = true
                        }
                        // 隔行换色
                        if (i % 2 !== 0) {
                            _ret[i].striped = true
                        }
                    }
                    this.menudata = _ret
                }
                this.buttondata = this.typeData.data.buttondata
            },
            _scrollTo() {
                this.$nextTick(() => {
                    const scrollEle = this.$refs.wrapper.getElementsByClassName('current-row')[0]
                    if (scrollEle) {
                        scrollEle.scrollIntoView()
                    }
                })
            }

        },
        components: {
            BaseBcTitle
        }
    }
</script>

<style scoped lang="scss">
    @import "~index/common/scss/variable.scss";
    @import "~index/common/scss/mixin.scss";

    .tu-wrapper {
        padding-bottom: 16px;
    }
    .center-block {
        display: flex;
        flex-direction: column;
        height: 100%;
        .fixed {
            flex: unset;
        }
        .scroll {
            flex: 1;
            overflow-y: auto;
        }
    }
    .btn-group {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 32px 16px 0 16px;
        @include box-shadow();
        button {
            margin-bottom: 16px;
        }
    }
</style>
