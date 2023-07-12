const mongoose = require('mongoose');
const mongooseURI='mongodb://127.0.0.1:27017/OrgProject';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongooseURI);
    console.log("Connected to Mongo Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;