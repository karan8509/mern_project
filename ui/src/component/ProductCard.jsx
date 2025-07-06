import "../pages.CssFile/ProductCard.css";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import useUserStore from '../stores/useUserStore'
import useCartProductStore from "../stores/useCartProductStore"
const ProductCard = ({ product }) => {
	const { user } = useUserStore()
	const { addToCart } = useCartProductStore();
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add Product to Cart", { id: "log" })
			return;
		} else {
			addToCart(product)
		}

	};

	return (
		<div className="product-card">
			<div className="product-image-container">
				<img src={product.image} alt="product" />
				<div className="product-image-overlay" />
			</div>

			<div className="product-details">
				<h5 className="product-name">{product.name}</h5>

				<p className="product-price">${product.price}</p>
				<button className="add-to-cart-btn" onClick={handleAddToCart}>
					<ShoppingCart size={20} />
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
