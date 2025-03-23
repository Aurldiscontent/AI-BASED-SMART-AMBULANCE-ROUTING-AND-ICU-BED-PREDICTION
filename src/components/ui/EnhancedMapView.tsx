
import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Clock, Map, Zap, AlertTriangle, Loader2, Star, CalendarClock, QrCode, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MapView from './MapView';
import ActionButton from './ActionButton';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import QRCode from 'qrcode.react';

interface Destination {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  icuAvailable: number;
  icuTotal: number;
  waitTime: number;
  specialties: string[];
  address?: string;
  phone?: string;
  rating?: number;
  reviews?: Array<{ id: string; author: string; text: string; rating: number; date: string }>;
  operatingHours?: string;
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
  const [showQRCode, setShowQRCode] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const isDark = theme === 'dark';
  
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
        if (selected && selectedHospitalId) {
          setShowDetailPanel(true);
        }
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
  
  const handleShowQRCode = () => {
    if (selectedDestination) {
      setShowQRCode(true);
    }
  };
  
  const handleCloseDetailPanel = () => {
    setShowDetailPanel(false);
  };
  
  const generateQrCodeData = (destination: Destination) => {
    return JSON.stringify({
      name: destination.name,
      address: destination.address || 'Address not available',
      phone: destination.phone || 'Phone not available',
      specialties: destination.specialties?.join(', ') || '',
      operatingHours: destination.operatingHours || 'Hours not specified',
      icuAvailable: `${destination.icuAvailable}/${destination.icuTotal}`,
      waitTime: `${destination.waitTime} min`
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
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className={`${showDetailPanel && selectedDestination ? "w-full md:w-2/3" : "w-full"} transition-all duration-300`}>
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
        
        <AnimatePresence>
          {showDetailPanel && selectedDestination && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full md:w-1/3 mt-4 md:mt-0"
            >
              <Card className={`shadow-lg h-full overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardHeader className="bg-gradient-to-r from-medical-500 to-medical-600 text-white pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">{selectedDestination.name}</CardTitle>
                      {selectedDestination.rating && (
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={`${
                                i < Math.floor(selectedDestination.rating || 0) 
                                  ? 'text-yellow-300 fill-yellow-300' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                          <span className="ml-2 text-sm">{selectedDestination.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={handleCloseDetailPanel}
                      className="rounded-full p-1 hover:bg-white/20 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </CardHeader>
                
                <CardContent className={`p-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="space-y-3">
                    {selectedDestination.address && (
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 flex-shrink-0 text-medical-500" />
                        <span>{selectedDestination.address}</span>
                      </div>
                    )}
                    
                    {selectedDestination.phone && (
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-2 flex-shrink-0 text-medical-500" />
                        <span>{selectedDestination.phone}</span>
                      </div>
                    )}
                    
                    {selectedDestination.operatingHours && (
                      <div className="flex items-start">
                        <CalendarClock className="h-5 w-5 mr-2 flex-shrink-0 text-medical-500" />
                        <span>{selectedDestination.operatingHours}</span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ICU Beds</p>
                        <p className="font-bold text-lg">
                          <span className="text-medical-600 dark:text-medical-400">{selectedDestination.icuAvailable}</span>
                          <span className="text-gray-400 dark:text-gray-500">/{selectedDestination.icuTotal}</span>
                        </p>
                      </div>
                      
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-amber-50'}`}>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Wait Time</p>
                        <p className="font-bold text-lg">
                          <span className="text-amber-600 dark:text-amber-400">{selectedDestination.waitTime}</span>
                          <span className="text-sm text-gray-400 dark:text-gray-500"> min</span>
                        </p>
                      </div>
                    </div>
                    
                    {selectedDestination.specialties && selectedDestination.specialties.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedDestination.specialties.map(specialty => (
                            <span 
                              key={specialty}
                              className={`text-xs px-2.5 py-1 rounded-full ${
                                isDark 
                                  ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' 
                                  : 'bg-blue-100 text-blue-700 border border-blue-200'
                              }`}
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedDestination.reviews && selectedDestination.reviews.length > 0 && (
                      <div className="mt-5">
                        <h4 className="text-sm font-medium mb-2">Recent Reviews</h4>
                        <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                          {selectedDestination.reviews.slice(0, 3).map(review => (
                            <div 
                              key={review.id} 
                              className={`p-3 rounded-lg text-sm ${
                                isDark ? 'bg-gray-700/60' : 'bg-gray-50'
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">{review.author}</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={12} 
                                      className={`${
                                        i < review.rating 
                                          ? 'text-yellow-500 fill-yellow-500' 
                                          : 'text-gray-300'
                                      }`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-gray-500">{review.date}</p>
                              <p className="mt-1 text-xs">{review.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between w-full">
                    <button
                      onClick={handleShowQRCode}
                      className={`flex items-center px-3 py-1.5 rounded-md ${
                        isDark 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <QrCode size={18} className="mr-1.5" />
                      <span className="text-sm">QR Code</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavigate(selectedDestination.id)}
                      className="flex items-center px-4 py-1.5 rounded-md bg-medical-500 hover:bg-medical-600 text-white"
                    >
                      <Navigation size={18} className="mr-1.5" />
                      <span className="text-sm">Navigate</span>
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Hospital Information QR Code</DialogTitle>
          </DialogHeader>
          
          {selectedDestination && (
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg mb-4">
                <QRCode 
                  value={generateQrCodeData(selectedDestination)}
                  size={200}
                  level="H"
                  includeMargin={true}
                  renderAs="svg"
                />
              </div>
              
              <p className="text-sm text-center text-gray-500">
                Scan this QR code to get detailed information about {selectedDestination.name}
              </p>
              
              <div className="mt-4 space-y-2 w-full text-sm">
                <div className="flex items-start">
                  <MapPin className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedDestination.address || 'Address not available'}
                  </span>
                </div>
                
                {selectedDestination.phone && (
                  <div className="flex items-start">
                    <Phone className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{selectedDestination.phone}</span>
                  </div>
                )}
                
                {selectedDestination.operatingHours && (
                  <div className="flex items-start">
                    <Clock className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{selectedDestination.operatingHours}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedMapView;
