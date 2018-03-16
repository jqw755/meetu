import Vue from 'vue'
import Router from 'vue-router'
//状态管理
import store from '../store/index'

import auth from '../common/auth'

import HelloWorld from '../view/index/index'
import login from '../view/login.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      // meta: {
      //   requireAuth: true,
      //   keepAlive: true
      // },
    },
    {
      path: '/login',
      component: login
    }
  ]
});

// 页面刷新时，重新赋值token
// if (window.localStorage.getItem('token')) {
//     store.commit(types.LOGIN, window.localStorage.getItem('token'))
// }

router.beforeEach((to, from, next) => {
  // console.log(store.state)
  // 如果即将进入登录路由，则直接放行
  if (to.path === '/login') {
    next()
  } else {
    if (to.meta.requireAuth && !auth.getToken()) {  // 判断该路由是否需要登录权限
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      next();
    }
  }

});

export default router;
