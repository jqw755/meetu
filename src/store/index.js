/**
 * Created by jingqw on 18/3/12.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
export default new Vuex.Store({
  // 公用状态变量
  state:{
    title: '',
    userInfo:{
      token: null
    },
    showLoading: false,
    noticeOptions: {},
    toastOptions: {}
  },
  mutations,
  actions
});
