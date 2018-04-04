/**
 * Created by jingqw on 18/3/12.
 * apis
 */

/**
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

const express = require('express'),
  app = express(),
  router = express.Router(),
  path = require('path'),
  fs = require('fs'),
  multer = require('multer');

let upload = multer({
  dest: './uploads'
});//定义图片上传的临时目录


// 使用jwt签名
let jwt = require('jsonwebtoken');
const db = require('./dbModel');
const fn = () => {
};

// 拦截路由,验证token
// router.use(function (req, res, next) {
//   if (req.path !== '/api/signin') {
//     // 拿取token数据 (登录接口无需token)
//     let token = (req.params && req.params.token) || (req.query && req.query.token) || req.headers['x-access-token'];
//     if (token) {
//       // 解码 token (验证 secret 和检查有效期（exp）)
//       jwt.verify(token, app.get("superSecret"), function (err, decoded) {
//         if (err) {
//           res.status(500).send({
//             msg: '系统错误',
//             code: -1
//           });
//         } else {
//           // 如果验证通过，在req中写入解密结果
//           req.decoded = decoded;
//           //console.log(decoded);
//           next(); //继续下一步路由
//         }
//       });
//     } else {
//       // 没有拿到token
//       res.status(403).send({
//         msg: '没有token',
//         code: 0
//       });
//     }
//   }
// });

// 文章详情
router.get('/api/getArticle/', async (req, res) => {
  const _id = req.query.id;
  await db.Article.findOne({_id}, {__v: 0}, (err, data) => {
    if (err) res.status(500).send({msg: '系统错误', code: -1});
    res.status(200).send({
      code: 1,
      mag: '获取文章详情成功',
      result: data
    });
  });
});

// 文章列表
router.get('/api/getArticles', async (req, res) => {
  let limitObj = {
    limitNum: parseInt(req.query.pagesize), // 转换成int
    limitPage: parseInt(req.query.pagenum)
  };
  // 第一个 {} 放 where 条件，为空表示返回集合中所有文档。
  // 第二个 {} 指定那些列显示和不显示 （0表示不显示 1表示显示)。
  // MongoDB执行顺序: sort skip limit
  await db.Article.find({}, {__v: 0}, (err, data) => {
    if (err) {
      // console.log(err)
      res.status(500).send({
        msg: '系统错误',
        code: -1
      });
    } else {
      res.status(200).send({
        code: 1,
        mag: '获取文章列表成功',
        result: data
      });
    }
  }).sort({_id: -1}).limit(limitObj.limitNum);
});

//保存文章
router.post('/api/saveArticle', async (req, res) => {
  let {id, username, viewAuth, title, date, content} = req.body;
  const article = {
    id: id || '',
    username: username,
    viewAuth: viewAuth,
    title: title,
    // date: (new Date()).getTime(),
    date: date,
    content: content
  };
  let tipMsg = '';
  if (article.id) {
    //更新文章
    await db.Article.findByIdAndUpdate(article.id, article, fn);
    tipMsg = '更新成功';
  } else {
    //新建文章
    await new db.Article(article).save();
    tipMsg = '发布成功'
  }
  res.status(200).send({
    msg: tipMsg,
    code: 1
  });
});

//删除文章
router.post('/api/deleteArticle', async (req, res) => {
  await db.Article.findByIdAndRemove(req.params.id, () => {
    res.status(200).send({
      msg: '保存成功',
      code: 1
    });
  });

});

// login
router.post('/api/signin', async (req, res) => {
  const {name, pwd} = req.body;
  await db.User.findOne({name}, 'name pwd ', (err, data) => {
    switch (true) {
      case !!err:
        res.status(500).send({
          msg: '系统错误',
          code: -1
        });
        break;
      case !data:
        res.send({code: 0, msg: '账号不存在'});
        break;
      case data.pwd === pwd:
        let token = jwt.sign({data}, 'app.get("superSecret")', {
          expiresIn: 60 * 60 * 24 // 授权时效24小时
        });
        res.send({
          message: '登陆成功',
          token: token,
          code: 1,
          result: data
        });
        break;
      case data.pwd !== pwd:
        res.send({code: 2, msg: '密码错误'});
        break;
      default :
        res.send({code: -1, msg: '未知错误'});
    }
  });
});

//register
router.post('/api/signup', async (req, res) => {
  let newUser = {
    // uuid: 0,
    name: req.body.name,
    pwd: req.body.pwd,
    avatar: ''
  };
  await db.User.findOne({'name': newUser.name}, (err, user) => {
    if (err) {
      res.status(500).send({code: -1, msg: '未知错误'});
    } else {
      if (user && user.name) {
        res.send({code: 0, msg: '名称存在咯，换一个吧'});
      } else {
        // newUser.uuid = parseInt(db.User.count()) + 1;
        new db.User(newUser).save(() => {
          res.send({code: 1, msg: '注册成功，带您去登陆 >v<'});
        });
      }
    }
  });
});

// 上传头衔
router.post('/api/avatar', upload.single('avatar'), async (req, res) => {
// 图片会放在uploads目录并且没有后缀，需要自己转存，用到fs模块
  // 对临时文件转存，fs.rename(oldPath, newPath,callback);
  fs.rename(req.files.path, "upload/" + req.files.originalname, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(data);
  })

});

//修改密码
router.post('/api/savePwd', async (req, res) => {
  const {name, pwd} = req.body;
  await db.User.findOneAndUpdate({name}, {pwd}, () => {
    res.status(200).send({
      msg: '密码修改成功',
      code: 1
    });
  });
});

module.exports = router;
