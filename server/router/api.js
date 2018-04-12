const router = require('koa-router')();

const userCtrl = require('../controller/user/userCtrl');
const articleCtrl = require('../controller/article/articleCtrl');
// const resolveToken = require('./../middleware/token');
// const shouldAuth = require('./../middleware/shouldAuth');


const routers = router
  .post('/user/login', userCtrl.login)
  .post('/user/register', userCtrl.register)
  .get('/article/getArticles', articleCtrl.getArticles)
  .post('/article/saveArticle', articleCtrl.saveArticle)
  .get('/article/articleDetail', articleCtrl.articleDetail)

module.exports = routers;
