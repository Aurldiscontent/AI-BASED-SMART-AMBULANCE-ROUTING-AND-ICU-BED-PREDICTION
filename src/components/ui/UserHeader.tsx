
import React from 'react';
import { Bell, User, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';

interface UserHeaderProps {
  user: {
    name: string;
    email: string;
    avatar: string | null;
    location: string;
    role: string;
  };
  onProfileClick?: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ user, onProfileClick }) => {
  const { theme, setTheme } = useTheme();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="relative"
          onClick={onProfileClick}
        >
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover cursor-pointer" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-medical-500 flex items-center justify-center text-white font-semibold cursor-pointer">
              {getInitials(user.name)}
            </div>
          )}
        </motion.div>
        <div className="hidden sm:block">
          <p className="font-medium text-gray-800 dark:text-gray-200">{user.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{user.role} • {user.location}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <motion.button 
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
        
        <motion.button 
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </motion.button>
        
        <motion.button 
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onProfileClick}
        >
          <User size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default UserHeader;
