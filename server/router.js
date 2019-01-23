'use strict';
/*
 * Module dependencies.
 */
const bodyParser = require('body-parser');
const cors = require('cors');
const articles = require('./controllers/acticles');
/**
 * Expose routes
 */
module.exports = function (server) {
  server.use(cors({
    origin: [ 
              'http://localhost:8000', 
              'http://localhost:3000', 
              'http://www.zhangxiao.club', 
              'http://zhangxiao.club', 
              'http://www.aka.today:8080', 
              'http://aka.today:8080'
            ],
    optionsSuccessStatus: 200,
    credentials: true
  }));
  server.use(bodyParser.urlencoded({extended:false}))
  server.use(bodyParser.json())
  // user routes
  server.get('/time/list', articles.ListSort);
  server.get('/articles/list', articles.List);
  server.post('/articles/save', articles.create);
  server.get('/articles/findByTag', articles.List);
};
