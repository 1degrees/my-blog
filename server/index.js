/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2018-09-13 15:53:17
 * @file: node服务器启动文件（路由配置）
 */

const mongoose = require("mongoose");
const express = require('express');
const fs = require('fs');
const join = require('path').join;

const port = process.env.PORT || 8080;

// Bootstrap models
const models = join(__dirname, './models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));


//初始化node服务器
const server = express();
//服务端接口
require('./router')(server);

//MongoDB连接
connect ()
.on('error', console.log)
.on('disconnected', connect)
.once('open', listen.bind(this,server));

//MongoDB连接函数
function connect() {
  var url = "mongodb://localhost:27017/mongodb";
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