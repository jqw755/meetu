const User = require('../../db/model/user');
const Article = require('../../db/model/article');
const jwt = require('jsonwebtoken');

const userCtrl = {
  // 注册
  async register(ctx) {
    let {name, pwd} = ctx.request.body;
    let newUser = {
      uid: 0,
      name: name,
      pwd: pwd,
    };
    try {
      await User.findOne({'name': newUser.name}, (err, data) => {
        if (err) {
          ctx.status = 500;
          ctx.body = {
            code: -1,
            msg: '服务错误'
          };
        } else {
          ctx.status = 200;
          if (data && data.name) {
            ctx.body = {
              code: 0,
              msg: '名称存在咯，换一个吧'
            };
          } else {
            newUser.uid = User.count() + 1;
            new User(newUser).save();
            ctx.body = {
              code: 1,
              msg: '注册成功>v<'
            };
          }
        }
      });
    } catch (e) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        msg: e.message || '系统错误'
      };
    }
  },
  // 登录
  async login(ctx) {
    const {name, pwd} = ctx.request.body;
    await User.findOne({name}, {__v: 0},(err, data) => {
      switch (true) {
        case !!err:
          ctx.status = 500;
          ctx.body = {
            code: -1,
            msg: '系统错误'
          };
          break;
        case !data:
          ctx.body = {code: 0, msg: '账号不存在'};
          break;
        case data.pwd === pwd:
          let token = jwt.sign({id: data._id}, 'app.get(user)', {
            expiresIn: '1440h' // 授权时效24*60小时
          });
          ctx.body = {
            message: '登陆成功',
            token: token,
            code: 1,
            result: data
          };
          break;
        case data.pwd !== pwd:
          ctx.body = {code: 2, msg: '密码错误'};
          break;
        default :
          ctx.body = {code: -1, msg: '未知错误'};
      }
    });
  },
  // 获取
  async getUser(ctx) {
    // 拿到由token解析出来的用户信息
    let {id} = ctx.apiUser;
    let authAuthor = await User.findById(id);
    await Article.find({authorId: authAuthor._id}, {authorId: 0}, (err, data) => {
        if (err) {
          ctx.status = 500;
          ctx.body = {
            code: -1,
            msg: '服务出错'
          }
        } else {
          ctx.body = {
            code: 1,
            msg: '数据获取成功',
            result: data
          };
        }
      }).sort({_id: -1})
  },

};

module.exports = userCtrl;
