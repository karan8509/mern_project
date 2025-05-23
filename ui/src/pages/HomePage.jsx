import "../pages.CssFile/HomePage.css";
import  CategoryItem from "../component/CategoryItem";


const categories = [
  { href: "/jackets", name: "jackets", imageUrl: "/jocket.png" },
  { href: "/suits", name: "suits", imageUrl: "/suit.png" },
  { href: "/bags", name: "Bags", imageUrl: "/bag.jpg" },
  { href: "/dresses", name: "Dresses", imageUrl: "/dresse.jpg" },
  { href: "/jeans", name: "jeans", imageUrl: "/manpant.jpg" },
  { href: "/women", name: "Women", imageUrl: "/women.jpg" },
  { href: "/heels", name: "Heels", imageUrl: "/heel.jpg" }
];

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Explore Our Categories</h1>
        <p className="home-subtitle">
          Discover the latest trends in eco-friendly fashion 
        </p>
        <div className="categories-grid">
          {categories.map((category) => (
             <CategoryItem   category={category}  key={category.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
