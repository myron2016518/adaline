<template>
    <div class="tu-title">
        <span>{{title}}</span>
        <span><i class="el-icon-arrow-left"></i>{{ $t('i18n.return') }}</span>
    </div>
</template>

<script>
    export default {
        name: "BaseBcTitle",
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "~index/common/scss/variable.scss";

    /** 业务组件的标题 **/
    .tu-title {
        display: flex;
        justify-content: space-between;
        padding: 14px 12px;
        font-size: $size-md;
        color: #fff;
        background-color: #8c8f92;
        [class ^= 'el-icon'] {
            position: relative;
            top: 1px;
            margin-right: 2px;
            font-size: $size-lg;
            font-weight: 700;
        }
    }
</style>
