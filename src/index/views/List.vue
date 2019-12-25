<template>
    <div class="wrapper">
        <div class="search-wrapper">
            <div class="center-block">
                <el-row>
                    <el-row :gutter="8">
                        <el-col :xs="12" :sm="6">
                            <el-select v-model="value" placeholder="请选择车型">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="6">
                            <el-select v-model="value" placeholder="请选择年款">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col class="margin-top" :xs="12" :sm="6">
                            <el-select v-model="value" placeholder="请选择系统">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col class="margin-top" :xs="12" :sm="6">
                            <el-select v-model="value" placeholder="请选择功能">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-row>
            </div>
        </div>
        <div class="content">
            <ul class="center-block">
                <li class="list" v-for="iitem in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]">
                    <div class="left">
                        <p class="title">防盗钥匙匹配</p>
                        <p class="intro">宝马/x6/2012</p>
                        <p class="intro">上传时间：2019-02-15</p>
                    </div>
                    <div class="right">
                        <el-image :src="src" fit="contain" lazy>
                            <div slot="placeholder" class="image-slot"></div>
                            <div slot="error" class="image-slot"></div>
                        </el-image>
                    </div>
                </li>
            </ul>
        </div>
        <el-backtop target=".content"></el-backtop>
    </div>
</template>

<script>
    export default {
        name: "SelectOther",
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                src: ''
            }
        },
        created() {
            setTimeout(() => {
                this.src = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }, 1000)
            // alert(document.documentElement.clientWidth)
        }
    }
</script>

<style scoped lang="scss">
    @import "~index/common/scss/variable.scss";
    @import "~index/common/scss/mixin.scss";

    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: $background-grey-light;
    }
    .search-wrapper {
        padding: 8px 0;
        background-color: $color-white;
        @include box-shadow();
        box-sizing: border-box;
        .el-select { display: block; }
    }
    .center-block {
        margin: 0 auto;
        width: 100%;
        @media (min-width: 1380px) {
            width: 1200PX;
        }
        .el-row {
            margin-left: 0 !important;
            margin-right: 0 !important;
        }
        .margin-top {
            @media (max-width: 768px) {
                margin-top: 8px;
            }
        }
    }
    .content {
        flex: 1;
        padding: 12px 0;
        overflow-y: auto;
        .center-block {
            @media (min-width: 1080px) {
                width: 800PX;
            }
        }
        .list {
            display: flex;
            margin-bottom: 8px;
            padding: 16px;
            font-size: $size-md;
            background-color: $color-white;
            @include box-shadow();
            border-radius: 4px;
            cursor: pointer;
            .left {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                line-height: $line-height;
                color: $color-text-regular;
                .title {
                    margin-bottom: 4px;
                    font-size: $size-md;
                    font-weight: 700;
                }
                .intro {
                    font-size: $size-md;
                }
            }
            .right {
                width: 100px;
                .image-slot {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100px;
                    height: 72px;
                    background-color: $background-color-base;
                }
            }
        }
    }

</style>
