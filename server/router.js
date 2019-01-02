'use strict';
/*
 * Module dependencies.
 */
const articles = require('./controllers/acticles');
const menus = require('./controllers/menus');
const cors = require('cors');
const bodyParser = require('body-parser');
/**
 * Expose routes
 */
module.exports = function (server) {

  server.use(cors({
    origin: [ 
              'http://localhost:3000', 
              'http://www.zhangxiao.club', 
              'http://zhangxiao.club', 
              'http://www.aka.today:8080', 
              'http://aka.today:8080'
            ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
  }));
  
  server.use(bodyParser.urlencoded({extended:false}))
  server.use(bodyParser.json())

  // user routes
  server.get('/menus/list', menus.List);
  server.get('/articles/findByTag', articles.List);
  server.get('/articles/list', articles.List);
  server.post('/articles/save', articles.create);
};
