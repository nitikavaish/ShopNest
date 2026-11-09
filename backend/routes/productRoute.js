const express = require("express");
const { protect } = require("../middlewares/authMiddleware.js");
const { admin } = require("../middlewares/adminMiddleware.js");
const {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("image"), createProduct);
router
  .route("/:id")
  .get(getProductsById)
  .put(protect, admin, upload.single("image"), updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;

// C-CREATE - POST
// R-READ - GET
// U-UPDATE - PUT
// D-DELETE - DELETE
