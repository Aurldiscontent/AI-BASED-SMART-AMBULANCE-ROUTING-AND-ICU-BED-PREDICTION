
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import ActionButton from './ui/ActionButton';
import AnimatedLogo from './ui/AnimatedLogo';

const AuthScreen: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
  
  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // For demonstration, just navigate to home
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white py-8 px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mb-8"
      >
        <AnimatedLogo size="md" />
      </motion.div>
      
      <motion.div
        variants={formContainerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card rounded-2xl p-6 max-w-md w-full mx-auto"
      >
        <motion.div variants={formItemVariants} className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {isSignup ? 'Create an Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isSignup 
              ? 'Sign up to access emergency services' 
              : 'Sign in to continue to your account'}
          </p>
        </motion.div>
        
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <motion.div variants={formItemVariants} className="mb-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`input-field w-full pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.fullName && (
                <div className="mt-1 flex items-center text-xs text-red-500">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.fullName}
                </div>
              )}
            </motion.div>
          )}
          
          <motion.div variants={formItemVariants} className="mb-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`input-field w-full pl-10 ${errors.email ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.email && (
              <div className="mt-1 flex items-center text-xs text-red-500">
                <AlertCircle size={12} className="mr-1" />
                {errors.email}
              </div>
            )}
          </motion.div>
          
          {isSignup && (
            <motion.div variants={formItemVariants} className="mb-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={`input-field w-full pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.phone && (
                <div className="mt-1 flex items-center text-xs text-red-500">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.phone}
                </div>
              )}
            </motion.div>
          )}
          
          <motion.div variants={formItemVariants} className="mb-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`input-field w-full pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <div className="mt-1 flex items-center text-xs text-red-500">
                <AlertCircle size={12} className="mr-1" />
                {errors.password}
              </div>
            )}
          </motion.div>
          
          {isSignup && (
            <motion.div variants={formItemVariants} className="mb-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`input-field w-full pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.confirmPassword && (
                <div className="mt-1 flex items-center text-xs text-red-500">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.confirmPassword}
                </div>
              )}
            </motion.div>
          )}
          
          {!isSignup && (
            <motion.div variants={formItemVariants} className="mb-4 text-right">
              <button type="button" className="text-sm text-medical-600 hover:text-medical-700">
                Forgot Password?
              </button>
            </motion.div>
          )}
          
          {isSignup && (
            <motion.div variants={formItemVariants} className="mb-4 flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 mr-2"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-medical-600 hover:text-medical-700">Terms of Service</a> and <a href="#" className="text-medical-600 hover:text-medical-700">Privacy Policy</a>
              </label>
            </motion.div>
          )}
          
          <motion.div variants={formItemVariants} className="mb-4">
            <ActionButton
              type="submit"
              variant="medical"
              fullWidth
              size="lg"
            >
              {isSignup ? 'Create Account' : 'Sign In'}
            </ActionButton>
          </motion.div>
          
          <motion.div variants={formItemVariants} className="mb-4 text-center">
            <div className="flex items-center justify-center">
              <div className="flex-grow h-px bg-gray-300"></div>
              <div className="mx-4 text-sm text-gray-500">or continue with</div>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
          </motion.div>
          
          <motion.div variants={formItemVariants} className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="flex-1 py-2.5 px-4 border border-gray-300 rounded-xl flex justify-center items-center bg-white hover:bg-gray-50 transition-colors"
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
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('apple')}
              className="flex-1 py-2.5 px-4 border border-gray-300 rounded-xl flex justify-center items-center bg-white hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 7c-3 0-4 3-4 5.5 0 3 2 7.5 4 7.5 1.088-.046 1.679-.5 3-.5 1.312 0 1.5.5 3 .5s4-3 4-5-3-2-3-2c0-2-2-3-3-3s-1.5 1-3 1z"/>
                <path d="M12 4a2 2 0 00-2 2c0 .823.443 1.576 1.177 1.885C11.432 8.157 11.716 8.2 12 8.2c.284 0 .568-.043.823-.315A1.995 1.995 0 0014 6a2 2 0 00-2-2z"/>
              </svg>
              Apple
            </button>
          </motion.div>
          
          <motion.div variants={formItemVariants} className="text-center">
            <p className="text-sm text-gray-600">
              {isSignup 
                ? 'Already have an account?' 
                : "Don't have an account yet?"
              }
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="ml-1 text-medical-600 hover:text-medical-700 font-medium"
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthScreen;
