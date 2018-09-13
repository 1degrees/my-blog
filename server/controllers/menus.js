'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Menu = mongoose.model('Menu');

/**
 * List
 */
exports.List = async(function* (req, res) {
  const page = req.query.page > 0 ? req.query.page - 1 : 0;
  const limit = 30;
  const options = {
    limit: limit,
    page: page
  };
  const Menus = yield Menu.list(options);
  const count = yield Menu.count();
  res.json({ list: Menus, count})
});