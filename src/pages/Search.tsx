
import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';
import TopHeader from '@/components/ui/TopHeader';
import Navbar from '@/components/ui/Navbar';
import { Search as SearchIcon, MapPin, ArrowRight, Clock, Ambulance, Building, Phone, Star, QrCode, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import HospitalSearchResults, { Hospital } from '@/components/ui/HospitalSearchResults';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QRCode from 'qrcode.react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Search = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState<Hospital[]>([]);
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  
  // Mock hospitals data (enhanced with more details)
  const mockHospitals: Hospital[] = [
    { 
      id: '1', 
      name: 'City General Hospital', 
      address: '123 Medical Ave, Cityville, CA 90210',
      distance: '2.5 km', 
      travelTime: '8 min', 
      icuAvailable: 5, 
      icuTotal: 20, 
      waitTime: 10,
      phone: '(555) 123-4567',
      rating: 4.5,
      specialties: ['Cardiology', 'Neurology', 'Pediatrics'],
      operatingHours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM',
      emergencyFacilities: ['ICU', 'Emergency Room', 'Trauma Center', 'CT Scan'],
      location: { lat: 34.052235, lng: -118.243683 }
    },
    { 
      id: '2', 
      name: 'Memorial Medical Center', 
      address: '456 Health Blvd, Wellness City, CA 90211',
      distance: '4.2 km', 
      travelTime: '12 min', 
      icuAvailable: 8, 
      icuTotal: 15, 
      waitTime: 5,
      phone: '(555) 987-6543',
      rating: 4.8,
      specialties: ['Oncology', 'Orthopedics', 'Gastroenterology'],
      operatingHours: 'Open 24 Hours',
      emergencyFacilities: ['ICU', 'Emergency Room', 'MRI'],
      location: { lat: 34.052235, lng: -118.243683 }
    },
    { 
      id: '3', 
      name: 'Community Hospital', 
      address: '789 Care Lane, Healthtown, CA 90212',
      distance: '3.8 km', 
      travelTime: '14 min', 
      icuAvailable: 2, 
      icuTotal: 10, 
      waitTime: 15,
      phone: '(555) 456-7890',
      rating: 4.2,
      specialties: ['Family Medicine', 'Internal Medicine', 'Dermatology'],
      operatingHours: 'Mon-Sun: 7AM-9PM',
      emergencyFacilities: ['Emergency Room', 'X-Ray'],
      location: { lat: 34.052235, lng: -118.243683 }
    },
    { 
      id: '4', 
      name: 'St. Mary\'s Medical', 
      address: '101 Healing Road, Careville, CA 90213',
      distance: '5.1 km', 
      travelTime: '18 min', 
      icuAvailable: 10, 
      icuTotal: 25, 
      waitTime: 8,
      phone: '(555) 321-7654',
      rating: 4.7,
      specialties: ['Cardiology', 'Pulmonology', 'Urology'],
      operatingHours: 'Open 24 Hours',
      emergencyFacilities: ['ICU', 'Emergency Room', 'Trauma Center', 'MRI', 'CT Scan'],
      location: { lat: 34.052235, lng: -118.243683 }
    },
    { 
      id: '5', 
      name: 'Riverside Health Center', 
      address: '222 Riverside Drive, Rivercity, CA 90214',
      distance: '6.3 km', 
      travelTime: '20 min', 
      icuAvailable: 3, 
      icuTotal: 12, 
      waitTime: 12,
      phone: '(555) 789-0123',
      rating: 4.0,
      specialties: ['Pediatrics', 'OB/GYN', 'Geriatrics'],
      operatingHours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-3PM',
      emergencyFacilities: ['Emergency Room', 'X-Ray', 'Ultrasound'],
      location: { lat: 34.052235, lng: -118.243683 }
    },
  ];
  
  const specialties = [...new Set(mockHospitals.flatMap(h => h.specialties))].sort();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim() && !location.trim() && !specialty) {
      toast({
        title: "Input Required",
        description: "Please enter a hospital name, location, or select a specialty to search.",
        variant: "destructive"
      });
      return;
    }
    
    setSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      // Filter hospitals based on search criteria
      let results = [...mockHospitals];
      
      if (searchTerm.trim()) {
        results = results.filter(hospital => 
          hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (location.trim()) {
        results = results.filter(hospital => 
          hospital.address.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      if (specialty) {
        results = results.filter(hospital => 
          hospital.specialties.some(s => s.toLowerCase() === specialty.toLowerCase())
        );
      }
      
      setSearchResults(results.length > 0 ? results : []);
      setSearchPerformed(true);
      setSearching(false);

      if (results.length === 0) {
        toast({
          title: "No Results Found",
          description: "We couldn't find any hospitals matching your search criteria.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Hospitals Found",
          description: `We found ${results.length} hospitals matching your criteria.`,
        });
      }
    }, 800);
  };
  
  const handleNavigateToHospital = (hospitalId: string) => {
    toast({
      title: "Navigation Started",
      description: "Generating route to selected hospital...",
    });
    navigate(`/map?hospital=${hospitalId}`);
  };
  
  const openQrCode = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setQrDialogOpen(true);
  };
  
  const generateQrCodeData = (hospital: Hospital) => {
    return JSON.stringify({
      name: hospital.name,
      address: hospital.address,
      phone: hospital.phone,
      specialties: hospital.specialties.join(', '),
      operatingHours: hospital.operatingHours,
      emergencyFacilities: hospital.emergencyFacilities.join(', ')
    });
  };
  
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center transition-all duration-500"
      style={{ 
        backgroundImage: `url('/lovable-uploads/7c8af1f3-722f-4ce8-a1f9-aa995983760e.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={`min-h-screen w-full backdrop-blur-sm transition-all duration-500 pb-20 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900/90 via-purple-900/70 to-gray-900/90' 
          : 'bg-gradient-to-br from-blue-50/90 via-purple-100/70 to-blue-50/90'
      }`}>
        {/* Top Header */}
        <TopHeader />
        
        <div className="container mx-auto px-4 pt-4 pb-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-gray-200">
              {t("search-hospitals")}
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Find hospitals nearby, check availability and services
            </p>
            
            {/* Search Form */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg rounded-xl p-6 mb-8"
            >
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search by hospital name"
                      className="pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter your location"
                      className="pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <Select
                    value={specialty}
                    onValueChange={setSpecialty}
                  >
                    <SelectTrigger className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                      <SelectValue placeholder="Select specialty (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Specialties</SelectItem>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-5 rounded-lg bg-medical-500 hover:bg-medical-600 shadow-md"
                  disabled={searching}
                >
                  {searching ? 
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> : 
                    <SearchIcon className="mr-2 h-4 w-4" />}
                  {searching ? "Searching..." : t("search-hospitals").split('...')[0]}
                </Button>
              </form>
            </motion.div>
            
            {/* Search Results */}
            {searchPerformed && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {searchResults.map((hospital) => (
                      <motion.div
                        key={hospital.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">{hospital.name}</h3>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-gray-700 dark:text-gray-300 font-medium">{hospital.rating}</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <MapPin size={14} className="mr-1 flex-shrink-0" />
                                <span className="truncate">{hospital.address}</span>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Phone size={14} className="mr-1 flex-shrink-0" />
                                <span>{hospital.phone}</span>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Building size={14} className="mr-1 flex-shrink-0" />
                                <span className="truncate">{hospital.distance} away</span>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Clock size={14} className="mr-1 flex-shrink-0" />
                                <span className="truncate">{hospital.operatingHours}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Specialties:</p>
                              <div className="flex flex-wrap gap-1">
                                {hospital.specialties.map(specialty => (
                                  <span 
                                    key={specialty}
                                    className={`text-xs px-2 py-0.5 rounded-full ${
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
                          </div>
                          
                          <div className="flex flex-row md:flex-col justify-between items-center gap-3 md:gap-4">
                            <div 
                              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                              onClick={() => openQrCode(hospital)}
                              title="Show QR Code"
                            >
                              <QrCode size={20} className="text-medical-500" />
                            </div>
                            
                            <Button
                              size="sm"
                              onClick={() => handleNavigateToHospital(hospital.id)}
                              className="bg-medical-500 hover:bg-medical-600 text-white whitespace-nowrap"
                            >
                              <Ambulance size={16} className="mr-1" />
                              Navigate
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-400">ICU Beds</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {hospital.icuAvailable} / {hospital.icuTotal}
                            </p>
                          </div>
                          
                          <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Wait Time</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {hospital.waitTime} min
                            </p>
                          </div>
                          
                          <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-400">ETA</p>
                            <div className="flex items-center">
                              <Ambulance size={14} className="mr-1 text-medical-500" />
                              <span className="font-semibold text-gray-800 dark:text-gray-200">{hospital.travelTime}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md">
                    <p className="text-gray-500 dark:text-gray-400">
                      No hospitals found matching your search criteria.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
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
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Bottom Navigation */}
        <Navbar />
      </div>
    </div>
  );
};

export default Search;
