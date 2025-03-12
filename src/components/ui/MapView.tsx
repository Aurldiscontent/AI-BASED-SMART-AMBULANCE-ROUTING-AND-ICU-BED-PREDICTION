
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, Loader2, Map, Zap, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import ActionButton from './ActionButton';
import { useToast } from '@/hooks/use-toast';

interface Location {
  lat: number;
  lng: number;
}

interface MapDestination {
  id: string;
  name: string;
  location: Location;
}

interface MapViewProps {
  destinations: MapDestination[];
  selectedHospitalId?: string | null;
  transportMode?: 'ground' | 'air';
  onHospitalClick?: (id: string) => void;
  onNavigate?: (id: string) => void;
  onTrafficClick?: () => void;
  onPathClick?: () => void;
  customMapImage?: string;
  userLocation?: Location;
  centerMapOnSelection?: boolean;
  forceInitialCenter?: boolean;
  activeNavigation?: boolean;
  showTraffic?: boolean;
  multiSelectionMode?: boolean;
  onMultiDestinationSelect?: (ids: string[]) => void;
  alwaysShowAllRoutes?: boolean;
}

const MapView: React.FC<MapViewProps> = ({
  destinations,
  selectedHospitalId = null,
  transportMode = 'ground',
  onHospitalClick,
  onNavigate,
  onTrafficClick,
  onPathClick,
  customMapImage = '/lovable-uploads/c26b6999-d1cf-40dd-b57c-d2b5cce67cd0.png',
  userLocation = { lat: 40.7128, lng: -74.0060 },
  centerMapOnSelection = true,
  forceInitialCenter = false,
  activeNavigation = false,
  showTraffic = true,
  multiSelectionMode = false,
  onMultiDestinationSelect,
  alwaysShowAllRoutes = false
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [navigationActive, setNavigationActive] = useState(false);
  const [routeProgress, setRouteProgress] = useState(0);
  const [mapCenter, setMapCenter] = useState({ x: 200, y: 150 });
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
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
      }, 100);
      
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
  
  // Center map when selection changes or on initial load
  useEffect(() => {
    if (forceInitialCenter) {
      // Set to center initially
      setMapCenter({ x: 200, y: 150 });
      return;
    }
    
    if (centerMapOnSelection && selectedHospitalId) {
      const selectedDest = destinations.find(d => d.id === selectedHospitalId);
      
      if (selectedDest) {
        const positions = [
          { x: 120, y: 220 },  // Hospital 1
          { x: 160, y: 170 },  // Hospital 2
          { x: 240, y: 220 },  // Hospital 3
          { x: 270, y: 170 },  // Hospital 4
          { x: 220, y: 80 },   // Hospital 5
          { x: 120, y: 120 },  // Hospital 6
          { x: 110, y: 190 },  // and so on...
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
  }, [selectedHospitalId, centerMapOnSelection, destinations, forceInitialCenter]);
  
  // Map the hospital destinations to visual coordinates
  const getHospitalPosition = (id: string) => {
    const positions = [
      { x: 120, y: 220 },  // Hospital 1
      { x: 160, y: 170 },  // Hospital 2
      { x: 240, y: 220 },  // Hospital 3
      { x: 270, y: 170 },  // Hospital 4
      { x: 220, y: 80 },   // Hospital 5
      { x: 120, y: 120 },  // Hospital 6
      { x: 110, y: 190 },  // Hospital 7
      { x: 190, y: 210 },  // Hospital 8
      { x: 250, y: 110 },  // Hospital 9
      { x: 190, y: 180 },  // Hospital 10
    ];
    
    const index = parseInt(id) - 1;
    if (index >= 0 && index < positions.length) {
      return positions[index];
    }
    
    return { x: 180, y: 180 };
  };
  
  const getUserPosition = () => {
    return { x: 230, y: 130 };
  };
  
  const handleNavigateClick = () => {
    if (!selectedHospitalId || !onNavigate) return;
    const selectedDestination = destinations.find(d => d.id === selectedHospitalId);
    if (!selectedDestination) return;
    
    toast({
      title: "Navigation Started",
      description: `Navigating to ${selectedDestination.name}`,
    });
    
    setNavigationActive(true);
    setRouteProgress(0);
    onNavigate(selectedDestination.id);
  };

  const getRoutePath = () => {
    // Create a more complex path for better visualization
    const pathString = selectedHospitalId === '1' ? 
      `M 230 130 L 210 120 L 190 130 L 170 140 L 150 160 L 140 180 L 130 200 L 120 220` :
      selectedHospitalId === '2' ? 
      `M 230 130 L 220 140 L 200 150 L 180 160 L 160 170` :
      selectedHospitalId === '3' ? 
      `M 230 130 L 235 150 L 240 170 L 240 200 L 240 220` :
      selectedHospitalId === '4' ? 
      `M 230 130 L 240 140 L 250 150 L 260 160 L 270 170` :
      `M 230 130 L 225 120 L 220 110 L 215 100 L 212 95 L 210 90`;
    
    if (navigationActive) {
      const pathLength = 320;
      const dashOffset = pathLength - (pathLength * (routeProgress / 100));
      
      return (
        <path
          d={pathString}
          className="route-path"
          style={{ 
            strokeDasharray: `${pathLength}px`, 
            strokeDashoffset: `${dashOffset}px`,
            stroke: transportMode === 'air' ? '#3b82f6' : '#ef4444',
            strokeWidth: transportMode === 'air' ? 6 : 4,
            strokeDasharray: transportMode === 'air' ? '15, 10' : '10, 5',
          }}
        />
      );
    }
    
    return (
      <path
        d={pathString}
        style={{ 
          stroke: selectedHospitalId ? (transportMode === 'air' ? '#3b82f6' : '#ef4444') : 'transparent', 
          strokeWidth: 3, 
          strokeDasharray: transportMode === 'air' ? '10, 5' : '5, 3',
          opacity: 0.7,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
    );
  };
  
  // Draw a route path for each hospital when alwaysShowAllRoutes is true
  const getAllRoutePaths = () => {
    if (!alwaysShowAllRoutes) return null;
    
    return destinations.map(dest => {
      const pos = getHospitalPosition(dest.id);
      const userPos = getUserPosition();
      const isSelected = selectedHospitalId === dest.id || selectedDestinations.includes(dest.id);
      
      // Create a simple straight line or a slightly curved line
      const dx = pos.x - userPos.x;
      const dy = pos.y - userPos.y;
      const midX = (userPos.x + pos.x) / 2;
      const midY = (userPos.y + pos.y) / 2 - 10; // Slight curve upward
      
      const pathString = `M ${userPos.x} ${userPos.y} Q ${midX} ${midY} ${pos.x} ${pos.y}`;
      
      return (
        <path
          key={dest.id}
          d={pathString}
          style={{ 
            stroke: isSelected ? (transportMode === 'air' ? '#3b82f6' : '#ef4444') : '#94a3b8',
            strokeWidth: isSelected ? 3 : 1.5,
            strokeDasharray: transportMode === 'air' ? '10, 5' : '5, 3',
            opacity: isSelected ? 0.9 : 0.4,
            transition: 'all 0.3s ease-in-out'
          }}
          fill="none"
        />
      );
    });
  };
  
  const getWaypoints = () => {
    const waypoints = [
      { x: 210, y: 120 },
      { x: 190, y: 130 },
      { x: 170, y: 140 },
      { x: 150, y: 160 }
    ];
    
    if (!navigationActive) return null;
    
    return waypoints.map((point, index) => {
      // Only show waypoints up to the current progress
      if ((index + 1) * 20 > routeProgress) return null;
      
      return (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={4}
          fill={transportMode === 'air' ? '#3b82f6' : '#ef4444'}
          opacity={0.8}
        >
          <animate
            attributeName="r"
            values="3;5;3"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      );
    });
  };
  
  const getPathEndMarker = () => {
    if (!selectedHospitalId || !navigationActive || routeProgress < 100) return null;
    
    const position = getHospitalPosition(selectedHospitalId);
    
    return (
      <circle
        cx={position.x}
        cy={position.y}
        r={8}
        fill={transportMode === 'air' ? '#3b82f6' : '#ef4444'}
        stroke="white"
        strokeWidth={2}
      >
        <animate
          attributeName="r"
          values="6;10;6"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    );
  };
  
  const getHospitalMarkers = () => {
    return destinations.map(destination => {
      const position = getHospitalPosition(destination.id);
      const isSelected = selectedHospitalId === destination.id;
      const isMultiSelected = selectedDestinations.includes(destination.id);
      
      return (
        <g 
          key={destination.id}
          onClick={() => toggleDestinationSelection(destination.id)}
          style={{ cursor: 'pointer' }}
          className="hospital-marker"
        >
          <circle
            cx={position.x}
            cy={position.y}
            r={10}
            className={`${
              isSelected || isMultiSelected
                ? 'fill-blue-500 dark:fill-blue-400'
                : 'fill-white dark:fill-gray-700'
            } transition-all duration-300`}
            stroke={isSelected || isMultiSelected ? 'white' : '#3b82f6'}
            strokeWidth={2}
          />
          <text
            x={position.x}
            y={position.y + 4}
            textAnchor="middle"
            fill={isSelected || isMultiSelected ? 'white' : '#3b82f6'}
            style={{ fontSize: '10px', fontWeight: 'bold' }}
          >
            {destination.id}
          </text>
          
          {(isSelected || isMultiSelected) && (
            <circle
              cx={position.x}
              cy={position.y}
              r={14}
              fill="transparent"
              stroke="#3b82f6"
              strokeWidth={2}
              opacity={0.5}
            >
              <animate
                attributeName="r"
                values="12;16;12"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0.6;0.4"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </g>
      );
    });
  };
  
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-500">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      )}
      
      <div 
        ref={mapRef}
        className="relative w-full h-[400px] bg-cover bg-center rounded-xl overflow-hidden"
        style={{ 
          backgroundImage: `url('${customMapImage}')`,
          transition: 'background-position 0.5s ease-out',
          backgroundPosition: `${mapCenter.x * 0.5}px ${mapCenter.y * 0.5}px`
        }}
      >
        {/* Traffic overlay */}
        {showTraffic && (
          <div 
            className={`absolute inset-0 pointer-events-none ${
              transportMode === 'ground' ? 'traffic-moderate' : ''
            }`}
          />
        )}
        
        {/* SVG overlay for markers and paths */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 400 300"
          style={{ zIndex: 2 }}
        >
          {/* Always show all routes if enabled */}
          {getAllRoutePaths()}
          
          {/* Selected route path */}
          {selectedHospitalId && !alwaysShowAllRoutes && getRoutePath()}
          
          {/* Waypoints during navigation */}
          {getWaypoints()}
          
          {/* End marker animation */}
          {getPathEndMarker()}
          
          {/* User location marker */}
          <circle
            cx={getUserPosition().x}
            cy={getUserPosition().y}
            r={8}
            fill="#ef4444"
            stroke="white"
            strokeWidth={2}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          />
          
          {/* Hospital markers */}
          {getHospitalMarkers()}
        </svg>
        
        {/* Map controls */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <ActionButton
            variant="emergency"
            icon={<Zap size={18} />}
            onClick={handleNavigateClick}
            disabled={!selectedHospitalId || navigationActive}
          />
          <ActionButton
            variant="outline"
            icon={<Map size={18} />}
            onClick={onTrafficClick}
          />
          <ActionButton
            variant="outline"
            icon={
              transportMode === 'air' 
              ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 19h-4a1 1 0 0 1-.8-1.6l9.8-13"></path>
                  <path d="M17 5.5v13a1 1 0 0 0 1.6.8l2.7-2.7"></path>
                  <path d="M13 1.1l-5.9 5.3a1 1 0 0 0-.3.7v2.9l-3.8 3.4a1 1 0 0 0 .7 1.7h7.5"></path>
                </svg>
              ) 
              : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                  <circle cx="7" cy="17" r="2"></circle>
                  <path d="M9 17h6"></path>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
              )
            }
            onClick={onPathClick}
          />
        </div>
        
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          {multiSelectionMode && (
            <ActionButton
              variant="outline"
              icon={<span className="text-xs font-bold">{selectedDestinations.length}</span>}
              onClick={handleMultiDestinationNavigate}
              disabled={selectedDestinations.length === 0}
            >
              Navigate
            </ActionButton>
          )}
        </div>
        
        {/* Navigation status overlay */}
        {navigationActive && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Navigation className="text-white" size={16} />
                <span className="text-white font-medium text-sm">
                  {routeProgress < 100 
                    ? `Navigating... ${routeProgress}%` 
                    : "Arrived at destination"}
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
                ETA: {transportMode === 'air' ? '2' : '3'} min
              </div>
            </div>
            
            <div className="mt-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${routeProgress}%`, transition: 'width 0.3s ease-out' }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Map legend */}
      <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-300 justify-end">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
          <span>Your Location</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
          <span>Selected Hospital</span>
        </div>
        {transportMode === 'air' ? (
          <div className="flex items-center">
            <div className="w-3 h-3 border-2 border-dashed border-blue-500 rounded-full mr-1"></div>
            <span>Air Route</span>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="w-3 h-3 border-2 border-dashed border-red-500 rounded-full mr-1"></div>
            <span>Ground Route</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
