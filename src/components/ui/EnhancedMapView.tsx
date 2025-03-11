
import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Loader2, Map, Zap, AlertTriangle, Clock, Building, BadgeAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import ActionButton from './ActionButton';
import { useToast } from '@/hooks/use-toast';

interface EnhancedMapViewProps {
  userLocation?: { lat: number; lng: number };
  destinations?: Array<{
    id: string;
    name: string;
    location: { lat: number; lng: number };
    icuAvailable?: number;
    icuTotal?: number;
    waitTime?: number;
    specialties?: string[];
  }>;
  onNavigate?: (id: string) => void;
  selectedHospitalId?: string | null;
  transportMode?: 'ground' | 'air';
  onHospitalClick?: (id: string) => void;
  theme?: string;
}

const EnhancedMapView: React.FC<EnhancedMapViewProps> = ({
  userLocation = { lat: 12.9716, lng: 77.5946 }, // Default to Bangalore
  destinations = [],
  onNavigate,
  selectedHospitalId = null,
  transportMode = 'ground',
  onHospitalClick,
  theme = 'dark',
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    time: string;
    traffic: 'light' | 'moderate' | 'heavy';
  }>({ distance: '3.2 km', time: '12 min', traffic: 'moderate' });
  const [showTraffic, setShowTraffic] = useState(true);
  const [selectedHospitalDetails, setSelectedHospitalDetails] = useState<{
    name: string;
    icuAvailable?: number;
    icuTotal?: number;
    waitTime?: number;
    specialties?: string[];
  } | null>(null);

  const isDark = theme === 'dark';

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
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
      
      // Set selected hospital details
      if (selectedDestination) {
        setSelectedHospitalDetails({
          name: selectedDestination.name,
          icuAvailable: selectedDestination.icuAvailable,
          icuTotal: selectedDestination.icuTotal,
          waitTime: selectedDestination.waitTime,
          specialties: selectedDestination.specialties
        });
      }
    }
  }, [isLoading, selectedDestination, transportMode]);
  
  const handleNavigateClick = () => {
    if (selectedDestination) {
      onNavigate?.(selectedDestination.id);
      toast({
        title: "Navigation Started",
        description: `Route to ${selectedDestination.name} has been calculated. ETA: ${routeInfo.time}`,
      });
    }
  };
  
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-md relative h-64 md:h-80 border border-gray-200 dark:border-gray-800">
      {isLoading ? (
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${
          isDark ? 'bg-gray-900' : 'bg-gray-100'
        }`}>
          <Loader2 className={`w-8 h-8 ${isDark ? 'text-blue-500' : 'text-blue-600'} animate-spin mb-2`} />
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading map...</p>
        </div>
      ) : (
        <>
          {/* Google Maps inspired background with grid */}
          <div className={`absolute inset-0 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`} />
          
          {/* Enhanced road network inspired by Google Maps */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Highway system */}
            <path 
              d="M 10,50 L 90,50 M 50,10 L 50,90" 
              stroke={isDark ? "#333333" : "#cccccc"} 
              strokeWidth="6" 
              strokeLinecap="round"
            />
            
            {/* Major arterial roads */}
            <path 
              d="M 10,25 L 90,25 M 10,75 L 90,75 M 25,10 L 25,90 M 75,10 L 75,90" 
              stroke={isDark ? "#2A2A2A" : "#dddddd"} 
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Secondary roads and connectors */}
            <path 
              d="M 10,35 L 90,35 M 10,65 L 90,65 M 35,10 L 35,90 M 65,10 L 65,90" 
              stroke={isDark ? "#252525" : "#e5e5e5"} 
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Local streets with curved connections */}
            <path 
              d="M 20,20 Q 30,30 40,40 M 60,60 Q 70,70 80,80 M 20,80 Q 30,70 40,60 M 60,40 Q 70,30 80,20" 
              stroke={isDark ? "#222222" : "#eeeeee"} 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Traffic visualization */}
            {showTraffic && (
              <>
                <rect x="50%" y="25%" width="25%" height="5%" rx="2" 
                  fill={isDark ? "#FF4D4D" : "#ef4444"} 
                  fillOpacity={isDark ? "0.4" : "0.2"} /> {/* Heavy traffic */}
                <rect x="25%" y="50%" width="25%" height="5%" rx="2" 
                  fill={isDark ? "#FFA500" : "#f97316"} 
                  fillOpacity={isDark ? "0.4" : "0.2"} /> {/* Moderate traffic */}
                <rect x="50%" y="75%" width="25%" height="5%" rx="2" 
                  fill={isDark ? "#4CAF50" : "#22c55e"} 
                  fillOpacity={isDark ? "0.4" : "0.2"} /> {/* Light traffic */}
                
                {/* Traffic indicators with pulsing effect */}
                <circle cx="65%" cy="27.5%" r="2" fill={isDark ? "#FF4D4D" : "#ef4444"} className="animate-pulse">
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="40%" cy="52.5%" r="2" fill={isDark ? "#FFA500" : "#f97316"} className="animate-pulse">
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
                stroke={transportMode === 'air' 
                  ? isDark ? '#3b82f6' : '#2563eb' 
                  : isDark ? '#10b981' : '#059669'} 
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
              <circle cx="50" cy="36" r="2" fill={transportMode === 'air' 
                ? isDark ? '#3b82f6' : '#2563eb' 
                : isDark ? '#10b981' : '#059669'}>
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          )}
          
          {/* Traffic congestion markers */}
          <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
              isDark ? 'bg-red-900/30' : 'bg-red-100'
            } animate-pulse`}>
              <AlertTriangle size={14} className={isDark ? "text-red-400" : "text-red-600"} />
            </div>
          </div>
          
          {/* User location marker - patient position */}
          <div className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-blue-500/20 animate-ping opacity-50" />
              <div className="absolute -inset-2 rounded-full bg-blue-500/30 animate-pulse" />
              <div className={`h-4 w-4 rounded-full bg-blue-500 border-2 ${
                isDark ? 'border-gray-800' : 'border-white'
              } shadow-md`} />
            </div>
            <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 ${
              isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
            } px-2 py-1 rounded-md shadow-sm text-xs font-medium`}>
              Patient
            </div>
          </div>
          
          {/* Hospital markers with enhanced styling */}
          {destinations.map((dest, index) => {
            // Convert to relative position for this example
            const positionMultiplier = destinations.length <= 5 ? 1 : 0.6;
            const left = 25 + ((index % 5) * 12 * positionMultiplier);
            const top = 20 + (Math.floor(index / 5) * 25) + ((index % 3) * 5);
            
            const isSelected = selectedDestination?.id === dest.id;
            
            // Determine marker color based on ICU availability
            let markerColor = 'text-green-400';
            let markerFill = isDark ? '#14532d' : '#dcfce7';
            
            if (dest.icuAvailable && dest.icuTotal) {
              const ratio = dest.icuAvailable / dest.icuTotal;
              if (ratio < 0.2) {
                markerColor = isDark ? 'text-red-400' : 'text-red-600';
                markerFill = isDark ? '#7f1d1d' : '#fee2e2';
              } else if (ratio < 0.5) {
                markerColor = isDark ? 'text-amber-400' : 'text-amber-600';
                markerFill = isDark ? '#78350f' : '#fef3c7';
              }
            }
            
            if (isSelected) {
              markerColor = isDark ? 'text-blue-400' : 'text-blue-600';
              markerFill = isDark ? '#1e3a8a' : '#dbeafe';
            }
            
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
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ scale: 1.15 }}
                >
                  <div className={`relative ${isSelected ? 'z-10' : 'z-5'}`}>
                    {isSelected && (
                      <div className="absolute -inset-3 rounded-full bg-blue-500/20 animate-pulse" />
                    )}
                    <MapPin 
                      className={`h-6 w-6 ${markerColor}`} 
                      strokeWidth={isSelected ? 2.5 : 2} 
                      fill={markerFill}
                    />
                    
                    {/* ICU Beds Indicator */}
                    {dest.icuAvailable !== undefined && (
                      <div className={`absolute -top-1 -right-1 h-3 w-3 rounded-full flex items-center justify-center text-[8px] font-bold ${
                        dest.icuAvailable > 5 
                          ? isDark ? 'bg-green-700 text-green-200' : 'bg-green-600 text-white' 
                          : dest.icuAvailable > 0 
                            ? isDark ? 'bg-amber-700 text-amber-200' : 'bg-amber-600 text-white'
                            : isDark ? 'bg-red-700 text-red-200' : 'bg-red-600 text-white'
                      } border ${isDark ? 'border-gray-800' : 'border-white'}`}>
                        {dest.icuAvailable}
                      </div>
                    )}
                  </div>
                  
                  {isSelected && (
                    <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 ${
                      isDark ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-white text-gray-700 border-gray-200'
                    } px-1.5 py-0.5 rounded shadow-sm text-[10px] whitespace-nowrap font-medium border`}>
                      {dest.name}
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
          
          {/* Enhanced route info card */}
          <div className={`absolute top-4 left-4 px-3 py-2 rounded-lg text-sm ${
            isDark ? 'backdrop-blur-md bg-gray-800/80 border border-gray-700' : 'backdrop-blur-md bg-white/80 border border-gray-200'
          }`}>
            <div className="flex items-center">
              <Zap size={14} className={isDark ? "text-blue-400" : "text-blue-600"} />
              <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{routeInfo.distance} • {routeInfo.time}</p>
            </div>
            <div className={`flex items-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
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
                <AlertTriangle size={10} className={isDark ? "ml-1 text-amber-400" : "ml-1 text-amber-600"} />
              )}
            </div>
          </div>
          
          {/* Selected hospital info */}
          {selectedHospitalDetails && (
            <div className={`absolute bottom-4 left-4 right-20 px-3 py-2 rounded-lg text-sm ${
              isDark ? 'backdrop-blur-md bg-gray-800/90 border border-gray-700' : 'backdrop-blur-md bg-white/90 border border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building size={14} className={isDark ? "text-blue-400 mr-1" : "text-blue-600 mr-1"} />
                  <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{selectedHospitalDetails.name}</p>
                </div>
                
                {selectedHospitalDetails.icuAvailable !== undefined && (
                  <div className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                    (selectedHospitalDetails.icuAvailable / (selectedHospitalDetails.icuTotal || 1)) > 0.5 
                      ? isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-700'
                      : (selectedHospitalDetails.icuAvailable / (selectedHospitalDetails.icuTotal || 1)) > 0.2
                        ? isDark ? 'bg-amber-900/40 text-amber-400' : 'bg-amber-100 text-amber-700'
                        : isDark ? 'bg-red-900/40 text-red-400' : 'bg-red-100 text-red-700'
                  }`}>
                    ICU: {selectedHospitalDetails.icuAvailable}/{selectedHospitalDetails.icuTotal}
                  </div>
                )}
              </div>
              
              {selectedHospitalDetails.waitTime !== undefined && (
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1 flex items-center`}>
                  <Clock size={10} className="mr-1" />
                  <span>Wait time: {selectedHospitalDetails.waitTime} min</span>
                </div>
              )}
              
              {selectedHospitalDetails.specialties && selectedHospitalDetails.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedHospitalDetails.specialties.map(specialty => (
                    <span 
                      key={specialty}
                      className={`text-[8px] px-1 py-0.5 rounded-full ${
                        isDark 
                          ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' 
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Navigation button */}
          <div className="absolute bottom-4 right-4">
            <button
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 ${
                isDark 
                  ? 'bg-blue-700 hover:bg-blue-600 text-white' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
              onClick={handleNavigateClick}
            >
              <Navigation size={14} />
              <span>Navigate</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EnhancedMapView;
