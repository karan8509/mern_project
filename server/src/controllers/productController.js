const client = require("../config/redis");
const Product = require("../models/productModel");
const v2 = require("../config/cloudinary");

const getAllproducts = async (req, res) => {       
  try {
    const product = await Product.find({}); 
    res.json({ product });
    } catch (error) {
    console.log("error in getAllproduct products");
    res.json({ message: error.message });
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

    res.json(product);
  } catch (error) {
    console.log("Error in Create Product  controller");
    res.json({ message: "server Error", success: false });
  }
};

const deleteProduct =  async () => {
  try {    
    const product =  await Product.findById(req.parmes.id)
    if(!product){
      return res.json({message : "Product not found "})
    }
    if(product.image){
      retrun
    }
      
  } catch (error) {
    
  }
}

module.exports = { getAllproducts, getFeatureProducts, createProduct  , deleteProduct};
