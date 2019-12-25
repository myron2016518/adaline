<template>
    <div class="tu-wrapper">
        <div class="center-block " ref="wrapper">
            <base-bc-title :title="$t('i18n.dataStreamPage')"></base-bc-title>
            <el-table
                class="tu-table T900U1740"
                :data="menudata"
                row-key="index"
                :current-row-key="listSelected*1"
                :empty-text="$t('i18n.noData')"
                :stripe="true"
                :border="true"
                :show-header="true"
                :highlight-current-row="true"
                style="width: 100%;">
                <el-table-column
                    :width="columnWidth[0]"
                    :label="$t('i18n.dataStreamName')"
                    prop="title">
                </el-table-column>
                <el-table-column
                    :width="columnWidth[1]"
                    :label="$t('i18n.dataStreamValue')"
                    prop="value">
                </el-table-column>
                <el-table-column
                    :width="columnWidth[2]"
                    :label="$t('i18n.standardValue')"
                    prop="standardvalue">
                </el-table-column>
                <el-table-column
                    :width="columnWidth[2]"
                    :label="$t('i18n.unit')"
                    prop="unit">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import BaseBcTitle from 'index/base_comp/bcTitle/BaseBcTitle.vue'

    export default {
        name: "T900U1740",
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
                buttondata: [],                     // 按钮数据
                columnWidth: ['200', '130', '100', '100'], // 列宽度
            }
        },
        created() {
            this.formatData()
        },
        mounted() {
            // 解决IE浏览器每行因为没设宽度而不是100%的问题
            const wrapperWidth = this.$refs.wrapper.clientWidth - 2
            if (wrapperWidth >= 766) {
                this.columnWidth = [wrapperWidth * 0.4, wrapperWidth * 0.2, wrapperWidth * 0.2, wrapperWidth * 0.2]
            }
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
                    for (let i = 0; i < menudata.length; i++) {
                        menudata[i].index = i + 1
                    }
                    this.menudata = menudata
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

<style lang="scss">
    .T900U1740 .el-table__row {
        pointer-events: none;
    }
</style>
