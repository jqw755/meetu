const TOKEN = 'MEET_TOKEN',
  IS_LOGIN = 'MEET_IS_LOGIN',
  USERINFO = 'MEET_USERINFO';
const auth = {
  //设置是否登录
  setIsLogin: (isLogin = 0) => {
    localStorage.setItem(IS_LOGIN, isLogin);
  },
  //是否登录
  isLogin: () => {
    return !!localStorage.getItem(IS_LOGIN) && !!auth.getToken();
  },
  getLogin: () => {
    return localStorage.getItem(IS_LOGIN);
  },
  //设置token
  setToken: token => {
    localStorage.setItem(TOKEN, token);
  },
  //获取token
  getToken: () => {
    return localStorage.getItem(TOKEN);
  },
  //设置用户信息
  setUserInfo: userInfo => {
    localStorage.setItem(USERINFO, userInfo);
  },
  //获取用户信息
  getUserInfo: () => {
    return localStorage.getItem(USERINFO);
  },
  //删除token
  removeToken: () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(IS_LOGIN);
    localStorage.removeItem(USERINFO);
  },
};

export default auth;
