<template>
    <div>
        <div class="center-block prevent-click">
            <base-bc-title :title="$t('i18n.dataStreamSelect')"></base-bc-title>
            <div class="btn-group">
                <el-button :type="btnChecked.includes('1') ? 'primary' : 'default'">{{ $t('i18n.selectAll') }}</el-button>
                <el-button :type="btnChecked.includes('2') ? 'primary' : 'default'">{{ $t('i18n.unselectAll') }}</el-button>
                <el-button :type="btnChecked.includes('3') ? 'primary' : 'default'">{{$t('i18n.certain')}}({{listChecked.length}}/{{menudata.length}})</el-button>
            </div>
            <div class="list">
                <div class="item" :class="{odd: setOddClass(item.stripe, index), block: menudata.length === 1}"
                     v-for="(item, index) in menudata" :key="index">
                    <el-checkbox :checked="listChecked.includes(item.index)"></el-checkbox><span class="text">{{item.title}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseBcTitle from 'index/base_comp/bcTitle/BaseBcTitle.vue'

    export default {
        name: "T500U500",
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
            }
        },
        data() {
            return {
                menudata: [],       // 列表数据（格式化后）
            }
        },
        computed: {
            btnChecked() {
                return this.btnSelected.split(',')
            },
            listChecked() {
                return this.listSelected.split(',')
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
            /**
             * 格式化数据，
             * **/
            formatData() {
                if (this.typeData.data.menudata.length > 0) {
                    let menudata = this.typeData.data.menudata.slice(0)
                    for (let i = 0; i < menudata.length; i++) {
                        menudata[i].index = i+1+''
                        menudata[i].stripe = true
                    }
                    // stripe用于大屏幕隔行换色
                    for (let i=2; i<menudata.length; i=i+4) {
                        menudata[i].stripe = false
                        if (menudata[i+1]) {
                            menudata[i+1].stripe = false
                        }
                    }
                    this.menudata = menudata
                }
            },
            /** 计算列表各行换色，因为大屏幕是一行两条数据，小屏幕是一行一条数据 **/
            setOddClass(pcOdd, index) {
                const domWidth = document.documentElement.clientWidth
                if (domWidth >= 768) {
                    return pcOdd
                } else {
                    if (index % 2 === 0) {
                        return true
                    } else {
                        return false
                    }
                }
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

    .list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 16px;
        @include box-shadow();
        .item {
            display: flex;
            align-items: center;
            padding: 0 40px;
            height: 48px;
            width: 100%;
            background-color: #fff;
            box-sizing: border-box;
            @media (min-width: 768px) {
                width: 50%;
            }
            &.block {
                width: 100%;
            }
            &.odd {
                background-color: $background-color-base;
            }
        }
        .text {
            margin-left: 20px;
            font-size: $size-md;
        }
    }
    .btn-group {
        display: flex;
        justify-content: flex-end;
        padding: 16px 12px 16px 0;
        background-color: #fff;
    }
</style>
<style lang="scss">
    .el-checkbox {
        .el-checkbox__inner {
            transform: scale(1.1);
            vertical-align: -1.1px;
        }
    }
</style>
