/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2019-01-12 13:54:09
 * @file: node服务器启动文件（路由配置）
 */

const mongoose = require("mongoose");
const express = require('express');
const next = require('next'); 
const fs = require('fs');
const join = require('path').join;

const env = process.env.NODE_ENV || 'production';
const port = process.env.PORT || 8080;

// 初始化next服务
const app = next({
  dev: (env === 'development')
});
const handle = app.getRequestHandler();
const mobxReact = require('mobx-react');

//避免mobx服务端渲染的内存泄漏问题
mobxReact.useStaticRendering(true);

// Bootstrap models
const models = join(__dirname, './server/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

  
// 配置node服务端路由
app.prepare().then(() => {
  //初始化node服务器
  const server = express();

  //服务端接口
  require('./server/router')(server);

  //页面渲染路由
  require('./router')(app, server, handle);

  //MongoDB连接
  connect ()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen.bind(this,server));
})

//MongoDB连接函数
function connect() {
  var url = "mongodb://zzz:zzz@localhost:27017/mongodb";
  var db = mongoose.connect(url).then(function(rs){
    console.log('连接成功')
  },function(err){
    console.log('连接失败')
  }).catch(function(err){ console.log(err) });
  return mongoose.connection
}

//服务端口监听函数
function listen(server) {
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  });
}