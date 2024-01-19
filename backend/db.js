const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/";

const connectToMongoDB = async () => {
  try {
    const con = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected to ${con.connection.host}:${con.connection.port}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectToMongoDB;