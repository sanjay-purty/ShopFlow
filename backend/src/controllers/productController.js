import Product from "../models/Product.js";
import productsData from "../data/products.js";
import mongoose from "mongoose";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // If DB is not connected, return local data
    if (mongoose.connection.readyState !== 1) {
      console.log("Serving products from MOCK DATA");
      return res.json(productsData);
    }

    const keyword = req.query.keyword
      ? {
          $or: [
            {
              name: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
            {
              description: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
            {
              category: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const products = await Product.find({ ...keyword, ...category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching products" });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching product" });
  }
};

// @desc    Fetch all categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Product.find().distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching categories" });
  }
};

export { getProducts, getProductById, getCategories };
