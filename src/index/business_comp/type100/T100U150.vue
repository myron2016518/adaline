<template>
    <div class="toast">
        <div>{{ $t('i18n.finishDiagnosis') }}</div>
    </div>
</template>

<script>
    export default {
        name: "T100U150",
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
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "~index/common/scss/variable.scss";

    .toast {
        position: absolute;
        top: calc(50% - 60px);
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 12px 16px;
        width: fit-content;
        min-width: 96px;
        max-width: 70%;
        min-height: unset;
        line-height: $line-height;
        text-align: center;
        color: #fff;
        font-size: $size-md;
        background-color: rgba(50, 50, 51, 0.88);
        letter-spacing: 1px;
        word-break: break-all;
        border-radius: 4px;
        white-space: pre-wrap;
        box-sizing: content-box;
    }
</style>
