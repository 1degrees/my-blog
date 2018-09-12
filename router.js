'use strict';

const express = require('express');
module.exports = function (server, handle) {
  // 服务端页面路由
  /* 配置静态文件夹 */
  server.use('/static', express.static(__dirname + '/static'));

  /* 服务端路由 */
  server.get('/:id', (req, res) => {
    console.log('*******服务端中间层路由********');
    let arr = ['htm', 'css', 'js', 'frame'];
    if(arr.includes(req.params.id)) {
      renderAndCache(req, res, '/content', { id : req.params.id });
    } else {
      return handle(req, res);
    }
  })
  
  /* 
   *首屏加载先查找服务端路由->渲染
   *页面二次操作进行路由跳转交由next处理->默认渲染
   *默认路由页面未进行cache处理
   */
  server.get('*', (req, res) => {
    console.log('*******默认交由next处理********');
    return handle(req, res)
  })
}

/**
 * @function 服务端渲染添加缓存&读取缓存
 * @param { object } req
 * @param { object } res
 * @param { string } pagePath
 * @param { object } queryParams
 */
function renderAndCache(req, res, pagePath, queryParams) {
    const key = getCacheKey(req);

    // 存在缓存，获取缓存
    if (ssrCache.has(key)) {
        console.log('-----CACHE-KEY-GET-----', key)
        res.send(ssrCache.get(key))
    }

    // 无缓存，重新渲染
    app.renderToHTML(req, res, pagePath, queryParams)
        .then((html) => {
        console.log('-----CACHE-KEY-SAVE-----', key)
        ssrCache.set(key, html)
        res.send(html)
        })
        .catch((err) => {
        app.renderError(err, req, res, pagePath, queryParams)
        })
}
  
/**
 * @function 获取缓存key值
 * @param { string } req
 * @returns 
 */
function getCacheKey (req) {
    return `${req.url}`
}