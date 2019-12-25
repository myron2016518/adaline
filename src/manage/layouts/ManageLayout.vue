<template>
    <el-container class="container">
        <el-header class="header-wrapper">
            <mn-header></mn-header>
        </el-header>
        <el-container class="main-wrapper">
            <el-aside class="aside">
                <mn-menu></mn-menu>
            </el-aside>
            <el-container>
                <el-main class="main">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import MnHeader from 'manage/components/MnHeader.vue'
    import MnMenu from 'manage/components/MnMenu.vue'

    export default {
        name: 'ManageLayout',
        data() {
            return {}
        },
        computed: {},
        methods: {},
        components: {
            MnHeader,
            MnMenu
        }
    }
</script>

<style scoped lang="scss">
    $menu-width: 200px;

    .container {
        height: 100%;
        background-color: #fff;
    }

    .header-wrapper {
        position: relative;
        padding: 0 50px;
        box-shadow: 0 4px 8px 0 rgba(7, 17, 27, .1);
        z-index: 1;
    }

    .main-wrapper {
        overflow: hidden;
    }

    .aside {
        width: $menu-width !important;
        background-color: #393D49;
        overflow: hidden !important;
    }

    .main {
        padding: 0;
    }
</style>
