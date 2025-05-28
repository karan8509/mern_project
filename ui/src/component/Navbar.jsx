import { LogIn, LogOut, Lock, ShoppingCart, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import "../pages.CssFile/Navbar.css";
import { useEffect, useState } from "react";
import useUserStore from "../stores/useUserStore";
import userCartProduct from '../stores/userCartProduct'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUserStore();
  const { cart } = userCartProduct()
  const isAdmin = user?.data?.role === "admin";





  return (
    <header className="navbar-header">
      <div className="container">
        <div className="navbar-wrapper">
          <Link to="/" className="navbar-logo">
            <span>E-Commerce</span>
          </Link>


          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>

          <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
            <Link to="/" className="nav-link">Home</Link>

            {user && (
              <Link to="/cart" className="nav-link cart-link">
                <div className="cart-wrapper">
                  <ShoppingCart size={22} />
                  <span className="cart-badge">{cart.length}</span>
                </div>
                <span className="hidden sm:inline ml-1">Cart</span>
              </Link>
            )}


            {isAdmin && (
              <Link to="/secret-dashboard" className="admin-link">
                <Lock size={18} />
                <span className="hidden sm:inline ml-1">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button onClick={logout} className="logout-btn">
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link to="/signup" className="signup-btn">
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link to="/login" className="login-btn">
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

    </header>
  );
};

export default Navbar;
