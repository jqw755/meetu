// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import vuex from 'vuex'
import store from './store/index'
//ajax
import axios from 'axios'
import api from './common/axios'
// global css
import './style/base.scss'

Vue.prototype.$api = api;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
