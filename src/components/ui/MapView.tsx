
import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import ActionButton from './ActionButton';

interface MapViewProps {
  userLocation?: { lat: number; lng: number };
  destinations?: Array<{
    id: string;
    name: string;
    location: { lat: number; lng: number };
  }>;
  onNavigate?: (id: string) => void;
}

const MapView: React.FC<MapViewProps> = ({
  userLocation = { lat: 12.9716, lng: 77.5946 }, // Default to Bangalore
  destinations = [],
  onNavigate
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

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
          
          {/* Road simulation */}
          <div className="absolute left-0 right-0 top-1/2 h-2 bg-gray-300 transform -translate-y-1/2" />
          <div className="absolute left-1/3 top-0 bottom-0 w-2 bg-gray-300" />
          
          {/* User location marker */}
          <div className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-blue-500/20 animate-pulse" />
              <div className="h-4 w-4 rounded-full bg-medical-500 border-2 border-white shadow-md" />
            </div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-sm">
              <span className="text-xs font-medium">You</span>
            </div>
          </div>
          
          {/* Simulated destination marker */}
          <div className="absolute right-1/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <MapPin className="h-8 w-8 text-emergency-500 drop-shadow-md" strokeWidth={2} />
          </div>
          
          {/* Navigation button */}
          <div className="absolute bottom-4 right-4">
            <ActionButton
              variant="medical"
              icon={<Navigation size={18} />}
              onClick={() => onNavigate?.('hospital-1')}
            >
              Start Navigation
            </ActionButton>
          </div>
          
          {/* Distance indicator */}
          <div className="absolute top-4 left-4 glass-card px-3 py-2 rounded-lg text-sm">
            <p className="font-medium">3.2 km • 12 min</p>
            <p className="text-xs text-gray-600">Fastest route</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MapView;
