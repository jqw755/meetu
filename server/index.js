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
const app = express();

// 设置允许跨域  另一种办法是使用express的cors模块
app.all('*', function(req, res, next) {
  app.use(api);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  if(req.method=="OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
  else  next();
});

// port
app.set('port', (process.env.port || 3000));

let appPort = app.get('port');
app.listen(appPort, function () {
  console.log('application run at: http://localhost:' + appPort);
});
