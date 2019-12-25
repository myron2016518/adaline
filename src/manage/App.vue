<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: 'App',
        mounted() {
            document.getElementById('appWrapper').style.display = 'block';
            document.getElementById('appLoading').style.display = 'none';
        },
    }
</script>

<style scoped lang="scss">
    #app {
        height: 100%;
    }

</style>
