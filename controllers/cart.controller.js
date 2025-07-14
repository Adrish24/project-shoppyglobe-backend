import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Function to add a product to the cart
export async function addToCart(req, res) {
  const { userId } = req;
  const { productId, quantity } = req.body;

  if (!productId)
    return res.status(400).json({ message: "Product ID is required!" });

  try {
    const product = await Product.findById(productId); // Find product by ID
    if (!product)
      return res.status(404).json({ message: "RPoduct not found!" });

    const existingCart = await Cart.findOne({ userId }); // Find cart by userId
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
    ); // Check if product already exists in the cart
    if (item) {
      item.quantity += quantity; // Update quantity if product already exists
    } else {
      existingCart.products.push({ productId, quantity }); // Add new product to cart if it doesn't exist
    }

    await existingCart.save(); // Save the updated cart
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
  const { userId } = req;

  try {
    const cart = await Cart.findOne({ userId }); // Find cart by userId

    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
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
export async function updateCartItem(req, res) {
  const { userId } = req;
  const { quantity } = req.body;
  const { productId } = req.params;
  console.log(quantity);
  try {
    const cart = await Cart.findOne({ userId });

    const item = cart.products.find(
      (i) => i.productId.toString() === productId
    );
    if (!item) {
      return res.status(404).json({
        message: "product not found in cart!",
      });
    }

    if (quantity <= 0) {
      item.quantity = 1; // Reset quantity to 1 if it is set to 0
    } else {
      item.quantity = quantity; // Update the quantity of the product in the cart
    }

    await cart.save(); // Save the updated cart

    res.status(200).json({
      message: `Product with ID ${productId} updated successfully!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update cart items!. Try again later",
      error: error.message,
    });
  }
}

export async function removeCartItemById(req, res) {
  const { productId } = req.params;
  const { userId } = req;
  try {
    await Cart.findOneAndUpdate(
      { userId },
      {
        $pull: { products: { productId } },
      }
    );
    res.status(200).json({
      message: `Product with ID ${productId} removed from cart successfully!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to remove product from cart!. Try again later",
      error: error.message,
    });
  }
}
