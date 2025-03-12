import React, { useEffect, useState, useRef } from 'react';
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
  customMapImage?: string;
  centerMapOnSelection?: boolean;
  activeNavigation?: boolean;
  showTraffic?: boolean;
  onMultiDestinationSelect?: (ids: string[]) => void;
  multiSelectionMode?: boolean;
}

type TrafficSeverity = 'light' | 'moderate' | 'heavy';

const MapView: React.FC<MapViewProps> = ({
  userLocation = { lat: 12.9716, lng: 77.5946 }, // Default to Bangalore
  destinations = [],
  onNavigate,
  selectedHospitalId = null,
  transportMode = 'ground',
  onHospitalClick,
  onTrafficClick,
  onPathClick,
  customMapImage = '/lovable-uploads/c26b6999-d1cf-40dd-b57c-d2b5cce67cd0.png',
  centerMapOnSelection = true,
  activeNavigation = false,
  showTraffic = true,
  onMultiDestinationSelect,
  multiSelectionMode = false
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    time: string;
    traffic: TrafficSeverity;
  }>({ distance: '10 km', time: '3 min', traffic: 'moderate' });
  const [showAlternateRoutes, setShowAlternateRoutes] = useState(false);
  const [navigationActive, setNavigationActive] = useState(false);
  const [routeProgress, setRouteProgress] = useState(0);
  const [mapCenter, setMapCenter] = useState<{x: number, y: number}>({x: 175, y: 150});
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (activeNavigation) {
      setNavigationActive(true);
      
      setRouteProgress(0);
      const interval = setInterval(() => {
        setRouteProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      
      return () => clearInterval(interval);
    } else {
      setNavigationActive(false);
      setRouteProgress(0);
    }
  }, [activeNavigation]);
  
  const toggleDestinationSelection = (id: string) => {
    if (multiSelectionMode) {
      setSelectedDestinations(prev => {
        if (prev.includes(id)) {
          return prev.filter(destId => destId !== id);
        } else {
          return [...prev, id];
        }
      });
    } else if (onHospitalClick) {
      onHospitalClick(id);
    }
  };
  
  const handleMultiDestinationNavigate = () => {
    if (onMultiDestinationSelect && selectedDestinations.length > 0) {
      onMultiDestinationSelect(selectedDestinations);
    }
  };
  
  useEffect(() => {
    if (centerMapOnSelection && selectedHospitalId) {
      const selectedDest = destinations.find(d => d.id === selectedHospitalId);
      
      if (selectedDest) {
        const positions = [
          { x: 120, y: 220 },  // Hospital 1
          { x: 160, y: 170 },  // Hospital 2
          { x: 190, y: 100 },  // Hospital 3
          { x: 90, y: 170 },   // Hospital 4
          { x: 210, y: 90 }    // Hospital 5
        ];
        
        const index = parseInt(selectedDest.id) - 1;
        if (index >= 0 && index < positions.length) {
          const pos = positions[index];
          setMapCenter({
            x: (pos.x + 230) / 2,
            y: (pos.y + 130) / 2
          });
        }
      }
    }
  }, [selectedHospitalId, destinations, centerMapOnSelection]);
  
  const selectedDestination = selectedHospitalId 
    ? destinations.find(d => d.id === selectedHospitalId) 
    : destinations[0];
  
  const calculateRouteInfo = () => {
    if (!selectedDestination) return;
    
    const distance = 10;
    const timeInMinutes = transportMode === 'air' ? 2 : 3;
    
    setRouteInfo({
      distance: `${distance} km`,
      time: `${timeInMinutes} min`,
      traffic: 'moderate'
    });
  };
  
  useEffect(() => {
    if (!isLoading && selectedDestination) {
      calculateRouteInfo();
    }
  }, [isLoading, selectedDestination, transportMode]);
  
  const generatePath = () => {
    if (!selectedDestination) return [];
    
    const start = userLocation;
    const end = selectedDestination.location;
    
    const waypoints = [];
    const pointCount = 5 + Math.floor(Math.random() * 3);
    
    for (let i = 1; i < pointCount - 1; i++) {
      const ratio = i / pointCount;
      
      const jitter = 0.005 * (Math.random() - 0.5);
      
      waypoints.push({
        lat: start.lat + (end.lat - start.lat) * ratio + jitter,
        lng: start.lng + (end.lng - start.lng) * ratio + jitter
      });
    }
    
    return [start, ...waypoints, end];
  };
  
  const path = generatePath();
  
  const generateAlternatePaths = () => {
    if (!selectedDestination) return [];
    
    return [1, 2].map(() => {
      const alternatePath = [];
      const pointCount = 5 + Math.floor(Math.random() * 3);
      
      for (let i = 0; i < pointCount; i++) {
        const ratio = i / (pointCount - 1);
        
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
  
  const trafficPoints: Array<{
    lat: number;
    lng: number;
    severity: TrafficSeverity;
    x: number;
    y: number;
  }> = [
    {
      lat: userLocation.lat + (selectedDestination?.location.lat - userLocation.lat) * 0.3 + 0.005,
      lng: userLocation.lng + (selectedDestination?.location.lng - userLocation.lng) * 0.3 - 0.005,
      severity: 'moderate',
      x: 190,
      y: 130
    },
    {
      lat: userLocation.lat + (selectedDestination?.location.lat - userLocation.lat) * 0.7 - 0.008,
      lng: userLocation.lng + (selectedDestination?.location.lng - userLocation.lng) * 0.7 + 0.008,
      severity: 'heavy',
      x: 140,
      y: 180
    }
  ];
  
  const handleNavigateClick = () => {
    if (!selectedDestination || !onNavigate) return;
    
    setNavigationActive(true);
    onNavigate(selectedDestination.id);
  };

  const getRoutePath = () => {
    const pathString = selectedHospitalId === '1' ? 
      `M 230 130 L 210 120 L 190 130 L 170 140 L 150 160 L 140 180 L 130 200 L 120 220` :
      selectedHospitalId === '2' ? 
      `M 230 130 L 220 120 L 200 110 L 180 120 L 170 140 L 160 170` :
      selectedHospitalId === '3' ? 
      `M 230 130 L 220 120 L 215 110 L 210 100 L 200 95 L 190 100` :
      selectedHospitalId === '4' ? 
      `M 230 130 L 210 140 L 180 150 L 150 160 L 120 165 L 90 170` :
      `M 230 130 L 225 120 L 220 110 L 215 100 L 212 95 L 210 90`;
    
    if (navigationActive) {
      const pathLength = 320;
      const dashOffset = pathLength - (pathLength * (routeProgress / 100));
      
      return (
        <path 
          d={pathString}
          stroke={transportMode === 'air' ? '#3b82f6' : '#10b981'} 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={dashOffset}
          fill="none"
          className="transition-all duration-300"
        />
      );
    }
    
    return (
      <path 
        d={pathString}
        stroke={transportMode === 'air' ? '#3b82f6' : '#10b981'} 
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={transportMode === 'air' ? "10,5" : "none"}
        fill="none"
        className={`${navigationActive ? "animate-pulse" : ""} cursor-pointer`}
        onClick={() => {
          setShowAlternateRoutes(!showAlternateRoutes);
          onPathClick && onPathClick();
        }}
      />
    );
  };
  
  const getWaypoints = () => {
    const waypoints = [
      { x: 210, y: 120 },
      { x: 190, y: 130 },
      { x: 170, y: 140 },
      { x: 150, y: 160 },
      { x: 140, y: 180 },
      { x: 130, y: 200 }
    ];
    
    return waypoints.map((point, i) => (
      <circle 
        key={`marker-${i}`} 
        cx={point.x} 
        cy={point.y} 
        r={navigationActive && routeProgress > (i/waypoints.length) * 100 ? "3" : "2"} 
        fill={transportMode === 'air' ? '#3b82f6' : '#10b981'} 
        className={transportMode === 'air' ? "animate-pulse" : ""}
      />
    ));
  };
  
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md relative h-64 md:h-80 bg-blue-50 dark:bg-gray-800/30">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800/70">
          <Loader2 className="w-8 h-8 text-medical-500 animate-spin mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading map...</p>
        </div>
      ) : (
        <>
          <div 
            ref={mapRef}
            className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
          >
            <motion.img 
              src={customMapImage} 
              alt="Map" 
              className="absolute w-auto min-w-full min-h-full object-cover"
              initial={false}
              animate={{
                x: centerMapOnSelection ? mapCenter.x - 175 : 0, 
                y: centerMapOnSelection ? mapCenter.y - 150 : 0
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {showAlternateRoutes && selectedDestination && alternatePaths.map((alternatePath, idx) => (
            <svg key={`alt-path-${idx}`} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <path 
                d={alternatePath.map((p, i) => {
                  const x = ((p.lng - userLocation.lng) * 300) + 200;
                  const y = ((p.lat - userLocation.lat) * -300) + 150;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
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
          
          {selectedDestination && (
            <svg 
              className="absolute inset-0 w-full h-full" 
              style={{ pointerEvents: 'none' }}
            >
              {getRoutePath()}
              {getWaypoints()}
              
              {navigationActive && (
                <motion.circle 
                  cx={230 - (routeProgress * 1.1)}
                  cy={130 + (routeProgress * 0.9)}
                  r="5"
                  fill={transportMode === 'air' ? '#3b82f6' : '#10b981'}
                  stroke="white"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </svg>
          )}
          
          {showTraffic && trafficPoints.map((point, idx) => (
            <div 
              key={`traffic-${idx}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: point.x, top: point.y }}
              onClick={() => onTrafficClick && onTrafficClick()}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                point.severity === 'heavy' 
                  ? 'bg-red-100 dark:bg-red-900/30' 
                  : point.severity === 'moderate'
                    ? 'bg-amber-100 dark:bg-amber-900/30'
                    : 'bg-green-100 dark:bg-green-900/30'
              } animate-pulse`}>
                <AlertTriangle 
                  size={14} 
                  className={
                    point.severity === 'heavy' 
                      ? 'text-red-500 dark:text-red-400' 
                      : point.severity === 'moderate'
                        ? 'text-amber-500 dark:text-amber-400'
                        : 'text-green-500 dark:text-green-400'
                  } 
                />
              </div>
            </div>
          ))}
          
          <motion.div 
            className="absolute left-[230px] top-[130px] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            initial={false}
            animate={{ 
              scale: navigationActive ? 1.2 : 1,
              x: navigationActive ? routeProgress * -1.1 : 0,
              y: navigationActive ? routeProgress * 0.9 : 0
            }}
            onClick={() => {
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
          </motion.div>
          
          {destinations.slice(0, 5).map((dest, index) => {
            const positions = [
              { x: 120, y: 220 },  // Lower Manhattan
              { x: 160, y: 170 },  // Canal Street
              { x: 190, y: 100 },  // Spring Street
              { x: 90, y: 170 },   // Tribeca
              { x: 210, y: 90 }    // Little Italy
            ];
            
            const isSelected = selectedHospitalId === dest.id;
            const isMultiSelected = selectedDestinations.includes(dest.id);
            
            return (
              <div 
                key={dest.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={{ 
                  left: positions[index].x, 
                  top: positions[index].y 
                }}
                onClick={() => toggleDestinationSelection(dest.id)}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 20, opacity: 0 }}
                  animate={{ 
                    scale: isSelected || isMultiSelected ? 1.2 : 1, 
                    y: 0, 
                    opacity: 1 
                  }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.15 }}
                >
                  <div className={`relative ${(isSelected || isMultiSelected) ? 'z-10' : 'z-5'}`}>
                    {(isSelected || isMultiSelected) && (
                      <div className={`absolute -inset-2 rounded-full ${
                        isMultiSelected ? 'bg-purple-500/20' : 'bg-medical-500/20'
                      } animate-pulse`} />
                    )}
                    <MapPin 
                      className={`h-6 w-6 ${
                        isSelected 
                          ? 'text-medical-600 drop-shadow-md' 
                          : isMultiSelected
                            ? 'text-purple-600 drop-shadow-md'
                            : index % 3 === 0 ? 'text-red-500' : 'text-green-500'
                      }`} 
                      strokeWidth={isSelected || isMultiSelected ? 2.5 : 2} 
                      fill={
                        isSelected 
                          ? '#e0f2fe' 
                          : isMultiSelected
                            ? '#f3e8ff'
                            : index % 3 === 0 ? '#fee2e2' : '#dcfce7'
                      }
                    />
                  </div>
                  
                  {(isSelected || isMultiSelected) && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded shadow-sm text-[10px] whitespace-nowrap font-medium">
                      {dest.name}
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
          
          {transportMode === 'air' && (
            <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow-md">
                🚁 Air Route
              </div>
            </div>
          )}
          
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            {multiSelectionMode && (
              <ActionButton
                variant="outline"
                icon={<span className="text-xs font-bold">{selectedDestinations.length}</span>}
                onClick={handleMultiDestinationNavigate}
                disabled={selectedDestinations.length === 0}
              >
                Navigate Multi
              </ActionButton>
            )}
            
            <ActionButton
              variant="medical"
              icon={navigationActive ? <Loader2 className="animate-spin" size={18} /> : <Navigation size={18} />}
              onClick={handleNavigateClick}
            >
              {navigationActive ? "Navigating..." : "Start Navigation"}
            </ActionButton>
          </div>
          
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
