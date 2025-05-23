import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../stores/useProductStore";
import ProductCard from "../component/ProductCard"
import "../pages.CssFile/CategoryPages.css"; 


const CategoryPages = () => {
  const { category } = useParams();
  const { fetchProductByCategory, products } = useProductStore();

  useEffect(() => {
    fetchProductByCategory(category);
  }, [fetchProductByCategory, category]);
  return (
    <div className="category-page">
      <h1 className="category-title">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      <div className="products-grid">
        {products?.length === 0 ? (
          <h2 className="no-products">Product not found</h2>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPages;
