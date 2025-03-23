
import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { MapPin, Clock, Building, Phone, ArrowRight, Ambulance, AlertCircle, Info, Star, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QRCode from 'qrcode.react';
import { Switch } from '@/components/ui/switch';

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
  specialties?: string[];
  operatingHours?: string;
  emergencyFacilities: string[];
  location: {
    lat: number;
    lng: number;
  };
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

  // Toggle expanded view for a hospital
  const toggleExpand = (id: string) => {
    setExpandedHospitalId(expandedHospitalId === id ? null : id);
  };

  // Get availability status text and color
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
      emergencyFacilities: hospital.emergencyFacilities.join(', ')
    });
  };

  const handleEmergencyCall = (e: React.MouseEvent, hospital: Hospital) => {
    e.stopPropagation();
    setIsEmergencyCallActive(true);
    
    // Simulate emergency call
    setTimeout(() => {
      setIsEmergencyCallActive(false);
      alert(`Emergency call connected to ${hospital.name}. An ambulance has been dispatched to your location. Estimated arrival time: ${Math.floor(parseInt(hospital.travelTime) * 0.7)} minutes.`);
    }, 2000);
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
                      {hospital.rating && (
                        <div className="flex items-center ml-2">
                          <Star size={14} className="text-yellow-500" />
                          <span className="text-xs ml-1 text-gray-600 dark:text-gray-400">{hospital.rating}</span>
                        </div>
                      )}
                      {showBedAvailability && (
                        <span className="ml-2 text-lg" title={availability.text}>
                          {availability.indicator}
                        </span>
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
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* QR Code Dialog */}
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
              </div>
              
              <div className="mt-4 w-full">
                <Button 
                  className="w-full"
                  onClick={() => {
                    // In a real app, this would save the QR code to gallery
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
    </div>
  );
};

export default HospitalSearchResults;
