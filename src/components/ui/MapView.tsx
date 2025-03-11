
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
  onHospitalClick?: (id: string) => void;
  onTrafficClick?: () => void;
  onPathClick?: () => void;
}

const MapView: React.FC<MapViewProps> = ({
  userLocation = { lat: 12.9716, lng: 77.5946 }, // Default to Bangalore
  destinations = [],
  onNavigate,
  selectedHospitalId = null,
  transportMode = 'ground',
  onHospitalClick,
  onTrafficClick,
  onPathClick
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    time: string;
    traffic: 'light' | 'moderate' | 'heavy';
  }>({ distance: '3.2 km', time: '12 min', traffic: 'moderate' });
  const [showAlternateRoutes, setShowAlternateRoutes] = useState(false);

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
  
  // Generate alternate paths
  const generateAlternatePaths = () => {
    if (!selectedDestination) return [];
    
    // Create two alternate paths
    return [1, 2].map(() => {
      const alternatePath = [];
      const pointCount = 5 + Math.floor(Math.random() * 3);
      
      for (let i = 0; i < pointCount; i++) {
        const ratio = i / (pointCount - 1);
        
        // Add more randomness for alternate paths
        const jitter = 0.015 * (Math.random() - 0.5);
        const jitter2 = 0.015 * (Math.random() - 0.5);
        
        alternatePath.push({
          lat: userLocation.lat + (selectedDestination.location.lat - userLocation.lat) * ratio + jitter,
          lng: userLocation.lng + (selectedDestination.location.lng - userLocation.lng) * ratio + jitter2
        });
      }
      
      return alternatePath;
    });
  };
  
  const alternatePaths = generateAlternatePaths();
  
  // Simulate traffic congestion areas
  const trafficPoints = [
    {
      lat: userLocation.lat + (selectedDestination?.location.lat - userLocation.lat) * 0.3 + 0.005,
      lng: userLocation.lng + (selectedDestination?.location.lng - userLocation.lng) * 0.3 - 0.005,
      severity: 'heavy' as const
    },
    {
      lat: userLocation.lat + (selectedDestination?.location.lat - userLocation.lat) * 0.7 - 0.008,
      lng: userLocation.lng + (selectedDestination?.location.lng - userLocation.lng) * 0.7 + 0.008,
      severity: 'moderate' as const
    }
  ];
  
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
          {/* Map simulation with gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700" />
          
          {/* Main roads */}
          <div className="absolute left-0 right-0 top-1/2 h-2 bg-gray-300 dark:bg-gray-600 transform -translate-y-1/2" />
          <div className="absolute left-1/3 top-0 bottom-0 w-2 bg-gray-300 dark:bg-gray-600" />
          
          {/* Secondary roads - more realistic grid pattern */}
          <div className="absolute left-0 right-0 top-1/4 h-1 bg-gray-200 dark:bg-gray-500 transform -translate-y-1/2" />
          <div className="absolute left-0 right-0 top-3/4 h-1 bg-gray-200 dark:bg-gray-500 transform -translate-y-1/2" />
          <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-500" />
          <div className="absolute left-1/6 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-500" />
          
          {/* Alternate routes */}
          {showAlternateRoutes && selectedDestination && alternatePaths.map((alternatePath, idx) => (
            <svg key={`alt-path-${idx}`} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <path 
                d={`M ${alternatePath.map((p, i) => {
                  // Convert lat/lng to relative x,y coordinates on the SVG
                  const x = ((p.lng - 77.5) / 0.3) * 100;
                  const y = (1 - (p.lat - 12.8) / 0.3) * 100;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}`}
                stroke={idx === 0 ? '#9333ea' : '#2563eb'} 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="5,5"
                fill="none"
                opacity="0.6"
              />
            </svg>
          ))}
          
          {/* Route path */}
          {selectedDestination && (
            <svg 
              className="absolute inset-0 w-full h-full" 
              style={{ pointerEvents: 'none' }}
              onClick={() => onPathClick && onPathClick()}
            >
              {/* Create a smooth path */}
              <path 
                d={`M ${path.map((p, i) => {
                  // Convert lat/lng to relative x,y coordinates on the SVG
                  const x = ((p.lng - 77.5) / 0.3) * 100;
                  const y = (1 - (p.lat - 12.8) / 0.3) * 100;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}`}
                stroke={transportMode === 'air' ? '#3b82f6' : '#10b981'} 
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={transportMode === 'air' ? "10,5" : "none"}
                fill="none"
                className={`${transportMode === 'air' ? "animate-pulse" : ""} cursor-pointer`}
                onClick={() => {
                  setShowAlternateRoutes(!showAlternateRoutes);
                  onPathClick && onPathClick();
                }}
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
                    fill={transportMode === 'air' ? '#3b82f6' : '#10b981'} 
                    className={transportMode === 'air' ? "animate-pulse" : ""}
                  />
                );
              })}
            </svg>
          )}
          
          {/* Traffic congestion markers */}
          {trafficPoints.map((point, idx) => {
            const x = ((point.lng - 77.5) / 0.3) * 100;
            const y = (1 - (point.lat - 12.8) / 0.3) * 100;
            
            return (
              <div 
                key={`traffic-${idx}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => onTrafficClick && onTrafficClick()}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  point.severity === 'heavy' 
                    ? 'bg-red-100 dark:bg-red-900/30' 
                    : 'bg-amber-100 dark:bg-amber-900/30'
                } animate-pulse`}>
                  <AlertTriangle 
                    size={14} 
                    className={
                      point.severity === 'heavy' 
                        ? 'text-red-500 dark:text-red-400' 
                        : 'text-amber-500 dark:text-amber-400'
                    } 
                  />
                </div>
              </div>
            );
          })}
          
          {/* User location marker */}
          <div 
            className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            onClick={() => {
              // Show nearest hospitals
              const sortedDestinations = [...destinations].sort((a, b) => {
                const distA = Math.sqrt(
                  Math.pow(a.location.lat - userLocation.lat, 2) + 
                  Math.pow(a.location.lng - userLocation.lng, 2)
                );
                const distB = Math.sqrt(
                  Math.pow(b.location.lat - userLocation.lat, 2) + 
                  Math.pow(b.location.lng - userLocation.lng, 2)
                );
                return distA - distB;
              });
              
              if (sortedDestinations.length > 0) {
                onHospitalClick && onHospitalClick(sortedDestinations[0].id);
              }
            }}
          >
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
            // Convert lat/lng to relative position
            const left = ((dest.location.lng - 77.5) / 0.3) * 100;
            const top = (1 - (dest.location.lat - 12.8) / 0.3) * 100;
            
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
          <div 
            className="absolute top-4 left-4 glass-card px-3 py-2 rounded-lg text-sm cursor-pointer"
            onClick={() => onPathClick && onPathClick()}
          >
            <div className="flex items-center">
              <Zap size={14} className="text-medical-500 mr-1" />
              <p className="font-medium">{routeInfo.distance} • {routeInfo.time}</p>
            </div>
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1">
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
