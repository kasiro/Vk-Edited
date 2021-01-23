import Vue from 'vue'
import Router from 'vue-router'
import General from '@/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: General
    }
  ]
})
