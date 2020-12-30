// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from './apiService/axiosInstance'
import {store} from './store'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Notifications from 'vue-notification'

Vue.config.productionTip = false
Vue.use(BootstrapVue,Notifications)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,Notifications
  },
  template:'<App/>'
})
store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});