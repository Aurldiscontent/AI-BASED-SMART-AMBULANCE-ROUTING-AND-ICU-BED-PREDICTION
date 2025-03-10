
import React, { useState } from 'react';
import { Search, Bell, User, Phone, AlertTriangle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import MapView from './ui/MapView';
import HospitalCard from './ui/HospitalCard';
import Navbar from './ui/Navbar';
import EmergencyPanel from './ui/EmergencyPanel';
import { toast } from '@/hooks/use-toast';

const hospitals = [
  {
    id: 'hospital-1',
    name: 'City General Hospital',
    distance: '3.2 km',
    address: '123 Healthcare Avenue, Bangalore',
    icuBeds: 5,
    totalBeds: 120,
    isOpen: true,
    estimatedTime: '12 min',
    phone: '+91 9876543210',
  },
  {
    id: 'hospital-2',
    name: 'Manipal Hospital',
    distance: '4.8 km',
    address: '45 Medical Complex, Indiranagar',
    icuBeds: 2,
    totalBeds: 200,
    isOpen: true,
    estimatedTime: '18 min',
    phone: '+91 9876543211',
  },
  {
    id: 'hospital-3',
    name: 'Apollo Specialty',
    distance: '6.5 km',
    address: '78 Health Street, Koramangala',
    icuBeds: 0,
    totalBeds: 150,
    isOpen: true,
    estimatedTime: '24 min',
    phone: '+91 9876543212',
  },
];

// Mock user data (in a real app, this would come from authentication)
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: null, // If no avatar, we'll show initials
  location: "Bangalore, India"
};

const HomePage: React.FC = () => {
  const [showSosModal, setShowSosModal] = useState(false);
  
  const handleNavigate = (hospitalId: string) => {
    const hospital = hospitals.find(h => h.id === hospitalId);
    toast({
      title: "Navigation Started",
      description: `Navigating to ${hospital?.name}`,
    });
  };
  
  const handleCall = (hospitalId: string) => {
    const hospital = hospitals.find(h => h.id === hospitalId);
    toast({
      title: "Calling Hospital",
      description: `Connecting to ${hospital?.name}`,
    });
  };
  
  const handleSOSClick = () => {
    setShowSosModal(true);
    setTimeout(() => {
      setShowSosModal(false);
      toast({
        title: "Emergency Services Notified",
        description: "Help is on the way. Stay calm and provide details when they call.",
        variant: "destructive",
      });
    }, 3000);
  };
  
  const handleEmergencyCall = () => {
    toast({
      title: "Emergency Call",
      description: "Connecting to emergency services...",
      variant: "destructive",
    });
  };
  
  // Get user initials for the avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel sticky top-0 z-20 px-4 py-3 border-b border-gray-200"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {userData.avatar ? (
              <img 
                src={userData.avatar} 
                alt={userData.name} 
                className="w-10 h-10 rounded-full object-cover border-2 border-medical-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center text-white font-medium">
                {getInitials(userData.name)}
              </div>
            )}
            <div className="ml-3 text-left">
              <p className="text-base font-medium text-gray-800">Hello, {userData.name.split(' ')[0]}!</p>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin size={12} className="mr-1" />
                {userData.location}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="px-4 py-3"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Find nearest hospital"
            className="input-field w-full pl-10 pr-4 py-3"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Search size={18} />
          </div>
        </div>
      </motion.div>
      
      {/* Map View */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="px-4 py-2"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-800">Real-Time Route</h2>
          <button className="text-sm text-medical-600 font-medium">View Details</button>
        </div>
        <MapView onNavigate={handleNavigate} />
      </motion.div>
      
      {/* Hospital List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="px-4 py-3"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-gray-800">Nearby Hospitals</h2>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs text-gray-600">Live Updates</span>
          </div>
        </div>
        
        {hospitals.map((hospital) => (
          <HospitalCard
            key={hospital.id}
            {...hospital}
            onNavigate={() => handleNavigate(hospital.id)}
            onCall={() => handleCall(hospital.id)}
          />
        ))}
      </motion.div>
      
      {/* Emergency Panel */}
      <EmergencyPanel
        onSOSClick={handleSOSClick}
        onEmergencyCall={handleEmergencyCall}
      />
      
      {/* Bottom Navigation */}
      <Navbar />
      
      {/* SOS Modal */}
      {showSosModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full mx-4 animate-scale">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 animate-pulse">
                <AlertTriangle size={32} className="text-emergency-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Emergency Alert</h3>
              <p className="text-gray-600 text-center mb-4">
                Sending your location to emergency services...
              </p>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-emergency-500 animate-pulse" style={{ width: '70%' }}></div>
              </div>
              <p className="mt-2 text-sm text-gray-500">Please wait...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
