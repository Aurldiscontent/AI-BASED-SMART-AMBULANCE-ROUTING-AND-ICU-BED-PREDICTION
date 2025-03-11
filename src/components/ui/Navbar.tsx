
import React from 'react';
import { Home, Search, User, Settings, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const renderNavItem = (
    path: string, 
    label: string, 
    icon: React.ReactNode, 
    active: boolean
  ) => {
    return (
      <Link 
        to={path} 
        className={`flex flex-col items-center justify-center py-2 ${
          active ? 'text-medical-600 dark:text-medical-400' : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        <div className={`mb-0.5 transition-all duration-300 ${
          active ? 'scale-110' : 'scale-100'
        }`}>
          {icon}
        </div>
        <span className={`text-xs font-medium transition-all duration-300 ${
          active ? 'opacity-100' : 'opacity-80'
        }`}>
          {label}
        </span>
        <div className={`h-0.5 w-4 mt-1 rounded-full transition-all duration-300 ${
          active ? 'bg-medical-500 opacity-100' : 'bg-transparent opacity-0'
        }`} />
      </Link>
    );
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="glass-panel border-t border-gray-200 dark:border-gray-800 rounded-t-xl backdrop-blur-lg py-1 px-2">
        <div className="flex justify-around items-center">
          {renderNavItem('/home', 'Home', <Home size={22} />, isActive('/home'))}
          {renderNavItem('/search', 'Search', <Search size={22} />, isActive('/search'))}
          {renderNavItem('/profile', 'Profile', <User size={22} />, isActive('/profile'))}
          {renderNavItem('/settings', 'Settings', <Settings size={22} />, isActive('/settings'))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
