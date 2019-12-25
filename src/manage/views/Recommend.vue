<template>
    <div class="wrapper manage">
        <div class="content">
            <el-tabs class="my-tabs" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane class="my-tabs-item" label="模拟数据" name="1" v-loading="isLoading">
                    <div class="alert alert-warning" v-if="listError">
                        <h4><i class="fa fa-warning"></i> 提示：</h4>
                        {{listError}}
                    </div>
                    <template v-else>
                        <ul>
                            <li class="item">
                                <p class="line title">
                                    1、推荐数据等级
                                    <el-input-number v-model="simulation.level" :min="1" :max="10" style="margin-left: 1.2rem"></el-input-number>
                                </p>
                                <p class="line intro">推荐所有等级符合设置的数据</p>
                                <p class="line margin-left">
                                </p>
                            </li>
                            <li class="item">
                                <p class="line title">2、车型设置</p>
                                <p class="line margin-left"><el-radio v-model="simulation.typeFirst" label="year">年款优先</el-radio></p>
                                <p class="line intro">按最新年款车型推荐，设置后，将推荐最新车型，包括相同的车型。</p>
                                <p class="line margin-left"><el-radio v-model="simulation.typeFirst" label="model">车型优先（默认）</el-radio></p>
                                <p class="line intro">按不同车型推荐，设置后，每个车型推荐一款最新年款车型。</p>
                            </li>
                            <li class="item">
                                <p class="line title">
                                    3、推荐车型个数设置
                                    <el-input-number v-model="simulation.modelCount" :min="1" :max="100" style="margin-left: 1.0rem"></el-input-number>
                                </p>
                            </li>
                        </ul>
                    </template>
                </el-tab-pane>
                <el-tab-pane class="my-tabs-item" label="回放数据" name="2" v-loading="isLoading">
                    <div class="alert alert-warning" v-if="listError">
                        <h4><i class="fa fa-warning"></i> 提示：</h4>
                        {{listError}}
                    </div>
                    <template v-else>
                        <ul>
                            <li class="item">
                                <p class="line title">1、车型设置</p>
                                <p class="line margin-left"><el-radio v-model="adaline.typeFirst" label="year">年款优先</el-radio></p>
                                <p class="line intro">按最新年款车型推荐，设置后，将推荐最新车型，包括相同的车型。</p>
                                <p class="line margin-left"><el-radio v-model="adaline.typeFirst" label="model">车型优先（默认）</el-radio></p>
                                <p class="line intro">按不同车型推荐，设置后，每个车型推荐一款最新年款车型。</p>
                            </li>
                            <li class="item">
                                <p class="line title">2、推荐功能个数设置</p>
                                <p class="line margin-left">
                                    <span class="text">在线编程</span>
                                    <el-input-number v-model="adaline.onlineProgram" :min="1" :max="100"></el-input-number>
                                </p>
                                <p class="line margin-left">
                                    <span class="text">设码、配置</span>
                                    <el-input-number v-model="adaline.codeSet" :min="1" :max="100"></el-input-number>
                                </p>
                                <p class="line margin-left">
                                    <span class="text">模块更换</span>
                                    <el-input-number v-model="adaline.moduleUpdate" :min="1" :max="100"></el-input-number>
                                </p>
                                <p class="line margin-left">
                                    <span class="text">初始化、其它</span>
                                    <el-input-number v-model="adaline.initialize" :min="1" :max="100"></el-input-number>
                                </p>
                            </li>
                        </ul>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="footer"><el-button :type="isLoading ? 'info' : 'danger'" style="letter-spacing: 3px" @click="onSubmit" :disabled="isLoading">{{btnTxt}}</el-button></div>
        <base-toast ref="toast" :mask="true"></base-toast>
    </div>
</template>

<script>
    import RecommendApi from 'manage/api/RecommendApi.js'
    import BaseToast from 'manage/components/BaseToast.vue'

    export default {
        name: "Recommend",
        data() {
            return {
                activeName: '1',                // 模拟：1   回放：2
                isLoading: false,
                listError: '',
                simulation: {
                    level: 1,                   // 推荐数据等级
                    typeFirst: 'model',         // 车型设置                year：年款优先   model：车型优先
                    modelCount: 1,              // 推荐车型个数设置
                },
                adaline: {
                    typeFirst: 'model',         // 车型设置                year：年款优先   model：车型优先
                    onlineProgram: 1,           // 在线编程
                    codeSet: 1,                 // 设码、配置
                    moduleUpdate: 1,            // 模块更换
                    initialize: 1,              // 初始化、其它
                },
                btnTxt: '提交（模拟）'
            };
        },
        activated() {
            this.getDetail(this.activeName)
        },
        methods: {
            /** 获得设置信息 **/
            getDetail(type) {
                if (type == null) {
                    return false
                }
                this.listError = ''
                this.isLoading = true
                RecommendApi.getRecommend(type).then(data => {
                    this.isLoading = false
                    const typeFirst = data.typefirst === '1' ? 'model' : data.typefirst === '2' ? 'year' : null
                    if (type === '1') {
                        this.simulation.level = data.level
                        this.simulation.typeFirst = typeFirst
                        this.simulation.modelCount = data.recommendnum
                    } else {
                        this.adaline.typeFirst = typeFirst
                        const items = JSON.parse(data.recommendnum)
                        for (let item of items) {
                            if (item.log_type === 1) {              // 在线编程
                                this.adaline.onlineProgram = item.num
                            } else if (item.log_type === 2) {       // 设码配置
                                this.adaline.codeSet = item.num
                            } else if (item.log_type === 3) {       // 模块更换
                                this.adaline.moduleUpdate = item.num
                            } else if (item.log_type === 4) {       // 初始化、其它
                                this.adaline.initialize = item.num
                            }
                        }
                    }
                }).catch(err => {
                    this.isLoading = false
                    this.listError = err
                })
            },
            handleClick(tab, event) {
                if (this.activeName === '1') {
                    this.btnTxt = '提交（模拟）'
                } else if (this.activeName === '2') {
                    this.btnTxt = '提交（回放）'
                }
                this.getDetail(this.activeName)
            },
            onSubmit() {
                if (this.activeName === '1') {
                    this._onSimulationEdit()
                } else if (this.activeName === '2') {
                    this._onAdalineEdit()
                }
            },
            /** 模拟数据修改提交 **/
            _onSimulationEdit() {
                this.$confirm('确定修改 <span style="color: #f01414;">模拟数据推荐设置</span> 吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    dangerouslyUseHTMLString: true,
                    type: 'warning'
                }).then(() => {
                    const typeFirst = this.simulation.typeFirst === 'model' ? '1' : this.simulation.typeFirst === 'year' ? '2' : null
                    if (typeFirst == null) {
                        return
                    }
                    const params = [
                        this.simulation.level,
                        typeFirst,
                        this.simulation.modelCount,
                    ]
                    this.isLoading = true
                    RecommendApi.setSimulation(...params).then(data => {
                        this.isLoading = false
                        this.$refs.toast.show('修改成功', 5000)
                    }).catch(err => {
                        this.isLoading = false
                        this.$message({
                            type: 'error',
                            message: err,
                            duration: 5000,
                            showClose: true,
                        });
                    })

                }).catch(() => {
                });
            },
            /** 回放数据修改提交 **/
            _onAdalineEdit() {
                this.$confirm('确定修改 <span style="color: #f01414;">回放数据推荐设置</span> 吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    dangerouslyUseHTMLString: true,
                    type: 'warning'
                }).then(() => {
                    const typeFirst = this.adaline.typeFirst === 'model' ? '1' : this.adaline.typeFirst === 'year' ? '2' : null
                    if (typeFirst == null) {
                        return
                    }
                    const onlineProgram = this.adaline.onlineProgram
                    const codeSet = this.adaline.codeSet
                    const moduleUpdate = this.adaline.moduleUpdate
                    const initialize = this.adaline.initialize
                    const recommendNum = JSON.stringify([
                        {log_type: 1, num: onlineProgram},
                        {log_type: 2, num: codeSet},
                        {log_type: 3, num: moduleUpdate},
                        {log_type: 4, num: initialize},
                    ])
                    this.isLoading = true
                    RecommendApi.setAdaline(typeFirst, recommendNum).then(data => {
                        this.isLoading = false
                        this.$refs.toast.show('修改成功', 5000)
                    }).catch(err => {
                        this.isLoading = false
                        this.$message({
                            type: 'error',
                            message: err,
                            duration: 5000,
                            showClose: true,
                        });
                    })
                }).catch(() => {
                });
            }
        },
        components: {
            BaseToast
        }
    }
</script>

<style scoped lang="scss">
    @import "~manage/common/scss/variable.scss";
    .item {
        margin-bottom: 24px;
        &:last-child {
            margin-bottom: 0;
        }
        .line {
            margin-bottom: 16px;
            font-size: $size-md;
            line-height: $line-height;
            &:last-child {
                margin-bottom: 0;
            }
            &.title {
                color: $color-text-regular;
            }
            &.intro {
                text-indent: 1.56em;
                color: $color-text-placeholder;
            }
            &.margin-left {
                margin-left: 1.56em;
            }
            .text {
                display: inline-block;
                margin-right: 28px;
                min-width: 100px;
            }
        }
    }
    .footer {
        height: 80px !important;
    }
</style>
