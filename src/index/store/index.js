import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import * as getters from './getters.js'
// import * as actions from './actions.js'

import createLogger from 'vuex/dist/logger.js'   // state修改后，可以在浏览器控制台打印修改前、修改后的state值

// const debug = process.env.NODE_ENV !== 'production'
const debug = false

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    getters,
    // actions,
    plugins: debug ? [createLogger()] : []
})
