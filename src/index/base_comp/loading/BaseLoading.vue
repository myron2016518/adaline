<template>
    <div>
        <div class="loading-mask" v-if="mask" v-show="visible">
            <div class="loading">
                <i class="icon-spinner2"></i>
            </div>
        </div>
        <div class="loading" v-else v-show="visible">
            <i class="icon-spinner2"></i>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "BaseLoading",
        props: {
            mask: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            show() {
                this.visible = true
            },
            hide() {
                this.visible = false
            }
        }
    }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    @import "~index/common/scss/variable.scss";

    .loading-mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 100px;
        background-color: rgba(7, 17, 27, .2);
        z-index: 9999;
    }
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -28px;
        margin-top: -28px;
        font-size: 28px;
        color: #fff;
        background-color: rgba(64, 64, 64, .9);
        border-radius: 6PX;
        .icon-spinner2 {
            display: inline-block;
            animation: spinner 1.5s linear infinite;
        }
    }
    @keyframes spinner {
        0% {
            transform: rotate(0deg);
            transform-origin: center center;
        }
        100% {
            transform: rotate(359deg);
            transform-origin: center;
        }
    }
</style>
