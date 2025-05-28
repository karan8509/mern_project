const Product = require("../models/productModel");


const getCartProduct = async (req, res) => {
  try {
    const products = await Product.find({
      _id: { $in: req.user.cartItems.map((e) => e.product) },
    });

    // products //  is me jese 3 id hai 

    // products.map((product)  is me aa jaye gi fir cartItem me cheack kr ga  ki kitni id hai fir use updata kr dega quanti me

    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.product === product._id
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });
    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCart");
  }
};





const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log("-->", productId)
    const user = req.user;
    const existProdcut = user.cartItems.find(
      (cartProduct) => cartProduct.id === productId.id
    );
    if (existProdcut) {
      existProdcut += 1;
    } else {
      user.cartItem.push(existProdcut);
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart Controller ");
    res.json({ message: "server error", error: error.message });
  }
};

const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user
    console.log("===>", productId);
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartProduct = user.cartItem.filter(
        (item) => item.id !== productId
      );
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in removeAllFromCart controllers");
    res.json({ message: "server error ", error: error.message });
  }
};


const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res.json(user.cartItems);
      }

      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = { getCartProduct, addToCart, removeAllFromCart, updateQuantity };
