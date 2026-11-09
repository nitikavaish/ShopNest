const Order = require("../model/Order.js");
const User = require("../model/User.js");
const Product = require("../model/Product.js");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const orders = await Order.find();
    const totalRevenue = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0,
    );
    const orderStatusCounts = orders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      { pending: 0, shipped: 0, delivered: 0, cancelled: 0 },
    );
    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
      orderStatusCounts,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching admin stats" });
  }
};

const getPaymentStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ paymentStatus: order.paymentStatus });
  } catch (err) {
    res.status(500).json({ message: "Error fetching payment status" });
  }
};

module.exports = { getAdminStats, getPaymentStatus };
