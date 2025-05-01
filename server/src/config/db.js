const mongoose = require("mongoose");
require("dotenv").config();

const connected = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DATABASE ON");
  } catch (error) {
    console.log("DB NOT CONNECTED", error.message);
  }
};

module.exports = connected;
