
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';
import TopHeader from '@/components/ui/TopHeader';
import Navbar from '@/components/ui/Navbar';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import DataUploadDialog from '@/components/DataUploadDialog';
import ProfileEditor from '@/components/ui/ProfileEditor';

const Profile = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [showAnalysis, setShowAnalysis] = React.useState(false);
  
  // Check if analysis data exists on component mount
  React.useEffect(() => {
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
  
  const handleSignOut = () => {
    // Clear user data
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userLocation');
    
    // Show success toast
    toast({
      title: t("signed-out"),
      description: t("signed-out-success"),
    });
    
    // Redirect to auth page
    navigate('/auth');
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
        <TopHeader />
        
        <div className="container mx-auto px-4 pt-4 pb-20 flex justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full"
          >
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">{t("profile")}</h1>
            
            <div className="space-y-6">
              {/* Profile Editor Component */}
              <ProfileEditor 
                onSave={(data) => {
                  toast({
                    title: "Profile Updated",
                    description: "Your profile has been updated successfully.",
                  });
                }}
              />
              
              {/* Data Upload Component */}
              <DataUploadDialog 
                onAnalysisReady={handleAnalysisReady}
                onResetAnalysis={handleResetAnalysis}
                analysisExists={showAnalysis}
              />
            </div>
          </motion.div>
        </div>
        
        <Navbar />
      </div>
    </div>
  );
};

export default Profile;
