const express = require("express");
const {
  createProduct,
  deleteProduct,
  getAllproducts,
  getFeatureProducts,
  getRecommendedProducts,
  getProductsByCategory,

} = require("../controllers/productController");
const { prodectRoute, adminRoute } = require("../Middleware/authMiddleware");
const router = express.Router();

router.get("/", prodectRoute, adminRoute, getAllproducts);
router.get("/featured", getFeatureProducts);
router.get("/recommendations",getRecommendedProducts)
router.post("/create", prodectRoute, adminRoute, createProduct);
router.get("/category/:category" , getProductsByCategory)
router.delete("/:id", prodectRoute, adminRoute, deleteProduct)

module.exports = router;
