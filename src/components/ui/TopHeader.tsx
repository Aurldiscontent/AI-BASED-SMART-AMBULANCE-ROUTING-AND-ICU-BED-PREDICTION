
import React, { useState } from 'react';
import { User, Bell, Settings, Upload, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const TopHeader: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { toast } = useToast();
  const userName = "SREEJITH S, 3rd YEAR STUDENT";
  const userRole = localStorage.getItem('userRole') || 'First Responder';
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (showNotifications) setShowNotifications(false);
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showDropdown) setShowDropdown(false);
  };
  
  const handleNotificationClick = (id: string) => {
    toast({
      title: "Notification acknowledged",
      description: "You have marked this notification as read",
    });
    // In a real app, you would update the notification status in your state/database
  };
  
  // Mock notifications
  const notifications = [
    { id: '1', title: 'Emergency Alert', message: 'New critical patient en route to City General', time: '5 min ago', isNew: true },
    { id: '2', title: 'Traffic Update', message: 'Heavy traffic on Koramangala Main Road', time: '15 min ago', isNew: true },
    { id: '3', title: 'System Update', message: 'MedResponse app has been updated to v2.3', time: '1 hour ago', isNew: false },
  ];
  
  return (
    <div className="px-4 py-3 flex justify-between items-center relative">
      <h1 className="text-xl font-bold text-medical-600 dark:text-medical-400">MedResponse</h1>
      
      <div className="flex items-center gap-2">
        <button 
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
          onClick={toggleNotifications}
        >
          <Bell size={20} />
          {notifications.some(n => n.isNew) && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>
        
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700"
            >
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <p className="font-medium">Notifications</p>
                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={toggleNotifications}>
                  <X size={16} />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No notifications
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${notification.isNew ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                      {notification.isNew && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded text-xs">New</span>
                      )}
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full text-center text-sm text-medical-600 dark:text-medical-400 hover:underline p-1">
                  View all notifications
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
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
                  <p className="font-medium text-sm">{userName}</p>
                  <p className="text-xs text-gray-500">{userRole}</p>
                </div>
                <div className="py-1">
                  <Link to="/profile" className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                    <User size={16} />
                    Profile
                  </Link>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    onClick={() => {
                      document.getElementById('data-upload-trigger')?.click();
                      setShowDropdown(false);
                    }}
                  >
                    <Upload size={16} />
                    Upload Dataset
                  </button>
                  <Link to="/settings" className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                    <Settings size={16} />
                    Settings
                  </Link>
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
