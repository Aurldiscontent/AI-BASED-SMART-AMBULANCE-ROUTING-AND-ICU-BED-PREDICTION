
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import ActionButton from './ui/ActionButton';
import AnimatedLogo from './ui/AnimatedLogo';

const AuthScreen: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (isSignup) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // For demonstration, just navigate to home
      navigate('/home');
    }
  };
  
  const handleGoogleLogin = () => {
    // For demonstration, just navigate to home
    console.log('Google login clicked');
    navigate('/home');
  };
  
  const formContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const formItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0c1e3e] to-[#4c2a85] py-8 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiAvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz48L3N2Zz4=')]"></div>
        
        <motion.div 
          className="absolute top-1/4 -right-16 w-32 h-32 rounded-full bg-cyan-600/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 -left-20 w-40 h-40 rounded-full bg-purple-600/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mb-8"
      >
        <AnimatedLogo size="md" showEmojis={true} darkMode={true} />
      </motion.div>
      
      <motion.div
        variants={formContainerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-7 max-w-md w-full mx-auto shadow-[0_10px_25px_rgba(0,0,0,0.2)]"
      >
        <motion.div variants={formItemVariants} className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">
            {isSignup ? '✨ Create an Account' : '👋 Welcome Back'}
          </h1>
          <p className="text-blue-100 mt-2">
            {isSignup 
              ? 'Sign up to access emergency services 🚑' 
              : 'Sign in to continue to your account 🔐'}
          </p>
        </motion.div>
        
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <motion.div variants={formItemVariants} className="mb-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${errors.fullName ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-blue-200/70 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all`}
                />
              </div>
              {errors.fullName && (
                <div className="mt-1 flex items-center text-xs text-red-300">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.fullName}
                </div>
              )}
            </motion.div>
          )}
          
          <motion.div variants={formItemVariants} className="mb-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${errors.email ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-blue-200/70 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all`}
              />
            </div>
            {errors.email && (
              <div className="mt-1 flex items-center text-xs text-red-300">
                <AlertCircle size={12} className="mr-1" />
                {errors.email}
              </div>
            )}
          </motion.div>
          
          {isSignup && (
            <motion.div variants={formItemVariants} className="mb-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${errors.phone ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-blue-200/70 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all`}
                />
              </div>
              {errors.phone && (
                <div className="mt-1 flex items-center text-xs text-red-300">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.phone}
                </div>
              )}
            </motion.div>
          )}
          
          <motion.div variants={formItemVariants} className="mb-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-3 bg-white/5 border ${errors.password ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-blue-200/70 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-cyan-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <div className="mt-1 flex items-center text-xs text-red-300">
                <AlertCircle size={12} className="mr-1" />
                {errors.password}
              </div>
            )}
          </motion.div>
          
          {isSignup && (
            <motion.div variants={formItemVariants} className="mb-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${errors.confirmPassword ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-blue-200/70 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all`}
                />
              </div>
              {errors.confirmPassword && (
                <div className="mt-1 flex items-center text-xs text-red-300">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.confirmPassword}
                </div>
              )}
            </motion.div>
          )}
          
          {!isSignup && (
            <motion.div variants={formItemVariants} className="mb-4 flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2 h-4 w-4 text-cyan-500 focus:ring-cyan-400 border-white/30 rounded bg-white/5"
                />
                <label htmlFor="rememberMe" className="text-sm text-blue-100">
                  Remember me 🔒
                </label>
              </div>
              <button type="button" className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors">
                Forgot Password? 🤔
              </button>
            </motion.div>
          )}
          
          {isSignup && (
            <motion.div variants={formItemVariants} className="mb-4 flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 mr-2 h-4 w-4 text-cyan-500 focus:ring-cyan-400 border-white/30 rounded bg-white/5"
              />
              <label htmlFor="terms" className="text-sm text-blue-100">
                I agree to the <a href="#" className="text-cyan-300 hover:text-cyan-200 transition-colors">Terms of Service</a> and <a href="#" className="text-cyan-300 hover:text-cyan-200 transition-colors">Privacy Policy</a> 📝
              </label>
            </motion.div>
          )}
          
          <motion.div variants={formItemVariants} className="mb-4">
            <button
              type="submit"
              className={`w-full py-3 px-6 ${isSignup ? 'bg-gradient-to-r from-purple-600 to-violet-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'} text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl`}
            >
              {isSignup ? '✨ Create Account' : '🔐 Sign In'}
            </button>
          </motion.div>
          
          <motion.div variants={formItemVariants} className="mb-4 text-center">
            <div className="flex items-center justify-center">
              <div className="flex-grow h-px bg-white/20"></div>
              <div className="mx-4 text-sm text-blue-200">or continue with</div>
              <div className="flex-grow h-px bg-white/20"></div>
            </div>
          </motion.div>
          
          <motion.div variants={formItemVariants} className="mb-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 border border-white/20 rounded-xl flex justify-center items-center bg-white/10 hover:bg-white/15 transition-colors text-white"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M21.8,12.1c0-0.7-0.1-1.3-0.2-2H12v3.8h5.5c-0.2,1.2-1,2.3-2.1,3v2.5h3.4C20.7,17.8,21.8,15.2,21.8,12.1z"
                />
                <path
                  fill="#34A853"
                  d="M12,22c2.9,0,5.3-0.9,7-2.6l-3.4-2.5c-0.9,0.6-2.1,1-3.6,1c-2.8,0-5.1-1.9-6-4.4H2.5v2.6C4.1,19.9,7.8,22,12,22z"
                />
                <path
                  fill="#FBBC05"
                  d="M6,13.5c-0.2-0.6-0.3-1.3-0.3-2s0.1-1.4,0.3-2V7H2.5C1.9,8.5,1.5,10.2,1.5,12s0.4,3.5,1,5L6,13.5z"
                />
                <path
                  fill="#EA4335"
                  d="M12,5.6c1.6,0,3,0.5,4.1,1.6l3-3c-1.9-1.7-4.3-2.8-7.1-2.8c-4.2,0-7.9,2.1-9.5,5.8l3.5,2.6C7,7.4,9.3,5.6,12,5.6z"
                />
              </svg>
              Continue with Google 🌐
            </button>
          </motion.div>
          
          <motion.div variants={formItemVariants} className="text-center">
            <p className="text-sm text-blue-100">
              {isSignup 
                ? 'Already have an account? 🤔' 
                : "Don't have an account yet? 🤔"
              }
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="ml-1 text-cyan-300 hover:text-cyan-200 transition-colors font-medium"
              >
                {isSignup ? 'Sign In' : 'Sign Up'} ✨
              </button>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthScreen;
