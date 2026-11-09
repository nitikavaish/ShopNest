const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

// Get logged-in user's cart
router.get("/", protect, getCart);

// Add product to cart
router.post("/add", protect, addToCart);

// Update product quantity
router.put("/update/:productId", protect, updateCartItem);

// Remove a product from cart
router.delete("/remove/:productId", protect, removeFromCart);

// Clear entire cart
router.delete("/clear", protect, clearCart);

module.exports = router;
