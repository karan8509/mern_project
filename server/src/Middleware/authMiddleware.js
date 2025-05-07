const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const prodectRoute = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token missing", success: false });
    }

    try {
      // Token verification
      const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(decode.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
      }

      req.user = user; 
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token expired", success: false });
      }

      if (error.name === "JsonWebTokenError") {
       
        return res.status(401).json({ message: "Invalid token", success: false });
      }

    
      return res.status(500).json({ message: "Internal server error", success: false });
    }
  } catch (error) {
    console.log("Error in ProductRoutes middleware:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

const adminRoute = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied - Admin only", success: false });
  }
};

module.exports = { prodectRoute, adminRoute };
