'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const only = require('only');
const { respond, respondOrRedirect } = require('../utils');
const Article = mongoose.model('Article');

/**
 * List
 */
exports.List = async(function* (req, res) {
  const page = req.query.page > 0 ? req.query.page - 1 : 1;
  const limit = 30;
  const options = {
    limit: limit,
    page: page
  };
  const articles = yield Article.list(options);
  const count = yield Article.count();
  res.json({ list: articles, count})
});

/**
 * Create an article
 * Upload an image
 */
exports.create = async(function* (req, res) {
  const article = new Article(only(req.body, 'title body tags'));
  try {
    const rs = yield article.uploadAndSave(req.file);
    res.json(rs)
  } catch (err) {
    res.json(err)
  }
});

/**
 * Delete an article
 */
exports.destroy = async(function* (req, res) {
  yield req.article.remove();
  respondOrRedirect({ req, res }, '/articles', {}, {
    type: 'info',
    text: 'Deleted successfully'
  });
});