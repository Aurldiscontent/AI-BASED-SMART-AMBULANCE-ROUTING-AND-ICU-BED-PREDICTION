
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
  
  // This is a placeholder for the actual map implementation
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md relative h-64 md:h-80 bg-blue-50 dark:bg-gray-800/30">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800/70">
          <Loader2 className="w-8 h-8 text-medical-500 animate-spin mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading map...</p>
        </div>
      ) : (
        <>
          {/* Enhanced Map simulation with more realistic road network */}
          <div className="absolute inset-0 bg-blue-50 dark:bg-gray-800/70" />
          
          {/* More realistic road network inspired by Google Maps */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Main highways */}
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#E0E0E0" strokeWidth="6" />
            <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#E0E0E0" strokeWidth="6" />
            
            {/* Secondary roads */}
            <line x1="10%" y1="25%" x2="90%" y2="25%" stroke="#EEEEEE" strokeWidth="3" />
            <line x1="10%" y1="75%" x2="90%" y2="75%" stroke="#EEEEEE" strokeWidth="3" />
            <line x1="25%" y1="10%" x2="25%" y2="90%" stroke="#EEEEEE" strokeWidth="3" />
            <line x1="75%" y1="10%" x2="75%" y2="90%" stroke="#EEEEEE" strokeWidth="3" />
            
            {/* Tertiary roads and connectors */}
            <line x1="10%" y1="35%" x2="90%" y2="35%" stroke="#F5F5F5" strokeWidth="2" />
            <line x1="10%" y1="65%" x2="90%" y2="65%" stroke="#F5F5F5" strokeWidth="2" />
            <line x1="35%" y1="10%" x2="35%" y2="90%" stroke="#F5F5F5" strokeWidth="2" />
            <line x1="65%" y1="10%" x2="65%" y2="90%" stroke="#F5F5F5" strokeWidth="2" />
            
            {/* Diagonal roads for more realism */}
            <line x1="10%" y1="10%" x2="40%" y2="40%" stroke="#EEEEEE" strokeWidth="3" />
            <line x1="60%" y1="60%" x2="90%" y2="90%" stroke="#EEEEEE" strokeWidth="3" />
            <line x1="10%" y1="90%" x2="40%" y2="60%" stroke="#EEEEEE" strokeWidth="3" />
            <line x1="60%" y1="40%" x2="90%" y2="10%" stroke="#EEEEEE" strokeWidth="3" />
            
            {/* Traffic visualization areas */}
            {showTraffic && (
              <>
                <rect x="50%" y="25%" width="25%" height="5%" fill="#FF4D4D" fillOpacity="0.4" /> {/* Heavy traffic */}
                <rect x="25%" y="50%" width="25%" height="5%" fill="#FFA500" fillOpacity="0.4" /> {/* Moderate traffic */}
                <rect x="50%" y="75%" width="25%" height="5%" fill="#4CAF50" fillOpacity="0.4" /> {/* Light traffic */}
              </>
            )}
          </svg>
          
          {/* Route path with realistic curve */}
          {selectedDestination && (
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <path 
                d={`M 30,50 Q 50,20 70,50`} 
                stroke={transportMode === 'air' ? '#3b82f6' : '#10b981'} 
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={transportMode === 'air' ? "10,5" : "none"}
                fill="none"
                className={transportMode === 'air' ? "animate-pulse" : ""}
              />
              
              {/* Add direction arrows along the path */}
              <circle cx="50" cy="35" r="2" fill={transportMode === 'air' ? '#3b82f6' : '#10b981'} />
            </svg>
          )}
          
          {/* Traffic congestion markers */}
          <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/30 animate-pulse">
              <AlertTriangle size={14} className="text-red-500 dark:text-red-400" />
            </div>
          </div>
          
          {/* User location marker */}
          <div className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-blue-500/20 animate-pulse" />
              <div className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white dark:border-gray-200 shadow-md" />
            </div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded-md shadow-sm">
              <span className="text-xs font-medium">Patient</span>
            </div>
          </div>
          
          {/* Hospital markers */}
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
                      <div className="absolute -inset-2 rounded-full bg-medical-500/20 animate-pulse" />
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
          
          {/* Route info card */}
          <div className="absolute top-4 left-4 glass-card px-3 py-2 rounded-lg text-sm">
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
