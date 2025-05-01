const express = require("express");
const connected = require("./src/config/db");
const cookieParser = require("cookie-parser")
require("dotenv").config();
const authRoutes =  require("./src/routes/userRoutes")

const app = express();
const PORT = process.env.PORT || 8001;
app.use(express.json())
app.use(cookieParser());
app.get("/", (req , res) => {
  res.json({ message: "Create API", success: true });
});  

app.use("/api/auth",authRoutes)

const serverStart = async () => {
  try {
    await connected();
    app.listen(PORT, () => {
      console.log(`Server Listion on http://localhost:${PORT} `);
    });
  } catch (error) {
    console.log("db not connected", error.message);
  }
};

serverStart();
