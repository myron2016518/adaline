import Vue from 'vue'
import router from './router/index.js'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false, speed: 1000})

import store from './store/index.js'
import {AUTH} from 'manage/config.js'

router.beforeEach((to, from, next) => {
    if (Vue.prototype._device_ === 'pc') {
        NProgress.start()
    }
    if (to.path === '/login') {
        next()
    } else if (to.meta.requiresAuth) {
        const userinfo = store.state.__manage_userinfo__
        const token = store.state.__manage_token__
        const authState = store.state.__manage_auth__
        let isAuth = false
        if (authState.includes(AUTH[to.name])) {
            isAuth = true
        }
        if (userinfo && token && authState && (token.length === 20) && (token[3] * 1 + token[16] * 1 === 10) && isAuth) {
            store.dispatch('setManageMenu', to.name)
            next()
        } else {
            next({ path: '/login', replace: true })
        }
    } else {
        next()
    }
})

router.afterEach(() => {
    if (Vue.prototype._device_ === 'pc') {
        NProgress.done() // finish progress bar
    }
})
