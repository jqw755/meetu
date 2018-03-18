/**
 * Created by jingqw on 18/3/12.
 *
 * db对象结构
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建用到的实例
module.exports = {
  userSchema: new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    pwd: {
      type: String,
      required: true
    },
  }),

  articleSchema: new Schema({
    title: {
      type: String,
      // required: true
    },
    date: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  })
}

// export default new Schema({
//   userSchema: {
//     name: {
//       type: String,
//       required: true
//     },
//     pwd: {
//       type: String,
//       required: true
//     },
//   },
//   articleSchema: {
//     title: {
//       type: String,
//       required: true
//     },
//     data: String,
//     content: {
//       type: String,
//       required: true
//     }
//   },
// })


