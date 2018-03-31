import Vue from 'vue'
import Router from 'vue-router'
//状态管理
import store from '../store/index'

import auth from '../common/auth'

import index from '../view/index/index'
import articleDetail from '../view/article/detail'
import articleSend from '../view/article/send'
import login from '../view/login/login'
import signup from '../view/login/signup'
import chat from '../view/chat/chat'
import chatting from '../view/chat/chatting'
import customer from '../view/customer/customer'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: index,
      keepAlive: true
    },
    {
      path: '/index',
      component: index,
      keepAlive: true
    },
    {
      path: '/detail/:id',
      component: articleDetail
    },
    {
      path: '/send',
      component: articleSend,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/signup',
      component: signup
    },
    {
      path: '/customer',
      component: customer,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/chat',
      component: chat,
      meta: {
        requireAuth: true,
      },
      children: [

      ]
    },
    {
      path: '/chatting',
      component: chatting,
      meta: {
        requireAuth: true,
      }
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
