<template>
    <div class="wrapper">
        <div class="search-wrapper">
            <div class="center-block">
                <div class="inner-center-block">
                    <el-input :placeholder="$t('i18n.modelPlease')" prefix-icon="el-icon-search" v-model="search" clearable></el-input>
                </div>
            </div>
        </div>
        <div class="content">
            <ul class="list center-block">
                <li class="item" v-for="(item, index) in makeDataHandle" :key="index" @click="toList">
                    <span class="top">diagnostic for</span>
                    <span class="middle">{{item.name}}</span>
                    <span class="bottom">by launch</span>
                </li>
            </ul>
        </div>
        <el-backtop target=".content"></el-backtop>
    </div>
</template>

<script>
    export default {
        name: 'SelectBrand',
        data() {
            return {
                search: '',
                makeDataHandle: [
                    {name: '大众'},
                    {name: '东风风神汽车专用'},
                    {name: '江淮微货(国际专用)'},
                    {name: 'MALAYSIAPERODUA'},
                    {name: '长丰猎豹'},
                    {name: 'EXEED星途 专用'},
                    {name: '大众'},
                    {name: '东风风神汽车专用'},
                    {name: '江淮微货(国际专用)'},
                    {name: 'MALAYSIAPERODUA'},
                    {name: '长丰猎豹'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: 'EXEED星途 专用'},
                    {name: '大众'},
                    {name: '东风风神汽车专用'},
                    {name: '江淮微货(国际专用)'},
                    {name: 'MALAYSIAPERODUA'},
                    {name: '长丰猎豹'},
                    {name: 'EXEED星途 专用'},
                ]
            }
        },
        methods: {
            toList() {
                this.$router.push({
                    path: '/list',
                    query: {}
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "~common/scss/variable.scss";
    @import "~common/scss/mixin.scss";

    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: $background-grey-dark;
        overflow: hidden;
    }
    .search-wrapper {
        padding: 8px 0;
        background-color: $color-white;
        @include box-shadow();
        .el-input {
            width: 96%;
            font-size: 15px;
            @media (min-width: 464px) {
                width: 380px;
            }
        }
    }
    .center-block {
        margin: 0 auto;
        width: 288px;
        @media (min-width: 608px) and (max-width: 751px) {
            width: 432px; // 3个   144的倍数，每个格子宽度144，3个
        }
        @media (min-width: 752px) and (max-width: 895px) {
            width: 576px; // 4个
        }
        @media (min-width: 896px) and (max-width: 1023px) {
            width: 720px; // 5个
        }
        @media (min-width: 1024px) and (max-width: 1279px) {
            width: 864px; // 6个
        }
        @media (min-width: 1280px) and (max-width: 1439px) {
            width: 1008px; // 7个
        }
        @media (min-width: 1440px) and (max-width: 1919px) {
            width: 1152px; // 8个
        }
        @media (min-width: 1920px) {
            width: 1440px; // 10个
        }
        .inner-center-block {
            padding: 0 12px;
            text-align: right;
        }
    }
    .content {
        flex: 1;
        padding: 12px 0;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        font-size: 0;
        .item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 6px;
            width: 132px;
            height: 132px;
            @include bg-linear-gradient($background-grey-light, #f4f4f4, #dedede);
            border-radius: 5PX;
            transition: all .1s;
            box-shadow: 0 -2PX 4PX #b9b9b9 inset;
            overflow: hidden;
            &:hover {
                box-shadow: 0 -2PX 14PX $color-black inset;
            }
            .top, .bottom {
                padding: 12px;
                font-size: $size-tn;
                color: $color-text-secondary;
            }
            .bottom {
                text-align: right;
            }
            .middle {
                padding: 0 4px;
                line-height: $line-height;
                text-align: center;
                font-size: 15px;
                color: $color-text-primary;
                font-weight: 700;
                word-break: break-word;
                cursor: pointer;
            }
        }
    }
</style>
