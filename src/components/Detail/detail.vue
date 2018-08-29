<template>
  <div style="width: 3.75rem;height: 6.67rem;overflow: hidden;position: relative;left:0;top:0;">
    <div class="detail-container bg-pos">
      <img :src="`static/detail/${$route.query.detailData}.png`" alt="" class="poster">
      <img class="code code-left" :src="QRCode" alt="" v-show="$route.query.direction === 'left'">
      <img class="code code-right" :src="QRCode" alt="" v-show="$route.query.direction === 'right'">
    </div>
    <img :src="base64ImgSrc" alt="" v-show="base64ImgSrc" class="fullpageImg">
    <div class="choice-button">
      <button class="choice-again button" @click.stop="reChoice">再选一次</button>
      <div v-show="$route.query.direction === 'left'" class="longtouch" :class="$route.query.direction === 'right' && 'handerLeft'">长按保存海报</div>
    </div>
    <div class="find-button">
      <button class="find-people button" @click.stop="downApp">去找懂你的人</button>
      <div v-show="$route.query.direction === 'right'" class="longtouch" :class="$route.query.direction === 'right' && 'handerRight'">长按保存海报</div>
    </div>
    <share></share>
  </div>
</template>
<script>
  import QRCode from 'qrcode'
  import html2canvas from 'html2canvas'
  import {setH5Log} from '@/service/setOperateData'
  import share from '../share/share.vue'
  export default {
    data () {
      return {
        QRCode: '',
        base64ImgSrc: ''
      }
    },
    components: {share},
    mounted () {
      this.getQRCode()
    },
    methods: {
      reChoice () {
        this.$router.replace('/home')
        this.setOperateData({testAgain: 1})
        _czc.push(['_trackEvent', 'h5', '重新做题', '小烦恼', 1])
      },
      downApp() {
        this.setOperateData({downCount: 1})
        _czc.push(['_trackEvent', 'h5', '下载按钮', '小烦恼', 1])
        alert('下载懂你app')
      },
      setOperateData (param) {
        setH5Log(param)
      },
      getQRCode () {
        let shareNum = this.$route.query.shareNum  ? (parseInt(this.$route.query.shareNum) + 1) : 1
        console.log(location.href.replace('shareNum=' + this.$route.query.shareNum, 'shareNum=' + shareNum) + '&from=qrcode')
        let opts = {
          errorCorrectionLevel: 'L'
        }
        QRCode.toDataURL(location.href.replace('shareNum=' + this.$route.query.shareNum, 'shareNum=' + shareNum) + '&from=qrcode', opts)
        .then(url => {
          this.QRCode = url
          this.createPoster()
        })
        .catch(err => {
          console.error(err)
        })
      },
      async createPoster () {
        let shareContent = document.querySelector('.detail-container')
        html2canvas(shareContent).then(canvas => {
          this.base64ImgSrc = canvas.toDataURL('image/png')
        })
      },
    }
  }
</script>
<style>
  .code{
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    top: 5.17rem;
    left:.2rem;
  }
  .code-left{
    left: 0.2rem;
  }
  .code-right{
    left:auto;
    right: .2rem;
  }
  .bg-pos {
    background-repeat: no-repeat;
    background-size: 3.75rem;
  }
  .detail-container{
    position: relative;
    width: 3.75rem;
    height: 6.67rem;
  }
  .poster{width: 3.75rem;height:6.67rem;display: block;}
  .choice-button,.find-button{
    position: absolute;
    top: 5.15rem;
    width: 1.4rem;
    height: 0.4rem;
    z-index: 1;
  }
  .choice-button{
    left: 0.2rem;
    text-align: left;
  }
  .find-button{
    right: 0.2rem;
    text-align: right;
  }
  .button{
    width: 1.30rem;
    height: 0.4rem;
    border-radius: 0.05rem;
    color: #fff;
  }
  .choice-again{
    box-shadow: 0px 4px 0px #4a4a4a;
    background: #9f9f9f;
  }
  .find-people{
    box-shadow: 0px 4px 0px #991119;
    background: #ff4f59;
  }
  .fullpageImg{
    display: block;
    width: 100%;
    position: absolute;
    left:0;top:0;
    z-index: 0;
  }
  .longtouch{color:#fff;font-size: .15rem;margin-top: .2rem;background-image: url("/h5/annoyance/static/hander.png");background-size: .15rem .2rem;background-repeat: no-repeat;padding: 0 .2rem;line-height: .2rem;} /*本地 /static/hander.png*/
  .handerLeft{background-position: left center;}
  .handerRight{background-position: right center;}
</style>

