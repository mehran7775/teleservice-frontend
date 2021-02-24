// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from './apiService/axiosInstance'
import { store } from './store'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { ModalPlugin } from 'bootstrap-vue'
import Notifications from 'vue-notification'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.config.productionTip = false
Vue.use(Notifications, BootstrapVue, Loading)
Vue.use(ModalPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App, Notifications
  },
  template: '<App/>'
})
store.subscribe((mutation, state) => {
  localStorage.setItem('store',JSON.stringify(state));
});

//setInterval(function, milliseconds, param1, param2, ...)