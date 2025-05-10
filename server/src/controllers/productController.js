const client = require("../config/redis");
const Product = require("../models/productModel");
const v2 = require("../config/cloudinary");

const getAllproducts = async (req, res) => {
  try {
    const product = await Product.find({});
    res.json({ product });
  } catch (error) {
    console.log("error in getAllproduct products");
    res.json({ message: "server error", error: error.message });
  }
};

const getFeatureProducts = async (req, res) => {
  try {
    const featuredProduct = await client.get("featured_Products");
    if (featuredProduct) {
      res.json(JSON.parse(featuredProduct));
      return;
    }
    featuredProduct = await Product.find({ isFeatured: true }).lean();
    if (!featuredProduct) {
      return res.json({ message: "No Feature Product Found" });
    }
    await client.set("featured_Products", JSON.stringify(featuredProduct));
    res.json(featuredProduct);
  } catch (error) {
    console.log("Error in featuredProduct  controllers");
    res.json({ message: "server error", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await v2.uploader.upload(image, {
        folder: "products",
      });
    }
    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });
    console.log("productUrl --->" , product.secure_url) /// check ?

    res.json(product);  //  normal data ja rha hoga 
  } catch (error) {
    console.log("Error in Create Product  controller");
    res.json({ message: "server Error", success: false });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("kese url hai " , product.image)
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await v2.uploader.destroy(`products/${publicId}`);
        console.log("deleted image from cloduinary");
      } catch (error) {
        console.log("error deleting image from cloduinary", error);
      }
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllproducts,
  getFeatureProducts,
  createProduct,
  deleteProduct,
};
