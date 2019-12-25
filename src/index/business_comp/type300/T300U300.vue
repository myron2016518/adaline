<template>
    <div class="tu-wrapper">
        <div class="center-block">
            <base-bc-title :title="$t('i18n.menu')"></base-bc-title>
            <div class="scroll-wrapper" ref="wrapper">
                <div class="el-table el-table--striped el-table--border tu-table fixed">
                    <table class="el-table__body" style="width: 100%">
                        <colgroup>
                            <col :width="columnWidth">
                        </colgroup>
                        <thead>
                        <tr>
                            <th>
                                <div class="cell">{{rowTitle}}</div>
                            </th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="el-table el-table--striped el-table--border tu-table scroll">
                    <table class="el-table__body" style="width: 100%">
                        <colgroup>
                            <col :width="columnWidth">
                        </colgroup>
                        <tbody>
                        <tr class="el-table__row"
                            :class="{'el-table__row--striped': item.striped, 'current-row': item.current}"
                            v-for="(item, index) in menudata" :key="index">
                            <td><div class="cell">{{item.data.title}}</div></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseBcTitle from 'index/base_comp/bcTitle/BaseBcTitle.vue'

    export default {
        name: "T300U300",
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
            }
        },
        data() {
            return {
                menudata: [],           // tr数据（格式化后）
                rowTitle: '',           // th标题
                columnWidth: '1022',    // 列宽度
            }
        },
        computed: {
            /**
             * 当前选中的行
             * 因为formatData函数，因为数据是从1开始，所以减一
             * **/
            curRowKey() {
                return this.listSelected * 1 - 1
            }
        },
        mounted() {
            // 解决IE浏览器每行因为没设宽度而不是100%的问题
            this.columnWidth = this.$refs.wrapper.clientWidth - 2
            this.formatData()
            this._scrollTo()
        },
        watch: {
            playId() {
                this.formatData()
                this._scrollTo()
            }
        },
        methods: {
            /**
             * 格式化数据，将数据的第一项作为表格标题(title)，其他项作为表格行(text)
             * 原数据每一行叫title，改名未text             *
             * **/
            formatData() {
                if (this.typeData.data.menudata.length > 0) {
                    let _data = Array.prototype.slice.call(this.typeData.data.menudata)
                    if (_data[0].title === '') {
                        _data = Array.prototype.slice.call(_data, 1)
                    }
                    const title = _data[0].title
                    let menudata = Array.prototype.slice.call(_data, 1)

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
                    this.rowTitle = title
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
    .tu-wrapper {
        padding-bottom: 16px;
    }
    .center-block {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .scroll-wrapper {
        flex: 1;
        overflow-y: auto;
    }
</style>
