const express = require("express");
const connected = require("./src/config/db");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const bodyparser = require("body-parser")
require("dotenv").config();

const authRoutes =  require("./src/routes/authRoute")
const productRoute = require("./src/routes/productRoute")
const cartRoute = require("./src/routes/cartRoute")
const app = express();
const PORT = process.env.PORT || 8001;


app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(cors())

// app.use(cors({
//   origin: 'http://localhost:5173/', // React app ka URL
//   credentials: true // VERY IMPORTANT: Cookie allow karne ke liye
// }));


app.get("/", (req , res) => {
  res.json({ message: "Create API", success: true });
});  

 
app.use("/api/auth",authRoutes)
app.use("/api/product",productRoute)
app.use("/api/cart"  , cartRoute)
// app.use("/api/cart", cartRoute)
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
