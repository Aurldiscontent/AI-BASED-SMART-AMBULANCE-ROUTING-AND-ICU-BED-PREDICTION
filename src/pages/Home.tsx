
import React from 'react';
import HomePage from '@/components/HomePage';
import { useTheme } from '@/hooks/use-theme';

const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-b from-blue-50 to-white text-gray-900'
    } transition-colors duration-300`}>
      <HomePage />
    </div>
  );
};

export default Home;
