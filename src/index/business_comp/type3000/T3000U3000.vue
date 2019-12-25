<template>
    <div class="tu-wrapper">
        <div class="center-block">
            <base-bc-title :title="$t('i18n.fastSelectResult')"></base-bc-title>
            <div class="table-title">
                <div class="col">{{ $t('i18n.systemName') }}</div>
                <div class="col">{{ $t('i18n.status') }}</div>
            </div>
            <div class="collapse-wrapper" ref="wrapper">
                <div class="collapse" v-for="(item, index) in menudata" :key="index">
                    <div class="title" :class="{'scroll-to': index === curRowKey}">
                        <div class="title-item">{{item.context}}</div>
                        <div class="title-item" v-if="item.data && item.data.length > 0">
                            <span>{{ $t('i18n.fault') }}{{item.data.length}}
                                <i :class="{'el-icon-arrow-up': index === curRowKey, 'el-icon-arrow-down': index !== curRowKey}"></i>
                            </span>
                            <el-button :type="(item.data && item.data.length > 0 && index === curRowKey) ? 'primary' : 'default'"
                                       size="small"
                                       v-if="childType != null && childType !== -1 && childType === 26">{{ $t('i18n.certain') }}</el-button>
                        </div>
                    </div>
                    <div class="content" v-if="item.data && item.data.length > 0 && index === curRowKey">
                        <div class="line" v-for="(childItem, childIndex) in item.data" :key="childIndex">
                            <div class="line-item">{{childItem.title}}</div>
                            <div class="line-item">{{childItem.context}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseBcTitle from 'index/base_comp/bcTitle/BaseBcTitle.vue'
    import {animateScroll} from 'index/common/js/util.js'

    export default {
        name: "T3000U3000",
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
            childType: {
                type: Number,
                default: -1
            },
            listSelected: {
                type: String,
                default: '0',
            },
        },
        data() {
            return {
                menudata: [],               // 内容数据
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
        watch: {
            playId() {
                this.formatData()
                this._scrollTo()
            }
        },
        mounted() {
            this.formatData()
            this._scrollTo()
        },
        methods: {
            formatData() {
                this.menudata = this.typeData.data.menudata
            },
            _scrollTo() {
                this.$nextTick(() => {
                    const scrollEle = this.$refs.wrapper.getElementsByClassName('scroll-to')[0]
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
    }
    .table-title {
        display: flex;
        align-items: center;
        height: 48px;
        background-color: $background-grey;
        .col {
            flex: 1;
            padding-left: 12px;
            font-size: $size-md;
        }
    }
    .collapse-wrapper {
        flex: 1;
        overflow-y: auto;
    }
    .collapse {
        .title {
            display: flex;
            align-items: center;
            height: 48px;
            border: 1px solid $border-color-base;
            border-bottom-width: 0;
            .title-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex: 1;
                padding: 0 12px;
                font-size: $size-md;
                [class ^= "el-icon-arrow-"] {
                    margin-left: 12px;
                    font-weight: 700;
                }
            }
        }
        .content {
            margin-bottom: 12px;
            .line {
                display: flex;
                align-items: center;
                height: 48px;
                background-color: $background-color-base;
                border: 1px solid $border-color-base;
                &:first-child {
                    border-top-width: 0;
                }
                .line-item {
                    flex: 1;
                    padding-left: 12px;
                    font-size: $size-md;
                }
            }
        }
    }
</style>
