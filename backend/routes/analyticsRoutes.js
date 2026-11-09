const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/adminMiddleware");

const {
  getAdminStats,
  getPaymentStatus,
} = require("../controllers/analyticsController.js");

const router = express.Router();

router.get("/", protect, admin, getAdminStats);
router.get("/status/:orderId", protect, getPaymentStatus);

module.exports = router;


