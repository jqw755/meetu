/**
 * Created by jingqw on 18/3/12.
 *
 * apis
 */
const express = require('express');
const app = express();
const router = express.Router();
// 使用jwt签名
var jwt = require('jsonwebtoken');
const db = require('./dbModel');
const fn = () => {
};

// 拦截路由,验证token
router.use(function (req, res, next) {
  if (req.path !== '/api/signin') {
    // 拿取token数据 (登录接口无需token)
    let token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'];
    if (token) {
      // 解码 token (验证 secret 和检查有效期（exp）)
      jwt.verify(token, 'app.get("superSecret")', function (err, decoded) {
        if (err) {
          res.status(500).send({
            msg: '系统错误',
            code: -1
          });
        } else {
          // 如果验证通过，在req中写入解密结果
          req.decoded = decoded;
          //console.log(decoded);
          next(); //继续下一步路由
        }
      });
    } else {
      // 没有拿到token
      res.status(403).send({
        msg: '没有token',
        code: 0
      });
    }
  }
});

// 文章详情
router.get('/api/getArticle', (req, res) => {
  const _id = req.body.id;
  db.Article.findOne({_id}, (err, data) => {
    if (err) console.log(err);
    res.status(200).send(data);
  });
});

// 文章列表
router.get('/api/getArticles', (req, res) => {
  db.Article.find({}, 'title data content', (err, data) => {
    if (err) throw err;
    // res.send(data);
    res.status(200).send(data);  //JSON.stringify
  });
});

//保存文章
router.post('/api/saveArticle', (req, res) => {
  const id = req.body._id;
  const article = {
    title: req.body.title,
    date: req.body.date,
    content: req.body.content
  }
  if (id) {
    //更新文章
    db.Article.findByIdAndUpdate(id, article, fn)
  } else {
    //新建文章
    new db.Article(article).save()
  }
  res.status(200).send({
    msg: '保存成功',
    code: 1
  });
});

//删除文章
router.post('/api/deleteArticle', (req, res) => {
  db.Article.findByIdAndRemove(req.body.id, fn)
  res.status(200).send({
    msg: '保存成功',
    code: 1
  });
});

// login
router.post('/api/signin', (req, res) => {
  const {name, pwd} = req.body;
  db.User.findOne({name}, 'pwd', (err, user) => {
    switch (true) {
      case err:
        res.status(500).send({
          msg: '系统错误',
          code: -1
        });
        break;
      case !user:
        res.send({code: 0, msg: '账号不存在'});
        break;
      case user.pwd === pwd:
        let token = jwt.sign(user, 'app.get("superSecret")', {
          expiresIn: 60 * 60 * 24 // 授权时效24小时
        });
        res.send({
          message: '登陆成功',
          token: token,
          code: 1
        });
        break;
      case user.pwd !== pwd:
        res.send({code: 2, msg: '密码错误'});
        break;
      default :
        res.send({code: -1, msg: '未知错误'});
    }
  });
});

//register
router.post('/api/signup', (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  const newUser = {
    name: req.body.name,
    pwd: req.body.pwd,
  };
  db.findOne({'name': newUser.name}, (err, data) => {
    if (err) {
      res.send({code: -1, msg: '未知错误'});
      res.status(500).end();
    } else {
      if (newUser.name) {
        res.send({code: 0, msg: '您输入的账户名已经存在咯,换一个吧'});
      } else {
        new db.User(newUser).save();
        res.send({code: 1, msg: '注册成功, 欢迎您 >v<'});
      }
      res.status(200).end();
    }
  });
});

//修改密码
router.post('/api/savePwd', (req, res) => {
  const {name, pwd} = req.body;
  db.User.findOneAndUpdate({name}, {pwd}, fn);
  res.status(200).send({
    msg: '密码修改成功',
    code: 1
  });
});

module.exports = router;
