<template>
    <div class="bar-wrapper">
        <div class="bar-wrapper-inner">
            <el-slider class="slider" v-model="step" :min="0" :max="frames-1" :show-tooltip="false"
                       @change="changeHandle"></el-slider>
            <div class="bars">
                <div class="video-id">{{$t("i18n.video")}}：{{baseId}}</div>
                <el-tooltip effect="light" :content="$t('i18n.firstFrame')" placement="top" :hide-after="hideAfter"
                            :open-delay="openDelay">
                    <a @click="toFirstHandle" :class="{disabled: ifFirstFrame}"><i class="icon-first"></i></a>
                </el-tooltip>
                <el-tooltip effect="light" :content="$t('i18n.slower')" placement="top" :hide-after="hideAfter" :open-delay="openDelay">
                    <a @click="slowerHandle" :class="{disabled: slowerDisable}"><i class="icon-backward2"></i></a>
                </el-tooltip>
                <el-tooltip v-if="ifLastFrame || !__play_state__" effect="light" :content="$t('i18n.play')" placement="top"
                            :hide-after="hideAfter" :open-delay="openDelay">
                    <a @click="playHandle(ifLastFrame)"><i class="icon-play3"></i></a>
                </el-tooltip>
                <el-tooltip v-else effect="light" :content="$t('i18n.pause')" placement="top" :hide-after="hideAfter"
                            :open-delay="openDelay">
                    <a @click="pauseHandle"><i class="icon-pause2"></i></a>
                </el-tooltip>
                <el-tooltip effect="light" :content="$t('i18n.faster')" placement="top" :hide-after="hideAfter" :open-delay="openDelay">
                    <a @click="fasterHandle" :class="{disabled: fasterDisable}"><i class="icon-forward3"></i></a>
                </el-tooltip>
                <el-tooltip effect="light" :content="$t('i18n.lastFrame')" placement="top" :hide-after="hideAfter"
                            :open-delay="openDelay">
                    <a @click="toLastHandle" :class="{disabled: ifLastFrame}"><i class="icon-last"></i></a>
                </el-tooltip>
                <div class="total-wrapper">
                    <span class="total">{{playTime}} / {{playTimeTotal}}</span>
                    <!--<span class="total">{{__current_frames__+1}} / {{frames}}</span>-->
                    <!--<span class="total">当前帧 / 总帧数</span>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    const SPEED_PERCENT_SUB = 0.25      // 每次点减速按钮后所增加、减少的比率
    const SPEED_PERCENT_ADD = 0.50      // 每次点加速按钮后所增加、增加的比率
    const SPEED_MIN = 0.05              // 最小速度
    const SPEED_MAX = 8                 // 最大速度

    export default {
        name: "PlayBar",
        props: {
            frames: {                   // 总帧数
                type: Number,
                default: 0
            },
            playTime: {
                type: String,
                default: '00:00'
            },
            playTimeTotal: {
                type: String,
                default: '00:00'
            },
            baseId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                step: this.__current_frames__ === -1 ? 0 : this.__current_frames__,   // 当前帧
                speedRate: 1,                    // 经过加速、减速后，当前的播放速度比率
                slowerDisable: false,            // 减速禁用状态
                fasterDisable: false,            // 加速禁用状态
                hideAfter: 1000,                 // toolTip隐藏的时间
                openDelay: this._device_ === 'pc' ? 200 : 0,
            }
        },
        watch: {
            __current_frames__(newVal, oldVal) {
                this.step = newVal
            },
        },
        computed: {
            ifFirstFrame() {
                return (this.step === 0) ? true : false
            },
            ifLastFrame() {
                return (this.step === this.frames - 1) ? true : false
            },
            ...mapGetters([
                '__current_frames__',
                '__play_state__'
            ])
        },
        methods: {
            /** 拖动滚动条时 **/
            changeHandle(val) {
                this.setCurrentFrames(val)
                if (this.__play_state__) {
                    this.$emit('pause')
                    this.$nextTick(() => {
                        this.$emit('play', val, true)
                    })
                }
            },
            /** 到第一帧 **/
            toFirstHandle() {
                this.setCurrentFrames(0)
                if (this.__play_state__) {
                    this.$emit('pause')
                    this.$nextTick(() => {
                        this.$emit('play', 0, true)
                    })
                }
            },
            /** 到最后一帧 **/
            toLastHandle() {
                this.setCurrentFrames(this.frames - 1)
                if (this.__play_state__) {
                    this.$emit('pause')
                    this.$nextTick(() => {
                        this.$emit('play', this.frames - 1, true)
                        this.setPlayState(false)
                    })
                }
            },
            /** 减速 **/
            slowerHandle() {
                if (this.fasterDisable) {
                    this.fasterDisable = false
                }
                if (this.slowerDisable) {
                    return false
                }
                let _speed = (this.speedRate > 1) ? (this.speedRate - SPEED_PERCENT_ADD) : (this.speedRate - SPEED_PERCENT_SUB)
                _speed = _speed.toFixed(2) * 1
                if (_speed <= 0) {
                    this.slowerDisable = true
                    this.speedRate = SPEED_MIN
                } else {
                    this.speedRate = _speed
                }
                this.$emit('changeSpeed', this.speedRate, this.__play_state__)
            },
            /** 加速 **/
            fasterHandle() {
                if (this.slowerDisable) {
                    this.slowerDisable = false
                }
                if (this.fasterDisable) {
                    return false
                }

                let _speed = (this.speedRate >= 1) ? (this.speedRate + SPEED_PERCENT_ADD) : (this.speedRate + SPEED_PERCENT_SUB)
                if (_speed > 1) {
                    // 将speed转为SPEED_PERCENT_ADD的倍数
                    _speed = SPEED_PERCENT_ADD * parseInt(_speed / SPEED_PERCENT_ADD).toFixed(2) * 1
                }
                if (_speed >= SPEED_MAX) {
                    this.fasterDisable = true
                    this.speedRate = SPEED_MAX
                } else {
                    this.speedRate = _speed
                }
                this.$emit('changeSpeed', this.speedRate, this.__play_state__)
            },
            /** 播放按钮单击 **/
            playHandle(ifLastFrame) {
                if (ifLastFrame) {
                    this.setCurrentFrames(0)
                }
                this.$nextTick(() => {
                    const flag = this.step === 0 ? false : true
                    this.$emit('play', this.step, flag)
                })
            },
            /** 暂停按钮单击 **/
            pauseHandle() {
                this.setPlayState(false)
                this.$emit('pause')
            },
            ...mapMutations({
                setCurrentFrames: 'SET_CURRENT_FRAMES',
                setPlayState: 'SET_PLAY_STATE'
            }),
        }
    }
</script>

<style scoped lang="scss">
    @import "~index/common/scss/variable.scss";
    @import "~index/common/scss/mixin.scss";

    .bar-wrapper {
        display: flex;
        align-items: center;
        .bar-wrapper-inner {
            padding: 0 36px;
            width: 100%;
            height: 90px;
        }
    }

    .slider {
        margin: 0 auto;
        max-width: 1024px;
    }

    .bars {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        max-width: 1024px;
        a {
            margin: 4px 12px;
            padding: 5px;
            font-size: 20px;
            color: $color-text-regular;
            background-color: $color-white;
            border-radius: 6PX;
            cursor: pointer;
            @include box-shadow();
            &.disabled {
                color: $color-info;
                background-color: $background-grey;
                cursor: not-allowed;
            }
        }
        .video-id {
            position: absolute;
            left: 0;
            display: none;
            font-size: $size-md;
            color: $color-white;
        }
        @media (min-width: 768px) {
            .video-id {
                display: block;
            }
        }
        .total-wrapper {
            position: absolute;
            right: 0;
            .total {
                display: none;
                font-size: $size-md;
                color: $color-white;
                /**
                &:last-child {
                    margin-left: 16px;
                }
                **/
            }
            @media (min-width: 768px) {
                .total {
                    &:first-child {
                        display: inline-block;
                    }
                }
            }
            /**
            @media (min-width: 1024px) {
                .total {
                    &:last-child {
                        display: inline-block;
                    }
                }
            }
            **/
        }
    }
</style>

<style lang="scss">
    .el-slider__button-wrapper {
        display: flex;
        align-items: center;
    }
</style>
