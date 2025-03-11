
import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Loader2, Map, Zap, AlertTriangle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import ActionButton from './ActionButton';

interface EnhancedMapViewProps {
  userLocation?: { lat: number; lng: number };
  destinations?: Array<{
    id: string;
    name: string;
    location: { lat: number; lng: number };
  }>;
  onNavigate?: (id: string) => void;
  selectedHospitalId?: string | null;
  transportMode?: 'ground' | 'air';
  onHospitalClick?: (id: string) => void;
}

const EnhancedMapView: React.FC<EnhancedMapViewProps> = ({
  userLocation = { lat: 12.9716, lng: 77.5946 }, // Default to Bangalore
  destinations = [],
  onNavigate,
  selectedHospitalId = null,
  transportMode = 'ground',
  onHospitalClick,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    time: string;
    traffic: 'light' | 'moderate' | 'heavy';
  }>({ distance: '3.2 km', time: '12 min', traffic: 'moderate' });
  const [showTraffic, setShowTraffic] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Select a destination based on selectedHospitalId or the first available one
  const selectedDestination = selectedHospitalId 
    ? destinations.find(d => d.id === selectedHospitalId) 
    : destinations[0];
  
  // In a real app, this would be calculated based on the actual route
  const calculateRouteInfo = () => {
    if (!selectedDestination) return;
    
    // Simple mock calculation (would use actual routing API in real app)
    const latDiff = Math.abs(userLocation.lat - selectedDestination.location.lat);
    const lngDiff = Math.abs(userLocation.lng - selectedDestination.location.lng);
    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111; // Rough km calculation
    
    const trafficFactor = Math.random();
    let traffic: 'light' | 'moderate' | 'heavy' = 'moderate';
    if (trafficFactor < 0.3) traffic = 'light';
    else if (trafficFactor > 0.7) traffic = 'heavy';
    
    const speedFactor = transportMode === 'air' ? 0.3 : (traffic === 'light' ? 1 : traffic === 'moderate' ? 1.5 : 2.2);
    const timeInMinutes = Math.round(distance * speedFactor);
    
    setRouteInfo({
      distance: `${distance.toFixed(1)} km`,
      time: `${timeInMinutes} min`,
      traffic
    });
  };
  
  useEffect(() => {
    if (!isLoading && selectedDestination) {
      calculateRouteInfo();
    }
  }, [isLoading, selectedDestination, transportMode]);
  
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md relative h-64 md:h-80 bg-blue-50 dark:bg-gray-800/30">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800/70">
          <Loader2 className="w-8 h-8 text-medical-500 animate-spin mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading map...</p>
        </div>
      ) : (
        <>
          {/* Google Maps inspired background with grid */}
          <div className="absolute inset-0 bg-blue-50 dark:bg-gray-800/70" />
          
          {/* Enhanced road network inspired by Google Maps */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Highway system */}
            <path 
              d="M 10,50 L 90,50 M 50,10 L 50,90" 
              stroke="#E0E0E0" 
              strokeWidth="6" 
              strokeLinecap="round"
            />
            
            {/* Major arterial roads */}
            <path 
              d="M 10,25 L 90,25 M 10,75 L 90,75 M 25,10 L 25,90 M 75,10 L 75,90" 
              stroke="#EEEEEE" 
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Secondary roads and connectors */}
            <path 
              d="M 10,35 L 90,35 M 10,65 L 90,65 M 35,10 L 35,90 M 65,10 L 65,90" 
              stroke="#F5F5F5" 
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Local streets with curved connections */}
            <path 
              d="M 20,20 Q 30,30 40,40 M 60,60 Q 70,70 80,80 M 20,80 Q 30,70 40,60 M 60,40 Q 70,30 80,20" 
              stroke="#F5F5F5" 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Traffic visualization */}
            {showTraffic && (
              <>
                <rect x="50%" y="25%" width="25%" height="5%" rx="2" fill="#FF4D4D" fillOpacity="0.4" /> {/* Heavy traffic */}
                <rect x="25%" y="50%" width="25%" height="5%" rx="2" fill="#FFA500" fillOpacity="0.4" /> {/* Moderate traffic */}
                <rect x="50%" y="75%" width="25%" height="5%" rx="2" fill="#4CAF50" fillOpacity="0.4" /> {/* Light traffic */}
                
                {/* Traffic indicators with pulsing effect */}
                <circle cx="65%" cy="27.5%" r="2" fill="#FF4D4D" className="animate-pulse">
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="40%" cy="52.5%" r="2" fill="#FFA500" className="animate-pulse">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
              </>
            )}
          </svg>
          
          {/* Route path with improved curve and animation */}
          {selectedDestination && (
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <path 
                d={`M 30,50 C 40,30 60,30 70,50`}
                stroke={transportMode === 'air' ? '#3b82f6' : '#10b981'} 
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={transportMode === 'air' ? "10,5" : "none"}
                fill="none"
                className={transportMode === 'air' ? "animate-pulse" : ""}
              >
                {transportMode !== 'air' && (
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="100" 
                    to="0" 
                    dur="3s" 
                    repeatCount="indefinite" 
                  />
                )}
              </path>
              
              {/* Direction arrows */}
              <circle cx="50" cy="36" r="2" fill={transportMode === 'air' ? '#3b82f6' : '#10b981'}>
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          )}
          
          {/* Traffic congestion markers */}
          <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/30 animate-pulse">
              <AlertTriangle size={14} className="text-red-500 dark:text-red-400" />
            </div>
          </div>
          
          {/* User location marker - patient position */}
          <div className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-blue-500/20 animate-ping opacity-50" />
              <div className="absolute -inset-2 rounded-full bg-blue-500/30 animate-pulse" />
              <div className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white dark:border-gray-200 shadow-md" />
            </div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded-md shadow-sm">
              <span className="text-xs font-medium">Patient</span>
            </div>
          </div>
          
          {/* Hospital markers with enhanced styling */}
          {destinations.slice(0, 5).map((dest, index) => {
            // Convert to relative position for this example
            const left = 30 + (index * 15);
            const top = 30 + (index * 10);
            
            const isSelected = selectedDestination?.id === dest.id;
            
            return (
              <div 
                key={dest.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={{ 
                  left: `${left}%`, 
                  top: `${top}%` 
                }}
                onClick={() => onHospitalClick && onHospitalClick(dest.id)}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 20, opacity: 0 }}
                  animate={{ scale: isSelected ? 1.2 : 1, y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.15 }}
                >
                  <div className={`relative ${isSelected ? 'z-10' : 'z-5'}`}>
                    {isSelected && (
                      <div className="absolute -inset-3 rounded-full bg-medical-500/20 animate-pulse" />
                    )}
                    <MapPin 
                      className={`h-6 w-6 ${
                        isSelected 
                          ? 'text-medical-600 drop-shadow-md' 
                          : index % 3 === 0 ? 'text-red-500' : 'text-green-500'
                      }`} 
                      strokeWidth={isSelected ? 2.5 : 2} 
                      fill={isSelected ? '#e0f2fe' : index % 3 === 0 ? '#fee2e2' : '#dcfce7'}
                    />
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded shadow-sm text-[10px] whitespace-nowrap font-medium">
                      {dest.name}
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
          
          {/* Enhanced route info card */}
          <div className="absolute top-4 left-4 glass-card px-3 py-2 rounded-lg text-sm backdrop-blur-md">
            <div className="flex items-center">
              <Zap size={14} className="text-medical-500 mr-1" />
              <p className="font-medium">{routeInfo.distance} • {routeInfo.time}</p>
            </div>
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1">
              <Clock size={12} className="mr-1" />
              <span>
                {routeInfo.traffic === 'light' 
                  ? 'Light traffic' 
                  : routeInfo.traffic === 'moderate' 
                    ? 'Moderate traffic' 
                    : 'Heavy traffic'
                }
              </span>
              {routeInfo.traffic === 'heavy' && (
                <AlertTriangle size={10} className="ml-1 text-amber-500" />
              )}
            </div>
          </div>
          
          {/* Navigation button */}
          <div className="absolute bottom-4 right-4">
            <ActionButton
              variant="medical"
              icon={<Navigation size={18} />}
              onClick={() => selectedDestination && onNavigate?.(selectedDestination.id)}
            >
              Start Navigation
            </ActionButton>
          </div>
        </>
      )}
    </div>
  );
};

export default EnhancedMapView;
