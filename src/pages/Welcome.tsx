
import React from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import { motion } from 'framer-motion';

const Welcome = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WelcomeScreen />
    </motion.div>
  );
};

export default Welcome;
