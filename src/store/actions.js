/**
 * Created by jingqw on 18/3/12.
 */
import Vue from 'vue'
const actions = {
  loading: ({commit}, d) => {
    commit('LOADING', d);
  },
  setUser: ({commit}, u) => {
    commit('SETUSER', u);
  },
  setTitle: ({commit}, t) => {
    commit('SETTITLE', t);
  },
  removeUser: ({commit}) => {
    commit('REMOVEUSER');
  },
  showNotice: ({commit}, params) => {
    commit('SHOWNOTICE', params);
  },
  showToast: ({commit}, p) => {
    commit('SHOWTOAST', p);
  },
};
export default actions;
