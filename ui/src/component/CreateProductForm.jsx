import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import "../pages.CssFile/CreateProductForm.css";
import usePrductStore from "../stores/useProductStore";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });


  const loading = false;

  const {createProduct} = usePrductStore()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
		} catch {
			console.log("error creating a product");
		}
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file); // base64
    }
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="form-heading">Create New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div className="form-group">
          <label htmlFor="name" className="label">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            className="input"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Enter product name"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            className="textarea"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            placeholder="Enter product description"
            rows="3"
          ></textarea>
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price" className="label">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="input"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            placeholder="Enter price"
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category" className="label">
            Category
          </label>
          <select
            id="category"
            className="select"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="image" className="file-upload-label">
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {newProduct.image && (
            <span className="image-status">Image uploaded</span>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? (
            <>
              <Loader className="h-4 w-4 animate-spin mr-2" />
              Creating...
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
export default CreateProductForm;
