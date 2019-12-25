<template>
    <div class="tu-wrapper">
        <div class="center-block" ref="wrapper">
            <base-bc-title :title="$t('i18n.readDTC')"></base-bc-title>
            <div class="el-table el-table--striped el-table--border tu-table fixed">
                <table class="el-table__body" style="width: 100%">
                    <colgroup>
                        <col :width="columnWidth[0]">
                        <col :width="columnWidth[1]">
                        <col :width="columnWidth[2]">
                    </colgroup>
                    <thead>
                    <tr>
                        <th><div class="cell">{{ $t('i18n.DTC') }}</div></th>
                        <th><div class="cell">{{ $t('i18n.desc') }}</div></th>
                        <th><div class="cell">{{ $t('i18n.status') }}</div></th>
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
                        v-if="menudata.length === 1 && menudata[0].data.status === '' && menudata[0].data.title === ''">
                        <td colspan="3"><div class="cell no-data">{{menudata[0].data.context}}</div></td>
                    </tr>
                    <tr class="el-table__row"
                        :class="{'el-table__row--striped': item.striped, 'current-row': item.current}"
                        v-else
                        v-for="(item, index) in menudata" :key="index">
                        <td><div class="cell">{{item.data.title}}</div></td>
                        <td><div class="cell">{{item.data.context}}</div></td>
                        <td><div class="cell">{{item.data.status}}</div></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseBcTitle from 'index/base_comp/bcTitle/BaseBcTitle.vue'

    export default {
        name: "T700U700",
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
        },
        data() {
            return {
                menudata: [],                       // tr数据（格式化后）
                columnWidth: ['250', '500', '250'], // 列宽度
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
            const wrapperWidth = this.$refs.wrapper.clientWidth - 2
            this.columnWidth = [wrapperWidth * 0.25, wrapperWidth * 0.5, wrapperWidth * 0.25]
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
</style>
