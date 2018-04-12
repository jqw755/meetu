/**
 *   mongodb connection config
 * */
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1:27017/meetu', {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

const db = mongoose.connection;

db.on('error', (e) => {
  console.log(`Database connection error: ${e}`);
});

db.on('open', () => {
  console.log('The database has connected');
});
