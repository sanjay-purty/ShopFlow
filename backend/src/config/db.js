import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce", {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`\x1b[32m%s\x1b[0m`, `MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`\x1b[31m%s\x1b[0m`, `Database Connection Failed: ${error.message}`);
    // Disable buffering so that operations fail immediately instead of waiting for timeout
    mongoose.set("bufferCommands", false);
    console.log(`\x1b[33m%s\x1b[0m`, `Mongoose buffering disabled due to connection failure.`);
    return false;
  }
};

export default connectDB;
