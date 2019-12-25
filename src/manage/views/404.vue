<template>
    <div class="exception">
        <h1 class="title">404</h1>
        <div class="desc">抱歉，你访问的页面不存在或仍在开发中</div>

    </div>
</template>

<script>
    export default {
        name: "Exception404"
    }
</script>

<style scoped lang="scss">
    @import "~manage/common/scss/variable.scss";

    .exception {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 0 16px;
        background-color: $background-grey-light;
        .title {
            margin: 0;
            margin-bottom: 40px;
            padding: 0;
            text-align: center;
            font-size: 80px;
            color: $color-text-placeholder;
            font-weight: 700;
            letter-spacing: 6px;
        }
        .desc {
            margin-bottom: 80px;
            line-height: 2;
            font-size: 20px;
            color: #909399;
            font-weight: 700;
            letter-spacing: 2px;
            text-indent: 2em;
            white-space: pre-wrap;
            word-break: break-all;
        }
        .btn-group { text-align: center; }
    }
</style>
