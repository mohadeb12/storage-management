const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  await mongoose.connect(config.mongoUri, {
    autoIndex: true
  });
};
if(connectDB){
    console.log("Mongodb connect successful")
};

module.exports = connectDB;