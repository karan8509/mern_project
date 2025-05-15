import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, UserPlus, Loader,  } from "lucide-react";
import '../pages.CssFile/SignUpPage.css'; // Import the external CSS file
import {Link} from "react-router-dom"
import useUserStore from "../stores/useUserStore"
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

const {SignUp , loading} = useUserStore();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("called here")
    SignUp(formData)
    
  };

  return (
    <div className="sign-up-page">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="card"
      >
        <div className="text-center mb-8">
          <h2>Create your account</h2>
          {/* <p>Join our community today</p> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 flex flex-col items-center w-full">
          {/* Full Name */}
          <div className="form-group">
            {/* <label>Full Name</label> */}
            <div className="input-container">
              <div className="icon">
                <User className="h-5 w-5" />
              </div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            {/* <label>Email Address</label> */}
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
            {/* <label>Password</label> */}
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

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-container">
              <div className="icon">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-5 w-5" />
                Sign Up
              </>
            )}
          </button>
        </form>

        <div className="footer-text">
          <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
