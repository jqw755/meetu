/**
 * Created by jingqw on 18/3/12.
 *
 * db Schema构造模型Models
 */

const mongoose = require('mongoose');
const dbSchema = require('./dbSchema');

const Models = {
  User: mongoose.model('User', dbSchema.userSchema),
  Article: mongoose.model('Article', dbSchema.articleSchema),
  // initialized: false,
};

// const initialize = function () {
//   Models.User.find(null, function (err, doc) {
//     if (err) {
//       console.log(err)
//     } else if (!doc.length) {
//       console.log('Database opens for the first time...');
//       Promise.all(init.map(item => new Models[item.type](item).save()))
//         .then(() => console.log('Initialize successfully.'))
//         .catch(() => console.log('Something went wrong during initializing.'))
//     } else {
//       Models.initialized = true
//     }
//   })
// };

const db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1/meetu');

db.on('error', function () {
  console.log('Database connection error.');
});

db.once('open', function () {
  console.log('The database has connected.');
  // initialize()
});

module.exports = Models;
