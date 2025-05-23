import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, UserPlus, Loader } from "lucide-react";
import '../pages.CssFile/LoginPages.css';
import useUserStore from "../stores/useUserStore";

const LoginPages = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { Login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    Login(formData);
  };

  return (
    <div className="login-page">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="card"
      >
        <div className="text-center mb-8">
          <h2>Login to your account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 flex flex-col items-center w-full">
          {/* Email */}
          <div className="form-group">
            <div className="input-container">
              <div className="icon">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <div className="input-container">
              <div className="icon">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-5 w-5" />
                Login
              </>
            )}
          </button>
        </form>

        <div className="footer-text">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPages;
