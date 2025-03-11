
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
  switch (size) {
    case 'sm': return 28;
    case 'md': return 38;
    case 'lg': return 54;
    case 'xl': return 70;
    default: return 38;
  }
};

const getTextClass = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  switch (size) {
    case 'sm': return 'text-lg';
    case 'md': return 'text-2xl';
    case 'lg': return 'text-3xl';
    case 'xl': return 'text-5xl';
    default: return 'text-2xl';
  }
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
      x: [-20, 20],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut"
        }
      }
    }
  };

  const glowVariants = {
    animate: {
      opacity: [0.4, 0.7, 0.4],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const emojiVariants = {
    animate: {
      y: [0, -5, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div 
        variants={iconVariants}
        animate="animate"
        className="relative"
      >
        <motion.div 
          className="absolute inset-0 blur-lg opacity-40 scale-110"
          variants={glowVariants}
          animate="animate"
        >
          <Ambulance 
            size={getIconSize(size)} 
            className={darkMode ? "text-cyan-300" : "text-medical-500"} 
          />
        </motion.div>
        <Ambulance 
          size={getIconSize(size)} 
          className={`${darkMode ? "text-cyan-300" : "text-medical-500"} drop-shadow-lg`} 
        />
      </motion.div>
      
      {showText && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`mt-1 font-bold tracking-tight ${getTextClass(textSize)} ${
            darkMode 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200 drop-shadow-[0_0_5px_rgba(0,200,255,0.3)]" 
              : "text-medical-800"
          }`}
        >
          {showEmojis ? (
            <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-2 px-2">
              <motion.div
                variants={emojiVariants}
                animate="animate"
                className="emoji-container"
              >
                <span className="emoji">🚑</span>
              </motion.div>
              <span className="inline-flex font-extrabold">RAPID</span>
              <motion.div
                variants={emojiVariants}
                animate="animate"
                className="emoji-container"
              >
                <span className="emoji">🏥</span>
              </motion.div>
              <span className="inline-flex font-extrabold">AID</span>
              <motion.div
                variants={emojiVariants}
                animate="animate" 
                className="emoji-container"
              >
                <span className="emoji">💓</span>
              </motion.div>
              <span className="inline-flex font-extrabold">INNOVATORS</span>
              <motion.div
                variants={emojiVariants}
                animate="animate"
                className="emoji-container"
              >
                <span className="emoji">🚀</span>
              </motion.div>
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
