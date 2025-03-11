
import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';
import TopHeader from '@/components/ui/TopHeader';
import Navbar from '@/components/ui/Navbar';
import { Search as SearchIcon, MapPin, ArrowRight, Clock, Ambulance } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Hospital {
  id: string;
  name: string;
  distance: string;
  travelTime: string;
  icuAvailable: number;
  icuTotal: number;
  waiting: number;
}

const Search = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Hospital[]>([]);
  
  // Mock hospitals data
  const mockHospitals: Hospital[] = [
    { id: '1', name: 'City General Hospital', distance: '2.5 km', travelTime: '8 min', icuAvailable: 5, icuTotal: 20, waiting: 10 },
    { id: '2', name: 'Memorial Medical Center', distance: '4.2 km', travelTime: '12 min', icuAvailable: 8, icuTotal: 15, waiting: 5 },
    { id: '3', name: 'Community Hospital', distance: '3.8 km', travelTime: '14 min', icuAvailable: 2, icuTotal: 10, waiting: 15 },
    { id: '4', name: 'St. Mary\'s Medical', distance: '5.1 km', travelTime: '18 min', icuAvailable: 10, icuTotal: 25, waiting: 8 },
    { id: '5', name: 'Riverside Health Center', distance: '6.3 km', travelTime: '20 min', icuAvailable: 3, icuTotal: 12, waiting: 12 },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    setSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      // Filter hospitals based on search term
      const results = mockHospitals.filter(hospital => 
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(results.length > 0 ? results : mockHospitals);
      setSearching(false);
    }, 800);
  };
  
  const handleNavigateToHospital = (hospitalId: string) => {
    navigate(`/map?hospital=${hospitalId}`);
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
            className="w-full"
          >
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">{t("search-hospitals")}</h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t("search-hospitals")}
                  className="pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Button 
                  type="submit" 
                  className="absolute inset-y-0 right-0 px-4 m-[2px] rounded-lg bg-medical-500 hover:bg-medical-600"
                  disabled={searching}
                >
                  {searching ? 
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 
                    t("search-hospitals").split('...')[0]}
                </Button>
              </div>
            </form>
            
            {/* Search Results */}
            <div className="space-y-4">
              {searchResults.length > 0 && (
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{t("hospitals-near-you")}</h2>
              )}
              
              {searchResults.map((hospital) => (
                <motion.div
                  key={hospital.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-gray-200">{hospital.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{hospital.distance}</span>
                        <span className="mx-2">•</span>
                        <Clock size={14} className="mr-1" />
                        <span>{hospital.travelTime}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleNavigateToHospital(hospital.id)}
                      className="bg-medical-500 hover:bg-medical-600 text-white"
                    >
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">ICU Beds</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        {hospital.icuAvailable} / {hospital.icuTotal}
                      </p>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Wait Time</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        {hospital.waiting} min
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
              
              {searchTerm && searchResults.length === 0 && !searching && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md">
                  <p className="text-gray-500 dark:text-gray-400">No hospitals found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Navigation */}
        <Navbar />
      </div>
    </div>
  );
};

export default Search;
