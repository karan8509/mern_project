import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import  useProductStore  from "../stores/useProductStore";
import '../pages.CssFile/ProductsList.css'



const ProductsList = () => {
	const {  deleteProduct , toggleFeaturedProduct, products  } = useProductStore();
  console.log("sever to clien data" , products)





	return (
		<motion.div
			className='products-wrapper'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className='products-table'>
				<thead className='table-head'>
					<tr>
						<th>Product</th>
						<th>Price</th>
						<th>Category</th>
						<th>Featured</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className='table-body'>
					{products?.map((product) => (
						<tr key={product._id} className='table-row'>
							<td className='product-cell'>
								<div className='product-info'>
									<img src={product.image} alt={product.name} className='product-img' />
									<span className='product-name'>{product.name}</span>
								</div>
							</td>
							<td>${product.price.toFixed(2)}</td>
							<td>{product.category}</td>
							<td>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`featured-btn ${product.isFeatured ? "featured" : ""}`}
								>
									<Star size={18} />
								</button>
							</td>
							<td>
								<button
									onClick={() => deleteProduct(product._id)}
									className='delete-btn'
								>
									<Trash size={18} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
	);
};

export default ProductsList;
