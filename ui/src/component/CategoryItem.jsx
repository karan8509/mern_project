import { Link } from "react-router-dom";
import "../pages.CssFile/CategoryItem.css";

const CategoryItem = ({ category }) => {
	return (
		<div className='category-card'>
			<Link to={"/category" + category.href}>
				<div>
					<div className='gradient-overlay' />
					<img
						src={category.imageUrl}
						className='category-image'
						loading='lazy'
					/>
					<div className='category-text'>
						<h3>{category.name}</h3>
						<p>Explore {category.name}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CategoryItem;
