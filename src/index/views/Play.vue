<template>
  <div class="wrapper">
    <base-header v-if="_device_ !== 'tablet'"></base-header>

    <base-error v-if="error"
                :text="error"></base-error>
    <base-loading ref="loading"
                  v-else-if="loading"></base-loading>
    <template v-else>
      <div class="center-block breadcrumb"
           v-if="__current_frames__ > -1 && currentComp !== 'Start'">
        {{model}}{{breadcrumb}}
      </div>
      <keep-alive>
        <component class="content"
                   :is="currentComp"
                   :play-id="playId"
                   :type-data="compData"
                   :child-type="childType"
                   :list-selected="listSelected"
                   :btn-selected="btnSelected"
                   @play="playHandle"></component>
      </keep-alive>
      <play-bar class="footer"
                v-if="playData.length > 0"
                :frames="playData.length"
                :base-id="baseId"
                :play-time="playTime"
                :play-time-total="playTimeTotal"
                @play="playHandle"
                @pause="pauseHandle"
                @changeSpeed="changeSpeed"></play-bar>
      <template v-if="dialogCurrentComp">
        <keep-alive>
          <component class="content"
                     :is="dialogCurrentComp"
                     :play-id="dialogPlayId"
                     :type-data="dialogCompData"
                     :list-selected="dialogListSelected"
                     :btn-selected="dialogBtnSelected"></component>
        </keep-alive>
      </template>
    </template>
    <base-toast ref="toast"
                :text="speedRate"></base-toast>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import md5 from 'md5'
import baseHeader from 'index/base_comp/header/BaseHeader.vue'
import BaseLoading from 'index/base_comp/loading/BaseLoading.vue'
import BaseToast from 'index/base_comp/toast/BaseToast.vue'
import BaseError from 'index/base_comp/error/BaseError.vue'
import PlayBar from 'index/base_comp/play/PlayBar.vue'
import { PlayApi } from 'index/api/PlayApi.js';
const PlayIns = new PlayApi()
import { UserCenterApi } from 'index/api/UserCenterApi.js'
const UserCenterIns = new UserCenterApi()

import Start from 'index/components/start/Start.vue'
import Blank from 'index/components/blank/Blank.vue'
import { playMixin } from 'index/mixin/playMixin.js'
import { getUrlString } from 'index/common/js/util.js'

let PLAY_TIMER              // 播放的timeout

export default {
  name: "Play",
  mixins: [playMixin],
  data () {
    return {
      error: '',                  // 错误信息
      loading: false,             // 加载状态
      breadcrumb: '',             // 面包屑导航内容
      /** 播放时间相关 **/
      playTime: '00:00',          // 当前播放时间
      playTimeTotal: '00:00',     // 总播放时间
      /** 播放数据 **/
      speedRate: '100%',          // 经过加速、减速后，当前的播放速度比率
      playData: [],               // 播放数据列表
      playDataBackUp: [],         // 播放数据列表备份
      /** 业务类普通组件 **/
      currentComp: 'Start',       // 当前组件
      playId: 0,                  // 每个组件的id，用于watch更新数据
      compData: [],               // 当前组件数据
      childType: null,            // 组件子类型
      listSelected: 0,            // 当前组件选中项
      btnSelected: 0,             // 当前组件按钮选中项
      /** 业务类弹框组件 ***/
      dialogCurrentComp: '',      // 当前弹框组件
      dialogPlayId: 0,            // 每个组件的id，用于watch更新数据
      dialogCompData: [],         // 当前组件数据
      dialogListSelected: 0,      // 当前组件选中项
      dialogBtnSelected: 0,       // 当前组件按钮选中项
    }
  },
  computed: {
    ...mapGetters([
      '__current_frames__',
      '__play_state__'
    ])
  },
  watch: {
    __current_frames__ (newVal, oldVal) {
      if (newVal === 0) {
        this.playTime = '00:00'
      } else if (newVal === this.playData.length - 1) {
        this.playTime = this.playTimeTotal
      }
    },
  },
  mounted () {
    this.getPlayData()
  },
  methods: {
    /** 获得播放数据 **/
    getPlayData () {
      const baseId = getUrlString('base_id')
      const model = getUrlString('model')
      const cc = getUrlString('cc')
      const sign = getUrlString('sign')
      this.loading = true
      this.$nextTick(() => {
        this.$refs.loading.show()
      })
      this._validateParams(baseId, model, cc, sign).then((token) => {
        if (model != null && model !== '') {
          this.model = decodeURIComponent(unescape(model)) + '：'
        } else {
          this.model = ''
        }
        // 签名是字母排序，cc不参与与签名
        const mySign = md5(`${baseId}${token}`)
        PlayIns.getPlayData(baseId, cc, mySign).then((data) => {
          this.loading = false
          if (data.length > 1) {
            this._setTotalTime(data)
          }
          this.playData = data
          this.playDataBackUp = JSON.parse(JSON.stringify(data))
          this.baseId = baseId
        }).catch((err) => {
          this.loading = false
          this.error = err + ''
        })
      }).catch((err) => {
        this.loading = false
        this.error = err
      })
    },
    /** 播放某一帧事件 **/
    playHandle (val, ifDrag) {
      this.setPlayState(true)
      this._play(this.playData, val, ifDrag)
    },
    /** 暂停事件 **/
    pauseHandle () {
      if (PLAY_TIMER) {
        clearTimeout(PLAY_TIMER)
      }
    },
    /** 改变播放速度事件 **/
    changeSpeed (speedRate, state) {
      let rate = (speedRate * 100).toFixed(0)
      this.speedRate = rate + '%'
      this.$refs.toast.show()
      for (let i = 0; i < this.playData.length; i++) {
        this.playData[i].stay_length = this.playDataBackUp[i].stay_length / (speedRate)
      }
      if (state) {
        if (PLAY_TIMER) {
          clearTimeout(PLAY_TIMER)
        }
        this.$nextTick(() => {
          this._play(this.playData, this.__current_frames__, false)
        })
      }
      this._setTotalTime(this.playData)
    },
    /**
     * 播放函数
     * data：所有的播放数据
     * val：当前第几帧
     * ifDrag：Slider事件、到第一帧、到最后一帧等事件
     * **/
    _play (data, index, ifDrag) {
      const currentComp = this._getCompType(data[index].type, data[index].ui_type)
      console.log(index, '：', currentComp)
      // 在拖动情况下、到第一帧、最后一帧的处理：
      if (ifDrag) {
        // this.currentComp = null                 // 首先把当前帧组件设为空白
        this._setNearestBreadcrumb(data, index);   // 将面包屑导航内容设为它前边最近一个的内容
      }
      if (currentComp !== 'Ignore') {
        if (currentComp === 'navigation') {               // 导航
          this.breadcrumb = data[index].content.data.value
        } else if (currentComp.indexOf('T100U') > -1 || currentComp.indexOf('T200U') > -1 || currentComp.indexOf('T2700U') > -1 || currentComp.indexOf('T2703U') > -1 || currentComp.indexOf('T2900U') > -1) {   // 弹框类，不覆盖原组件
          // 如果当前帧组件是播放按钮，首先把当前帧组件设为空白
          if (this.currentComp === 'Start') {
            this.currentComp = 'Blank'
          }
          if (ifDrag) {
            this._setNearestComp(data, index)   // 将业务类普通组件设置为它前边最近一个
          }
          this.dialogCurrentComp = currentComp
          this.dialogPlayId = data[index].play_id
          this.dialogCompData = data[index].content
          this.dialogBtnSelected = data[index].button_selected_order + ''
          this.dialogListSelected = data[index].interface_selected_order + ''
        } else {
          this.dialogCurrentComp = ''
          this.currentComp = currentComp
          this.playId = data[index].play_id
          this.compData = data[index].content
          this.childType = data[index].child_type
          this.btnSelected = data[index].button_selected_order + ''
          this.listSelected = data[index].interface_selected_order + ''
        }
      }
      // 设置当前时间
      this._setPlayTime(data, index)
      // 设置当前帧
      this.setCurrentFrames(index)
      if (index === this.playData.length - 1) {
        if (PLAY_TIMER) {
          clearTimeout(PLAY_TIMER)
        }
      } else {
        const framePlayTime = this.playData[index].stay_length * 1
        PLAY_TIMER = setTimeout(() => {
          this._play(this.playData, index + 1)
        }, framePlayTime)
      }
    },
    /** 将面包屑导航内容设为它前边最近一个的内容 **/
    _setNearestBreadcrumb (data, index) {
      this.breadcrumb = ''
      for (let i = index; i > 0; i--) {
        if (data[i].content.data.ui_type === '1800') {
          this.breadcrumb = data[i].content.data.value
          break
        }
      }
    },
    /** 如果当前组件为对话框，则将业务类普通组件设置为它前边最近一个 **/
    _setNearestComp (data, index) {
      const ignoreList = ['100', '200', '1800', '2700', '2703', '2900']
      for (let i = index; i > 0; i--) {
        if (!ignoreList.includes(data[i].content.type)) {
          const currentComp = this._getCompType(data[i].content.type, data[i].content.data.ui_type)
          if (currentComp !== 'Ignore') {
            this.currentComp = currentComp
            this.playId = data[i].play_id
            this.compData = data[i].content
            this.btnSelected = data[i].button_selected_order + ''
            this.listSelected = data[i].interface_selected_order + ''
            break
          }
        }
      }
    },
    /** 设置总播放时间 **/
    _setTotalTime (data) {
      let totalTime = 0
      for (let i = 0; i < data.length; i++) {
        totalTime += data[i].stay_length * 1
      }
      totalTime = parseInt(totalTime / 1000)
      const minute = ('0' + parseInt(totalTime / 60)).slice(-2)
      const second = ('0' + (totalTime % 60)).slice(-2)
      this.playTimeTotal = `${minute}:${second}`
    },
    /** 设置播放时间 **/
    _setPlayTime (data, index) {
      let playtime = 0
      for (let i = 0; i <= index; i++) {
        playtime += data[i].stay_length * 1
      }
      playtime = parseInt(playtime / 1000)
      const minute = ('0' + parseInt(playtime / 60)).slice(-2)
      const second = ('0' + (playtime % 60)).slice(-2)
      this.playTime = `${minute}:${second}`
    },
    /** 校验APP传参 **/
    _validateParams (baseId, model, cc, sign) {
      return new Promise((resolve, reject) => {
        if (baseId == null) {
          reject(`base_id is required.ID：${baseId}`)
        }
        // if (model == null) {
        //     reject(`model is required. ID：${baseId}`)
        // }
        if (cc == null) {
          reject(`cc is required. ID：${baseId}`)
        }
        if (sign == null) {
          reject(`sign is required. ID：${baseId}`)
        }
        UserCenterIns.getToken(cc).then((data) => {
          if (data.code === 0) {
            const token = data.data
            // 签名是字母排序，cc、model不参与与签名
            const mySign = md5(`${baseId}${token}`)
            console.log('====mySign=====', mySign);
            console.log('====sign=====', sign);
            if (sign === mySign) {
              resolve(token)
            } else {
              reject(`${this.$t('i18n.loginFailed')}. ID：${baseId}`)
            }
          } else {
            reject(`${data.msg}. ID：${baseId}`)
          }
        }).catch((err) => {
          reject(`${err}. ID：${baseId}`)
        })
      })
    },
    ...mapMutations({
      setCurrentFrames: 'SET_CURRENT_FRAMES',
      setPlayState: 'SET_PLAY_STATE'
    }),
  },
  components: {
    PlayBar,
    Start,
    Blank,
    baseHeader,
    BaseLoading,
    BaseToast,
    BaseError,
  },
  beforeDestroy () {
    if (PLAY_TIMER) {
      clearTimeout(PLAY_TIMER)
    }
  },
}
</script>

<style scoped lang="scss">
@import "~index/common/scss/variable.scss";
@import "~index/common/scss/mixin.scss";

.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: hidden;
}

.breadcrumb {
  padding: 12px 0 12px 12px;
  font-size: $size-tn;
  color: #125790;
  font-weight: 700;
  @media (min-width: 1024) {
    padding-left: 0;
  }
}

.content {
  flex: 1;
  overflow-y: auto;
}

.footer {
  height: $footer-height;
  background-color: #525252;
}
</style>
