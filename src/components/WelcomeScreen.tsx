
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from './ui/AnimatedLogo';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Map, Clock, Hospital, 
  Navigation, Brain, Heart, HeartPulse, Ambulance 
} from 'lucide-react';
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
      className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-[#0c1e3e] to-[#4c2a85] p-6 overflow-hidden relative"
    >
      
      {/* 🌟 Background animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { icon: <Hospital size={120} />, className: "top-[10%] left-[5%]", duration: 8 },
          { icon: <Map size={150} />, className: "bottom-[15%] right-[7%]", duration: 10 },
          { icon: <Navigation size={80} />, className: "top-[30%] right-[15%]", duration: 7 },
          { icon: <Clock size={100} />, className: "bottom-[30%] left-[15%]", duration: 9 },
          { icon: <Brain size={70} />, className: "top-[60%] left-[25%]", duration: 6 },
          { icon: <HeartPulse size={90} />, className: "top-[40%] right-[30%]", duration: 7 },
          { icon: <Heart size={60} />, className: "bottom-[20%] left-[35%]", duration: 8 },
        ].map((item, index) => (
          <motion.div 
            key={index}
            className={`absolute text-white/5 transform ${item.className}`}
            animate={{ y: [0, 20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: item.duration, ease: "easeInOut" }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* 🏥 Main Content */}
      <div className="w-full max-w-md flex flex-col items-center z-10">
        
        {/* 🚑 Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2, duration: 0.8 }}
          className="mb-2"
        >
          <AnimatedLogo size="lg" showText={false} />
        </motion.div>

        {/* 🌍 Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-0 text-white text-center"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide mb-3">
            <span className="flex items-center gap-2 justify-center">
              <span className="inline-block text-3xl">🚑</span> 
              <span className="text-white">RAPID</span> 
              <span className="inline-block text-3xl">🏥</span> 
              <span className="text-white">AID</span> 
              <span className="inline-block text-3xl">💓</span> 
              <span className="text-white">INNOVATORS</span> 
              <span className="inline-block text-3xl">🚀</span>
            </span>
          </h1>

          <p className="text-lg md:text-xl font-medium text-cyan-300 drop-shadow-lg mb-6 mt-2 px-2">
            Smart AI Ambulance Routing for Life-Saving Response! ⚡🚑
          </p>
        </motion.div>

        {/* 🚀 Get Started Button - Moved up below the title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-6 w-full"
        >
          <Button 
            onClick={handleGetStarted}
            className="w-full py-7 px-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 
            hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 text-white rounded-xl 
            font-bold transition-all duration-300 flex items-center justify-center gap-3 
            shadow-[0_4px_20px_rgba(0,168,232,0.5)] hover:shadow-[0_4px_25px_rgba(0,168,232,0.7)] 
            group text-xl tracking-wide border border-cyan-400/30"
          >
            Get Started
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* 🔥 What We Do Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full mb-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 shadow-lg"
        >
          <h2 className="text-xl font-bold text-cyan-300 mb-3 flex items-center justify-center gap-2">
            <span className="inline-block text-2xl">⏳</span> What We Do
          </h2>
          <ul className="text-left space-y-3 text-blue-100">
            <li className="flex items-start">
              <span className="inline-block text-xl mr-2">🗺️</span> 
              <span>AI-powered system finds the fastest routes for ambulances through traffic</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block text-xl mr-2">🏥</span> 
              <span>Real-time hospital bed availability tracking</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block text-xl mr-2">⏳</span> 
              <span>Helps save precious minutes during emergencies</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block text-xl mr-2">❤️</span> 
              <span>Every second counts when saving lives!</span>
            </li>
          </ul>
        </motion.div>

        {/* Removed Feature Tags as requested */}
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
