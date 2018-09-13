'use strict';
/*
 * Module dependencies.
 */
const articles = require('./controllers/acticles');
const menus = require('./controllers/menus');
/**
 * Expose routes
 */
module.exports = function (server) {
  // user routes
  server.get('/menus/list', menus.List);
  server.get('/articles/findByTag', articles.List);
  server.get('/articles/list', articles.List);
  server.post('/articles/save', articles.create);
};
