import axios from 'axios'
import store from '../store/index'
// 导入API URL
import {getConfig} from '../common/config'

let token = localStorage.getItem('MEET_TOKEN');
//请求拦截
axios.interceptors.request.use(config => {
  // loading
  store.commit('LOADING', true);
  if (token) {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    config.headers.Authorization = token;
  }
  return Promise.resolve(config);
}, error => {
  console.log('请求出错,测试下面的return promise.reject');
  //请求失败,取消loading
  store.commit('LOADING', false);
  return Promise.reject(error);
});

//响应拦截
axios.interceptors.response.use(response => {
  store.commit('LOADING', false);
  return Promise.resolve(response)
}, error => {
  console.log('响应出错,测试下面的return promise.reject1');
  //响应失败,取消loading
  store.commit('LOADING', false);
  return Promise.reject(error);
});

//检查响应状态
function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response;
  }
  //响应失败,取消loading
  store.commit('LOADING', false);
  // 异常状态下，把错误信息返回去
  return {
    status: response.status || -404,
    msg: '网络异常'
  }
}

//检查状态码
function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，弹窗提示
  if (res.status === -404) {
    return Promise.reject({
      status: -404,
      msg: '发生错误,没有找到你想要的'
    });
  }
  if (res && (res.data.code < 0)) {
    return Promise.reject({
      code: res.data.code,
      msg: res.data.msg || '发生错误,没有找到你想要的'
    });
  }
  return res;
}

function post(url, data) {
  return axios({
    method: 'post',
    url: getConfig().baseUrl + url,
    data: JSON.stringify(data),
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }).then((response) => {
      return checkStatus(response)
    }
  ).then((res) => {
    return checkCode(res)
  })
}

function get(url, params, uneedDefaultParams) {
  if (!uneedDefaultParams) {
    if (!params.pagenum) {
      params.pagenum = 1;
    }
    if (!params.pagesize) {
      params.pagesize = 18;
    }
  }
  return axios({
    method: 'get',
    url: getConfig().baseUrl + url,
    params, // get 请求时带的参数
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).then((response) => {
      return checkStatus(response)
    }
  ).then((res) => {
      return checkCode(res)
    }
  )
}

//导出调用
export default {post, get};
