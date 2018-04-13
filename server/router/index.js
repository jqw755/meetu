/**
 * Created by jingqw on 18/04/11
 *
 *   注意:
 *    req.params.xxxxx 从path中的变量   /hello/:name/:tel
 *    req.query.xxxxx 从get中的?xxxx=中
 *    req.body.xxxxx 从post中的变量
 *    mongoDb:
 *      // 第一个 {} 放 where 条件，为空表示返回集合中所有文档。
 *      // 第二个 {} 指定那些列显示和不显示 （0表示不显示 1表示显示)。
 *      // MongoDB执行顺序: sort skip limit
 *
 *
 * */
const router = require('koa-router')();

// 用户接口逻辑
const userCtrl = require('../controller/user/userCtrl');
// 文章接口逻辑
const articleCtrl = require('../controller/article/articleCtrl');
// token认证
const resolveToken = require('../middleware/resolveToken');


const routers = router
  .post('/user/login', userCtrl.login)
  .post('/user/register', userCtrl.register)
  .get('/user/getUser', resolveToken, userCtrl.getUser)
  .get('/article/getArticles', articleCtrl.getArticles)
  .post('/article/saveArticle', resolveToken, articleCtrl.saveArticle)
  .get('/article/articleDetail', articleCtrl.articleDetail)




router.use('/api', routers.routes(), routers.allowedMethods());
module.exports = router;
