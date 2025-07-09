import express from "express";
import {
  addToCart,
  getCart,
  removeCartItemById,
  updateCartItemById,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getCart);
router.put("/:productId", updateCartItemById);
router.delete("/:productId", removeCartItemById);

export default router;
