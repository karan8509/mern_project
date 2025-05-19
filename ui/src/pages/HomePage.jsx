import "../pages.CssFile/HomePage.css";
import  CategoryItem from "../component/CategoryItem";

const categories = [
  { href: "/bages", name:   "bages", imageUrl: "/bag.jpg" },
  { href: "/dresses",name: "dresse", imageUrl: "/dresse.jpg" },
  { href: "/pants", name:   "pant", imageUrl: "/manpant.jpg" },
  { href: "/womes", name:   "women", imageUrl: "/women.jpg" },
  { href: "/heels", name:   "girl", imageUrl: "/heel.jpg" },
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
