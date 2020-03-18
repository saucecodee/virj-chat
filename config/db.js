const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || "mongodb+srv://admin:healthie@healthie-1jcqq.mongodb.net/test?retryWrites=true&w=majority"

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
