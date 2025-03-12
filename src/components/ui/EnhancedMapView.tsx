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
          {/* Real map image background */}
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/14c7b14a-212b-4984-9c54-32bd32be1010.png" 
              alt="Real-time map" 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${isDark ? 'bg-gray-900/30' : 'bg-transparent'}`} />
          </div>
          
          {/* Overlay for traffic indicators and routes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Primary route - animated blue path showing the fastest route */}
            {selectedDestination && (
              <>
                {/* Main route line - blue pulse animation */}
                <path 
                  d="M 380,520 L 375,490 L 370,460 L 365,430 L 358,400 L 350,370 L 345,340 L 340,310 L 335,280 L 330,250 L 325,220"
                  stroke={transportMode === 'air' 
                    ? isDark ? '#3b82f6' : '#2563eb' 
                    : isDark ? '#10b981' : '#1d4ed8'} 
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={transportMode === 'air' ? "10,5" : "none"}
                  className="animate-pulse"
                >
                  <animate attributeName="stroke-opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                </path>
                
                {/* Moving dot along route */}
                <circle r="5" fill="#3b82f6">
                  <animateMotion
                    path="M 380,520 L 375,490 L 370,460 L 365,430 L 358,400 L 350,370 L 345,340 L 340,310 L 335,280 L 330,250 L 325,220"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </circle>
                
                {/* Traffic congestion spots */}
                <circle cx="365" cy="430" r="6" fill="rgba(220, 38, 38, 0.7)">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                </circle>
                
                <circle cx="345" cy="340" r="5" fill="rgba(245, 158, 11, 0.7)">
                  <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
                </circle>
              </>
            )}
          </svg>
          
          {/* User location marker (ambulance) - origin point */}
          <div className="absolute left-[48%] top-[65%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-blue-500/20 animate-ping opacity-50" />
              <div className="absolute -inset-3 rounded-full bg-blue-500/30 animate-pulse" />
              <div className={`h-6 w-6 rounded-full bg-blue-600 border-2 ${
                isDark ? 'border-gray-800' : 'border-white'
              } shadow-md flex items-center justify-center`}>
                <Navigation size={12} className="text-white" />
              </div>
            </div>
            <div className={`absolute top-7 left-1/2 transform -translate-x-1/2 ${
              isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
            } px-2 py-1 rounded-md shadow-sm text-xs font-medium`}>
              Ambulance
            </div>
          </div>
          
          {/* Destination markers */}
          {destinations.map((dest, index) => {
            // Adjusted positions to match the NYC map
            const positions = [
              { left: "42%", top: "28%" },  // Spring St area
              { left: "48%", top: "38%" },  // Little Italy
              { left: "44%", top: "46%" },  // Canal St
              { left: "40%", top: "52%" },  // Chambers area
              { left: "38%", top: "58%" },  // City Hall area
            ];
            
            const position = positions[index % positions.length];
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
                  left: position.left, 
                  top: position.top 
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

          {/* Map attribution */}
          <div className="absolute bottom-1 right-1 text-[8px] text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-black/30 px-1 rounded">
            © OpenStreetMap contributors
          </div>
        </>
      )}
    </div>
  );
};

export default EnhancedMapView;
