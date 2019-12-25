<template>
    <div class="tu-wrapper">
        <div class="center-block">
            <a class="play-circle" @click="playHandle"><i class="icon-play3"></i></a>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: "Start",
        computed: {
            ...mapGetters([
                '__current_frames__'
            ])
        },
        methods: {
            playHandle() {
                const curFrame = this.__current_frames__ === -1 ? 0 : this.__current_frames__
                const flag = this.__current_frames__ === -1 ? false : true
                this.setCurrentFrames(curFrame)
                this.$emit('play', curFrame, flag)
            },
            ...mapMutations({
                setCurrentFrames: 'SET_CURRENT_FRAMES'
            }),
        }
    }
</script>

<style scoped lang="scss">
    @import "~index/common/scss/variable.scss";
    @import "~index/common/scss/mixin.scss";
    .tu-wrapper {
        padding: 12px 0;
    }

    .center-block {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        max-width: 1024px;
        .play-circle {
            padding: 32px;
            background-color: $background-grey;
            border-radius: 50%;
            @include box-shadow();
            cursor: pointer;
            [class ^= 'icon-'] {
                font-size: 60px;
                color: $color-white;
                font-weight: 700;
            }
        }
    }
</style>
