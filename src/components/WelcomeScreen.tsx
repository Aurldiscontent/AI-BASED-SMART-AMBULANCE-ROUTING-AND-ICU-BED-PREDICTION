
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from './ui/AnimatedLogo';
import { motion } from 'framer-motion';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6"
    >
      <div className="w-full max-w-md flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            delay: 0.2,
            duration: 0.6 
          }}
        >
          <AnimatedLogo size="lg" textSize="lg" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-gray-600 text-center"
        >
          <p className="text-lg">Smart Ambulance Routing System</p>
          <p className="mt-2 text-sm text-gray-500">Optimizing emergency response times</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-medical-300 animate-pulse" style={{ animationDelay: "0ms" }}></span>
            <span className="h-2 w-2 rounded-full bg-medical-400 animate-pulse" style={{ animationDelay: "300ms" }}></span>
            <span className="h-2 w-2 rounded-full bg-medical-500 animate-pulse" style={{ animationDelay: "600ms" }}></span>
          </div>
          <p className="mt-3 text-sm text-gray-500">Loading resources...</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
