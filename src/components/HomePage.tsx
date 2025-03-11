import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Phone, AlertTriangle, MapPin, HeartPulse, Zap, LayoutDashboard, Hospital, Gauge, Map as MapIcon, FileText, Settings, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MapView from './ui/MapView';
import HospitalCard from './ui/HospitalCard';
import Navbar from './ui/Navbar';
import { toast } from '@/hooks/use-toast';
import HospitalDashboard from './ui/HospitalDashboard';
import SeverityDetector from './ui/SeverityDetector';
import TransportOptions from './ui/TransportOptions';
import RealtimeMetrics from './ui/RealtimeMetrics';
import UserHeader from './ui/UserHeader';
import SearchBar from './ui/SearchBar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
  location: "Bangalore, India",
  role: "Emergency Responder"
};

const HomePage: React.FC = () => {
  const [showSosModal, setShowSosModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'dashboard'>('map');
  const [severityLevel, setSeverityLevel] = useState<'Low' | 'Moderate' | 'High' | 'Critical'>('Moderate');
  const [transportMode, setTransportMode] = useState<'ground' | 'air'>('ground');
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'live-route' | 'hospitals' | 'reports' | 'settings'>('dashboard');
  const [showHighPriorityAlert, setShowHighPriorityAlert] = useState(false);
  
  useEffect(() => {
    const dataInterval = setInterval(() => {
      console.log('Refreshing real-time data...');
    }, 30000);
    
    const alertTimeout = setTimeout(() => {
      setShowHighPriorityAlert(true);
      
      setTimeout(() => {
        setShowHighPriorityAlert(false);
      }, 10000);
    }, 5000);
    
    return () => {
      clearInterval(dataInterval);
      clearTimeout(alertTimeout);
    };
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
        <UserHeader user={userData} />
      </motion.div>
      
      <AnimatePresence>
        {showHighPriorityAlert && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-emergency-500 dark:bg-emergency-600 text-white px-4 py-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle size={20} className="mr-2 animate-pulse" />
                <div>
                  <p className="font-semibold">HIGH PRIORITY ALERT</p>
                  <p className="text-sm">Multiple vehicle accident reported on Highway 101. 5 critical patients.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowHighPriorityAlert(false)}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="px-4 pt-3 pb-1"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">AI Smart Ambulance Routing</h2>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                activeTab === 'dashboard' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-medical-800 dark:text-medical-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              <LayoutDashboard size={16} className="inline-block mr-1 -mt-0.5" />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('live-route')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                activeTab === 'live-route' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-medical-800 dark:text-medical-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              <MapIcon size={16} className="inline-block mr-1 -mt-0.5" />
              Live Route
            </button>
            <button 
              onClick={() => setActiveTab('hospitals')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                activeTab === 'hospitals' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-medical-800 dark:text-medical-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              <Hospital size={16} className="inline-block mr-1 -mt-0.5" />
              Hospitals
            </button>
            <button 
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                activeTab === 'reports' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-medical-800 dark:text-medical-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              <FileText size={16} className="inline-block mr-1 -mt-0.5" />
              Reports
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                activeTab === 'settings' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-medical-800 dark:text-medical-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              <Settings size={16} className="inline-block mr-1 -mt-0.5" />
              Settings
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
        <SearchBar 
          placeholder="Search hospitals or enter accident location for routing..."
          onSearch={(query) => {
            console.log('Searching for:', query);
            toast({
              title: "Location Search",
              description: `Searching for "${query}"`,
            });
          }}
        />
      </motion.div>
      
      {(activeTab === 'dashboard' || activeTab === 'live-route') && (
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
      )}
      
      {activeTab === 'dashboard' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="px-4 py-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="col-span-1 md:col-span-2 dark:bg-gray-800/50 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Activity size={18} className="text-medical-500 mr-2" />
                  Live Emergency Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MapView 
                  userLocation={patientData.location} 
                  destinations={getMapDestinations()} 
                  onNavigate={handleNavigate}
                  selectedHospitalId={selectedHospital}
                  transportMode={transportMode}
                />
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-800/50 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Hospital size={18} className="text-green-500 mr-2" />
                  ICU Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-none">
                  {hospitals.slice(0, 5).map(hospital => (
                    <div key={hospital.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                      <div className="text-left">
                        <p className="font-medium text-sm">{hospital.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{hospital.distance} away</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        hospital.icuBeds > 0 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {hospital.icuBeds} ICU {hospital.icuBeds === 1 ? 'Bed' : 'Beds'}
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  className="w-full mt-3 text-sm text-medical-600 dark:text-medical-400 hover:text-medical-700 dark:hover:text-medical-300"
                  onClick={() => setActiveTab('hospitals')}
                >
                  View All Hospitals
                </button>
              </CardContent>
            </Card>
          </div>
          
          <HospitalDashboard hospitals={hospitals} patientData={patientData} />
          <RealtimeMetrics />
        </motion.div>
      )}
      
      {activeTab === 'live-route' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="px-4 py-2"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-800 dark:text-gray-200">Emergency Route</h2>
            <div className="flex items-center text-xs">
              <div className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-md text-green-800 dark:text-green-400 font-medium flex items-center mr-2">
                <Zap size={14} className="mr-1" />
                Quickest Route
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-md text-blue-800 dark:text-blue-400 font-medium flex items-center">
                <Gauge size={14} className="mr-1" />
                Live Traffic
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4 dark:bg-gray-800/50 dark:border-gray-700">
            <MapView 
              userLocation={patientData.location} 
              destinations={getMapDestinations()} 
              onNavigate={handleNavigate}
              selectedHospitalId={selectedHospital}
              transportMode={transportMode}
            />
            
            {selectedHospital && (
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Route Details</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Distance</p>
                    <p className="font-medium">3.2 km</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">ETA</p>
                    <p className="font-medium">12 min</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Traffic</p>
                    <p className="font-medium text-amber-600 dark:text-amber-400">Moderate</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      {activeTab === 'hospitals' && (
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
              <span className="text-xs text-gray-600 dark:text-gray-400">Live Updates</span>
            </div>
          </div>
          
          <div className="space-y-1 mb-4">
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                All
              </button>
              <button className="px-3 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                ICU Available
              </button>
              <button className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                Nearest
              </button>
              <button className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400">
                Trauma Center
              </button>
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
      
      {activeTab === 'reports' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="px-4 py-3"
        >
          <Card className="dark:bg-gray-800/50 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Emergency Response Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                View and analyze performance metrics and response times.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
                  <h3 className="font-medium mb-2">Average Response Time</h3>
                  <div className="text-2xl font-bold text-medical-600 dark:text-medical-400">12.3 minutes</div>
                  <p className="text-xs text-green-600 dark:text-green-400">↓ 5% from last month</p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
                  <h3 className="font-medium mb-2">Emergency Calls</h3>
                  <div className="text-2xl font-bold text-medical-600 dark:text-medical-400">342</div>
                  <p className="text-xs text-red-600 dark:text-red-400">↑ 8% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {activeTab === 'settings' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="px-4 py-3"
        >
          <Card className="dark:bg-gray-800/50 dark:border-gray-700">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enable alert notifications</p>
                  </div>
                  <div className="bg-medical-500 h-6 w-12 rounded-full relative">
                    <div className="absolute right-1 top-1/2 transform -translate-y-1/2 h-4 w-4 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Voice Commands</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enable voice input for routing</p>
                  </div>
                  <div className="bg-gray-300 dark:bg-gray-600 h-6 w-12 rounded-full relative">
                    <div className="absolute left-1 top-1/2 transform -translate-y-1/2 h-4 w-4 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Auto-Refresh Data</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Refresh interval for live data</p>
                  </div>
                  <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm">
                    <option>30 seconds</option>
                    <option>1 minute</option>
                    <option>5 minutes</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
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
      
      <AnimatePresence>
        {showEmergencyPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center px-4"
            onClick={() => setShowEmergencyPanel(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-emergency-500/30 p-5"
              onClick={(e) => e.stopPropagation()}
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
          </motion.div>
        )}
      </AnimatePresence>
      
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
      
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md py-2 px-4 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 z-10">
        <div className="flex justify-between items-center">
          <div>© 2023 AI Smart Ambulance Routing</div>
          <div className="flex space-x-3">
            <a href="#support" className="hover:text-medical-600 dark:hover:text-medical-400">Support</a>
            <a href="#faq" className="hover:text-medical-600 dark:hover:text-medical-400">FAQs</a>
            <a href="#contact" className="hover:text-medical-600 dark:hover:text-medical-400">Contact</a>
          </div>
          <div>Powered by AI & Smart Routing Technology</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

