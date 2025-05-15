const express = require("express");

const { prodectRoute } = require("../Middleware/authMiddleware");
const {getCartProduct , addToCart, removeAllFromCart , updateQuantity} = require("../controllers/cartController")


const router = express.Router();

router.get("/", prodectRoute, getCartProduct );
router.post("/" , prodectRoute , addToCart)
router.delete("/" , prodectRoute , removeAllFromCart)
router.put("/id"  , prodectRoute  , updateQuantity)

module.exports = router;
