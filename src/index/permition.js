import Vue from 'vue'
import router from './router/index.js'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false, speed: 1000})

router.beforeEach((to, from, next) => {
    if (Vue.prototype._device_ === 'pc') {
        NProgress.start()
    }
    next()
})

router.afterEach(() => {
    if (Vue.prototype._device_ === 'pc') {
        NProgress.done() // finish progress bar
    }
})
