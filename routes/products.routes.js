import express from "express";
import {
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

// Define routes for products
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
