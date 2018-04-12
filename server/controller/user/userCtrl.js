/**
 *
 * */

const User = require('../../db/model/user');

const userCtrl = {

  // 注册
  async register(ctx, next) {
    let {name, pwd} = ctx.request.body;
    let newUser = {
      // uuid: 0,
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
            // newUser.uuid = parseInt(db.User.count()) + 1;
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
    await next();

  },

  async login(ctx){
    const {name, pwd} = ctx.request.body;
    await User.findOne({name}, 'name pwd ', (err, data) => {
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
          // let token = jwt.sign({data}, 'app.get("superSecret")', {
          //   expiresIn: 60 * 60 * 24 // 授权时效24小时
          // });
          ctx.body = {
            message: '登陆成功',
            // token: token,
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

};

module.exports = userCtrl;
