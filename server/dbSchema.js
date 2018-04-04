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
    // uuid: {
    //   type: Number,
    //   // required: true,
    //   // unique: true
    // },
    name: {
      type: String,
      required: true
    },
    pwd: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    }
  }),

  articleSchema: new Schema({
    username: {
      type: String,
      required: true
    },
    viewAuth: {
      type: Number,
      required: true
    },
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
};

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


