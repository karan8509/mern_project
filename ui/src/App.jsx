import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPages from "./pages/LoginPages";
import Navbar from "./component/Navbar";
import { Toaster } from "react-hot-toast";
import useUserStore from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./component/LoadingSpinner";
import AdminPage from "./pages/AdminPage";
import CategoryPages from "./pages/CategoryPages";
import useCartPrductStore from "./stores/useCartProductStore";
import "./App.css"; // <-- Custom CSS file
import CartPages from './pages/CartPages'
const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItem } = useCartPrductStore()

  useEffect(() => {
    checkAuth();
    getCartItem()
  }, [checkAuth]);

  useEffect(() => {
    getCartItem()
  }, [getCartItem])

  if (checkingAuth) return <LoadingSpinner />

  return (
    <div className="app-container">
      <div className="bg-gradient" />
      <div className="main-content">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPages />} />
          <Route path="/secret-dashboard" element={user ? <AdminPage /> : <Navigate to="/" />} />
          <Route path="/category/:category" element={<CategoryPages />} />
          <Route path="/cart" element={<CartPages />} />
          <Route path="*" element={<>404</>} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
