const Order = require("../model/Order.js");

const sendEmail = require("../utils/sendEmail.js");

// create a new order
const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, address, paymentId } = req.body;
    if (!products || products.length == 0 || !totalAmount || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    } else {
      const order = await Order.create({
        user: req.user._id,
        products,
        totalAmount,
        address,
        paymentId,
      });

      const message = `Dear ${req.user.name}, thank you for your order! Your order has been successfully placed. Order ID: ${order._id}. Total Amount: ${totalAmount}. We will notify you once your order is shipped.`;

      try {
        await sendEmail(req.user.email, "Order Confirmation", message);
      } catch (emailError) {
        console.error("Order email failed:", emailError.message);
      }

      res.status(201).json({ message: "Order created successfully", order });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get my orders
const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product",
    );
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get orders for admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "id name");
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" },
    );
    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  myOrders,
  updateOrderStatus,
};
