import express from "express";
import {
  addToCart,
  getCart,
  removeCartItemById,
  updateCartItemById,
} from "../controllers/cart.controller.js";
import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authorization, addToCart);
router.get("/", authorization, getCart);
router.put("/:productId", authorization, updateCartItemById);
router.delete("/:productId", authorization, removeCartItemById);

export default router;
