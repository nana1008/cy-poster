<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {browser, cookie, getQueryString, localStorage, parseVueRoute} from '@/assets/js/mUtils'
  import {setH5Log} from '@/service/setOperateData'
  export default {
    data () {
      return {
        browser: {}
      }
    },
    created () {
      this.browser = browser() // 获取浏览器信息
      let uId = ''
      if (this.browser.isMobile) {
        console.log('手机打开')
        if (this.browser.WeChat) {
          console.log('微信登录')
          uId = 'wechat' + Math.random()
          if (getQueryString('from') === 'singlemessage') {
            this.$store.dispatch('setOperateData', {source: 1})
            this.$store.dispatch('setBrower', {isWechat: true, from: 'singlemessage', isSinglemessage: true})
          } else if (getQueryString('from') === 'timeline') {
            this.$store.dispatch('setOperateData', {source: 2})
            this.$store.dispatch('setBrower', {isWechat: true, from: 'timeline', isTimeline: true})
          } else {
            this.$store.dispatch('setOperateData', {source: 0})
            this.$store.dispatch('setBrower', {isWechat: true, from: 'Wechat'})
          }
        } else if (this.browser.QQ || this.browser.Qzone) {
          console.log('qq打开')
          uId = 'qq' + Math.random()
          this.$store.dispatch('setBrower', {isQQ: true, from: 'qq'})
          this.$store.dispatch('setOperateData', {source: 3})
        } else if (this.browser.weibo) {
          uId = 'weibo' + Math.random()
          this.$store.dispatch('setBrower', {isWeibo: true, from: 'weibo'})
          this.$store.dispatch('setOperateData', {source: 4})
        } else {
          uId = 'other' + Math.random()
          this.$store.dispatch('setBrower', {other: true, from: 'other'})
          this.$store.dispatch('setOperateData', {source: 6})
        }
      } else {
        uId = 'pc' + Math.random()
        this.$store.dispatch('setBrower', {other: true, from: 'pc'})
        this.$store.dispatch('setOperateData', {source: 6})
      }
      _czc.push(['_trackEvent', 'h5', 'pv', '小烦恼', 1])
      if (localStorage('uId')) {
        cookie('uId', localStorage('uId'))
        this.$store.dispatch('setOperateData', {uid: localStorage('uId')})
        this.setOperateData({h5pv: 1, startTest: 1})
      } else {
        cookie('uId', uId)
        localStorage('uId', uId)
        this.$store.dispatch('setOperateData', {uid: uId})
        this.setOperateData({h5pv: 1, h5uv: 1, startTest: 1})
        _czc.push(['_trackEvent', 'h5', 'uv', '小烦恼', 1])
      }
      _czc.push(['_trackEvent', 'h5', '开始做题', '小烦恼', 1])
      if (this.$route.query['from'] === 'qrcode') {
        this.setOperateData({scanCount: 1})
        _czc.push(['_trackEvent', 'h5', '扫码进入', '小烦恼', 1])
      }
      this.$router.replace({path: '/home', query: {shareNum: this.$route.query.shareNum || 0}})
    },
    methods: {
      setOperateData (param) {
        setH5Log(param)
      }
    }
  }
</script>

<style>
  html,body,#app{
    width: 100%;
    height: 100%;
  }
</style>
