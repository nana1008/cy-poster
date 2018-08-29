/*
* 分享组件
*/
<template><div></div></template>
<script>
  import wx from 'weixin-js-sdk'
  import {getWXConfig} from '@/service/getData'
  import {setH5Log} from '@/service/setOperateData'
  import {setMetaItemprop} from '@/assets/js/mUtils'
  export default {
    data () {
      return {}
    },
    mounted () {
      this.getWXConfigData()
    },
    methods: {
      async getWXConfigData () {
        let shareData = this.$store.state.shareData
        setMetaItemprop('name', shareData.title || '懂你-慢慢生活社交')
        setMetaItemprop('image', shareData.imgUrl || `${window.location.origin}/h5/annoyance/static/logo.jpg`)
        setMetaItemprop('description', shareData.desc || '多维测试、智能匹配，让你在茫茫人海中找到懂你的TA')
        let res = await getWXConfig(encodeURIComponent(window.location.href.split('#')[0]))
        if (res.code !== 1001) {
          return
        }
        this.$store.dispatch('setShareData', res.data)
        this.setWXFn(res.data)
      },
      setWXFn (wxConfig) {
        let shareData = this.$store.state.shareData
        wx.config({
          debug: false,
          appId: 'wx596e6126ab7242a3', // 必填，公众号的唯一标识
          timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
          nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
          signature: wxConfig.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        let shareNum = parseInt(this.$store.state.shareData.shareNum)
        let shareConfig = {
          title: '懂你-慢慢生活社交',
          link: location.href.replace('shareNum=' + shareNum, 'shareNum=' + (shareNum + 1)),
          imgUrl: shareData.imgUrl || `${window.location.origin}/h5/annoyance/static/logo.png`,
          desc: shareData.title || '多维测试、智能匹配，让你在茫茫人海中找到懂你的TA',
          success: function () {
            _czc.push(['_trackEvent', 'h5', '分享', '小烦恼', 1])
            if (shareData.shareNum === 0) {
              setH5Log({shareH5: 1})
            } else if (shareData.shareNum === 1) {
              setH5Log({shareH5: 1, shareTwo: 1})
              _czc.push(['_trackEvent', 'h5', '二次分享', '小烦恼', 1])
            } else {
              setH5Log({shareH5: 1, shareThree: 1})
              _czc.push(['_trackEvent', 'h5', '三次分享', '小烦恼', 1])
            }
          },
          cancel: function () {}
        }
        let shareConfigOfLine = Object.assign({}, shareConfig, {title: shareData.desc || '懂你 - 慢生活社交，慢慢了解，长久陪伴'})
        wx.ready(function () {
          wx.onMenuShareAppMessage(shareConfig)
          wx.onMenuShareTimeline(shareConfigOfLine)
          wx.onMenuShareQQ(shareConfig)
          wx.onMenuShareWeibo(shareConfig)
          wx.onMenuShareQZone(shareConfig)
        })
        wx.error(function (res) {
          console.log('配置错误', res)
        })
      }
    }
  }

</script>
