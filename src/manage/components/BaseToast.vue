<template>
    <div class="toast-wrapper">
        <template v-if="visible">
            <div class="toast-mask" v-if="mask" @click="visible = false"></div>
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
            }
        },
        data() {
            return {
                visible: false,
                text: ''
            }
        },
        methods: {
            show(text, time) {
                this.text = text
                this.visible = true
                if (TIMER) {
                    clearTimeout(TIMER)
                }
                TIMER = setTimeout(() => {
                    this.visible = false
                    TIMER = null
                }, time || 2000)
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
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px 12px;
        width: fit-content;
        min-width: 96px;
        max-width: 70%;
        line-height: 20px;
        color: #fff;
        font-size: 14px;
        white-space: pre-wrap;
        text-align: center;
        word-wrap: break-word;
        background-color: rgba(50, 50, 51, 0.88);
        border-radius: 4px;
        box-sizing: content-box;
    }
</style>
