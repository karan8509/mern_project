const express = require("express");
const { signup, login, logout  } = require("../controllers/authController");
const auth = express.Router();

auth.post("/signup", signup);
auth.post("/login", login);
auth.post("/logout", logout);
// auth.post("/refreshToken", refreshTokens);

module.exports = auth;
