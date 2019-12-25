<template>
    <div class="error">
       <span class="weight">{{ $t('i18n.error') }}：</span>{{text}}
    </div>
</template>

<script>
    export default {
        name: "BaseError",
        props: {
            text: {
                type: String,
                default: '100%'
            },
        },
        created() {
        }
    }
</script>

<style scoped lang="scss">
    @import "~index/common/scss/variable.scss";

    .error {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 15px;
        width: fit-content;
        min-width: 180px;
        max-width: 70%;
        line-height: $line-height;
        text-align: center;
        font-size: $size-md;
        color: #8a6d3b;
        background-color: #fcf8e3;
        border: 1px solid transparent;
        border-color: #faebcc;
        border-radius: 4px;
        white-space: pre-wrap;
        word-break: break-all;
        .weight {
            font-weight: 700;
            color: #66512c;
        }
    }
</style>
