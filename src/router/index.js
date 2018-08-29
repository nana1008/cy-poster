import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/home'
import Detail from '@/components/Detail/detail'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/detail',
      component: Detail
    }
  ]
})
export default router
