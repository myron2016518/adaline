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

import VueI18n from 'vue-i18n'
import {getLanguage} from './common/js/util.js'
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: getLanguage(),
    messages: {
        'en': require('index/i18n/en.js'),
        'zh-cn': require('index/i18n/zh_cn.js'),
        'zh-tw': require('index/i18n/zh_tw.js'),
        'de': require('index/i18n/de.js'),
        'es': require('index/i18n/es.js'),
        'it': require('index/i18n/it.js'),
        'ja': require('index/i18n/ja.js'),
    }
})
document.title = i18n.t('i18n.pageTitle')
Vue.prototype.$i18n_NetTimeOut = i18n.t('i18n.netTimeOUt')
Vue.prototype.$i18n_PageTitle = i18n.t('i18n.pageTitle')

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
