'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

console.log('--------Article----model-------------')

const getTags = tags => tags.join(',');
const setTags = tags => tags.split(',');

/**
 * Article Schema
 */
const ArticleSchema = new Schema({
  title: { type : String, default : '' },
  author: { type : String, default : '张啸' },
  description: { type : String, default : '' },
  content: { type : String, default : '' },
  link: { type : String, default : '' },
  images: { type: [] /* , get: getTags, set: setTags  */},
  time: { type : Date, default : Date.now },
  views: { type : Number, default: 0 },
  likes: { type : Number, default: 0 },
});

/**
 * Validations
 */

ArticleSchema.path('title').required(true, 'Article title cannot be blank');
ArticleSchema.path('description').required(true, 'Article description cannot be blank');

/**
 * Methods
 */

ArticleSchema.methods = {

  /**
   * Save article and upload image
   *
   * @param {Object} images
   * @api private
   */
  uploadAndSave: function (image) {
    const err = this.validateSync();
    if (err && err.toString()) throw new Error(err.toString());
    return this.save();
  },

  /**
   * Remove comment
   *
   * @param {commentId} String
   * @api private
   */
  removeComment: function (commentId) {
    const index = this.comments
      .map(comment => comment.id)
      .indexOf(commentId);

    if (~index) this.comments.splice(index, 1);
    else throw new Error('Comment not found');
    return this.save();
  }
};

/**
 * Statics
 */

ArticleSchema.statics = {
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

mongoose.model('Article', ArticleSchema, 'article', false);