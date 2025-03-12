import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Clock, Map, Zap, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import MapView from './MapView';
import ActionButton from './ActionButton';

interface Destination {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  icuAvailable: number;
  icuTotal: number;
  waitTime: number;
  specialties: string[];
}

interface EnhancedMapViewProps {
  destinations?: Array<Destination>;
  selectedHospitalId?: string | null;
  onHospitalClick?: (id: string) => void;
  transportMode?: 'ground' | 'air';
  theme?: string;
  mapImagePath?: string;
  onNavigate?: (id: string) => void;
  showPathFromUser?: boolean;
  userLocation?: { lat: number; lng: number };
}

const EnhancedMapView: React.FC<EnhancedMapViewProps> = ({
  destinations = [],
  selectedHospitalId = null,
  onHospitalClick,
  transportMode = 'ground',
  theme = 'light',
  mapImagePath = '/placeholder.svg',
  onNavigate,
  showPathFromUser = false,
  userLocation = { lat: 40.7128, lng: -74.0060 }
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showTraffic, setShowTraffic] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    time: string;
  }>({ distance: '10 km', time: '3 min' });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (destinations.length > 0) {
      const selected = selectedHospitalId 
        ? destinations.find(d => d.id === selectedHospitalId) 
        : destinations[0];
      
      if (selected) {
        setSelectedDestination(selected);
        
        let distance = 10;
        let timeInMinutes = 3;
        
        if (transportMode === 'air') {
          timeInMinutes = 2;
        }
        
        setRouteInfo({
          distance: `${distance} km`,
          time: `${timeInMinutes} min`
        });
      }
    }
  }, [selectedHospitalId, destinations, transportMode]);
  
  const handleHospitalMarkerClick = (id: string) => {
    if (onHospitalClick) onHospitalClick(id);
  };
  
  const handleNavigate = () => {
    if (selectedDestination && onNavigate) {
      onNavigate(selectedDestination.id);
    }
  };
  
  return (
    <div className={`relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-medical-500 animate-spin mb-2" />
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading map...</p>
          </div>
        </div>
      ) : (
        <>
          <img 
            src={mapImagePath} 
            alt="Map" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {destinations.map((hospital, index) => {
            const offsetFactors = [
              { x: 0.45, y: 0.5 },  // Near center
              { x: 0.6, y: 0.35 },   // Upper right
              { x: 0.3, y: 0.6 },    // Lower left
              { x: 0.7, y: 0.62 },   // Lower right
              { x: 0.25, y: 0.35 },  // Upper left
            ];
            
            const position = offsetFactors[index % offsetFactors.length];
            const isSelected = selectedDestination?.id === hospital.id;
            
            return (
              <motion.div
                key={hospital.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="absolute cursor-pointer z-10"
                style={{ 
                  left: `${position.x * 100}%`, 
                  top: `${position.y * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => handleHospitalMarkerClick(hospital.id)}
              >
                <div className={`${isSelected ? 'scale-125' : ''} transition-transform duration-200`}>
                  <div className="relative">
                    {isSelected && (
                      <div className="absolute -inset-2 rounded-full bg-medical-500/20 animate-pulse"></div>
                    )}
                    <MapPin 
                      className={`h-6 w-6 ${
                        isSelected ? 'text-medical-500' : 
                          hospital.icuAvailable < 3 ? 'text-red-500' : 
                          hospital.icuAvailable < 6 ? 'text-amber-500' : 
                          'text-green-500'
                      }`}
                      fill={isSelected ? "#f0faff" : 
                        hospital.icuAvailable < 3 ? "#fef2f2" : 
                        hospital.icuAvailable < 6 ? "#fffbeb" : 
                        "#f0fdf4"}
                    />
                  </div>
                  
                  {isSelected && (
                    <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } px-2 py-0.5 rounded-full shadow-md text-xs whitespace-nowrap`}>
                      {hospital.name}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
          
          {showPathFromUser && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute z-20"
              style={{ 
                left: '20%', 
                top: '70%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-blue-500/30 animate-pulse"></div>
                <div className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white dark:border-gray-200 shadow-md"></div>
              </div>
              <div className={`absolute top-5 left-1/2 transform -translate-x-1/2 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } px-2 py-0.5 rounded-full shadow-md text-xs`}>
                You
              </div>
            </motion.div>
          )}
          
          {showPathFromUser && selectedDestination && (
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none', zIndex: 5 }}>
              {(() => {
                const index = destinations.findIndex(d => d.id === selectedDestination.id);
                if (index === -1) return null;
                
                const offsetFactors = [
                  { x: 0.45, y: 0.5 },  // Near center
                  { x: 0.6, y: 0.35 },   // Upper right
                  { x: 0.3, y: 0.6 },    // Lower left
                  { x: 0.7, y: 0.62 },   // Lower right
                  { x: 0.25, y: 0.35 },  // Upper left
                ];
                
                const position = offsetFactors[index % offsetFactors.length];
                
                const userX = 20;
                const userY = 70;
                const hospitalX = position.x * 100;
                const hospitalY = position.y * 100;
                
                const cpX = (userX + hospitalX) / 2 + 10;
                const cpY = (userY + hospitalY) / 2 - 10;
                
                return (
                  <path
                    d={`M ${userX} ${userY} Q ${cpX} ${cpY} ${hospitalX} ${hospitalY}`}
                    stroke={transportMode === 'air' ? '#3b82f6' : '#10b981'}
                    strokeWidth="3"
                    strokeDasharray={transportMode === 'air' ? "5,5" : "none"}
                    fill="none"
                    strokeLinecap="round"
                    className={transportMode === 'air' ? "animate-pulse" : ""}
                  />
                );
              })()}
            </svg>
          )}
          
          {transportMode === 'air' && (
            <div className="absolute left-1/2 top-5 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow-md">
              🚁 Air Route
            </div>
          )}
          
          {selectedDestination && (
            <div className={`absolute top-3 left-3 ${
              theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'
            } backdrop-blur-sm px-3 py-2 rounded-lg text-sm z-30`}>
              <div className="flex items-center">
                <Zap size={14} className="text-medical-500 mr-1" />
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {routeInfo.distance} • {routeInfo.time}
                </p>
              </div>
              {showTraffic && (
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1">
                  <Map size={12} className="mr-1" />
                  <span>Moderate traffic</span>
                </div>
              )}
            </div>
          )}
          
          {selectedDestination && (
            <div className="absolute bottom-3 right-3 z-30">
              <ActionButton
                variant="medical"
                icon={<Navigation size={18} />}
                onClick={handleNavigate}
              >
                Navigate
              </ActionButton>
            </div>
          )}
          
          {showTraffic && (
            <div className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center animate-pulse">
                <AlertTriangle size={14} className="text-amber-500 dark:text-amber-400" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EnhancedMapView;
