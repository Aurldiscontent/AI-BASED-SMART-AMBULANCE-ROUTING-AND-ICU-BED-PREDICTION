import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Phone, AlertTriangle, MapPin, HeartPulse, Zap, LayoutDashboard, Hospital, Gauge, Map as MapIcon, FileText, Settings, Activity, Mic, Moon, Sun, Navigation, TrendingUp, Clock, Users } from 'lucide-react';
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
import { useTheme } from '@/hooks/use-theme';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

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
  const [showHospitalDetails, setShowHospitalDetails] = useState<string | null>(null);
  const [showTrafficDetails, setShowTrafficDetails] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const { theme, setTheme } = useTheme();
  
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
  
  const handleVoiceCommand = () => {
    setIsListening(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      toast({
        title: "Voice Command Detected",
        description: "Finding nearest hospital with available ICU beds",
      });
      
      setTimeout(() => {
        // Find a hospital with ICU beds
        const availableHospital = hospitals.find(h => h.icuBeds > 0);
        if (availableHospital) {
          setSelectedHospital(availableHospital.id);
          setIsListening(false);
          
          toast({
            title: "Hospital Found",
            description: `Navigating to ${availableHospital.name}`,
          });
        }
      }, 2000);
    }, 2500);
  };
  
  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    toast({
      title: "Theme Changed",
      description: `Switched to ${theme === 'dark' ? 'light' : 'dark'} mode`,
    });
  };
  
  const handleTrafficAlert = () => {
    setShowTrafficDetails(true);
    toast({
      title: "Traffic Alert",
      description: "Heavy congestion detected on main route. Alternative routes suggested.",
      variant: "destructive",
    });
  };
  
  const handleRoutePathClick = () => {
    toast({
      title: "Route Options",
      description: "Showing alternative routes based on traffic conditions.",
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
  
  const selectedHospitalData = selectedHospital 
    ? hospitals.find(h => h.id === selectedHospital) 
    : null;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white pb-24">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel sticky top-0 z-20 px-4 py-3 border-b border-gray-200 dark:border-gray-700"
      >
        <UserHeader 
          user={userData} 
          onProfileClick={() => setShowUserPanel(!showUserPanel)}
        />
      </motion.div>
      
      <AnimatePresence>
        {showUserPanel && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 w-72"
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
                <div className="h-10 w-10 rounded-full bg-medical-500 flex items-center justify-center text-white font-semibold">
                  {getInitials(userData.name)}
                </div>
                <div>
                  <h3 className="font-semibold">{userData.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userData.role}</p>
                </div>
              </div>
              
              <button 
                onClick={handleThemeToggle}
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md transition-colors transform hover:scale-105"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
              </button>
              
              <button className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md transition-colors transform hover:scale-105">
                <User size={16} />
                <span>Edit Profile</span>
              </button>
              
              <button className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md transition-colors transform hover:scale-105">
                <Settings size={16} />
                <span>Settings</span>
              </button>
              
              <button className="flex items-center gap-2 mt-2 p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors transform hover:scale-105">
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showHighPriorityAlert && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-emergency-500 dark:bg-emergency-600 text-white px-4 py-3 cursor-pointer"
            onClick={() => {
              toast({
                title: "Emergency Alert Details",
                description: "Accessing detailed incident report...",
                variant: "destructive",
              });
            }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHighPriorityAlert(false);
                }}
                className="text-white/80 hover:text-white transform hover:scale-110 transition-transform"
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
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition transform hover:scale-105 ${
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
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition transform hover:scale-105 ${
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
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition transform hover:scale-105 ${
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
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition transform hover:scale-105 ${
                activeTab === 'reports' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-medical-800 dark:text-medical-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              <FileText size={18} className="inline-block mr-1 -mt-0.5" />
              Reports
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition transform hover:scale-105 ${
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
        <div className="relative">
          <SearchBar 
            placeholder="Search hospitals or enter accident location for routing..."
            onSearch={(query) => {
              console.log('Searching for:', query);
              toast({
                title: "Location Search",
                description: `Searching for "${query}"`,
              });
            }}
            showVoiceCommand={true}
          />
          
          {isListening && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-xl">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-medical-100 dark:bg-medical-900/30 flex items-center justify-center mb-2">
                  <Mic className="text-medical-500 animate-pulse" />
                </div>
                <p className="text-sm font-medium">Listening...</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Say "Find nearest hospital" or "Navigate to..."</p>
                
                <button 
                  onClick={() => setIsListening(false)}
                  className="mt-3 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transform hover:scale-105 transition-transform"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
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
                  onHospitalClick={(id) => {
                    setShowHospitalDetails(id);
                    const hospital = hospitals.find(h => h.id === id);
                    toast({
                      title: "Hospital Selected",
                      description: `Viewing details for ${hospital?.name}`,
                    });
                  }}
                  onTrafficClick={handleTrafficAlert}
                  onPathClick={handleRoutePathClick}
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
                    <div 
                      key={hospital.id} 
                      className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 p-1 rounded transition-colors transform hover:scale-102"
                      onClick={() => {
                        setShowHospitalDetails(hospital.id);
                        toast({
                          title: "Hospital Selected",
                          description: `Viewing details for ${hospital.name}`,
                        });
                      }}
                    >
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
                  className="w-full mt-3 text-sm text-medical-600 dark:text-medical-400 hover:text-medical-700 dark:hover:text-medical-300 transform hover:scale-105 transition-transform"
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
              <div 
                className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-md text-blue-800 dark:text-blue-400 font-medium flex items-center cursor-pointer hover:bg-blue-200 transition-colors"
                onClick={() => setShowTrafficDetails(true)}
              >
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
              onHospitalClick={(id) => setShowHospitalDetails(id)}
              onTrafficClick={handleTrafficAlert}
              onPathClick={handleRoutePathClick}
            />
          </div>
        </motion.div>
      )}
      
      {activeTab === 'hospitals' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="px-4 py-2"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-800 dark:text-gray-200">Hospitals Near You</h2>
            <div className="flex items-center text-xs">
              <div className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-md text-green-800 dark:text-green-400 font-medium flex items-center">
                <HeartPulse size={14} className="mr-1" />
                {hospitals.reduce((acc, h) => acc + h.icuBeds, 0)} Total ICU Beds
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedHospitals.map(hospital => (
              <HospitalCard 
                key={hospital.id}
                id={hospital.id}
                name={hospital.name}
                distance={hospital.distance}
                address={hospital.address}
                icuBeds={hospital.icuBeds}
                totalBeds={hospital.totalBeds}
                isOpen={hospital.isOpen}
                estimatedTime={hospital.estimatedTime}
                phone={hospital.phone}
                specialties={hospital.specialties}
                aiSurvivalRate={hospital.aiSurvivalRate}
                lastUpdated={hospital.lastUpdated}
                trafficCondition={hospital.trafficCondition}
                severity={severityLevel}
                isRecommended={hospital.id === patientData.aiRecommendedHospital}
                onNavigate={() => handleNavigate(hospital.id)}
                onCall={() => handleCall(hospital.id)}
                onClick={() => setShowHospitalDetails(hospital.id)}
              />
            ))}
          </div>
        </motion.div>
      )}
      
      {activeTab === 'reports' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="px-4 py-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card className="dark:bg-gray-800/50 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp size={18} className="text-blue-500 mr-2" />
                  Emergency Response Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', response: 12.3 },
                        { month: 'Feb', response: 11.8 },
                        { month: 'Mar', response: 10.5 },
                        { month: 'Apr', response: 9.8 },
                        { month: 'May', response: 8.5 },
                        { month: 'Jun', response: 7.9 },
                        { month: 'Jul', response: 8.2 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="response" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  <p className="font-semibold">Analysis:</p>
                  <p>Average response time has decreased by 33% in the past 6 months due to AI routing implementation. The current average is 8.2 minutes, compared to the national average of 12.5 minutes.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800/50 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <HeartPulse size={18} className="text-red-500 mr-2" />
                  Patient Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Positive', value: 78 },
                          { name: 'Stable', value: 15 },
                          { name: 'Critical', value: 7 },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#4ade80" />
                        <Cell fill="#facc15" />
                        <Cell fill="#f87171" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  <p className="font-semibold">Analysis:</p>
                  <p>78% of patients transported using AI routing had positive outcomes, representing a 23% improvement over traditional routing methods. Critical outcome cases have reduced from 12% to 7%.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="dark:bg-gray-800/50 dark:border-gray-700 mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MapPin size={18} className="text-green-500 mr-2" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <MapIcon size={48} className="text-gray-400 dark:text-gray-500" />
                    <span className="ml-2 text-gray-500 dark:text-gray-400">Interactive map visualization</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Incident Hotspots</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Downtown</span>
                      <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded text-xs font-medium">32%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Highway 101</span>
                      <span className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded text-xs font-medium">24%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Industrial Zone</span>
                      <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded text-xs font-medium">18%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Residential Areas</span>
                      <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded text-xs font-medium">16%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Others</span>
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded text-xs font-medium">10%</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                <p className="font-semibold">Analysis:</p>
                <p>Downtown and Highway 101 account for over 50% of all emergency incidents. The system has optimized routing to these areas by positioning ambulances strategically, reducing response times by 42% in high-incident zones.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800/50 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText size={18} className="text-purple-500 mr-2" />
                Monthly Performance Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="text-blue-500 mr-2" size={18} />
                    <h4 className="font-semibold">Average Response Time</h4>
                  </div>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">8.2 min</p>
                  <p className="text-green-600 dark:text-green-400 text-sm mt-1">▼ 1.3 min from last month</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Users className="text-green-500 mr-2" size={18} />
                    <h4 className="font-semibold">Patients Served</h4>
                  </div>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-400">287</p>
                  <p className="text-green-600 dark:text-green-400 text-sm mt-1">▲ 12% from last month</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="text-purple-500 mr-2" size={18} />
                    <h4 className="font-semibold">AI Accuracy</h4>
                  </div>
                  <p className="text-3xl font-bold text-purple-700 dark:text-purple-400">96.3%</p>
                  <p className="text-green-600 dark:text-green-400 text-sm mt-1">▲ 2.1% from last month</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p className="font-semibold">Monthly Highlights:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Successfully integrated traffic pattern prediction, improving ETA accuracy by 18%</li>
                  <li>Reduced hospital diversion rates by 24% through better load balancing</li>
                  <li>Implemented new severity assessment algorithm with 96.3% match to clinical outcomes</li>
                  <li>Expanded coverage to 3 new rural areas with specialized routing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {activeTab === 'settings' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="px-4 py-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="dark:bg-gray-800/50 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MapIcon size={18} className="text-blue-500 mr-2" />
                  Map & Navigation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Real-time Traffic Updates</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive live traffic data for optimal routing</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle traffic updates"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Smart Rerouting</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Automatically reroute when faster paths are available</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle smart rerouting"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Road Closure Alerts</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified of closed roads along your route</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle road closure alerts"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">3D Map Visualization</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Show buildings and landmarks in 3D</p>
                  </div>
                  <Toggle
                    aria-label="Toggle 3D map"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Lane Guidance</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Show recommended lanes for faster navigation</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle lane guidance"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-800/50 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Bell size={18} className="text-blue-500 mr-2" />
                  Notifications & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Emergency Alerts</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Critical patient and high priority alerts</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle emergency alerts"
                    className="data-[state=on]:bg-red-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Hospital Status Updates</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Changes in bed availability and wait times</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle hospital updates"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Traffic Condition Alerts</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Significant changes in traffic conditions</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle traffic alerts"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts on mobile devices</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle push notifications"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Audio Alerts</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Voice announcements for critical updates</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle audio alerts"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-800/50 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Gauge size={18} className="text-blue-500 mr-2" />
                  Performance & Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">AI-Powered Recommendations</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Smart hospital selection based on patient data</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle AI recommendations"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Survival Rate Prediction</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Show predicted survival rates for hospitals</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle survival predictions"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Anonymous Data Sharing</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Share anonymized data to improve the system</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle data sharing"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Detailed Analytics</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">View comprehensive performance metrics</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle analytics"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-800/50 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Settings size={18} className="text-blue-500 mr-2" />
                  System Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                  </div>
                  <Toggle
                    pressed={theme === 'dark'}
                    onPressedChange={() => handleThemeToggle()}
                    aria-label="Toggle dark mode"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Voice Commands</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enable hands-free voice control</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle voice commands"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Data Sync</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sync data across devices</p>
                  </div>
                  <Toggle
                    defaultChecked
                    aria-label="Toggle data sync"
                    className="data-[state=on]:bg-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Language</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current: English</p>
                  </div>
                  <button className="text-sm text-blue-500 hover:underline">
                    Change
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Units</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Distance and speed measurement units</p>
                  </div>
                  <button className="text-sm text-blue-500 hover:underline">
                    Metric
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
