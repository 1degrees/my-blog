/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2019-01-23 13:43:52
 * @file: node服务器启动文件（路由配置）
 */

const mongoose = require("mongoose");
const express = require('express');
const next = require('next'); 
const fs = require('fs');
const join = require('path').join;

const env = process.env.NODE_ENV || 'production';
const port = process.env.PORT || 80;

/* 初始化next服务 */
const app = next({  dev: (env === 'development') });
/* 初始化next服务请求回调 */
const handle = app.getRequestHandler();
/* 初始化mobx服务 */
const mobxReact = require('mobx-react');
/* 避免mobx服务端渲染的内存泄漏问题 */
mobxReact.useStaticRendering(true);

// 配置node服务端路由
app.prepare().then(() => {
  /* 初始化node服务器 */
  const server = express();
  //MongoDB连接
  connect().then(async(rs) => { 
      initModels(server);
      //服务端接口
      require('./server/router')(server);
      //页面渲染路由
      require('./router')(app, server, handle);
      server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      });
      console.log("数据库连接成功");
    }, err => { 
        console.log('error');
    }
  );
})

function connect() {
  /* mongoose自带的promise过期了,需要v8引擎的promise */
  // mongoose.Promise = global.Promise;
  return mongoose.connect('mongodb://127.0.0.1:27017/mongodb',{ 
    user:'zx',
    pass:'zx'
  });
}

function initModels() { //初始化数据模型-models
  const models = join(__dirname, './server/models');
  fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));
}
