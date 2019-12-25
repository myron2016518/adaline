<template>
    <div class="header manage">
        <div class="logo">数据采集审核</div>
        <div class="user">
            <el-badge is-dot type="warning"><span class="account">你好：{{__manage_account__}}</span></el-badge>
            <a class="sign-out" @click="onSignOut"><span>安全退出</span></a>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "MnHeader",
        computed: {
            ...mapGetters([
                '__manage_account__',
            ]),
        },
        methods: {
            onSignOut() {
                this.removeManageToken()
                this.removeManageUserInfo()
                this.removeManageMenu()
                this.$nextTick(() => {
                    this.$router.push({
                        path: '/login'
                    });
                })
            },
            ...mapActions([
                'removeManageToken',
                'removeManageUserInfo',
                'removeManageMenu'
            ])
        }
    }
</script>

<style scoped lang="scss">
    @import "~manage/common/scss/variable.scss";

    .header {
        height: 100%;
        color: $color-text-regular;
        background-color: $color-white;
        .logo {
            float: left;
            display: flex;
            align-items: center;
            height: 100%;
            margin: 0 28px 0 0;
            font-size: 22px;
            color: $color-danger;
            font-weight: 700;
            letter-spacing: 1px;
        }
        .user {
            float: right;
            display: flex;
            align-items: center;
            height: 100%;
            .account {
                font-size: $size-md;
            }
            .sign-out {
                margin-left: 10px;
                padding-left: 10px;
                display: flex;
                align-items: center;
                height: 100%;
                font-size: $size-md;
                color: $color-danger;
                cursor: pointer;
                &:hover {
                    color: #fa9191;
                }
            }
        }
    }

</style>
<style lang="scss">
    .header .el-badge__content.is-fixed.is-dot {
        left: -24px;
        right: unset;
    }
</style>
