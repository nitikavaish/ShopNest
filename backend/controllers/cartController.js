const Cart = require("../model/Cart");
const Product = require("../model/Product");

// Format cart data for frontend
const formatCart = (cart) => {
  return cart.items
    .filter((item) => item.product)
    .map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      imageUrl: item.product.imagesUrl,
      qty: item.qty,
    }));
};

// Get logged-in user's cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });

      await cart.populate("items.product");
    }

    return res.status(200).json({
      cartItems: formatCart(cart),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;

    if (!productId || !Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({
        message: "Valid product ID and quantity are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.stock < qty) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      if (existingItem.qty + qty > product.stock) {
        return res.status(400).json({
          message: "Requested quantity exceeds available stock",
        });
      }

      existingItem.qty += qty;
    } else {
      cart.items.push({
        product: productId,
        qty,
      });
    }

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({
      message: "Product added to cart successfully",
      cartItems: formatCart(cart),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update product quantity
const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { qty } = req.body;

    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    const product = await Product.findById(productId);

    if (!product || qty > product.stock) {
      return res.status(400).json({
        message: "Requested quantity is unavailable",
      });
    }

    cartItem.qty = qty;

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({
      message: "Cart quantity updated successfully",
      cartItems: formatCart(cart),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({
      message: "Product removed successfully",
      cartItems: formatCart(cart),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(200).json({
        message: "Cart is already empty",
        cartItems: [],
      });
    }

    cart.items = [];

    await cart.save();

    return res.status(200).json({
      message: "Cart cleared successfully",
      cartItems: [],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
