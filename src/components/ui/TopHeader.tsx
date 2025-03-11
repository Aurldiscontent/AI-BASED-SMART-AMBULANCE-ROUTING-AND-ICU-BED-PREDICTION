
import React, { useState } from 'react';
import { User, Bell, Settings, Upload, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TopHeader: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userName = localStorage.getItem('userName') || 'User';
  const userRole = localStorage.getItem('userRole') || 'First Responder';
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  return (
    <div className="px-4 py-3 flex justify-between items-center relative">
      <h1 className="text-xl font-bold text-medical-600 dark:text-medical-400">MedResponse</h1>
      
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Bell size={20} />
        </button>
        
        <div className="relative">
          <div 
            onClick={toggleDropdown}
            className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="w-8 h-8 rounded-full bg-medical-500 flex items-center justify-center text-white font-semibold">
              {userName.charAt(0)}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
            <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </div>
          
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-medium">{userName}</p>
                  <p className="text-xs text-gray-500">{userRole}</p>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                    <User size={16} />
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                    <Upload size={16} />
                    Upload Dataset
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                    <Settings size={16} />
                    Settings
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
