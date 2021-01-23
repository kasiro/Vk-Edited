import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import { directive as onClickaway } from 'vue-clickaway'
Vue.directive('on-clickaway', onClickaway)

import ClickOutside from 'vue-click-outside'
Vue.directive('click-outside', ClickOutside)

require('/home/kasiro/Документы/js/elvue-test/node_modules/@fortawesome/fontawesome-free/css/all.min.css')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
