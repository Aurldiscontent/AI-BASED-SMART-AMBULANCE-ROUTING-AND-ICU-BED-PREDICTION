
import React, { useEffect, useState } from 'react';
import { Ambulance } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
  darkMode?: boolean;
  showEmojis?: boolean;
}

const getIconSize = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  const sizes = { sm: 28, md: 38, lg: 54, xl: 70 };
  return sizes[size] || 38;
};

const getTextClass = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl', xl: 'text-6xl' };
  return sizes[size] || 'text-2xl';
};

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  textSize = 'md',
  darkMode = false,
  showEmojis = false
}) => {
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const iconVariants = {
    animate: {
      x: [-15, 15],
      transition: {
        x: { repeat: Infinity, repeatType: "reverse", duration: 1.8, ease: "easeInOut" }
      }
    }
  };

  const glowVariants = {
    animate: {
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.1, 1],
      transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const emojiVariants = {
    animate: {
      y: [0, -6, 0],
      scale: [1, 1.15, 1],
      transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <motion.div variants={iconVariants} animate="animate" className="relative">
        <motion.div 
          className="absolute inset-0 blur-xl opacity-50 scale-125"
          variants={glowVariants} animate="animate"
        >
          <Ambulance size={getIconSize(size)} className={darkMode ? "text-cyan-400" : "text-red-500"} />
        </motion.div>
        <Ambulance 
          size={getIconSize(size)} 
          className={`${darkMode ? "text-cyan-400" : "text-red-500"} drop-shadow-xl`} 
        />
      </motion.div>
      
      {showText && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`mt-2 font-extrabold tracking-wide ${getTextClass(textSize)} ${
            darkMode 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 drop-shadow-lg" 
              : "text-gray-800"
          }`}
        >
          {showEmojis ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="emoji-simple">🚑</span>
              <span className="inline-flex font-extrabold">RAPID</span>
              <span className="emoji-simple">🏥</span>
              <span className="inline-flex font-extrabold">AID</span>
              <span className="emoji-simple">💓</span>
              <span className="inline-flex font-extrabold">INNOVATORS</span>
              <span className="emoji-simple">🚀</span>
            </div>
          ) : (
            "RAPID AID INNOVATORS"
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedLogo;
