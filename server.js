/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2018-09-12 18:25:44
 * @file: node服务器启动文件（路由配置）
 */

const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');  
const routes = require('./router');
const env = process.env.NODE_ENV || 'production';
const port = process.env.PORT || 8080;
// 缓存设置
const ssrCache = new LRUCache({
  max: 500,                   //缓存最大条数
  maxAge: 1000 * 60 * 60 * 24 // 24hour
})

// 初始化next服务
const app = next({
  dev: (env === 'development')
});
const handle = app.getRequestHandler();
const mobxReact = require('mobx-react');

//避免mobx服务端渲染的内存泄漏问题
mobxReact.useStaticRendering(true);

// 配置node服务端路由
app.prepare().then(() => {
  //初始化node服务器
  const server = express();

  //服务端路由
  routes(server, handle)

  //启动node服务器监听端口
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})