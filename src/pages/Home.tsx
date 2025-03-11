
import React from 'react';
import HomePage from '@/components/HomePage';
import { useTheme } from '@/hooks/use-theme';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { motion } from 'framer-motion';
import UserProfileBar from '@/components/ui/UserProfileBar';

const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-b from-blue-50 via-white to-blue-50 text-gray-900'
    } transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-2">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <UserProfileBar />
        </motion.div>
      </div>
      <HomePage />
      <div className="fixed top-5 right-5 z-50">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Home;
