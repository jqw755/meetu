/**
 * Created by jingqw on 18/04/10.
 * db对象结构
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 文章实例
const articleSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  viewAuth: {
    type: Number,
    required: true,
    default: 1,
  },
  title: {
    type: String,
  },
  date: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  top: {
    type: Boolean,
    default: false
  },
  comments: {
    type: Number,
    default: 0
  }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;


