const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const client = require("../config/redis");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await client.set(
    `refresh_token ${userId} ${refreshToken} EX : `,
    7 * 24 * 60 * 60
  );
};

const setcookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, //15 min
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.json({ message: "All fields are required", success: false });
      return;
    }
    console.log(name, email, password);
    const existEmail = await Users.findOne({ email });
    console.log('-------->'  , existEmail._id)
    if (existEmail) {
      res.json({ message: "User already exists", success: false });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await Users.create({ name, email, password: hashPassword });
    const { accessToken, refreshToken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshToken); // redis database
    setcookies(res, accessToken, refreshToken);
    res.json({
      id: user._id,
      name,
      email,
      success: true,
      accessToken,
      refreshToken,
      message: "Acount Successfully Create",
    });
  } catch (error) {
    res.json({ message: "server error " || error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email , password)

    if (!email || !password) {
      res.json({ message: "All fields are required", success: false });
      return;
    }
    const emailExist = await Users.findOne({ email });
     if (!emailExist) {
      res.json({ message: "email not found"  , success : false } );
      return;
    }
    const comparePassword = await bcrypt.compare(password, emailExist.password);
    if (!comparePassword) {
      res.json({ message: "Password Not Found ", success: false });
      return;
    }
    const { accessToken, refreshToken } = generateToken(emailExist._id);
    await storeRefreshToken(emailExist._id, refreshToken); // redis database
    setcookies(res, accessToken, refreshToken);



    
    res.json({message : "successfully acount login" , success : true})
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decode = jwt.verify({userId}, process.env.REFRESH_TOKEN_SECRET);    // userId define error aa rha hai 
 
      await client.del(`refrsh_token ${decode.userId}`);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "user logout succesfull ", success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};
module.exports = { signup, login, logout };
