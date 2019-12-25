<template>
    <div class="tu-wrapper t1100u1100">
        <div class="center-block " ref="wrapper">
            <base-bc-title :title="$t('i18n.testResult')"></base-bc-title>
            <div class="el-table el-table--striped el-table--border tu-table fixed" style="overflow-x: auto">
                <table class="el-table__body" :style="{width: tableWidth}">
                    <colgroup>
                        <template v-for="item in columns">
                            <col :width="columnWidth">
                        </template>
                    </colgroup>
                    <thead>
                    <tr>
                        <th v-for="(item, index) in theadData" :key="index">
                            <div class="cell">{{item.title}}</div>
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="el-table el-table--striped el-table--border tu-table scroll" style="overflow-x: auto">
                <table class="el-table__body" :style="{width: tableWidth}">
                    <colgroup>
                        <template v-for="item in columns">
                            <col :width="columnWidth">
                        </template>
                    </colgroup>
                    <tbody>
                    <tr class="el-table__row"
                        :class="{'el-table__row--striped': trItem.striped, 'current-row': trItem.current}"
                        v-for="(trItem, tdIndex) in tbodyData" :key="tdIndex">
                        <td v-for="(item, index) in trItem.data" :key="index">
                            <div class="cell" v-if="/\d%/g.test(item)">
                                <el-progress :text-inside="true" :stroke-width="23" :percentage="item.slice(0, -1)*1"></el-progress>
                            </div>
                            <div class="cell" v-else v-html="item"></div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-group prevent-click">
                <el-button :type="btnChecked.includes(index + 1 + '') ? 'primary' : 'default'" size="small"
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
        name: "T1100U1100",
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
                default: '0',
            },
            listSelected: {
                type: String,
                default: '0',
            },
        },
        data() {
            return {
                theadData: [],            // thead数据
                tbodyData: [],            // tbody数据
                buttondata: [],           // 按钮数据
                columns: 0,               // 多少列
                columnWidth: 200,         // 列宽度
            }
        },
        computed: {
            btnChecked() {
                return this.btnSelected.split(',')
            },
            tableWidth() {
                return this.columnWidth * this.columns + 'px'
            }
        },
        created() {
            this.formatData()
            this.$nextTick(() => {
                this._setColumnWidth()
                this._scrollTo()
            })
        },
        watch: {
            playId() {
                this.formatData()
                this.$nextTick(() => {
                    this._setColumnWidth()
                    this._scrollTo()
                })
            }
        },
        methods: {
            formatData() {
                if (this.typeData.data.menudata.length > 0) {
                    this.buttondata = this.typeData.data.buttondata
                    const columns = this.typeData.data.colums
                    this.columns = columns
                    this.theadData = this.typeData.data.menutitle
                    let menudata = this.typeData.data.menudata
                    let _ret = []
                    for (let j = 0; j < menudata.length; j = j + columns) {
                        let _tr = {
                            current: false,     // 当前行
                            striped: false,     // 隔行换色
                            data: []
                        }
                        for (let k = 0; k < columns; k++) {
                            _tr.data.push(menudata[j + k].value)
                        }
                        _ret.push(_tr)
                    }
                    /** 设置当前行、隔行换色、是否是进度条 **/
                    for (let i = 0; i < _ret.length; i++) {
                        // 当前行
                        if (this.listSelected * 1 === i + 1) {
                            _ret[i].current = true
                        }
                        // 隔行换色
                        if (i % 2 !== 0) {
                            _ret[i].striped = true
                        }
                    }
                    this.tbodyData = _ret
                }
            },
            /** 设置列宽度 **/
            _setColumnWidth() {
                this.columnWidth = 200
                const wrapperWidth = this.$refs.wrapper.clientWidth - 2
                if (wrapperWidth >= 766 || this.columns < 3) {
                    let percent = 100 / this.columns / 100
                    if (this._device_ === 'pc') {
                        this.columnWidth = wrapperWidth * percent - 10
                    } else {
                        this.columnWidth = wrapperWidth * percent
                    }
                }
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
        padding: 24px 16px 0 16px;
        @include box-shadow();
        button {
            margin-bottom: 16px;
        }
    }
</style>
