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
  console.log(req.body, req.query, req.params)
  let criteria = {};
  if(req.body){
    for(let key in req.query){
      let val = req.query[key];
      if(val && val.includes(',')){
        let vals = val.split(',');
        criteria[key] = {'$in': vals};
      } else {
        criteria[key] = val;
      }
    }
  }
  const page = req.query.page > 0 ? req.query.page - 1 : 0;
  const limit = 30;
  const options = {
    criteria,
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
  const article = new Article(only(req.body, 'title link tag author description content images'));
  try {
    yield article.save();
    res.json({ status: '保存成功' })
  } catch (err) {
    res.json({ status: '保存失败' })
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