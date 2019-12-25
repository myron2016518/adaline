<template>
    <div class="tu-dialog-wrapper">
        <el-dialog custom-class="t100-dialog" :title="$t('i18n.info')" :visible.sync="visible" :show-close="false"
                   :modal="false" :close-on-click-modal="false">
            <div class="content">
                <div class="loading">
                    <i class="el-icon-loading"></i>
                </div>
                <p>{{ $t('i18n.processingData') }}...</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "T2703U2703",
        data() {
            return {
                visible: true,
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "~index/common/scss/variable.scss";
    @import "~index/common/scss/mixin.scss";

    .tu-dialog-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 100px;
        background-color: rgba(7, 17, 27, .1);
    }

    .content {
        display: flex;
        font-size: $size-md;
        .loading {
            display: flex;
            align-items: center;
            margin-right: 8px;
            [class^="el-icon"] {
                font-size: 20px;
                font-weight: 700;
            }
        }
        p {
            line-height: $line-height;
        }
    }
</style>
