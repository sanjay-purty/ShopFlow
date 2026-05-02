import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import User from "./models/User.js";
import Order from "./models/Order.js";
import products from "./data/products.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Create users individually to trigger the password hashing hook
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "password",
      isAdmin: true
    });
    
    await User.create({
      name: "Test User",
      email: "user@example.com",
      password: "password",
      isAdmin: false
    });

    await Product.insertMany(products);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
