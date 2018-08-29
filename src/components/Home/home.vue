<template>
  <div class="home-main">
    <div class="home-container bg-pos" :style="{backgroundImage: `url(static/poster_bg.png`}">
      <div class="differe-people">
        <div class="university-man bg-pos man" :style="{backgroundImage: `url(static/university_man.png`}" @click="handle_click('university_man')">
          <span class="university-frame frame">
            <img v-if="university" src="static/choice_tick.png" alt="" class="choice_tick">
          </span>
        </div>
        <div class="overwork-man bg-pos man" :style="{backgroundImage: `url(static/over_work.png`}" @click="handle_click('overwork_man')">
          <span class="overwork-frame frame">
            <img v-if="overwork" src="static/choice_tick.png" alt="" class="choice_tick">
          </span>
        </div>
        <div class="presswork-man bg-pos man" :style="{backgroundImage: `url(static/press_man.png`}"  @click="handle_click('presswork_man')">
          <span class="presswork-frame frame">
            <img v-if="presswork" src="static/choice_tick.png" alt="" class="choice_tick">
          </span>
        </div>
        <div class="single man">
            <div class="single-man" ref="singledog">
                <div class="singledog-man bg-pos man" :style="{backgroundImage: `url(static/singledog_man.png`}"  @click="handle_clicksigle">
                    <span class="singledog-frame frame">
                        <img v-if="singledog" src="static/choice_tick.png" alt="" class="choice_tick">
                    </span>
                </div>
                <div class="sex-man bg-pos man" :style="{backgroundImage: `url(static/sex_man.png`}">
                    <span class="sexman-frame frame" @click="handle_click('sexman')">
                        <img v-if="sexman" src="static/sex_tick.png" alt="" class="choice_tick">
                    </span>
                    <span class="sexwoman-frame frame" @click="handle_click('sexwoman')">
                        <img v-if="sexwoman" src="static/sex_tick.png" alt="" class="choice_tick">
                    </span>
                </div>
            </div>
        </div>
        <div class="borelite-man bg-pos man" :style="{backgroundImage: `url(static/borelite_man.png`}" @click="handle_click('borelite_man')">
          <span class="borelite-frame frame">
            <img v-if="borelite" src="static/choice_tick.png" alt="" class="choice_tick">
          </span>
        </div>
      </div>
    </div>
    <share></share>
  </div>
</template>
<script>
import {setH5Log} from '@/service/setOperateData'
import share from '../share/share.vue'
export default {
  data () {
    return {
      university: false,
      overwork: false,
      presswork: false,
      singledog: false,
      sexman: false,
      sexwoman: false,
      borelite: false,
      codeDirec: 'left'
    }
  },
  components: {share},
  created () {
  },
  methods: {
    handle_clicksigle () {
      this.singledog = !this.singledog
      this.$refs.singledog.style.marginLeft = '-100%';
    },
    handle_click (arg) {
      switch (arg) {
        case 'university_man':
            this.university = !this.university;
            break;
        case 'overwork_man':
            this.overwork = !this.overwork;
            break;
        case 'presswork_man':
            this.codeDirec = 'right'
            this.presswork = !this.presswork;
            break;
        case 'sexman':
            this.sexman = !this.sexman;
            break;
        case 'sexwoman':
            this.sexwoman = !this.sexwoman;
            break;
        case 'borelite_man':
            this.codeDirec = 'right'
            this.borelite = !this.borelite;
            break;
      }
      this.setOperateData({finishTest: 1})
      _czc.push(['_trackEvent', 'h5', '完成做题', '小烦恼', 1])
      setTimeout(()=>{
        this.$router.replace({path:'/detail', query:{detailData: arg, direction: this.codeDirec, shareNum: this.$route.query.shareNum || 0}})
      }, 400)
    },
    setOperateData (param) {
      setH5Log(param)
    }
  }
}
</script>

<style>
  .single{
    overflow: hidden;
  }
  .single-man{
    width: 200%;
    height: 2.03rem;
    display: flex;
    transition: all .5s ease;
  }
  .home-main{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
  .bg-pos {
    background-repeat: no-repeat;
    background-size: contain;
  }
  .home-container{
    width: 100%;
    height: 18.30rem;
  }
  .differe-people{
    width: 92%;
    height: 10.72rem;
    padding-top: 7.35rem;
    margin: 0 auto;
  }
  .frame{
    position: relative;
    display: block;
    border-radius: 0.05rem;
    width: 0.16rem;
    height: 0.16rem;
    border: 0.02rem solid #fff;
  }
  .university-frame{
    top: 1.26rem;
    left: 0.28rem;
  }
  .overwork-frame{
    top: 1.26rem;
    left: 1.92rem;
  }
  .presswork-frame{
    top: 1.22rem;
    left: 0.27rem;
  }
  .singledog-frame{
    top: 1.26rem;
    left: 1.92rem;
  }
  .sexman-frame{
    top: 1.5rem;
    left: 1.37rem;
  }
  .sexwoman-frame{
    top: 1.3rem;
    left: 2.94rem;
  }
  .borelite-frame{
    top: 1.26rem;
    left: 0.26rem;
  }
  .choice_tick{
    display: inline-block;
    width: .24rem;
    height: .20rem;
  }
  .man{
    width: 100%;
    height: 2.03rem;
    margin-bottom: 0.15rem;
  }
</style>


