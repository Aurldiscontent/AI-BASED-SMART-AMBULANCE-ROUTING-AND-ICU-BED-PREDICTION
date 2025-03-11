
import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Loader2, Map, Zap, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import ActionButton from './ActionButton';

interface MapViewProps {
  userLocation?: { lat: number; lng: number };
  destinations?: Array<{
    id: string;
    name: string;
    location: { lat: number; lng: number };
  }>;
  onNavigate?: (id: string) => void;
  selectedHospitalId?: string | null;
  transportMode?: 'ground' | 'air';
}

const MapView: React.FC<MapViewProps> = ({
  userLocation = { lat: 12.9716, lng: 77.5946 }, // Default to Bangalore
  destinations = [],
  onNavigate,
  selectedHospitalId = null,
  transportMode = 'ground'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    time: string;
    traffic: 'light' | 'moderate' | 'heavy';
  }>({ distance: '3.2 km', time: '12 min', traffic: 'moderate' });

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
  
  // Generate a realistic path with multiple points
  const generatePath = () => {
    if (!selectedDestination) return [];
    
    const start = userLocation;
    const end = selectedDestination.location;
    
    // Create a semi-realistic path with some waypoints
    const waypoints = [];
    const pointCount = 5 + Math.floor(Math.random() * 3); // 5-7 points
    
    for (let i = 1; i < pointCount - 1; i++) {
      const ratio = i / pointCount;
      
      // Add some randomness to the path
      const jitter = 0.005 * (Math.random() - 0.5);
      
      waypoints.push({
        lat: start.lat + (end.lat - start.lat) * ratio + jitter,
        lng: start.lng + (end.lng - start.lng) * ratio + jitter
      });
    }
    
    return [start, ...waypoints, end];
  };
  
  const path = generatePath();
  
  // This is a placeholder for the actual map implementation
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md relative h-64 md:h-80 bg-blue-50">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
          <Loader2 className="w-8 h-8 text-medical-500 animate-spin mb-2" />
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      ) : (
        <>
          {/* Map simulation with gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100" />
          
          {/* Main roads */}
          <div className="absolute left-0 right-0 top-1/2 h-2 bg-gray-300 transform -translate-y-1/2" />
          <div className="absolute left-1/3 top-0 bottom-0 w-2 bg-gray-300" />
          
          {/* Secondary roads - more realistic grid pattern */}
          <div className="absolute left-0 right-0 top-1/4 h-1 bg-gray-200 transform -translate-y-1/2" />
          <div className="absolute left-0 right-0 top-3/4 h-1 bg-gray-200 transform -translate-y-1/2" />
          <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-gray-200" />
          <div className="absolute left-1/6 top-0 bottom-0 w-1 bg-gray-200" />
          
          {/* Route path */}
          {selectedDestination && (
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              {/* Create a smooth path */}
              <path 
                d={`M ${path.map((p, i) => {
                  // Convert lat/lng to relative x,y coordinates on the SVG
                  const x = ((p.lng - 77.5) / 0.3) * 100;
                  const y = (1 - (p.lat - 12.8) / 0.3) * 100;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}`}
                stroke={transportMode === 'air' ? '#3b82f6' : '#ef4444'} 
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={transportMode === 'air' ? "10,5" : "none"}
                fill="none"
                className={transportMode === 'air' ? "animate-pulse" : ""}
              />
              
              {/* Add direction arrows along the path */}
              {path.slice(1, -1).map((p, i) => {
                const x = ((p.lng - 77.5) / 0.3) * 100;
                const y = (1 - (p.lat - 12.8) / 0.3) * 100;
                return (
                  <circle 
                    key={`marker-${i}`} 
                    cx={x} 
                    cy={y} 
                    r="2" 
                    fill={transportMode === 'air' ? '#3b82f6' : '#ef4444'} 
                    className={transportMode === 'air' ? "animate-pulse" : ""}
                  />
                );
              })}
            </svg>
          )}
          
          {/* User location marker */}
          <div className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-blue-500/20 animate-pulse" />
              <div className="h-4 w-4 rounded-full bg-medical-500 border-2 border-white shadow-md" />
            </div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-sm">
              <span className="text-xs font-medium">Patient</span>
            </div>
          </div>
          
          {/* Hospital markers */}
          {destinations.slice(0, 5).map((dest, index) => {
            // Convert lat/lng to relative position
            const left = ((dest.location.lng - 77.5) / 0.3) * 100;
            const top = (1 - (dest.location.lat - 12.8) / 0.3) * 100;
            
            const isSelected = selectedDestination?.id === dest.id;
            
            return (
              <div 
                key={dest.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: `${left}%`, 
                  top: `${top}%` 
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 20, opacity: 0 }}
                  animate={{ scale: isSelected ? 1.2 : 1, y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className={`relative ${isSelected ? 'z-10' : 'z-5'}`}>
                    {isSelected && (
                      <div className="absolute -inset-2 rounded-full bg-medical-500/20 animate-pulse" />
                    )}
                    <MapPin 
                      className={`h-6 w-6 ${
                        isSelected 
                          ? 'text-medical-600 drop-shadow-md' 
                          : 'text-gray-500'
                      }`} 
                      strokeWidth={isSelected ? 2.5 : 2} 
                      fill={isSelected ? '#e0f2fe' : 'none'}
                    />
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-1.5 py-0.5 rounded shadow-sm text-[10px] whitespace-nowrap font-medium">
                      {dest.name}
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
          
          {/* Transport mode indicator */}
          {transportMode === 'air' && (
            <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow-md">
                🚁 Air Route
              </div>
            </div>
          )}
          
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
          
          {/* Route info card */}
          <div className="absolute top-4 left-4 glass-card px-3 py-2 rounded-lg text-sm">
            <div className="flex items-center">
              <Zap size={14} className="text-medical-500 mr-1" />
              <p className="font-medium">{routeInfo.distance} • {routeInfo.time}</p>
            </div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <Map size={12} className="mr-1" />
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
        </>
      )}
    </div>
  );
};

export default MapView;
