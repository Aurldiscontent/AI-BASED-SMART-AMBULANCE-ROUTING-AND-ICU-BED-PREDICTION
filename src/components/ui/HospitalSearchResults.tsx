import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { MapPin, Clock, Building, Phone, ArrowRight, Ambulance, AlertCircle, Info, Star, QrCode, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QRCode from 'qrcode.react';
import { Switch } from '@/components/ui/switch';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  travelTime: string;
  phone: string;
  icuAvailable: number;
  icuTotal: number;
  waitTime: number;
  rating?: number;
  reviews?: Review[];
  specialties?: string[];
  operatingHours?: string;
  emergencyFacilities: string[];
  location: {
    lat: number;
    lng: number;
  };
  insurance?: string[];
  isOpen24Hours?: boolean;
}

interface HospitalSearchResultsProps {
  hospitals: Hospital[];
  onSelectHospital: (hospital: Hospital) => void;
  selectedHospitalId: string | null;
  isLoading?: boolean;
  patientLocation?: { lat: number; lng: number };
  onQrCodeShow?: (hospital: Hospital) => void;
}

const HospitalSearchResults: React.FC<HospitalSearchResultsProps> = ({
  hospitals,
  onSelectHospital,
  selectedHospitalId,
  isLoading = false,
  patientLocation,
  onQrCodeShow
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expandedHospitalId, setExpandedHospitalId] = useState<string | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [showBedAvailability, setShowBedAvailability] = useState(true);
  const [isEmergencyCallActive, setIsEmergencyCallActive] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedHospitalId(expandedHospitalId === id ? null : id);
  };

  const getAvailabilityStatus = (available: number, total: number) => {
    const ratio = available / total;
    
    if (ratio === 0) return { text: "ICU Full", color: isDark ? "text-red-400" : "text-red-600", indicator: "🔴" };
    if (ratio < 0.2) return { text: "Critical Availability", color: isDark ? "text-red-400" : "text-red-600", indicator: "🔴" };
    if (ratio < 0.5) return { text: "Limited Availability", color: isDark ? "text-amber-400" : "text-amber-600", indicator: "🟡" };
    return { text: "Beds Available", color: isDark ? "text-green-400" : "text-green-600", indicator: "🟢" };
  };
  
  const handleQrCode = (e: React.MouseEvent, hospital: Hospital) => {
    e.stopPropagation();
    if (onQrCodeShow) {
      onQrCodeShow(hospital);
    } else {
      setSelectedHospital(hospital);
      setQrDialogOpen(true);
    }
  };
  
  const generateQrCodeData = (hospital: Hospital) => {
    return JSON.stringify({
      name: hospital.name,
      address: hospital.address,
      phone: hospital.phone,
      specialties: hospital.specialties?.join(', ') || '',
      operatingHours: hospital.operatingHours || 'Not specified',
      emergencyFacilities: hospital.emergencyFacilities.join(', '),
      insurance: hospital.insurance?.join(', ') || '',
      rating: hospital.rating || 'No rating'
    });
  };

  const handleEmergencyCall = (e: React.MouseEvent, hospital: Hospital) => {
    e.stopPropagation();
    setIsEmergencyCallActive(true);
    
    setTimeout(() => {
      setIsEmergencyCallActive(false);
      alert(`Emergency call connected to ${hospital.name}. An ambulance has been dispatched to your location. Estimated arrival time: ${Math.floor(parseInt(hospital.travelTime) * 0.7)} minutes.`);
    }, 2000);
  };

  const handleShowReviews = (e: React.MouseEvent, hospital: Hospital) => {
    e.stopPropagation();
    setSelectedHospital(hospital);
    setReviewDialogOpen(true);
  };

  const handleShowMap = (e: React.MouseEvent, hospital: Hospital) => {
    e.stopPropagation();
    setSelectedHospital(hospital);
    setMapDialogOpen(true);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-3 w-3 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-3 w-3 text-gray-300" />);
      }
    }
    
    return stars;
  };

  if (isLoading) {
    return (
      <div className={`rounded-xl p-8 shadow-md flex flex-col items-center justify-center ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="h-8 w-8 border-4 border-medical-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>Searching for nearby hospitals...</p>
      </div>
    );
  }

  if (hospitals.length === 0) {
    return (
      <div className={`rounded-xl p-6 shadow-md ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="flex flex-col items-center text-center">
          <AlertCircle className={`h-12 w-12 mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
          <h3 className={`text-lg font-semibold mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>No Hospitals Found</h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Try adjusting your search criteria or check your location.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl shadow-md overflow-hidden ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className="bg-gradient-to-r from-medical-500 to-medical-600 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white flex items-center">
            <Building className="mr-2" size={18} />
            Nearby Hospitals ({hospitals.length})
          </h2>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-white">Availability</span>
            <Switch 
              checked={showBedAvailability} 
              onCheckedChange={setShowBedAvailability}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
        <AnimatePresence>
          {hospitals.map((hospital) => {
            const isSelected = selectedHospitalId === hospital.id;
            const isExpanded = expandedHospitalId === hospital.id;
            const availability = getAvailabilityStatus(hospital.icuAvailable, hospital.icuTotal);
            
            return (
              <motion.div
                key={hospital.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer ${
                  isSelected ? (isDark ? 'bg-blue-900/20' : 'bg-blue-50') : ''
                }`}
                onClick={() => onSelectHospital(hospital)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h3 className={`font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{hospital.name}</h3>
                      {hospital.isOpen24Hours && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">
                          24/7
                        </span>
                      )}
                      {showBedAvailability && (
                        <span className="ml-2 text-lg" title={availability.text}>
                          {availability.indicator}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-1">
                      {hospital.rating && (
                        <div className="flex items-center mr-2">
                          <div className="flex">{renderStars(hospital.rating)}</div>
                          <span className="text-xs ml-1 text-gray-600 dark:text-gray-400">
                            {hospital.rating.toFixed(1)}
                          </span>
                          {hospital.reviews && (
                            <span 
                              className="text-xs ml-1 text-blue-500 dark:text-blue-400 underline cursor-pointer"
                              onClick={(e) => handleShowReviews(e, hospital)}
                            >
                              ({hospital.reviews.length})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span>{hospital.distance}</span>
                      <span className="mx-2">•</span>
                      <Clock size={14} className="mr-1" />
                      <span>{hospital.travelTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => handleQrCode(e, hospital)}
                    >
                      <QrCode size={16} className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    </Button>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      isSelected 
                        ? isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                        : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      ID: {hospital.id}
                    </span>
                  </div>
                </div>
                
                <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  <div className={`${
                    isDark ? 'bg-gray-700/60' : 'bg-gray-100'
                  } p-2 rounded-lg`}>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ICU Beds</p>
                    <div className="flex items-center justify-between">
                      <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {hospital.icuAvailable} / {hospital.icuTotal}
                      </p>
                      <span className="text-sm" title={availability.text}>
                        {availability.indicator}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`${
                    isDark ? 'bg-gray-700/60' : 'bg-gray-100'
                  } p-2 rounded-lg`}>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Wait Time</p>
                    <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {hospital.waitTime} min
                    </p>
                  </div>
                  
                  <div className={`${
                    isDark ? 'bg-gray-700/60' : 'bg-gray-100'
                  } p-2 rounded-lg`}>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                    <p className={`font-semibold ${availability.color}`}>
                      {availability.text}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(hospital.id);
                    }}
                    className={`text-xs ${
                      isDark 
                        ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' 
                        : 'border-gray-300 bg-white hover:bg-gray-100'
                    }`}
                  >
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs"
                      onClick={(e) => handleShowMap(e, hospital)}
                    >
                      <MapPin size={12} className="mr-1" />
                      Map
                    </Button>
                    
                    <Button 
                      size="sm" 
                      className="text-xs bg-red-600 hover:bg-red-700 text-white"
                      onClick={(e) => handleEmergencyCall(e, hospital)}
                      disabled={isEmergencyCallActive}
                    >
                      {isEmergencyCallActive ? (
                        <>
                          <span className="animate-pulse mr-1">🚨</span>
                          Calling...
                        </>
                      ) : (
                        <>
                          <span className="mr-1">🚑</span>
                          SOS
                        </>
                      )}
                    </Button>

                    <Button 
                      size="sm" 
                      className="text-xs bg-medical-500 hover:bg-medical-600 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectHospital(hospital);
                      }}
                    >
                      <Ambulance size={12} className="mr-1" />
                      Navigate
                    </Button>
                  </div>
                </div>
                
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-sm"
                  >
                    <div className={`p-3 rounded-lg ${
                      isDark ? 'bg-gray-700/40' : 'bg-gray-50'
                    }`}>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                        <MapPin size={14} className="mr-2 flex-shrink-0" />
                        {hospital.address}
                      </p>
                      
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} flex items-center mt-2`}>
                        <Phone size={14} className="mr-2 flex-shrink-0" />
                        {hospital.phone}
                      </p>
                      
                      {hospital.operatingHours && (
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} flex items-center mt-2`}>
                          <Clock size={14} className="mr-2 flex-shrink-0" />
                          {hospital.operatingHours}
                        </p>
                      )}
                      
                      {hospital.insurance && hospital.insurance.length > 0 && (
                        <div className="mt-2">
                          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs mb-1`}>Insurance Accepted:</p>
                          <div className="flex flex-wrap gap-1">
                            {hospital.insurance.map(ins => (
                              <span 
                                key={ins}
                                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                  isDark 
                                    ? 'bg-green-900/30 text-green-300 border border-green-800/50' 
                                    : 'bg-green-50 text-green-700 border border-green-200'
                                }`}
                              >
                                {ins}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {hospital.specialties && hospital.specialties.length > 0 && (
                        <div className="mt-2">
                          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs mb-1`}>Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {hospital.specialties.map(specialty => (
                              <span 
                                key={specialty}
                                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
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
                      
                      <div className="mt-2">
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs mb-1`}>Emergency Facilities:</p>
                        <div className="flex flex-wrap gap-1">
                          {hospital.emergencyFacilities.map(facility => (
                            <span 
                              key={facility}
                              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                isDark 
                                  ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' 
                                  : 'bg-blue-100 text-blue-700 border border-blue-200'
                              }`}
                            >
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {hospital.reviews && hospital.reviews.length > 0 && (
                        <div className="mt-3">
                          <div className="flex justify-between items-center">
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
                              Latest Review:
                            </p>
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="text-xs p-0 h-auto"
                              onClick={(e) => handleShowReviews(e, hospital)}
                            >
                              View All
                            </Button>
                          </div>
                          <div className={`mt-1 p-2 rounded ${
                            isDark ? 'bg-gray-800/70' : 'bg-white/70'
                          }`}>
                            <div className="flex items-center">
                              <div className="flex">
                                {renderStars(hospital.reviews[0].rating)}
                              </div>
                              <span className="ml-2 text-xs font-medium">
                                {hospital.reviews[0].user}
                              </span>
                            </div>
                            <p className="mt-1 text-xs italic">
                              "{hospital.reviews[0].comment}"
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Hospital Information QR Code</DialogTitle>
          </DialogHeader>
          
          {selectedHospital && (
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg mb-4">
                <QRCode 
                  value={generateQrCodeData(selectedHospital)}
                  size={200}
                  level="H"
                  includeMargin={true}
                  renderAs="svg"
                />
              </div>
              
              <p className="text-sm text-center text-gray-500">
                Scan this QR code to get detailed information about {selectedHospital.name}
              </p>
              
              <div className="mt-4 space-y-2 w-full text-sm">
                <div className="flex items-start">
                  <Building className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{selectedHospital.name}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{selectedHospital.address}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{selectedHospital.phone}</span>
                </div>
                {selectedHospital.operatingHours && (
                  <div className="flex items-start">
                    <Clock className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{selectedHospital.operatingHours}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 w-full">
                <Button 
                  className="w-full"
                  onClick={() => {
                    alert('QR code saved to gallery!');
                  }}
                >
                  Save QR to Gallery
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {selectedHospital?.name} - Patient Reviews
            </DialogTitle>
          </DialogHeader>
          
          {selectedHospital && selectedHospital.reviews && (
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full flex items-center">
                  <div className="flex mr-2">
                    {renderStars(selectedHospital.rating || 0)}
                  </div>
                  <span className="font-bold text-blue-700 dark:text-blue-300">
                    {selectedHospital.rating?.toFixed(1)} 
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                    ({selectedHospital.reviews.length} reviews)
                  </span>
                </div>
              </div>
              
              {selectedHospital.reviews.map(review => (
                <div 
                  key={review.id} 
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium">
                        {review.user.charAt(0)}
                      </div>
                      <div className="ml-2">
                        <p className="font-medium text-gray-800 dark:text-gray-200">{review.user}</p>
                        <div className="flex mt-0.5">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={mapDialogOpen} onOpenChange={setMapDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {selectedHospital?.name} - Location
            </DialogTitle>
          </DialogHeader>
          
          {selectedHospital && (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <img
                    src="/lovable-uploads/e088e765-bcfc-42bc-82f1-62c5a627499c.png"
                    alt="Map"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute">
                    <MapPin size={36} className="text-red-500" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="flex items-start">
                  <MapPin className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{selectedHospital.address}</span>
                </p>
                <p className="flex items-start">
                  <Clock className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">ETA: {selectedHospital.travelTime}</span>
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setMapDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  className="bg-medical-500 hover:bg-medical-600 text-white"
                  onClick={() => {
                    setMapDialogOpen(false);
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedHospital.address)}`);
                  }}
                >
                  <Navigation size={14} className="mr-2" />
                  Navigate
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalSearchResults;
