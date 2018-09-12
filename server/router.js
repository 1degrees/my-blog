'use strict';
/*
 * Module dependencies.
 */
const articles = require('./controllers/articles');

/**
 * Expose routes
 */
module.exports = function (app, passport) {
  // user routes
  app.post('/articles/list', articles.list);
  app.post('/articles/save', users.save);
};
