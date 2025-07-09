import mongoose from "mongoose";

const product = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  stock: Number,
  category: String,
  rating: Number,
});

const productSchema = mongoose.model("Product", product);

export default productSchema;
