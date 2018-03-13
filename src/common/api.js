import { getConfig } from './config';
import auth from './auth';

export default function api({ url = '/', data = {}, header = { 'content-type': 'application/x-www-form-urlencoded' }, method = 'POST', notNeedLogin = false }, more = {}) {
  if (!notNeedLogin && !auth.isLogin()) {
    //todo 需要跳转登录
    auth.goLogin();
    return Promise.reject({
      code: -999,
      msg: '请先登录'
    });
  }
  for (let i in data) {
    let val = data[i];
    if (val === null || val === undefined) {
      data[i] = '';
    }
  }
  let token = auth.getToken(),
    siteId = auth.getSiteId();
  if (token) {
    data = {
      ...data,
      token
    }
  }
  if (siteId) {
    data = {
      ...data,
      siteId
    }
  }
  return new Promise((resolve, reject) => {
    let config = {
      ...{
        url: getConfig().baseUrl + url,
        data,
        header,
        method: method.toUpperCase(),
        success: res => {
          res = res.data;
          if (res.code === -999) {
            auth.removeToken();
            reject({
              code: res.code,
              msg: '登录凭证过期，请重新登录'
            });
          }
          if (res.code === 0) {
            resolve(res.body);
          }
          reject({
            code: res.code,
            msg: res.msg
          });
        },
        fail: () => {
          return reject({
            code: -9999,
            msg: '客户端捕获未知错误'
          });
        }
      }, ...more
    };
    wx.request(config);
  });
}