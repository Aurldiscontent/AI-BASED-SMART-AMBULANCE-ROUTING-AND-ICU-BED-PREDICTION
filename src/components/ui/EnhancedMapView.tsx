
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
}

const EnhancedMapView: React.FC<EnhancedMapViewProps> = ({
  destinations = [],
  selectedHospitalId = null,
  onHospitalClick,
  transportMode = 'ground',
  theme = 'light',
  mapImagePath = '/lovable-uploads/65382a9c-1c29-4022-9d95-c24462b61a24.png',
  onNavigate,
  showPathFromUser = true,
  userLocation = { lat: 40.7128, lng: -74.0060 },
  centerMapOnSelection = true
}) => {
  const { toast } = useToast();
  const [showTraffic, setShowTraffic] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [activeNavigation, setActiveNavigation] = useState(false);
  
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
      
      // Simulate navigation completion
      setTimeout(() => {
        setActiveNavigation(false);
      }, 3000);
    }
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
  
  return (
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
      customMapImage={mapImagePath || '/lovable-uploads/65382a9c-1c29-4022-9d95-c24462b61a24.png'}
      userLocation={userLocation}
      centerMapOnSelection={centerMapOnSelection}
      activeNavigation={activeNavigation}
      showTraffic={showTraffic}
    />
  );
};

export default EnhancedMapView;
