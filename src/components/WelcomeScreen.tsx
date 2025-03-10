
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from './ui/AnimatedLogo';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };
  
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
          className="mb-6"
        >
          <AnimatedLogo size="lg" textSize="lg" showEmojis={true} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4 text-gray-600 text-center"
        >
          <p className="text-lg font-medium">Smart Ambulance Routing System</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-medical-100 text-medical-800 text-sm">
              🚨 Emergency Response
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-medical-100 text-medical-800 text-sm">
              🗺️ Smart Routing
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-medical-100 text-medical-800 text-sm">
              🏥 Hospital Network
            </span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-10 w-full max-w-xs"
        >
          <button 
            onClick={handleGetStarted}
            className="w-full py-3 px-6 bg-medical-500 hover:bg-medical-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group"
          >
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-12 text-sm text-gray-500"
        >
          Optimizing emergency response times with AI
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
