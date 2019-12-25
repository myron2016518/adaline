<template>
    <div class="tu-dialog-wrapper">
        <el-dialog custom-class="t100-dialog t100u170" :title="title" :visible.sync="visible" :show-close="false"
                   :modal="false" :close-on-click-modal="false">
            <p v-html="content"></p>
            <template slot="footer">
                <el-progress :text-inside="true" :percentage="ratio"></el-progress>
                <div class="progress-text">
                    <span>{{ratio}}%</span>
                    <span>{{ratio}} / 100</span>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "T100U170",
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
        data() {
            return {
                visible: true,
                title: '',          // 对话框标题
                content: '',        // 对话框内容
                ratio: 0,           // 当前进度
            }
        },
        watch: {
            playId() {
                this.formatData()
            }
        },
        created() {
            this.formatData()
        },
        methods: {
            formatData() {
                this.title = this.typeData.data.title
                this.content = this.typeData.data.content
                this.ratio = this.typeData.data.ratio
            },
            // format(percentage) {
            //     return `${percentage}%`;
            // }
        }
    }
</script>

<style scoped lang="scss">
    @import "~index/common/scss/variable.scss";

    .tu-dialog-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 100px;
        background-color: rgba(7, 17, 27, .1);
    }

    p {
        font-size: $size-md;
        line-height: $line-height;
    }
</style>

<style lang="scss">
    @import "~index/common/scss/variable.scss";

    .t100u170 .el-dialog__footer {
        display: block;
        text-align: left;
        .el-progress-bar__innerText {
            font-size: 0;
        }
        .progress-text {
            display: flex;
            margin-top: 8px;
            justify-content: space-between;
            font-size: $size-tn;
        }
    }
</style>
