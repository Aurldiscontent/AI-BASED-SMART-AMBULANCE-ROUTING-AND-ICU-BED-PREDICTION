import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Clock, Map, Zap, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import MapView from './MapView';
import ActionButton from './ActionButton';
import { useToast } from '@/hooks/use-toast';

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
  centerMapOnSelection?: boolean;
  enableMultiSelect?: boolean;
}

const EnhancedMapView: React.FC<EnhancedMapViewProps> = ({
  destinations = [],
  selectedHospitalId = null,
  onHospitalClick,
  transportMode = 'ground',
  theme = 'light',
  mapImagePath = '/lovable-uploads/e088e765-bcfc-42bc-82f1-62c5a627499c.png',
  onNavigate,
  showPathFromUser = true,
  userLocation = { lat: 40.7128, lng: -74.0060 },
  centerMapOnSelection = true,
  enableMultiSelect = false
}) => {
  const { toast } = useToast();
  const [showTraffic, setShowTraffic] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [activeNavigation, setActiveNavigation] = useState(false);
  const [multiSelectMode, setMultiSelectMode] = useState(enableMultiSelect);
  const [initialLoad, setInitialLoad] = useState(true);
  
  useEffect(() => {
    if (initialLoad) {
      setTimeout(() => {
        setInitialLoad(false);
      }, 500);
    }
  }, [initialLoad]);
  
  useEffect(() => {
    if (destinations.length > 0) {
      const selected = selectedHospitalId 
        ? destinations.find(d => d.id === selectedHospitalId) 
        : destinations[0];
      
      if (selected) {
        setSelectedDestination(selected);
      }
    }
  }, [selectedHospitalId, destinations]);
  
  const handleHospitalMarkerClick = (id: string) => {
    if (onHospitalClick) onHospitalClick(id);
  };
  
  const handleNavigate = (id: string) => {
    if (onNavigate) {
      setActiveNavigation(true);
      onNavigate(id);
      
      toast({
        title: "Navigation Started",
        description: `Navigating to ${selectedDestination?.name || 'hospital'}. ETA: ${transportMode === 'air' ? '2' : '3'} minutes.`,
      });
      
      setTimeout(() => {
        setActiveNavigation(false);
      }, 5000);
    }
  };
  
  const handleMultiDestinationNavigate = (ids: string[]) => {
    if (ids.length === 0) return;
    
    setActiveNavigation(true);
    
    const selectedNames = ids.map(id => {
      const dest = destinations.find(d => d.id === id);
      return dest?.name || 'hospital';
    }).join(', ');
    
    toast({
      title: "Multi-Destination Navigation",
      description: `Optimizing route to ${ids.length} hospitals: ${selectedNames}`,
    });
    
    if (onNavigate && ids.length > 0) {
      onNavigate(ids[0]);
    }
    
    setTimeout(() => {
      setActiveNavigation(false);
    }, 5000);
  };
  
  const handleTrafficClick = () => {
    toast({
      title: "Traffic Information",
      description: "Traffic conditions updated. Some delays expected on main routes.",
    });
    setShowTraffic(!showTraffic);
  };
  
  const handlePathClick = () => {
    toast({
      title: transportMode === 'air' ? "Air Route Selected" : "Ground Route Selected",
      description: `${transportMode === 'air' ? 'Helicopter' : 'Ambulance'} route optimized. Estimated arrival time updated.`,
    });
  };
  
  const toggleMultiSelectMode = () => {
    setMultiSelectMode(prev => !prev);
    toast({
      title: multiSelectMode ? "Single Selection Mode" : "Multi-Selection Mode",
      description: multiSelectMode 
        ? "Switched to single hospital selection" 
        : "You can now select multiple hospitals for route optimization",
    });
  };
  
  return (
    <div className="relative">
      {enableMultiSelect && (
        <div className="mb-2 flex justify-end">
          <button
            onClick={toggleMultiSelectMode}
            className={`text-xs px-2 py-1 rounded-md ${
              multiSelectMode 
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {multiSelectMode ? "Multi-Select: ON" : "Multi-Select: OFF"}
          </button>
        </div>
      )}
      
      <MapView
        destinations={destinations.map(d => ({
          id: d.id,
          name: d.name,
          location: d.location
        }))}
        selectedHospitalId={selectedHospitalId}
        transportMode={transportMode}
        onHospitalClick={handleHospitalMarkerClick}
        onNavigate={handleNavigate}
        onTrafficClick={handleTrafficClick}
        onPathClick={handlePathClick}
        customMapImage={mapImagePath}
        userLocation={userLocation}
        centerMapOnSelection={true}
        forceInitialCenter={initialLoad}
        activeNavigation={activeNavigation}
        showTraffic={showTraffic}
        multiSelectionMode={multiSelectMode}
        onMultiDestinationSelect={handleMultiDestinationNavigate}
        alwaysShowAllRoutes={true}
      />
    </div>
  );
};

export default EnhancedMapView;
