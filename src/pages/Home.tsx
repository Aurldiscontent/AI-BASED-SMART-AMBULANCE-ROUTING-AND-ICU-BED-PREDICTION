
import React, { useState, useEffect } from 'react';
import HomePage from '@/components/HomePage';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { motion } from 'framer-motion';
import UserProfileBar from '@/components/ui/UserProfileBar';
import DataAnalysisSection from '@/components/DataAnalysisSection';
import DataUploadDialog from '@/components/DataUploadDialog';

const Home = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [showAnalysis, setShowAnalysis] = useState(false);
  
  // Mock data for geographic distribution - this would normally come from an API
  const [geoDistributionData] = useState({
    regions: [
      { name: t("north-bangalore"), incidents: 45, response: 8.3, color: "#8884d8" },
      { name: t("central-bangalore"), incidents: 78, response: 6.2, color: "#82ca9d" },
      { name: t("south-bangalore"), incidents: 52, response: 7.5, color: "#ffc658" },
      { name: t("east-bangalore"), incidents: 63, response: 8.1, color: "#ff8042" },
      { name: t("west-bangalore"), incidents: 41, response: 9.0, color: "#0088fe" },
    ],
    timeData: [
      { time: '00:00', incidents: 12, response: 7.2 },
      { time: '04:00', incidents: 8, response: 6.5 },
      { time: '08:00', incidents: 25, response: 9.1 },
      { time: '12:00', incidents: 35, response: 8.3 },
      { time: '16:00', incidents: 42, response: 7.8 },
      { time: '20:00', incidents: 30, response: 6.9 },
    ]
  });
  
  // Check if analysis data exists on component mount
  useEffect(() => {
    const hasAnalysisData = localStorage.getItem('analysisData') === 'true';
    setShowAnalysis(hasAnalysisData);
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
      } backdrop-blur-sm transition-all duration-500`}>
        <div className="container mx-auto px-4 py-3">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-between items-center"
          >
            <UserProfileBar />
            
            {/* Dataset Upload Button or Reset Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {showAnalysis ? (
                <DataUploadDialog 
                  onAnalysisReady={handleAnalysisReady} 
                  onResetAnalysis={handleResetAnalysis}
                  analysisExists={true}
                />
              ) : (
                <DataUploadDialog 
                  onAnalysisReady={handleAnalysisReady}
                  onResetAnalysis={handleResetAnalysis}
                  analysisExists={false}
                />
              )}
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          {showAnalysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto px-4"
            >
              <DataAnalysisSection geoDistributionData={geoDistributionData} />
            </motion.div>
          )}
          
          <HomePage />
        </motion.div>
        
        <div className="fixed top-5 right-5 z-50">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Home;
