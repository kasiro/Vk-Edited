import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import '@fortawesome/fontawesome-free/css/all.min.css';

import { directive as onClickaway } from 'vue-clickaway'
Vue.directive('on-clickaway', onClickaway)

import ClickOutside from 'vue-click-outside'
Vue.directive('click-outside', ClickOutside)

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 8,
  newestOnTop: true
});

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
