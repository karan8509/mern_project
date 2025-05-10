const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const client = require("../config/redis");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return {
    accessToken,
    refreshToken,
  };
};

const storeRefreshToken = async (userId, refreshToken) => {
  const _userId = mongoose.isValidObjectId(userId) ? userId?.toString(): userId;
  await client.set(
    `refresh_token-${_userId}`, // key
    refreshToken, // value
    "EX",
    7 * 24 * 60 * 60
  );
};

const setcookies = (res, refreshToken) => {
  // res.cookie("accessToken", accessToken, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "strict",
  //   maxAge: 15 * 60 * 1000, //15 min
  // });
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
    if (!name || !email || !password){
      res.json({ message: "All fields are required", success: false });
      return;
    }
    // console.log(name, email, password);
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      res.json({ message: "User already exists", success: false });
      return;
    }
    const salt = await bcrypt.genSalt(1)
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashPassword });

    const { refreshToken } = generateToken(user._id);
    console.log(refreshToken);

    await storeRefreshToken(user._id, refreshToken); // redis database
    setcookies(res, refreshToken);

    res.json({
      id: user._id,
      name,
      email,
      // role ,
      success: true,
      message: "Acount Successfully Create",
    });
  } catch (error) {
    console.log("Error in Signup Routs");
    res.json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ message: "All fields are required", success: false });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ message: "email not found", success: false });
      return;
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      res.json({ message: "Password Not Found ", success: false });
      return;
    }
    const { refreshToken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshToken); // redis database
    setcookies(res, refreshToken);

    res.json({
      message: "successfully acount login",
      success: true,
      });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;


    console.log(">", refreshToken, );

    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await client.del(`refrsh_token-${decoded}`);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "user logout succesfull ", success: true });
  } catch (error) {
    console.log("Error in logout route");
    res.json({ message: error.message, success: false });
  }
};

// const refreshTokens = async (req, res) => {
//   try {
//     const refreshToken = req.cookies.refreshToken;
//     // console.log("refreshtoken -->", refreshToken);
//     if (!refreshToken) {
//       res.json({ message: "not refreshToken provided ", success: false });
//       return;
//     }
//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//     // const storeToken = await client.get(`refresh_token:${decoded.userId}`);

//     const storeToken = await client.get(`refresh_token-${decoded.userId}`);

//     // console.log("redis ", storeToken);

//     if (storeToken !== refreshToken) {
//       res.json({ message: "invalid refresh token", success: false });
//       return;
//     }
//     const accessToken = jwt.sign(
//       { userId: decoded.userId },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "15m" }
//     );
//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 15 * 60 * 1000, // 15 min
//     });
//     res.json({ message: "Successfully creare token ", success: true });
//   } catch (error) {
//     res.json({ message: error.message, success: false });
//   }
// };

module.exports = { signup, login, logout };
