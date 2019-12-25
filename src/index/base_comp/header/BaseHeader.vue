<template>
    <header class="header" ref="header">{{ $t("i18n.pageTitle") }}</header>
</template>

<script>
    import {isIe} from 'index/common/js/util.js'

    export default {
        name: "BaseHeader",
        mounted() {
            if (isIe() && this._device_ === 'pc') {
                this.$refs.header.style.fontSize = '0.266667rem'
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "~index/common/scss/variable.scss";
    @import "~index/common/scss/mixin.scss";

    .header {
        display: flex;
        align-items: center;
        padding: 0 16px;
        flex-basis: $header-height;
        flex-shrink: 0;
        font-size: 20px;
        color: $color-white;
        font-weight: 700;
        //@include bg-linear-gradient();
        background-color: $color-primary;
        letter-spacing: 1px;
        @include border-bottom-1px();
    }
</style>
