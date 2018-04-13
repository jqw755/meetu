/**
 * Created by jingqw on 18/04/10.
 * db对象结构
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建用户实例
const userSchema = new Schema({
  uid: {
    type: Number,
    // required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
