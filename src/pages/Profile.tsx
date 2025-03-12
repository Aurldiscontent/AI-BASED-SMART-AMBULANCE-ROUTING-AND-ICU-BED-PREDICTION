
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
import { User, Settings, Upload, FileCheck, LogOut } from 'lucide-react';

const Profile = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [showAnalysis, setShowAnalysis] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    name: 'SREEJITH',
    email: 'sreejith@example.com',
    phone: '+91 9876543210',
    role: 'First Responder',
    location: 'Bangalore',
    medicalHistory: '',
    emergencyContacts: []
  });
  
  // Set Sreejith's profile data when component mounts
  React.useEffect(() => {
    // Check if user data already exists
    if (!localStorage.getItem('userName')) {
      localStorage.setItem('userName', 'SREEJITH');
      localStorage.setItem('userEmail', 'sreejith@example.com');
      localStorage.setItem('userRole', 'First Responder');
      localStorage.setItem('userLocation', 'Bangalore');
      localStorage.setItem('userPhone', '+91 9876543210');
    } else {
      // Load existing data
      setProfileData({
        name: localStorage.getItem('userName') || 'SREEJITH',
        email: localStorage.getItem('userEmail') || 'sreejith@example.com',
        phone: localStorage.getItem('userPhone') || '+91 9876543210',
        role: localStorage.getItem('userRole') || 'First Responder',
        location: localStorage.getItem('userLocation') || 'Bangalore',
        medicalHistory: localStorage.getItem('userMedicalHistory') || '',
        emergencyContacts: JSON.parse(localStorage.getItem('userEmergencyContacts') || '[]')
      });
    }
  }, []);
  
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
  
  const handleSaveProfile = (data: any) => {
    // Save updated profile data to localStorage
    localStorage.setItem('userName', data.name);
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userPhone', data.phone || '');
    localStorage.setItem('userRole', data.role);
    localStorage.setItem('userLocation', data.location || 'Bangalore');
    localStorage.setItem('userMedicalHistory', data.medicalHistory || '');
    localStorage.setItem('userEmergencyContacts', JSON.stringify(data.emergencyContacts || []));
    
    // Update state
    setProfileData(data);
    
    // Show success toast
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
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
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{t("profile")}</h1>
              
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-3 py-1.5 rounded-md text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <LogOut size={14} className="mr-1" />
                {t("sign-out")}
              </button>
            </div>
            
            <div className="space-y-6">
              {/* User Profile Card */}
              <div className={`${
                isDark ? 'bg-gray-800/70 border border-purple-900/30' : 'bg-white/80 border border-purple-100'
              } rounded-xl p-6 shadow-md relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-bl-full" />
                
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                    isDark ? 'bg-purple-900/50 text-purple-100' : 'bg-purple-100 text-purple-900'
                  }`}>
                    {profileData.name.charAt(0)}
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{profileData.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{profileData.role}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{profileData.location}</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                    }`}>
                      <User size={16} className="text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-sm text-gray-700 dark:text-gray-200">{profileData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                    }`}>
                      <Settings size={16} className="text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="text-sm text-gray-700 dark:text-gray-200">{profileData.phone || 'Not set'}</p>
                    </div>
                  </div>
                </div>
                
                <div className={`mt-6 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {showAnalysis ? (
                        <FileCheck size={18} className="text-green-500" />
                      ) : (
                        <Upload size={18} className="text-purple-500" />
                      )}
                      <p className="text-sm text-gray-700 dark:text-gray-200">
                        {showAnalysis ? "Analysis Data Ready" : "No Data Analysis"}
                      </p>
                    </div>
                    
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      showAnalysis 
                        ? isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700' 
                        : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {showAnalysis ? "Available" : "Not Available"}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profile Editor Component */}
              <div className={`${
                isDark ? 'bg-gray-800/70 border border-purple-900/30' : 'bg-white/80 border border-purple-100'
              } rounded-xl p-6 shadow-md`}>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Edit Profile</h2>
                
                <ProfileEditor 
                  initialData={profileData}
                  onSave={handleSaveProfile}
                />
              </div>
              
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
