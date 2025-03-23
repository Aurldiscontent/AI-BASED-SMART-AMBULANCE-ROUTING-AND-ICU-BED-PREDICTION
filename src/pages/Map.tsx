import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';
import TopHeader from '@/components/ui/TopHeader';
import Navbar from '@/components/ui/Navbar';
import EnhancedMapView from '@/components/ui/EnhancedMapView';
import { MapPin, Navigation, Phone, Clock, AlertCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface Hospital {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  icuAvailable: number;
  icuTotal: number;
  waitTime: number;
  distance: string;
  travelTime: string;
  phone: string;
  specialties: string[];
}

const Map = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDark = theme === 'dark';
  
  const selectedHospitalId = searchParams.get('hospital');
  const [isNavigating, setIsNavigating] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [patientLocation, setPatientLocation] = useState('');
  const [userCoordinates, setUserCoordinates] = useState({ lat: 40.7128, lng: -74.0060 });
  const [transportMode, setTransportMode] = useState<'ground' | 'air'>('ground');
  const [patientSeverity, setPatientSeverity] = useState<'critical' | 'non-critical'>('non-critical');
  const [hasSetLocation, setHasSetLocation] = useState(false);
  const [showMultiSelect, setShowMultiSelect] = useState(false);
  
  const mockHospitals: Hospital[] = [
    { 
      id: '1', 
      name: 'Spring Street Medical Center', 
      location: { lat: 40.7128, lng: -74.0060 }, 
      icuAvailable: 5, 
      icuTotal: 20, 
      waitTime: 10,
      distance: '1.5 km',
      travelTime: '8 min',
      phone: '+1 212-555-1234',
      specialties: ['Emergency', 'Trauma', 'ICU']
    },
    { 
      id: '2', 
      name: 'Little Italy Hospital', 
      location: { lat: 40.7228, lng: -74.0090 }, 
      icuAvailable: 8, 
      icuTotal: 15, 
      waitTime: 5,
      distance: '2.2 km',
      travelTime: '12 min',
      phone: '+1 212-555-2345',
      specialties: ['Pediatric', 'Emergency', 'Surgery']
    },
    { 
      id: '3', 
      name: 'Canal Street Medical', 
      location: { lat: 40.7158, lng: -74.0030 }, 
      icuAvailable: 2, 
      icuTotal: 10, 
      waitTime: 15,
      distance: '0.8 km',
      travelTime: '6 min',
      phone: '+1 212-555-3456',
      specialties: ['Cardiac', 'Surgery', 'ICU']
    },
    { 
      id: '4', 
      name: 'Tribeca Health Center', 
      location: { lat: 40.7208, lng: -74.0120 }, 
      icuAvailable: 10, 
      icuTotal: 25, 
      waitTime: 8,
      distance: '1.7 km',
      travelTime: '10 min',
      phone: '+1 212-555-4567',
      specialties: ['Trauma', 'Emergency', 'Pediatric']
    },
    { 
      id: '5', 
      name: 'Lower Manhattan Hospital', 
      location: { lat: 40.7148, lng: -74.0070 }, 
      icuAvailable: 3, 
      icuTotal: 12, 
      waitTime: 12,
      distance: '1.2 km',
      travelTime: '7 min',
      phone: '+1 212-555-5678',
      specialties: ['Cardiac', 'ICU', 'Surgery']
    },
  ];
  
  const destinations = mockHospitals.map(h => ({
    id: h.id,
    name: h.name,
    location: h.location,
    icuAvailable: h.icuAvailable,
    icuTotal: h.icuTotal,
    waitTime: h.waitTime,
    specialties: h.specialties
  }));
  
  useEffect(() => {
    if (selectedHospitalId) {
      const hospital = mockHospitals.find(h => h.id === selectedHospitalId);
      if (hospital) {
        setSelectedHospital(hospital);
      }
    } else if (mockHospitals.length > 0) {
      setSelectedHospital(mockHospitals[0]);
    }
  }, [selectedHospitalId]);
  
  const handleHospitalClick = (id: string) => {
    const hospital = mockHospitals.find(h => h.id === id);
    if (hospital) {
      setSelectedHospital(hospital);
      navigate(`/map?hospital=${id}`);
    }
  };
  
  const handleNavigate = () => {
    if (!selectedHospital) return;
    
    setIsNavigating(true);
    
    toast({
      title: t("navigate-to"),
      description: `${t("navigate-to")} ${selectedHospital.name}`,
    });
    
    setTimeout(() => {
      setIsNavigating(false);
    }, 2000);
  };
  
  const handleCall = () => {
    if (!selectedHospital) return;
    
    setIsCalling(true);
    
    toast({
      title: t("calling-hospital"),
      description: `${t("connecting-to")} ${selectedHospital.name}`,
    });
    
    setTimeout(() => {
      setIsCalling(false);
    }, 2000);
  };

  const handleSetLocation = () => {
    if (!patientLocation.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a source location to continue.",
        variant: "destructive"
      });
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLat = position.coords.latitude;
        const newLng = position.coords.longitude;
        setUserCoordinates({ lat: newLat, lng: newLng });
      },
      () => {
        const newLat = 40.7128 + (Math.random() * 0.05 - 0.025);
        const newLng = -74.0060 + (Math.random() * 0.05 - 0.025);
        setUserCoordinates({ lat: newLat, lng: newLng });
      }
    );
    
    setHasSetLocation(true);
    
    toast({
      title: "Location Updated",
      description: `Patient location set to: ${patientLocation}`,
    });
  };

  const handleSeverityChange = (severity: 'critical' | 'non-critical') => {
    setPatientSeverity(severity);
    
    if (severity === 'critical' && transportMode === 'ground') {
      toast({
        title: "Critical Patient",
        description: "Air transport is recommended for critical patients.",
      });
      
      setShowMultiSelect(true);
    } else {
      setShowMultiSelect(false);
    }
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <TopHeader />
      
      <div className="container mx-auto px-4 pt-4 pb-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">{t("emergency-route")}</h1>
          
          <div className="mb-6">
            <EnhancedMapView 
              destinations={destinations}
              selectedHospitalId={selectedHospital?.id}
              onHospitalClick={handleHospitalClick}
              theme={theme}
              transportMode={transportMode}
              mapImagePath="/lovable-uploads/e088e765-bcfc-42bc-82f1-62c5a627499c.png"
              showPathFromUser={hasSetLocation}
              userLocation={userCoordinates}
              centerMapOnSelection={true}
              enableMultiSelect={showMultiSelect}
              onNavigate={(id) => {
                const hospital = mockHospitals.find(h => h.id === id);
                if (hospital) {
                  setSelectedHospital(hospital);
                  handleNavigate();
                }
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`${
              isDark ? 'bg-gray-800/70 border border-blue-900/30' : 'bg-white/80 border border-blue-100'
            } rounded-xl p-4 space-y-4 shadow-md`}>
              <h2 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'} mb-3`}>Patient & Emergency Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Patient Location</label>
                  <div className="flex gap-2">
                    <Input 
                      type="text"
                      value={patientLocation}
                      onChange={(e) => setPatientLocation(e.target.value)}
                      placeholder="Enter exact location"
                      className={isDark 
                        ? 'bg-gray-900/60 border-gray-700 text-gray-200' 
                        : 'bg-white/60 border-gray-300 text-gray-700'
                      }
                    />
                    <Button 
                      onClick={handleSetLocation}
                      className={`${
                        isDark ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-500'
                      }`}
                    >
                      <Search size={16} className="mr-1" />
                      Set
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Selected Hospital</label>
                  <select 
                    className={`w-full ${
                      isDark 
                        ? 'bg-gray-900/60 border border-gray-700 text-gray-200' 
                        : 'bg-white/60 border border-gray-300 text-gray-700'
                    } rounded-lg px-3 py-2`}
                    value={selectedHospital?.id || ''}
                    onChange={(e) => {
                      const hospital = mockHospitals.find(h => h.id === e.target.value);
                      if (hospital) {
                        setSelectedHospital(hospital);
                        navigate(`/map?hospital=${hospital.id}`);
                      }
                    }}
                  >
                    <option value="">Select hospital</option>
                    {mockHospitals.map(hospital => (
                      <option key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </option>
                    ))}
                  </select>
                  
                  <div className="mt-1 flex items-center">
                    <AlertCircle size={14} className={isDark ? "text-blue-400" : "text-blue-600"} />
                    <span className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-600'} ml-1`}>
                      AI recommended: Spring Street Medical Center
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Patient Severity</label>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <button
                      className={`py-2 px-3 rounded-lg border ${
                        patientSeverity === 'non-critical'
                          ? isDark
                            ? 'bg-blue-900/40 border-blue-500/50 text-blue-300'
                            : 'bg-blue-100 border-blue-300 text-blue-700'
                          : isDark
                            ? 'bg-gray-800/60 border-gray-700 text-gray-400 hover:bg-gray-800'
                            : 'bg-white/60 border-gray-300 text-gray-500 hover:bg-gray-100'
                      }`}
                      onClick={() => handleSeverityChange('non-critical')}
                    >
                      Non-Critical
                    </button>
                    <button
                      className={`py-2 px-3 rounded-lg border ${
                        patientSeverity === 'critical'
                          ? isDark
                            ? 'bg-blue-900/40 border-blue-500/50 text-blue-300'
                            : 'bg-blue-100 border-blue-300 text-blue-700'
                          : isDark
                            ? 'bg-gray-800/60 border-gray-700 text-gray-400 hover:bg-gray-800'
                            : 'bg-white/60 border-gray-300 text-gray-500 hover:bg-gray-100'
                      }`}
                      onClick={() => handleSeverityChange('critical')}
                    >
                      Critical
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Transport Mode</label>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <button
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border ${
                        transportMode === 'ground'
                          ? isDark
                            ? 'bg-blue-900/40 border-blue-500/50 text-blue-300'
                            : 'bg-blue-100 border-blue-300 text-blue-700'
                          : isDark
                            ? 'bg-gray-800/60 border-gray-700 text-gray-400 hover:bg-gray-800'
                            : 'bg-white/60 border-gray-300 text-gray-500 hover:bg-gray-100'
                      }`}
                      onClick={() => setTransportMode('ground')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                        <circle cx="7" cy="17" r="2"></circle>
                        <path d="M9 17h6"></path>
                        <circle cx="17" cy="17" r="2"></circle>
                      </svg>
                      Ground
                    </button>
                    <button
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border ${
                        transportMode === 'air'
                          ? isDark
                            ? 'bg-blue-900/40 border-blue-500/50 text-blue-300'
                            : 'bg-blue-100 border-blue-300 text-blue-700'
                          : isDark
                            ? 'bg-gray-800/60 border-gray-700 text-gray-400 hover:bg-gray-800'
                            : 'bg-white/60 border-gray-300 text-gray-500 hover:bg-gray-100'
                      }`}
                      onClick={() => setTransportMode('air')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8.5 19h-4a1 1 0 0 1-.8-1.6l9.8-13"></path>
                        <path d="M17 5.5v13a1 1 0 0 0 1.6.8l2.7-2.7"></path>
                        <path d="M13 1.1l-5.9 5.3a1 1 0 0 0-.3.7v2.9l-3.8 3.4a1 1 0 0 0 .7 1.7h7.5"></path>
                      </svg>
                      Air
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`${
              isDark ? 'bg-gray-800/70 border border-blue-900/30' : 'bg-white/80 border border-blue-100'
            } rounded-xl p-4 shadow-md md:col-span-1`}>
              <h2 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'} mb-3`}>Available Routes</h2>
              
              <div className="space-y-3 mt-4">
                {mockHospitals.slice(0, 3).map((hospital, index) => (
                  <div 
                    key={hospital.id}
                    onClick={() => handleHospitalClick(hospital.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedHospital?.id === hospital.id
                        ? isDark 
                          ? 'bg-blue-900/40 border border-blue-500/30' 
                          : 'bg-blue-50 border border-blue-200'
                        : isDark
                          ? 'bg-gray-800/60 border border-gray-700 hover:bg-gray-700/50' 
                          : 'bg-white/80 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{hospital.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex items-center">
                            <MapPin size={12} className={isDark ? "text-gray-400" : "text-gray-500"} />
                            <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">{hospital.distance}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center">
                            <Clock size={12} className={isDark ? "text-gray-400" : "text-gray-500"} />
                            <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">{hospital.travelTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`text-xs px-1.5 py-0.5 rounded ${
                        hospital.icuAvailable < 3
                          ? isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                          : hospital.icuAvailable < 6
                            ? isDark ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-700'
                            : isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                      }`}>
                        {hospital.icuAvailable}/{hospital.icuTotal} ICU
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hospital.specialties.slice(0, 3).map(specialty => (
                        <span 
                          key={specialty}
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            isDark 
                              ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' 
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedHospital && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`${
                  isDark ? 'bg-gray-800/70 border border-blue-900/30' : 'bg-white/80 border border-blue-100'
                } rounded-xl p-4 shadow-md md:col-span-1`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                      {selectedHospital.name}
                    </h2>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={14} className={isDark ? "text-gray-400" : "text-gray-500"} />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{selectedHospital.distance}</span>
                      <span className="text-gray-400">•</span>
                      <Clock size={14} className={isDark ? "text-gray-400" : "text-gray-500"} />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{selectedHospital.travelTime}</span>
                    </div>
                  </div>
                  
                  <div className={`${
                    isDark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-700'
                  } px-2 py-1 rounded text-xs font-medium`}>
                    ICU: {selectedHospital.icuAvailable}/{selectedHospital.icuTotal}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={`flex items-center ${
                    isDark ? 'bg-gray-700/30' : 'bg-gray-50'
                  } p-2 rounded-lg`}>
                    <Clock className={`h-5 w-5 ${
                      selectedHospital.waitTime > 10 
                        ? isDark ? 'text-amber-400' : 'text-amber-500'
                        : isDark ? 'text-green-400' : 'text-green-500'
                    } mr-2`} />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Wait Time</p>
                      <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {selectedHospital.waitTime} minutes
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center ${
                    isDark ? 'bg-gray-700/30' : 'bg-gray-50'
                  } p-2 rounded-lg`}>
                    <AlertCircle className={`h-5 w-5 ${
                      selectedHospital.icuAvailable < 3 
                        ? isDark ? 'text-red-400' : 'text-red-500'
                        : isDark ? 'text-green-400' : 'text-green-500'
                    } mr-2`} />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <p className={`font-medium ${
                        selectedHospital.icuAvailable < 3 
                          ? isDark ? 'text-red-400' : 'text-red-600'
                          : isDark ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {selectedHospital.icuAvailable < 3 ? 'Critical' : 'Available'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Specialties</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedHospital.specialties.map(specialty => (
                      <span
                        key={specialty}
                        className={`text-xs px-2 py-1 rounded-full ${
                          isDark 
                            ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' 
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-4`}>
                  {selectedHospital.phone}
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    className="bg-medical-500 hover:bg-medical-600 text-white w-full flex items-center justify-center gap-2"
                    onClick={handleNavigate}
                    disabled={isNavigating}
                  >
                    {isNavigating ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                        <span>Navigating...</span>
                      </>
                    ) : (
                      <>
                        <Navigation size={16} />
                        <span>{t("navigate-to")}</span>
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleCall}
                    disabled={isCalling}
                  >
                    {isCalling ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                        <span>Calling...</span>
                      </>
                    ) : (
                      <>
                        <Phone size={16} />
                        <span>Call</span>
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      
      <Navbar />
    </div>
  );
};

export default Map;
