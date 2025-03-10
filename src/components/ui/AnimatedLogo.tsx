
import React, { useEffect, useState } from 'react';
import { Ambulance } from 'lucide-react';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
  darkMode?: boolean;
  showEmojis?: boolean;
}

const getIconSize = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  switch (size) {
    case 'sm': return 24;
    case 'md': return 32;
    case 'lg': return 48;
    case 'xl': return 64;
    default: return 32;
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

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${isAnimating ? 'animate-ambulance-move' : 'transition-transform duration-300'}`}>
        <div className="absolute inset-0 blur-md opacity-20 scale-75 translate-y-1">
          <Ambulance size={getIconSize(size)} className={darkMode ? "text-white" : "text-medical-600"} />
        </div>
        <Ambulance 
          size={getIconSize(size)} 
          className={`${darkMode ? "text-white" : "text-medical-500"} drop-shadow-md`} 
        />
      </div>
      
      {showText && (
        <div className={`mt-3 font-bold tracking-tight ${getTextClass(textSize)} ${darkMode ? "text-white" : "text-medical-800"}`}>
          {showEmojis ? (
            <span className="flex items-center justify-center gap-1">
              <span>🚑</span> RAPID AID INNOVATORS <span>🏥</span>
            </span>
          ) : (
            "RAPID AID INNOVATORS"
          )}
        </div>
      )}
    </div>
  );
};

export default AnimatedLogo;
