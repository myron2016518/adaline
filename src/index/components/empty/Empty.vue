<template>
    <div class="tu-wrapper">
        <div class="center-block">
            <div class="empty">
                <i class="el-icon-warning-outline"></i>
                <div class="text">{{this.__not_work__}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Empty",
        computed: {
            ...mapGetters([
                '__not_work__',
            ])
        },
    }
</script>

<style scoped lang="scss">
    @import "~index/common/scss/variable.scss";
    @import "~index/common/scss/mixin.scss";

    .tu-wrapper {
        padding: 12px 0;
    }

    .center-block {
        position: relative;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        max-width: 1024px;
    }

    .empty {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 90px;
        max-width: 70%;
        min-height: 90px;
        line-height: 20px;
        padding: 16px;
        text-align: center;
        color: #fff;
        background-color: rgba(50, 50, 51, 0.88);
        border-radius: 4PX;
        white-space: pre-wrap;
        word-break: break-all;
        z-index: 2056;
        [class ^= "el-icon-"] {
            padding: 5px;
            font-size: 32px;
        }
        .text {
            margin-top: 8px;
            font-size: $size-md;
            letter-spacing: 1PX;
        }
    }
</style>
