/**
 * Created by jingqw on 18/04/10.
 *
 * server entry js
 */
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const routers = require('./router/index');
require('./db/connect');

const app = new Koa();

// 设置允许跨域
app.use(cors());

// 解析ctx.request.body
app.use(koaBody({multipart: true}));

app.use(routers.routes()).use(routers.allowedMethods());

// port
let server = app.listen(process.env.PORT || 3001, function () {
  console.log('application run at: http://localhost:' + 3001);
});
// webSocket
require('./socket.js')(server);

