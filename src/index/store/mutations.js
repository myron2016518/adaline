import * as types from './mutations_type.js'

const mutations = {
    [types.SET_CURRENT_FRAMES](state, frame) {
        state.__current_frames__ = frame
    },
    [types.SET_NOT_WORK](state, text) {
        state.__not_work__ = text
    },
    [types.SET_PLAY_STATE](state, curState) {
        state.__play_state__ = curState
    },
}

export default mutations
