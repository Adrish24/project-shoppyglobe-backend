import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Function to add a product to the cart
export async function addToCart(req, res) {
  const { userId, productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "RPoduct not found!" });

    const existingCart = await Cart.findOne({ userId });
    if (!existingCart) {
      await Cart.create({
        userId,
        products: [{ productId, quantity }],
      });
      return res
        .status(201)
        .json({ message: "Product added to cart successfully!" });
    }

    const item = existingCart.products.find(
      (i) => i.productId.toString() === productId
    );
    if (item) {
      item.quantity += quantity;
    }

    await existingCart.save();
    res.status(201).json({ message: "Product added to cart successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add product!. Try again later",
      error: error.message,
    });
  }
}

//Function to get cart items for a specific user
export async function getCart(req, res) {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get cart items!. Try again later",
      error: error.message,
    });
  }
}

// Function to update a cart item by its ID
export async function updateCartItemById(req, res) {
  const { quantity } = req.body;
  const { productId } = req.params;

  res.json({ message: "Update cart item by ID not implemented yet" });
}

export async function removeCartItemById(req, res) {
  const { cartId } = req.body;

  try {
  } catch (error) {}
}
