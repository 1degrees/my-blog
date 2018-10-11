'use strict';

const express = require('express');
const LRUCache = require('lru-cache'); 

module.exports = function (app, server, handle) {
  // 服务端页面路由
  /* 配置静态文件夹 */
  server.use('/static', express.static(__dirname + '/static'));

  /* 服务端路由 */
  server.get('/:id', (req, res) => {
    let arrC = ['htm', 'css', 'js', 'frame'],
        arrA = ['lifes', 'travel', 'ngc'];
    if(arrC.includes(req.params.id)) {
      renderAndCache(app, req, res, '/content', { id : req.params.id });
    } else if(arrA.includes(req.params.id)){
      renderAndCache(app, req, res, '/articles', { id : req.params.id });
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

// 缓存设置
const ssrCache = new LRUCache({
  max: 500,                   //缓存最大条数
  maxAge: 1000 * 60 * 60 * 24 // 24hour
})

/**
 * @function 服务端渲染添加缓存&读取缓存
 * @param { object } req
 * @param { object } res
 * @param { string } pagePath
 * @param { object } queryParams
 */
function renderAndCache(app, req, res, pagePath, queryParams) {
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