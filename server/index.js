/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2019-01-22 17:59:40
 * @file: node服务器启动文件（路由配置）
 */

const mongoose = require("mongoose");
const express = require('express');
const fs = require('fs');
const join = require('path').join;

const port = process.env.PORT || 8080;

//初始化node服务器
const server = express();

//MongoDB连接
connect(server)

function connect(server) {
  /* mongoose自带的promise过期了,需要v8引擎的promise */
  // mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://122.51.49.126:27017/mongodb',{ 
    user:'zx',
    pass:'zx'
  }).then(async(rs) => { 
      console.log("数据库连接成功");
      initModels(server);
      //服务端接口
      require('./router')(server);
      server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      });
    }, err => { 
        console.log('error');
     }
  );
}

function initModels(server) { //初始化数据模型-models
  const models = join(__dirname, './models');
  fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));
}
