
import React from 'react';
import HomePage from '@/components/HomePage';
import { useTheme } from '@/hooks/use-theme';

const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-b from-blue-50 via-white to-blue-50 text-gray-900'
    } transition-colors duration-300`}>
      <HomePage />
    </div>
  );
};

export default Home;
