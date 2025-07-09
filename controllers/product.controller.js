import Product from "../models/Product.js";

// Function to get all products
export async function getProducts(req, res) {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      // If no products are found, return a 404 status
      return res.status(404).json({ message: "No products found." });
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch products!. Try again later",
      error: error.message,
    });
  }
}

// Function to get a product by ID
export async function getProductById(req, res) {
  const productId = req.params.id; // Assuming the product ID is passed as a URL parameter
  try {
    const product = await Product.findById(productId);
    if (!product) {
      // If the product is not found, return a 404 status
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch products!. Try again later",
      error: error.message,
    });
  }
}
