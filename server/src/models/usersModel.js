const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3, // 3
    maxlength: 50, //maximum  50
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/, //email fotmat ke liye
  },
  password: {
    type: String,
    require: [true, "password is required "],
  },

  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  cartItems: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    },
  ],
},{
  timestamps : true
});

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
