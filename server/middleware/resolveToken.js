const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'app.get(user)', function (err, decoded) {
      console.log({'err ': err})
      if (err) {
        reject({code: -1});
      } else {
        resolve(decoded);
      }
    });
  })
};

const resolveToken = async (ctx, next) => {
  const req = ctx.request;
  let token = req.body.token || req.query.token || req.header.authorization;
  if (token) {
    try {
      ctx.apiUser = await verifyToken(token);
      await next();
    }
    catch (e) {
      console.log({'e ': e})
      if (e.code === -1) {
        ctx.status = 401;
        ctx.body = {
          code: -1,
          msg: 'token过期, 请重新登录'
        }
      } else {
        ctx.status = 500;
        ctx.body = {
          code: -1,
          msg: e
        }
      }
    }
  } else {
    ctx.status = 500;
    ctx.body = {
      code: -1,
      msg: '缺少token'
    }
  }

};

module.exports = resolveToken;
