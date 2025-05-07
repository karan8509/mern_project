const express = require("express");
const {
  getAllproducts,
  getFeatureProducts,
  createProduct,
  deleteProduct
} = require("../controllers/productController");
const { prodectRoute, adminRoute } = require("../Middleware/authMiddleware");
const router = express.Router();

router.get("/", prodectRoute, adminRoute, getAllproducts);
router.get("/featured", getFeatureProducts);
router.post("/create", prodectRoute, adminRoute, createProduct);
router.delete("/delete" , prodectRoute, adminRoute , deleteProduct )

module.exports = router;
