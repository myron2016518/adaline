import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}

import Play from 'index/views/Play.vue'
import Error404 from 'index/views/404.vue'

// const SelectBrand  = () => import(/* webpackChunkName: "selectBrand" */ 'views/SelectBrand.vue')    // 选择品牌
// const List  = () => import(/* webpackChunkName: "list" */ 'index/views/List.vue')                         // 录屏列表

Vue.use(Router)

export default new Router({
    // mode: 'history',
    // base: '/adaline/',
    routes: [
        // {
        //     path: '/list',
        //     name: 'list',
        //     component: List
        // },
        {
            path: '/play',
            name: 'play',
            component: Play,     // 播放
        },
        {
            path: '/',
            redirect: '/play',
        },
        {
            path: '/404',
            component: Error404,      // 404
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
