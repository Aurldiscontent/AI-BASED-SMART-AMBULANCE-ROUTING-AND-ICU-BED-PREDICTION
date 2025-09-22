import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
} from "lucide-react";

// ✅ Corrected image imports
import AmbulanceImage from "../assets/ambulance-image.jpg";
import ICUImage from "../assets/icu-image.jpg";

const AuthScreen: React.FC = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const passwordRules = {
    length: formData.password.length >= 8,
    number: /\d/.test(formData.password),
    symbol: /[!@#$%^&*]/.test(formData.password),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      if (!passwordRules.length || !passwordRules.number || !passwordRules.symbol) {
        setErrors({ password: "Password does not meet all requirements" });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" });
        return;
      }
    }
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row-reverse items-center justify-center px-6 py-10 
      bg-gradient-to-br from-[#0B162C] via-[#15294d] to-[#1E3A5F]"
    >
      {/* Right Panel: Auth Form */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 max-w-lg bg-[#10213a]/90 backdrop-blur-lg 
        rounded-2xl shadow-2xl p-10 relative z-10 border border-blue-900/30 flex flex-col justify-center"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-blue-100 flex items-center justify-center gap-2 mt-2">
            {/* 🚫 Removed Ambulance icon */}
            {isSignup ? "CREATE ACCOUNT" : "WELCOME BACK"}
            <ShieldCheck size={22} className="text-blue-400" />
          </h2>
          <p className="text-blue-200 mt-2 text-base">
            {isSignup
              ? "Sign up to manage emergency assistance efficiently"
              : "Sign in to continue"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-blue-400" size={18} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 border border-blue-800 rounded-xl px-4 py-3 
                bg-blue-950/40 text-blue-100 placeholder-blue-400 
                focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-blue-400" size={18} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 border border-blue-800 rounded-xl px-4 py-3 
              bg-blue-950/40 text-blue-100 placeholder-blue-400 
              focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-blue-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 border border-blue-800 rounded-xl px-4 py-3 
              bg-blue-950/40 text-blue-100 placeholder-blue-400 
              focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-blue-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {isSignup && (
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-blue-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full pl-10 border border-blue-800 rounded-xl px-4 py-3 
                bg-blue-950/40 text-blue-100 placeholder-blue-400 
                focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          )}

          {isSignup && (
            <ul className="text-sm text-blue-300 space-y-1">
              <li className={passwordRules.length ? "text-green-400" : "text-red-400"}>
                • At least 8 characters
              </li>
              <li className={passwordRules.number ? "text-green-400" : "text-red-400"}>
                • Contains a number
              </li>
              <li className={passwordRules.symbol ? "text-green-400" : "text-red-400"}>
                • Contains a special symbol
              </li>
            </ul>
          )}

          {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 
            text-white font-semibold py-3 rounded-xl shadow-lg 
            hover:from-blue-500 hover:to-indigo-400 transition-all duration-200"
          >
            {isSignup ? "Create Account" : "Sign In"}
          </button>

          <p className="text-center text-sm text-blue-300 mt-4">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-400 hover:underline font-medium"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </form>
      </motion.div>

      {/* Left Panel: Only Images + Title */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 px-6"
      >
        <h1 className="text-5xl font-extrabold text-blue-100 uppercase mb-6 tracking-wide text-center leading-tight">
          🚑 RAPID AID INNOVATORS
        </h1>

        <div className="flex gap-4 w-full">
          <img
            src={AmbulanceImage}
            alt="Ambulance"
            className="w-1/2 h-[400px] rounded-2xl shadow-lg object-cover"
          />
          <img
            src={ICUImage}
            alt="ICU"
            className="w-1/2 h-[400px] rounded-2xl shadow-lg object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthScreen;
