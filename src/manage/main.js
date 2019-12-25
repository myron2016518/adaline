import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import './ui/element.js'
import './permition.js';

import './common/scss/index.scss'
import "amfe-flexible/index.js"
import './common/js/font_rem.js'

import { os } from './common/js/util.js'
Vue.prototype._device_ = os()

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
