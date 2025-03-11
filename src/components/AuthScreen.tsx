
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle, 
  Shield, KeyRound, UserPlus, Ambulance 
} from 'lucide-react';
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
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0c1e3e] to-[#4c2a85] py-8 px-6 relative overflow-hidden">
      
      {/* 🌟 Background Animations */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mb-8"
      >
        <AnimatedLogo size="md" showEmojis={true} darkMode={true} />
      </motion.div>

      {/* 🚑 RAPID 🏥 AID 💓 INNOVATORS 🚀 (VISIBLE TITLE) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide text-white flex items-center justify-center gap-2">
          <span className="inline-block text-3xl">🚑</span> RAPID 
          <span className="inline-block text-3xl">🏥</span> AID 
          <span className="inline-block text-3xl">💓</span> INNOVATORS 
          <span className="inline-block text-3xl">🚀</span>
        </h1>
        <p className="text-lg md:text-xl font-medium text-cyan-300 drop-shadow-lg mt-2 px-2">
          Smart AI Ambulance Routing for Life-Saving Response! ⚡🚑
        </p>
      </motion.div>

      {/* 🔐 Authentication Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-7 max-w-md w-full mx-auto shadow-lg"
      >
        <motion.div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">
            {isSignup ? (
              <>
                <UserPlus size={20} className="inline text-blue-300" /> Create an Account 🚀
              </>
            ) : (
              <>
                <KeyRound size={20} className="inline text-blue-300" /> Welcome Back 🔑
              </>
            )}
          </h1>
          <p className="text-blue-100 mt-2">
            {isSignup ? (
              <>Sign up to access emergency services 🚑</>
            ) : (
              <>Sign in to continue to your account 🔐</>
            )}
          </p>
        </motion.div>

        {/* 📋 Form */}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <motion.div className="mb-4">
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="👤 Full Name" 
                className="w-full bg-white/20 text-white placeholder-blue-100 border border-white/30 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" 
              />
            </motion.div>
          )}

          <motion.div className="mb-4">
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="📧 Email Address" 
              className="w-full bg-white/20 text-white placeholder-blue-100 border border-white/30 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" 
            />
          </motion.div>

          {isSignup && (
            <motion.div className="mb-4">
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="📞 Phone Number" 
                className="w-full bg-white/20 text-white placeholder-blue-100 border border-white/30 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" 
              />
            </motion.div>
          )}

          <motion.div className="mb-4">
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="🔒 Password" 
              className="w-full bg-white/20 text-white placeholder-blue-100 border border-white/30 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" 
            />
          </motion.div>

          {isSignup && (
            <motion.div className="mb-4">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                placeholder="🔄 Confirm Password" 
                className="w-full bg-white/20 text-white placeholder-blue-100 border border-white/30 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" 
              />
            </motion.div>
          )}

          {/* 🎯 Sign In / Sign Up Button */}
          <motion.div className="mb-4">
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
            >
              {isSignup ? "🚀 Create Account" : "🔑 Sign In"}
            </button>
          </motion.div>

          {/* 🌐 Google Login */}
          <motion.div className="mb-6">
            <button 
              type="button" 
              className="w-full bg-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-red-600 transition-all duration-300"
            >
              🌍 Continue with Google
            </button>
          </motion.div>

          {/* 🔄 Toggle Signup/Login */}
          <motion.div className="text-center">
            <p className="text-sm text-blue-100">
              {isSignup ? "Already have an account?" : "Don't have an account yet?"} 
              <button 
                type="button" 
                onClick={() => setIsSignup(!isSignup)} 
                className="text-cyan-300 ml-1 hover:underline focus:outline-none"
              >
                {isSignup ? "Sign In" : "Sign Up"} 🚀
              </button>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthScreen;
