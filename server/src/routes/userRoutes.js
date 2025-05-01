const express = require("express");
const { signup, login, logout } = require("../controlers/authControler");
const auth = express.Router();

auth.post("/signup", signup);
auth.post("/login", login);
auth.post("/logout", logout);

module.exports = auth;
