<template>
    <div class="menu-scroll">
        <el-menu
            :default-active="__menu_key__"
            class="menu"
            background-color="#393D49"
            text-color="#fff"
            active-text-color="#f7c600"
            :router="true"
        >
            <!--<el-submenu index="1">-->
            <!--<template slot="title">-->
            <!--<i class="el-icon-document-checked"></i>-->
            <!--<span>日志审核</span>-->
            <!--</template>-->
            <!--<el-menu-item index="system" :route="{path: '/manage/system'}">-->
            <!--<span slot="title">系统审核</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="handle" :route="{path: '/manage/handle'}">-->
            <!--<span slot="title">人工审核</span>-->
            <!--</el-menu-item>-->
            <!--</el-submenu>-->
            <el-menu-item index="log" :route="{path: '/log'}">
                <i class="el-icon-download"></i>
                <span slot="title">日志解析</span>
            </el-menu-item>
            <el-menu-item index="handle" :route="{path: '/handle'}" v-if="__manage_auth__.includes(AUTH.handle)">
                <i class="el-icon-document-checked"></i>
                <span slot="title">日志审核</span>
            </el-menu-item>
            <el-menu-item index="reward" :route="{path: '/reward'}" v-if="__manage_auth__.includes(AUTH.reward)">
                <i class="el-icon-goods"></i>
                <span slot="title">奖励发放</span>
            </el-menu-item>
            <el-menu-item index="recommend" :route="{path: '/recommend'}">
                <i class="el-icon-setting"></i>
                <span slot="title">推荐设置</span>
            </el-menu-item>
            <el-menu-item index="feedback" :route="{path: '/feedback'}">
                <i class="el-icon-chat-dot-square"></i>
                <span slot="title">用户反馈</span>
            </el-menu-item>
            <el-menu-item index="users" :route="{path: '/users'}" v-if="__manage_auth__.includes(AUTH.users)">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {AUTH} from 'manage/config.js'

    export default {
        name: "MnMenu",
        computed: {
            ...mapGetters([
                '__menu_key__',
                '__manage_auth__'
            ]),
        },
        created() {
            this.AUTH = AUTH
        }
    }
</script>

<style scoped lang="scss">
    $menu-scroll-width: 220px;
    $menu-width: 200px;

    .menu-scroll {
        position: relative !important;
        width: $menu-scroll-width;
        height: 100%;
        overflow-y: auto;
    }

    .menu {
        width: $menu-width;
        background-color: transparent;
        .el-submenu__title i, .el-menu-item i {
            color: #fff;
        }
    }

</style>
