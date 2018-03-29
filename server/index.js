/**
 * Created by jingqw on 18/3/12.
 *
 * server entry js
 */
// const fs = require('fs');
// const path = require('path')
// const resolve = file => path.resolve(__dirname, file)
const express = require('express');
// const Model = require('./dbModel');
const api = require('./api');
// bodyParser 必须放在api后面,否则请求req.body会报undefined
const bodyParser = require('body-parser');
const app = express();

// 用于静态展示入口
let router = express.Router();
router.get('/', function (req, res, next) {
  req.url = '../index.html';
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 设置允许跨域  另一种办法是使用express的cors模块
app.all('*', function(req, res, next) {
  app.use(api);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  if(req.method==="OPTIONS") res.sendStatus(200); // 让options请求快速返回
  else  next();
});

// port
app.set('port', (process.env.port || 3000));
let appPort = app.get('port');
let server = app.listen(appPort, function () {
  console.log('application run at: http://localhost:' + appPort);
});
// webSocket
require('./socket.js')(server);

