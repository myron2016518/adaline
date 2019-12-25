<template>
    <div class="toast-wrapper">
        <template v-if="visible">
            <div class="toast-mask" v-if="mask"></div>
            <div class="toast">{{text}}</div>
        </template>
    </div>
</template>

<script>
    let TIMER

    export default {
        name: "BaseToast",
        props: {
            mask: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: '100%'
            },
            timeout: {
                type: Number,
                default: 1000
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
                if (TIMER) {
                    clearTimeout(TIMER)
                }
                TIMER = setTimeout(() => {
                    this.visible = false
                    TIMER = null
                }, this.timeout)
            }
        }
    }
</script>

<style scoped lang="scss">
    .toast-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(7, 17, 27, 0);
        z-index: 9998;
    }
    .toast {
        position: fixed;
        top: calc(50% - 20px);
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16px;
        width: 76px;
        height: 76px;
        font-size: 28px;
        color: #fff;
        background-color: rgba(50, 50, 51, 0.88);
        letter-spacing: 1px;
        white-space: pre-wrap;
        word-break: break-all;
        border-radius: 4PX;
        box-sizing: content-box;
        z-index: 9999;
    }
</style>
