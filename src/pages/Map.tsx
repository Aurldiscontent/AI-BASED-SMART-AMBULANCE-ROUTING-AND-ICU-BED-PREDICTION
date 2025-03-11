
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';
import TopHeader from '@/components/ui/TopHeader';
import Navbar from '@/components/ui/Navbar';
import EnhancedMapView from '@/components/ui/EnhancedMapView';
import { MapPin, Navigation, Phone, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
  
  // Mock hospitals data
  const mockHospitals: Hospital[] = [
    { 
      id: '1', 
      name: 'City General Hospital', 
      location: { lat: 12.9716, lng: 77.5946 }, 
      icuAvailable: 5, 
      icuTotal: 20, 
      waitTime: 10,
      distance: '2.5 km',
      travelTime: '8 min',
      phone: '+91 80 2345 6789'
    },
    { 
      id: '2', 
      name: 'Memorial Medical Center', 
      location: { lat: 12.9516, lng: 77.6246 }, 
      icuAvailable: 8, 
      icuTotal: 15, 
      waitTime: 5,
      distance: '4.2 km',
      travelTime: '12 min',
      phone: '+91 80 2345 1234'
    },
    { 
      id: '3', 
      name: 'Community Hospital', 
      location: { lat: 12.9916, lng: 77.5746 }, 
      icuAvailable: 2, 
      icuTotal: 10, 
      waitTime: 15,
      distance: '3.8 km',
      travelTime: '14 min',
      phone: '+91 80 2345 5678'
    },
    { 
      id: '4', 
      name: 'St. Mary\'s Medical', 
      location: { lat: 12.9416, lng: 77.6046 }, 
      icuAvailable: 10, 
      icuTotal: 25, 
      waitTime: 8,
      distance: '5.1 km',
      travelTime: '18 min',
      phone: '+91 80 2345 9876'
    },
    { 
      id: '5', 
      name: 'Riverside Health Center', 
      location: { lat: 13.0016, lng: 77.5846 }, 
      icuAvailable: 3, 
      icuTotal: 12, 
      waitTime: 12,
      distance: '6.3 km',
      travelTime: '20 min',
      phone: '+91 80 2345 4321'
    },
  ];
  
  // Format destinations for the map component
  const destinations = mockHospitals.map(h => ({
    id: h.id,
    name: h.name,
    location: h.location
  }));
  
  // Find the selected hospital
  useEffect(() => {
    if (selectedHospitalId) {
      const hospital = mockHospitals.find(h => h.id === selectedHospitalId);
      if (hospital) {
        setSelectedHospital(hospital);
      }
    } else if (mockHospitals.length > 0) {
      // Default to the first hospital if none is selected
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
    
    // Simulate starting navigation
    toast({
      title: t("navigate-to"),
      description: `${t("navigate-to")} ${selectedHospital.name}`,
    });
    
    // Reset after a delay
    setTimeout(() => {
      setIsNavigating(false);
    }, 2000);
  };
  
  const handleCall = () => {
    if (!selectedHospital) return;
    
    setIsCalling(true);
    
    // Simulate calling hospital
    toast({
      title: t("calling-hospital"),
      description: `${t("connecting-to")} ${selectedHospital.name}`,
    });
    
    // Reset after a delay
    setTimeout(() => {
      setIsCalling(false);
    }, 2000);
  };
  
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center transition-all duration-500"
      style={{ 
        backgroundImage: `url('/lovable-uploads/7c8af1f3-722f-4ce8-a1f9-aa995983760e.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={`min-h-screen w-full backdrop-blur-sm transition-all duration-500 pb-20 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900/90 via-purple-900/70 to-gray-900/90' 
          : 'bg-gradient-to-br from-blue-50/90 via-purple-100/70 to-blue-50/90'
      }`}>
        {/* Top Header */}
        <TopHeader />
        
        <div className="container mx-auto px-4 pt-4 pb-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">{t("emergency-route")}</h1>
            
            {/* Map Section */}
            <div className="mb-6">
              <EnhancedMapView 
                destinations={destinations}
                selectedHospitalId={selectedHospital?.id}
                onHospitalClick={handleHospitalClick}
              />
            </div>
            
            {/* Hospital Info */}
            {selectedHospital && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">{selectedHospital.name}</h2>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span>{selectedHospital.distance}</span>
                      <span className="mx-2">•</span>
                      <Clock size={14} className="mr-1" />
                      <span>{selectedHospital.travelTime}</span>
                    </div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                    <div className="flex items-center space-x-1">
                      <span className="text-blue-700 dark:text-blue-300 font-medium">ICU:</span>
                      <span className={`font-bold ${
                        selectedHospital.icuAvailable < 3 
                          ? 'text-red-600 dark:text-red-400' 
                          : selectedHospital.icuAvailable < 6
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-green-600 dark:text-green-400'
                      }`}>
                        {selectedHospital.icuAvailable}/{selectedHospital.icuTotal}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700/30 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-amber-500 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Wait Time</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{selectedHospital.waitTime} minutes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700/30 p-2 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-medical-500 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <p className={`font-medium ${
                        selectedHospital.icuAvailable < 3 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        {selectedHospital.icuAvailable < 3 ? 'Critical' : 'Available'}
                      </p>
                    </div>
                  </div>
                </div>
                
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
          </motion.div>
        </div>
        
        {/* Bottom Navigation */}
        <Navbar />
      </div>
    </div>
  );
};

export default Map;
