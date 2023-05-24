require("dotenv").config();

// MONGODB CONNECTION THROUGH MONGOOSE MODULE

const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Altas DataBase :: MongoDB");
  } catch (error) {
    console.log(`Error in connecting with Mongodb: ${error}`);
  }
};

module.exports = connectDB;
