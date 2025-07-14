import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./db/connect.js";
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import authRouter from "./routes/auth.routes.js";
import logger from "./middlewares/logger.js";

// Importing the product schema and fake products
// import productSchema from "./models/Product.js";
// import { products } from "./utils/fakeProducts.js";

dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(logger); // Use the logger middleware for logging requests

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/auth", authRouter);

startServer();

// Function to start the server and connect to the database
async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    connectDB(process.env.MONGODB_URI);
  } catch (error) {
    console.log("Error starting the server:", error);
  }
}

// Function to import data into the database

// importData();

// async function importData() {
//   try {
//     await productSchema.deleteMany();
//     await productSchema.insertMany(products);
//     console.log("Product Data Imported!");
//   } catch (error) {
//     console.error("Error importing data:", error);
//   }
// }
