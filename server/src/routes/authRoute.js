const express = require("express");
const { signup, login, logout , getProfile  } = require("../controllers/authController");
const {prodectRoute} = require("../Middleware/authMiddleware")
const auth = express.Router();

auth.post("/signup", signup);
auth.post("/login", login);
auth.post("/logout", logout);
auth.get("/profile" ,prodectRoute, getProfile)




// auth.post("/refreshToken", refreshTokens);

module.exports = auth;
