
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from './ui/AnimatedLogo';
import { motion } from 'framer-motion';
import { ArrowRight, Map, Clock, Hospital, Navigation, Brain } from 'lucide-react';
import { Button } from './ui/button';

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
      transition={{ duration: 0.7 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0c1e3e] to-[#4c2a85] p-6 overflow-hidden relative"
    >
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-[10%] left-[5%] text-white/5 transform"
          animate={{ 
            y: [0, 20, 0], 
            opacity: [0.3, 0.7, 0.3] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
        >
          <Hospital size={120} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-[15%] right-[7%] text-white/5 transform"
          animate={{ 
            y: [0, -20, 0], 
            opacity: [0.2, 0.5, 0.2] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
        >
          <Map size={150} />
        </motion.div>
        
        <motion.div 
          className="absolute top-[30%] right-[15%] text-white/5 transform"
          animate={{ 
            y: [0, 15, 0], 
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 7,
            ease: "easeInOut"
          }}
        >
          <Navigation size={80} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-[30%] left-[15%] text-white/5 transform"
          animate={{ 
            y: [0, -15, 0], 
            opacity: [0.1, 0.4, 0.1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 9,
            ease: "easeInOut"
          }}
        >
          <Clock size={100} />
        </motion.div>
        
        <motion.div 
          className="absolute top-[60%] left-[25%] text-white/5 transform"
          animate={{ 
            y: [0, 10, 0], 
            opacity: [0.2, 0.6, 0.2] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut"
          }}
        >
          <Brain size={70} />
        </motion.div>
      </div>
      
      <div className="w-full max-w-md flex flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            delay: 0.2,
            duration: 0.8 
          }}
          className="mb-8"
        >
          <AnimatedLogo size="xl" textSize="xl" showEmojis={true} darkMode={true} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4 text-white text-center"
        >
          <p className="text-xl font-medium text-cyan-300 drop-shadow-lg mb-2">
            Smart AI Ambulance Routing for Life-Saving Response! 🚀
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-cyan-100 text-sm backdrop-blur-sm border border-white/20">
              🚨 Emergency Response
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-cyan-100 text-sm backdrop-blur-sm border border-white/20">
              🗺️ Smart AI Routing
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-cyan-100 text-sm backdrop-blur-sm border border-white/20">
              🏥 Hospital Network
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-cyan-100 text-sm backdrop-blur-sm border border-white/20">
              ⏱️ Real-time Updates
            </span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-10 w-full"
        >
          <Button 
            onClick={handleGetStarted}
            className="w-full py-7 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(0,168,232,0.5)] hover:shadow-[0_0_25px_rgba(0,168,232,0.7)] group text-lg tracking-wide border border-cyan-400/30"
          >
            Get Started
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-12 text-sm text-cyan-100/80"
        >
          Powered by 🧠 AI Technology • Saving Lives Together ❤️
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
