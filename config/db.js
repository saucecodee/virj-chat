const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sauce"

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

module.exports = function initDB() {
  mongoose
    .connect(uri, options)
    .then(() => {
      console.log(':: connected to database');
    })
    .catch(error => {
      console.log(":: couldn't connect to database ", error);
    });
};
