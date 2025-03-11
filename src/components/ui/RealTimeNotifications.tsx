
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Bell, AlertCircle, Info, Clock, X, Volume2, VolumeX } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: Date;
}

interface RealTimeNotificationsProps {
  patientLocation?: string;
  selectedHospitalId?: string | null;
}

const RealTimeNotifications: React.FC<RealTimeNotificationsProps> = ({
  patientLocation,
  selectedHospitalId
}) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [expanded, setExpanded] = useState(false);
  
  // Mock hospital names for notifications
  const hospitalNames = [
    "Manipal Hospital", "Apollo Hospital", "Fortis Hospital", "Sakra World Hospital", 
    "Columbia Asia", "Narayana Hrudayalaya", "St. John's Medical College Hospital",
    "Baptist Hospital", "Aster CMI Hospital", "Sparsh Hospital"
  ];
  
  // Mock notification generators
  const generateRandomNotification = (): Notification => {
    const types: Array<'info' | 'warning' | 'critical'> = ['info', 'warning', 'critical'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomHospital = hospitalNames[Math.floor(Math.random() * hospitalNames.length)];
    
    let message = '';
    
    if (randomType === 'info') {
      const infoMessages = [
        `New ICU bed available at ${randomHospital}`,
        `${randomHospital} emergency room wait time decreased to ${Math.floor(Math.random() * 20) + 5} minutes`,
        `Air ambulance now available for dispatch near your location`,
        `Road cleared on route to ${randomHospital}`,
        `${randomHospital} added new trauma specialist on duty`
      ];
      message = infoMessages[Math.floor(Math.random() * infoMessages.length)];
    } else if (randomType === 'warning') {
      const warningMessages = [
        `Moderate traffic on route to ${randomHospital}`,
        `${randomHospital} reporting higher than usual patient load`,
        `Weather alert: Visibility reduced on major roads`,
        `${randomHospital} ICU beds filling quickly (${Math.floor(Math.random() * 3) + 1} remaining)`,
        `Ambulance delayed by ${Math.floor(Math.random() * 10) + 5} minutes due to traffic`
      ];
      message = warningMessages[Math.floor(Math.random() * warningMessages.length)];
    } else {
      const criticalMessages = [
        `Traffic accident on route to ${randomHospital} - seek alternate route`,
        `${randomHospital} ICU now at full capacity`,
        `Emergency road closure affecting access to ${randomHospital}`,
        `Mass casualty incident reported - all area hospitals on alert`,
        `Critical system update: Rerouting all ambulances temporarily`
      ];
      message = criticalMessages[Math.floor(Math.random() * criticalMessages.length)];
    }
    
    return {
      id: Date.now().toString(),
      type: randomType,
      message,
      timestamp: new Date()
    };
  };
  
  // Generate notification specifically for selected hospital
  const generateHospitalSpecificNotification = (hospitalId: string): Notification => {
    const selectedHospitalName = hospitalNames[parseInt(hospitalId) % hospitalNames.length];
    
    const messages = [
      `${selectedHospitalName} is preparing for your arrival`,
      `Route to ${selectedHospitalName} optimized - ETA updated`,
      `${selectedHospitalName} has reserved an ICU bed for incoming patient`,
      `Medical team at ${selectedHospitalName} has been notified of patient details`,
      `${selectedHospitalName} suggests using west entrance for fastest access to emergency services`
    ];
    
    return {
      id: Date.now().toString(),
      type: 'info',
      message: messages[Math.floor(Math.random() * messages.length)],
      timestamp: new Date()
    };
  };
  
  // Notification sound effect
  const playNotificationSound = () => {
    if (!soundEnabled) return;
    
    try {
      const audio = new Audio('/notification-sound.mp3');
      audio.volume = 0.5;
      audio.play();
    } catch (error) {
      console.error('Could not play notification sound:', error);
    }
  };
  
  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  };
  
  // Clear a notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  // Add notification for selected hospital when it changes
  useEffect(() => {
    if (selectedHospitalId) {
      const notification = generateHospitalSpecificNotification(selectedHospitalId);
      setNotifications(prev => [notification, ...prev].slice(0, 10));
      
      // Show toast
      toast({
        title: "Hospital Selected",
        description: notification.message,
      });
      
      playNotificationSound();
    }
  }, [selectedHospitalId]);
  
  // Generate periodic notifications
  useEffect(() => {
    // Add initial notifications
    const initialNotifications: Notification[] = [];
    for (let i = 0; i < 3; i++) {
      initialNotifications.push(generateRandomNotification());
    }
    setNotifications(initialNotifications);
    
    // Set up interval for new notifications (every minute)
    const interval = setInterval(() => {
      const newNotification = generateRandomNotification();
      setNotifications(prev => [newNotification, ...prev].slice(0, 10));
      
      // Show toast for critical notifications
      if (newNotification.type === 'critical') {
        toast({
          title: "Critical Alert",
          description: newNotification.message,
          variant: "destructive",
        });
      }
      
      playNotificationSound();
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`rounded-xl shadow-md ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className="bg-gradient-to-r from-medical-500 to-medical-600 p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold text-white flex items-center">
          <Bell className="mr-2" size={18} />
          Real-Time Alerts
        </h2>
        
        <div className="flex items-center gap-2">
          <label className="text-white text-xs flex items-center">
            {soundEnabled ? (
              <Volume2 size={14} className="mr-1" />
            ) : (
              <VolumeX size={14} className="mr-1" />
            )}
            Sound
          </label>
          <Switch 
            checked={soundEnabled} 
            onCheckedChange={setSoundEnabled} 
            className="data-[state=checked]:bg-blue-200"
          />
        </div>
      </div>
      
      <div className={`${
        expanded ? 'max-h-96' : 'max-h-28'
      } overflow-y-auto transition-all duration-300 scrollbar-none`}>
        {notifications.length === 0 ? (
          <div className="p-4 text-center">
            <p className={isDark ? "text-gray-400" : "text-gray-500"}>No notifications yet</p>
          </div>
        ) : (
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 relative border-l-4 ${
                  notification.type === 'critical' 
                    ? isDark 
                      ? 'bg-red-900/20 border-red-700 hover:bg-red-900/30' 
                      : 'bg-red-50 border-red-500 hover:bg-red-100/80'
                    : notification.type === 'warning'
                      ? isDark
                        ? 'bg-amber-900/20 border-amber-700 hover:bg-amber-900/30'
                        : 'bg-amber-50 border-amber-500 hover:bg-amber-100/80'
                      : isDark
                        ? 'bg-blue-900/20 border-blue-700 hover:bg-blue-900/30'
                        : 'bg-blue-50 border-blue-500 hover:bg-blue-100/80'
                }`}
              >
                <button 
                  onClick={() => removeNotification(notification.id)}
                  className="absolute top-2 right-2 opacity-60 hover:opacity-100"
                >
                  <X size={14} />
                </button>
                
                <div className="flex">
                  <div className="mr-2 mt-0.5">
                    {notification.type === 'critical' ? (
                      <AlertCircle size={16} className={isDark ? "text-red-400" : "text-red-600"} />
                    ) : notification.type === 'warning' ? (
                      <AlertCircle size={16} className={isDark ? "text-amber-400" : "text-amber-600"} />
                    ) : (
                      <Info size={16} className={isDark ? "text-blue-400" : "text-blue-600"} />
                    )}
                  </div>
                  
                  <div>
                    <p className={isDark ? "text-gray-200" : "text-gray-800 text-sm"}>
                      {notification.message}
                    </p>
                    <div className="flex items-center mt-1 text-xs text-gray-400">
                      <Clock size={10} className="mr-1" />
                      {formatRelativeTime(notification.timestamp)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      
      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => setExpanded(!expanded)}
          className={`w-full text-xs py-1 rounded ${
            isDark 
              ? 'text-gray-400 hover:bg-gray-700/50' 
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {expanded ? 'Show Less' : 'Show All Notifications'}
        </button>
      </div>
    </div>
  );
};

export default RealTimeNotifications;
