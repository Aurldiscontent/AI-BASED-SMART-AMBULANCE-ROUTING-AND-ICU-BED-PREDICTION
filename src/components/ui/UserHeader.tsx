
import React, { useState } from 'react';
import { Bell, MapPin, Settings, LogOut, User, HelpCircle } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

interface UserHeaderProps {
  user: {
    name: string;
    avatar?: string | null;
    location?: string;
    role?: string;
  };
}

const UserHeader: React.FC<UserHeaderProps> = ({ user }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="mr-3 hidden md:flex">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-medical-400 to-medical-600 dark:from-medical-300 dark:to-medical-500">
            AI Smart Ambulance Routing
          </span>
        </div>
        <div className="md:hidden text-xl font-bold text-medical-500 dark:text-medical-400">
          AI-SAR
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <ThemeSwitcher />
        
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-1"
          >
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 rounded-full object-cover border-2 border-medical-200 dark:border-medical-700"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-medical-400 to-medical-600 dark:from-medical-500 dark:to-medical-700 flex items-center justify-center text-white font-medium">
                {getInitials(user.name)}
              </div>
            )}
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.role || "Emergency Responder"}</p>
            </div>
          </button>
          
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-1 z-20 border border-gray-200 dark:border-gray-700"
              >
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{user.name}</p>
                  {user.location && (
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <MapPin size={10} className="mr-1" />
                      {user.location}
                    </div>
                  )}
                </div>
                <ul>
                  <li>
                    <a href="#profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <User size={16} className="mr-2" />
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#help" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <HelpCircle size={16} className="mr-2" />
                      Help & Support
                    </a>
                  </li>
                  <li className="border-t border-gray-200 dark:border-gray-700">
                    <a href="#logout" className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
