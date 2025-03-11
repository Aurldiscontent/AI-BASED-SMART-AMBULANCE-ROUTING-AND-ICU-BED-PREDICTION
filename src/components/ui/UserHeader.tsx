
import React from 'react';
import { Bell, MapPin } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

interface UserHeaderProps {
  user: {
    name: string;
    avatar?: string | null;
    location?: string;
  };
}

const UserHeader: React.FC<UserHeaderProps> = ({ user }) => {
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
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-10 h-10 rounded-full object-cover border-2 border-medical-200 dark:border-medical-700"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center text-white font-medium">
            {getInitials(user.name)}
          </div>
        )}
        <div className="ml-3 text-left">
          <p className="text-base font-medium text-gray-800 dark:text-gray-200">Hello, {user.name.split(' ')[0]}!</p>
          {user.location && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <MapPin size={12} className="mr-1" />
              {user.location}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <ThemeSwitcher />
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </div>
  );
};

export default UserHeader;
