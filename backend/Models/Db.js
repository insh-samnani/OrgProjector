const mongoose = require('mongoose');
<<<<<<< HEAD
const mongooseURI='mongodb://localhost:27017/OrgProject?&directConnection=true';
=======
const mongooseURI='mongodb://127.0.0.1:27017/OrgProject';
>>>>>>> origin/main

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongooseURI);
    console.log("Connected to Mongo Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;