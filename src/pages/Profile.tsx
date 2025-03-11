
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';
import TopHeader from '@/components/ui/TopHeader';
import Navbar from '@/components/ui/Navbar';
import { User, Mail, Building, MapPin, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import DataUploadDialog from '@/components/DataUploadDialog';

const Profile = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [showAnalysis, setShowAnalysis] = React.useState(false);
  
  // Mock user data
  const userData = {
    name: "SREEJITH S, 3rd YEAR STUDENT",
    email: localStorage.getItem('userEmail') || 'sreejith.s@medresponse.org',
    role: localStorage.getItem('userRole') || 'First Responder',
    location: localStorage.getItem('userLocation') || 'Central EMS'
  };
  
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
        {/* Top Header */}
        <TopHeader />
        
        <div className="container mx-auto px-4 pt-4 pb-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto"
          >
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-6">
              <div className="bg-gradient-to-r from-medical-500 to-medical-600 p-6 text-white">
                <h1 className="text-2xl font-bold">{t("profile")}</h1>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-medical-100 dark:bg-medical-900/30 flex items-center justify-center text-medical-600 dark:text-medical-300 text-4xl font-bold mb-3">
                    {userData.name.charAt(0)}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{userData.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{userData.role}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Mail className="mr-3 text-gray-500 dark:text-gray-400" size={18} />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t("email")}</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Building className="mr-3 text-gray-500 dark:text-gray-400" size={18} />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t("role")}</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{userData.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <MapPin className="mr-3 text-gray-500 dark:text-gray-400" size={18} />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t("location")}</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{userData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <DataUploadDialog 
                onAnalysisReady={handleAnalysisReady}
                onResetAnalysis={handleResetAnalysis}
                analysisExists={showAnalysis}
              />
              
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <User size={16} />
                {t("edit-profile")}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                onClick={handleSignOut}
              >
                <LogOut size={16} />
                {t("sign-out")}
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Navigation */}
        <Navbar />
      </div>
    </div>
  );
};

export default Profile;
