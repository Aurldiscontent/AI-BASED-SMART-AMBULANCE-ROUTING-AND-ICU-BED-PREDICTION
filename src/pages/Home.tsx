
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';
import DataUploadDialog from '@/components/DataUploadDialog';
import TopHeader from '@/components/ui/TopHeader';
import EnhancedMapView from '@/components/ui/EnhancedMapView';
import EnhancedICUAvailability from '@/components/ui/EnhancedICUAvailability';
import GeographicDistribution from '@/components/ui/GeographicDistribution';
import HospitalDashboard from '@/components/ui/HospitalDashboard';
import Navbar from '@/components/ui/Navbar';

const Home = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [showAnalysis, setShowAnalysis] = useState(false);
  
  // Mock data for hospitals
  const [hospitals] = useState([
    { id: '1', name: 'City General Hospital', icuBeds: 12, totalBeds: 20, aiSurvivalRate: 92 },
    { id: '2', name: 'Memorial Care', icuBeds: 8, totalBeds: 15, aiSurvivalRate: 88 },
    { id: '3', name: 'Community Medical', icuBeds: 5, totalBeds: 12, aiSurvivalRate: 85 },
    { id: '4', name: 'St. Mary\'s Hospital', icuBeds: 10, totalBeds: 18, aiSurvivalRate: 90 },
    { id: '5', name: 'Lakeside Health', icuBeds: 7, totalBeds: 15, aiSurvivalRate: 83 },
  ]);
  
  // Mock data for geographic distribution
  const [geoDistributionData] = useState({
    regions: [
      { id: '1', name: t("north-bangalore"), incidents: 45, response: 8.3, color: "#8884d8" },
      { id: '2', name: t("central-bangalore"), incidents: 78, response: 6.2, color: "#82ca9d" },
      { id: '3', name: t("south-bangalore"), incidents: 52, response: 7.5, color: "#ffc658" },
      { id: '4', name: t("east-bangalore"), incidents: 63, response: 8.1, color: "#ff8042" },
      { id: '5', name: t("west-bangalore"), incidents: 41, response: 9.0, color: "#0088fe" },
    ]
  });
  
  // Mock data for ICU beds
  const [icuBedData] = useState([
    { hospital: 'City General', available: 12, total: 20, waitTime: 15, occupancyRate: 65 },
    { hospital: 'Memorial Care', available: 8, total: 15, waitTime: 22, occupancyRate: 78 },
    { hospital: 'Community Med', available: 5, total: 12, waitTime: 30, occupancyRate: 82 },
    { hospital: 'St. Mary\'s', available: 10, total: 18, waitTime: 18, occupancyRate: 70 },
    { hospital: 'Lakeside', available: 7, total: 15, waitTime: 25, occupancyRate: 75 },
  ]);
  
  // Mock patient data
  const [patientData] = useState({
    id: 'P12345',
    severity: 'Critical',
    estimatedSurvivalRate: 85,
    aiRecommendedHospital: '1'
  });
  
  // Mock hospital destinations for map
  const [destinations] = useState(
    hospitals.map(h => ({
      id: h.id,
      name: h.name,
      location: {
        lat: 12.9716 + (Math.random() * 0.1 - 0.05),
        lng: 77.5946 + (Math.random() * 0.1 - 0.05)
      }
    }))
  );
  
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  
  // Check if analysis data exists on component mount
  useEffect(() => {
    const checkAnalysisData = () => {
      const hasAnalysisData = localStorage.getItem('analysisData') === 'true';
      setShowAnalysis(hasAnalysisData);
    };

    checkAnalysisData();
    window.addEventListener('storage', checkAnalysisData);
    
    return () => {
      window.removeEventListener('storage', checkAnalysisData);
    };
  }, []);
  
  // Handle when analysis is ready
  const handleAnalysisReady = () => {
    localStorage.setItem('analysisData', 'true');
    setShowAnalysis(true);
  };

  // Handle analysis reset
  const handleResetAnalysis = () => {
    localStorage.removeItem('analysisData');
    setShowAnalysis(false);
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
      <div className={`min-h-screen w-full ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900/90 via-purple-900/70 to-gray-900/90' 
          : 'bg-gradient-to-br from-blue-50/90 via-purple-100/70 to-blue-50/90'
      } backdrop-blur-sm transition-all duration-500 pb-20`}>
        {/* Top Header */}
        <TopHeader />
        
        <div className="container mx-auto px-4 pt-2">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* Enhanced Map View */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Live Route Map</h2>
              <EnhancedMapView 
                destinations={destinations}
                selectedHospitalId={selectedHospitalId}
                onHospitalClick={(id) => setSelectedHospitalId(id)}
              />
            </div>
            
            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Enhanced ICU Availability */}
              <EnhancedICUAvailability data={icuBedData} />
              
              {/* Geographic Distribution */}
              <GeographicDistribution regions={geoDistributionData.regions} />
            </div>
            
            {/* Hospital Dashboard */}
            <div className="mb-6">
              <HospitalDashboard 
                hospitals={hospitals}
                patientData={patientData}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Navigation */}
        <Navbar />
      </div>
    </div>
  );
};

export default Home;
