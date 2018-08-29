import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    brower: {
      isApp: false,
      isWechat: false,
      isSinglemessage: false,
      isTimeline: false,
      isQQ: false,
      isWeibo: false,
      other: false,
      from: ''
    },
    shareData: {
      shareNum: 0, // 默认是0 每分享一次加一
      friendId: '',
      isShare: false,
      title: '',
      link: '',
      imgUrl: '',
      desc: '',
      appId: '', // 必填，公众号的唯一标识
      timestamp: '', // 必填，生成签名的时间戳
      nonceStr: '', // 必填，生成签名的随机串
      signature: '' // 必填，签名，见附录1
    },
    operateData: {
      topic: '海报---小烦恼', // 主题名称
      source: '', //  渠道 0：微信 1：微信好友列表 2：微信朋友圈 3：qq 4：微博 5：其它
      h5pv: 0, // pv
      h5uv: 0, // uv
      startTest: 0, // 点击开始互动按次数
      finishTest: 0, // 完成互动的次数
      testAgain: 0, // 重新测试
      savePic: 0, // 长按页面保存图片的次数
      shareH5: 0, // 转发的次数
      downCount: 0, // 点击下载app的次数
      scanCount: 0, // 扫描二维码进入的次数
      shareTwo: 0, // 二次分享的次数
      shareThree: 0, // 三次分享的次数
      uid: '',
      position: 'null'
    }
  },
  actions: {
    setBrower ({commit}, params) { // 设置渠道信息
      commit('BROWER', params)
    },
    setShareData ({commit}, params) { // 设置分享次数
      commit('SHAREDATA', params)
    },
    setOperateData ({commit}, params) { // 设置运营数据
      commit('OPERATEDATA', params)
    }
  },
  mutations: {
    BROWER (state, res) {
      state.brower = Object.assign(state.brower, res)
    },
    SHAREDATA (state, params) {
      state.shareData = Object.assign(state.shareData, params)
    },
    OPERATEDATA (state, params) {
      state.operateData = Object.assign(state.operateData, params)
    }
  }
})
export default store
