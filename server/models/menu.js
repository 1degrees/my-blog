'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

console.log('--------Menu----model-------------')

const getTags = tags => tags.join(',');
const setTags = tags => tags.split(',');

/**
 * Article Schema
 */
const MenuSchema = new Schema({
  title: { type : String, default : '' },
  link: { type : String, default : '张啸' },
  href: { type : Object },
  child: { type: [], default : '[]' },
});

/**
 * Validations
 */
MenuSchema.path('title').required(true, 'Article title cannot be blank');

/**
 * Methods
 */

MenuSchema.methods = {

};

/**
 * Statics
 */

MenuSchema.statics = {
  /**
   * List articles
   *
   * @param {Object} options
   * @api private
   */
  list: function (options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    return this.find(criteria).limit(limit).skip(limit * page).exec();
  }
};

mongoose.model('Menu', MenuSchema, 'menu', false);