import Vue from 'vue'
import App from './App'
import router from './router'
// import vuex from 'vuex'
import store from './store/index'
//ajax
import axios from 'axios'
import api from './common/axios'
// vue ui库 muse ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

// global css
import './style/base.scss'

Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.use(MuseUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
