import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}

import ManageLayout from 'manage/layouts/ManageLayout.vue'
import Login from 'manage/views/Login.vue'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    // base: '/adaline/',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { requiresAuth: false },
        },
        {
            path: '/',
            component: ManageLayout,
            redirect: '/login',
            name: 'index',
            children: [
                {
                    path: 'log',
                    name: 'log',
                    component: () => import(/* webpackChunkName: "log" */ 'manage/views/Log.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'handle',
                    name: 'handle',
                    component: () => import(/* webpackChunkName: "handle" */ 'manage/views/Handle.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'reward',
                    name: 'reward',
                    component: () => import(/* webpackChunkName: "reward" */ 'manage/views/Reward.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'recommend',
                    name: 'recommend',
                    component: () => import(/* webpackChunkName: "recommend" */ 'manage/views/Recommend.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'feedback',
                    name: 'feedback',
                    component: () => import(/* webpackChunkName: "feedback" */ 'manage/views/feedback/Feedback.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'users',
                    name: 'users',
                    component: () => import(/* webpackChunkName: "users" */ 'manage/views/Users.vue'),
                    meta: { requiresAuth: true }
                },
            ]
        },
        {
            path: '/404',
            component: () => import(/* webpackChunkName: "error404" */ 'manage/views/404.vue'),      // 404
            meta: { requiresAuth: false },
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
