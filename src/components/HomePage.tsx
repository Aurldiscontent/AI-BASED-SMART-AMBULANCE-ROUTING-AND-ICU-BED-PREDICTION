import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Phone, AlertTriangle, MapPin, HeartPulse, Zap, LayoutDashboard, Hospital, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import MapView from './ui/MapView';
import HospitalCard from './ui/HospitalCard';
import Navbar from './ui/Navbar';
import { toast } from '@/hooks/use-toast';
import HospitalDashboard from './ui/HospitalDashboard';
import SeverityDetector from './ui/SeverityDetector';
import TransportOptions from './ui/TransportOptions';
import RealtimeMetrics from './ui/RealtimeMetrics';
import ThemeSwitcher from './ui/ThemeSwitcher';

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
    specialties: ['Trauma', 'Cardiac'],
    aiSurvivalRate: 92,
    lastUpdated: '2 min ago',
    trafficCondition: 'Moderate',
    location: { lat: 12.9716, lng: 77.6946 }
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
    specialties: ['Neuro', 'Pediatric'],
    aiSurvivalRate: 89,
    lastUpdated: '5 min ago',
    trafficCondition: 'Heavy',
    location: { lat: 12.9783, lng: 77.6408 }
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
    specialties: ['Cardiac', 'Respiratory'],
    aiSurvivalRate: 85,
    lastUpdated: '7 min ago',
    trafficCondition: 'Light',
    location: { lat: 12.9352, lng: 77.6245 }
  },
  {
    id: 'hospital-4',
    name: 'Fortis Healthcare',
    distance: '7.2 km',
    address: '42 Wellness Road, HSR Layout',
    icuBeds: 7,
    totalBeds: 180,
    isOpen: true,
    estimatedTime: '26 min',
    phone: '+91 9876543213',
    specialties: ['Multi-Specialty', 'Trauma'],
    aiSurvivalRate: 91,
    lastUpdated: '3 min ago',
    trafficCondition: 'Moderate',
    location: { lat: 12.9116, lng: 77.6346 }
  },
  {
    id: 'hospital-5',
    name: 'Victoria Hospital',
    distance: '5.1 km',
    address: '12 Queen Victoria Road, City Market',
    icuBeds: 1,
    totalBeds: 250,
    isOpen: true,
    estimatedTime: '22 min',
    phone: '+91 9876543214',
    specialties: ['General', 'Emergency'],
    aiSurvivalRate: 83,
    lastUpdated: '10 min ago',
    trafficCondition: 'Heavy',
    location: { lat: 12.9647, lng: 77.5732 }
  },
  {
    id: 'hospital-6',
    name: 'Baptist Medical Center',
    distance: '8.7 km',
    address: '34 Church Street, Richmond Town',
    icuBeds: 4,
    totalBeds: 120,
    isOpen: true,
    estimatedTime: '32 min',
    phone: '+91 9876543215',
    specialties: ['Cardiac', 'Geriatric'],
    aiSurvivalRate: 87,
    lastUpdated: '4 min ago',
    trafficCondition: 'Light',
    location: { lat: 12.9698, lng: 77.6096 }
  },
  {
    id: 'hospital-7',
    name: 'St. Johns Medical',
    distance: '9.3 km',
    address: '56 Apostle Avenue, Koramangala',
    icuBeds: 0,
    totalBeds: 170,
    isOpen: true,
    estimatedTime: '35 min',
    phone: '+91 9876543216',
    specialties: ['Pediatric', 'Obstetrics'],
    aiSurvivalRate: 86,
    lastUpdated: '8 min ago',
    trafficCondition: 'Moderate',
    location: { lat: 12.9432, lng: 77.6298 }
  },
  {
    id: 'hospital-8',
    name: 'Narayana Hrudayalaya',
    distance: '12.5 km',
    address: '23 Heart Plaza, Electronic City',
    icuBeds: 15,
    totalBeds: 300,
    isOpen: true,
    estimatedTime: '42 min',
    phone: '+91 9876543217',
    specialties: ['Cardiac', 'Vascular'],
    aiSurvivalRate: 95,
    lastUpdated: '1 min ago',
    trafficCondition: 'Light',
    location: { lat: 12.8416, lng: 77.6654 }
  },
  {
    id: 'hospital-9',
    name: 'Columbia Asia',
    distance: '10.8 km',
    address: '89 International Boulevard, Yeswanthpur',
    icuBeds: 3,
    totalBeds: 220,
    isOpen: true,
    estimatedTime: '38 min',
    phone: '+91 9876543218',
    specialties: ['Multi-Specialty', 'Internal Medicine'],
    aiSurvivalRate: 88,
    lastUpdated: '6 min ago',
    trafficCondition: 'Heavy',
    location: { lat: 13.0279, lng: 77.5371 }
  },
  {
    id: 'hospital-10',
    name: 'Bowring & Lady Curzon',
    distance: '4.5 km',
    address: '67 Heritage Lane, Shivajinagar',
    icuBeds: 2,
    totalBeds: 180,
    isOpen: true,
    estimatedTime: '20 min',
    phone: '+91 9876543219',
    specialties: ['General', 'Obstetrics'],
    aiSurvivalRate: 82,
    lastUpdated: '12 min ago',
    trafficCondition: 'Moderate',
    location: { lat: 12.9825, lng: 77.5932 }
  }
];

const patientData = {
  id: 'PAT-2023-05-12',
  location: { lat: 12.9716, lng: 77.5946 },
  vitals: {
    heartRate: 110,
    bloodPressure: '140/90',
    oxygenLevel: 92,
    temperature: 38.5
  },
  severity: 'Moderate',
  estimatedSurvivalRate: 87,
  aiRecommendedHospital: 'hospital-8',
  transportOptions: ['Ground Ambulance', 'Air Ambulance']
};

const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: null,
  location: "Bangalore, India"
};

const HomePage: React.FC = () => {
  const [showSosModal, setShowSosModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'dashboard'>('map');
  const [severityLevel, setSeverityLevel] = useState<'Low' | 'Moderate' | 'High' | 'Critical'>('Moderate');
  const [transportMode, setTransportMode] = useState<'ground' | 'air'>('ground');
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);
  
  useEffect(() => {
    const dataInterval = setInterval(() => {
      console.log('Refreshing real-time data...');
    }, 30000);
    
    return () => clearInterval(dataInterval);
  }, []);
  
  const handleNavigate = (hospitalId: string) => {
    setSelectedHospital(hospitalId);
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
  
  const handleSeverityChange = (level: 'Low' | 'Moderate' | 'High' | 'Critical') => {
    setSeverityLevel(level);
    toast({
      title: "Severity Updated",
      description: `Patient condition set to ${level}`,
    });
    
    if (level === 'Critical') {
      setTimeout(() => {
        toast({
          title: "⚠️ CRITICAL ALERT",
          description: "Recommending nearest trauma center with air transport!",
          variant: "destructive",
        });
      }, 500);
    }
  };
  
  const handleTransportChange = (mode: 'ground' | 'air') => {
    setTransportMode(mode);
    toast({
      title: "Transport Mode Updated",
      description: `Switched to ${mode === 'air' ? 'Air Ambulance' : 'Ground Ambulance'} mode`,
    });
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const getMapDestinations = () => {
    return hospitals.map(hospital => ({
      id: hospital.id,
      name: hospital.name,
      location: hospital.location
    }));
  };
  
  const sortedHospitals = [...hospitals].sort((a, b) => {
    if (severityLevel === 'Critical' || severityLevel === 'High') {
      if (a.icuBeds === 0) return 1;
      if (b.icuBeds === 0) return -1;
      return b.aiSurvivalRate - a.aiSurvivalRate;
    }
    
    return parseFloat(a.distance) - parseFloat(b.distance);
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white pb-24">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel sticky top-0 z-20 px-4 py-3 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {userData.avatar ? (
              <img 
                src={userData.avatar} 
                alt={userData.name} 
                className="w-10 h-10 rounded-full object-cover border-2 border-medical-200 dark:border-medical-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center text-white font-medium">
                {getInitials(userData.name)}
              </div>
            )}
            <div className="ml-3 text-left">
              <p className="text-base font-medium text-gray-800 dark:text-gray-200">Hello, {userData.name.split(' ')[0]}!</p>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <MapPin size={12} className="mr-1" />
                {userData.location}
              </div>
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
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="px-4 pt-3 pb-1"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Emergency Medical Services</h2>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                viewMode === 'map' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-medical-800 dark:text-medical-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              <MapPin size={16} className="inline-block mr-1 -mt-0.5" />
              Map
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-medical-800 dark:text-medical-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              <Hospital size={16} className="inline-block mr-1 -mt-0.5" />
              Hospitals
            </button>
            <button 
              onClick={() => setViewMode('dashboard')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                viewMode === 'dashboard' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-medical-800 dark:text-medical-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              <LayoutDashboard size={16} className="inline-block mr-1 -mt-0.5" />
              Dashboard
            </button>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="px-4 py-2"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search hospitals or enter accident location"
            className="input-field w-full pl-10 pr-4 py-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <Search size={18} />
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="px-4 py-2"
      >
        <div className="glass-card rounded-2xl p-4 mb-4 dark:bg-gray-800/70 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <HeartPulse size={18} className="text-emergency-500 mr-2" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Patient Status</h3>
            </div>
            {severityLevel === 'Critical' && (
              <div className="bg-emergency-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                CRITICAL
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <SeverityDetector 
              currentSeverity={severityLevel} 
              onSeverityChange={handleSeverityChange}
            />
            <TransportOptions 
              currentMode={transportMode}
              onModeChange={handleTransportChange}
              isAirRecommended={severityLevel === 'Critical'}
            />
          </div>
        </div>
      </motion.div>
      
      {viewMode === 'map' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="px-4 py-2"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-800 dark:text-gray-200">Emergency Route</h2>
            <div className="flex items-center text-xs">
              <div className="bg-green-100 px-2 py-1 rounded-md text-green-800 font-medium flex items-center mr-2">
                <Zap size={14} className="mr-1" />
                Quickest Route
              </div>
              <div className="bg-blue-100 px-2 py-1 rounded-md text-blue-800 font-medium flex items-center">
                <Gauge size={14} className="mr-1" />
                Live Traffic
              </div>
            </div>
          </div>
          <MapView 
            userLocation={patientData.location} 
            destinations={getMapDestinations()} 
            onNavigate={handleNavigate}
            selectedHospitalId={selectedHospital}
            transportMode={transportMode}
          />
        </motion.div>
      )}
      
      {viewMode === 'list' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="px-4 py-3"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-800 dark:text-gray-200">Nearby Hospitals</h2>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
              <span className="text-xs text-gray-600">Live Updates</span>
            </div>
          </div>
          
          {sortedHospitals.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              {...hospital}
              onNavigate={() => handleNavigate(hospital.id)}
              onCall={() => handleCall(hospital.id)}
              severity={severityLevel}
              specialties={hospital.specialties}
              aiSurvivalRate={hospital.aiSurvivalRate}
              lastUpdated={hospital.lastUpdated}
              trafficCondition={hospital.trafficCondition}
              isRecommended={hospital.id === patientData.aiRecommendedHospital}
            />
          ))}
        </motion.div>
      )}
      
      {viewMode === 'dashboard' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="px-4 py-3"
        >
          <HospitalDashboard hospitals={hospitals} patientData={patientData} />
          <RealtimeMetrics />
        </motion.div>
      )}
      
      <div className="fixed bottom-24 right-4 z-30 mb-3">
        <button
          onClick={() => setShowEmergencyPanel(!showEmergencyPanel)}
          className="w-14 h-14 rounded-full bg-emergency-500 flex items-center justify-center shadow-lg hover:bg-emergency-600 transition-colors"
        >
          <AlertTriangle className="text-white" size={24} />
        </button>
      </div>
      
      {showEmergencyPanel && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-emergency-500/30 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <AlertTriangle className="text-emergency-500 mr-2" size={20} />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Emergency Access</h3>
            </div>
            <button
              onClick={() => setShowEmergencyPanel(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Need immediate assistance? Use these emergency options:
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={handleEmergencyCall}
              className="flex-1 py-3 px-4 flex items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Phone size={18} />
              <span>Emergency Call</span>
            </button>
            
            <button
              onClick={handleSOSClick}
              className="flex-1 py-3 px-4 flex items-center justify-center gap-2 rounded-xl bg-emergency-500 hover:bg-emergency-600 text-white transition-colors"
            >
              <AlertTriangle size={18} />
              <span>SOS</span>
            </button>
          </div>
        </motion.div>
      )}
      
      <Navbar />
      
      {showSosModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-xs w-full mx-4 animate-scale">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 animate-pulse">
                <AlertTriangle size={32} className="text-emergency-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Emergency Alert</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                Sending your location to emergency services...
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-emergency-500 animate-pulse" style={{ width: '70%' }}></div>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please wait...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
