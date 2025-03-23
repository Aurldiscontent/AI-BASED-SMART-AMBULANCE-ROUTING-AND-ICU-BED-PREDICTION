import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';
import TopHeader from '@/components/ui/TopHeader';
import Navbar from '@/components/ui/Navbar';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import DataUploadDialog from '@/components/DataUploadDialog';
import ProfileEditor from '@/components/ui/ProfileEditor';
import ProfileVerificationBadge from '@/components/ui/ProfileVerificationBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, Upload, FileCheck, LogOut, Mail, Phone, MapPin, Calendar, Shield, Edit, ChevronRight, UserCog, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'verified' | 'pending' | 'unverified'>('unverified');
  
  const [profileData, setProfileData] = useState({
    name: 'SREEJITH S',
    email: 'sreejith.s@medresponse.org',
    phone: '+91 9876543210',
    role: 'First Responder',
    location: 'Bangalore, Central EMS',
    department: 'Emergency Medical Services',
    joinDate: '15 Jan 2021',
    medicalHistory: '',
    address: '',
    emergencyContacts: []
  });
  
  // Set Sreejith's profile data when component mounts
  useEffect(() => {
    // Check if user data already exists
    if (localStorage.getItem('userName')) {
      // Load existing data
      setProfileData({
        name: localStorage.getItem('userName') || 'SREEJITH S',
        email: localStorage.getItem('userEmail') || 'sreejith.s@medresponse.org',
        phone: localStorage.getItem('userPhone') || '+91 9876543210',
        role: localStorage.getItem('userRole') || 'First Responder',
        location: localStorage.getItem('userLocation') || 'Bangalore, Central EMS',
        department: localStorage.getItem('userDepartment') || 'Emergency Medical Services',
        joinDate: localStorage.getItem('userJoinDate') || '15 Jan 2021',
        medicalHistory: localStorage.getItem('userMedicalHistory') || '',
        address: localStorage.getItem('userAddress') || '',
        emergencyContacts: JSON.parse(localStorage.getItem('userEmergencyContacts') || '[]')
      });
      
      // Get profile image if exists
      const savedAvatar = localStorage.getItem('userAvatar');
      if (savedAvatar) {
        setAvatarUrl(savedAvatar);
      }
      
      // Check verification status
      const savedVerificationStatus = localStorage.getItem('userVerificationStatus');
      if (savedVerificationStatus) {
        setVerificationStatus(savedVerificationStatus as 'verified' | 'pending' | 'unverified');
      } else if (localStorage.getItem('userEmail')?.includes('@medresponse.org')) {
        // Auto-verify users with medresponse.org emails
        setVerificationStatus('verified');
        localStorage.setItem('userVerificationStatus', 'verified');
      }
    } else {
      // Initialize default data
      localStorage.setItem('userName', 'SREEJITH S');
      localStorage.setItem('userEmail', 'sreejith.s@medresponse.org');
      localStorage.setItem('userRole', 'First Responder');
      localStorage.setItem('userLocation', 'Bangalore, Central EMS');
      localStorage.setItem('userPhone', '+91 9876543210');
      localStorage.setItem('userDepartment', 'Emergency Medical Services');
      localStorage.setItem('userJoinDate', '15 Jan 2021');
      
      // Auto-verify users with medresponse.org emails
      setVerificationStatus('verified');
      localStorage.setItem('userVerificationStatus', 'verified');
    }
  }, []);
  
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
  
  const handleSaveProfile = (data: any) => {
    // Save updated profile data to localStorage
    localStorage.setItem('userName', data.name);
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userPhone', data.phone || '');
    localStorage.setItem('userRole', data.role);
    localStorage.setItem('userLocation', data.location || 'Bangalore, Central EMS');
    localStorage.setItem('userDepartment', data.department || 'Emergency Medical Services');
    localStorage.setItem('userMedicalHistory', data.medicalHistory || '');
    localStorage.setItem('userAddress', data.address || '');
    localStorage.setItem('userEmergencyContacts', JSON.stringify(data.emergencyContacts || []));
    
    if (data.avatarUrl) {
      localStorage.setItem('userAvatar', data.avatarUrl);
      setAvatarUrl(data.avatarUrl);
    }
    
    // Update verification status based on email domain
    if (data.email.includes('@medresponse.org')) {
      setVerificationStatus('verified');
      localStorage.setItem('userVerificationStatus', 'verified');
    } else if (data.email.includes('@gmail.com') || data.email.includes('@yahoo.com') || data.email.includes('@outlook.com')) {
      // Common public domains are treated as unverified
      setVerificationStatus('unverified');
      localStorage.setItem('userVerificationStatus', 'unverified');
    } else {
      // Other domains are pending verification
      setVerificationStatus('pending');
      localStorage.setItem('userVerificationStatus', 'pending');
    }
    
    // Update state
    setProfileData(data);
    setEditMode(false);
    
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

  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        localStorage.setItem('userAvatar', base64String);
        
        toast({
          title: "Profile Picture Updated",
          description: "Your profile picture has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
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
        
        <div className="container mx-auto px-4 pt-4 pb-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{t("profile")}</h1>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setEditMode(!editMode)}
                  variant="outline"
                  size="sm"
                  className={`${editMode 
                    ? isDark ? 'bg-purple-900/50' : 'bg-purple-100' 
                    : ''
                  }`}
                >
                  <Edit size={14} className="mr-1" />
                  {editMode ? "Cancel Edit" : "Edit Profile"}
                </Button>
                
                <Button
                  onClick={handleSignOut}
                  variant="destructive"
                  size="sm"
                >
                  <LogOut size={14} className="mr-1" />
                  {t("sign-out")}
                </Button>
              </div>
            </div>
            
            {!editMode ? (
              <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className={`w-full grid grid-cols-3 mb-6 ${isDark ? 'bg-gray-800/70' : 'bg-gray-100'}`}>
                  <TabsTrigger value="profile" className="text-sm">
                    <User size={14} className="mr-1.5" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="text-sm">
                    <Settings size={14} className="mr-1.5" />
                    Settings
                  </TabsTrigger>
                  <TabsTrigger value="data" className="text-sm">
                    <Upload size={14} className="mr-1.5" />
                    Data
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6">
                  {/* User Profile Card */}
                  <div className={`${
                    isDark ? 'bg-gray-800/80 border border-purple-900/30' : 'bg-white/90 border border-purple-100'
                  } rounded-xl p-6 shadow-md relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-bl-full" />
                    
                    <div className="flex items-start gap-6">
                      <div className="relative group">
                        <Avatar className="w-24 h-24 border-2 border-white dark:border-gray-800 shadow-md">
                          {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={profileData.name} className="object-cover" />
                          ) : (
                            <AvatarFallback className={`text-3xl font-bold ${
                              isDark ? 'bg-purple-900/50 text-purple-100' : 'bg-purple-100 text-purple-900'
                            }`}>
                              {profileData.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={() => document.getElementById('avatar-upload')?.click()}
                        >
                          <Camera size={14} />
                        </Button>
                        <input 
                          id="avatar-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleUploadAvatar}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{profileData.name}</h2>
                          <ProfileVerificationBadge status={verificationStatus} />
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-1 mt-1">
                          <Badge className={`${
                            isDark ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}>
                            {profileData.role}
                          </Badge>
                          <Badge className={`${
                            isDark ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                          }`}>
                            {profileData.department}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center">
                          <MapPin size={14} className="mr-1 text-gray-400 dark:text-gray-500" />
                          {profileData.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 space-y-4">
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">Contact Information</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isDark ? 'bg-gray-600/70' : 'bg-white'
                            }`}>
                              <Mail size={16} className="text-purple-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                              <p className="text-sm text-gray-700 dark:text-gray-200">{profileData.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isDark ? 'bg-gray-600/70' : 'bg-white'
                            }`}>
                              <Phone size={16} className="text-purple-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                              <p className="text-sm text-gray-700 dark:text-gray-200">{profileData.phone}</p>
                            </div>
                          </div>
                          
                          {profileData.address && (
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isDark ? 'bg-gray-600/70' : 'bg-white'
                              }`}>
                                <MapPin size={16} className="text-purple-500" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                                <p className="text-sm text-gray-700 dark:text-gray-200">{profileData.address}</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isDark ? 'bg-gray-600/70' : 'bg-white'
                            }`}>
                              <Calendar size={16} className="text-purple-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>
                              <p className="text-sm text-gray-700 dark:text-gray-200">{profileData.joinDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">Emergency Contacts</h3>
                        
                        {profileData.emergencyContacts && profileData.emergencyContacts.length > 0 ? (
                          <div className="space-y-3">
                            {profileData.emergencyContacts.map((contact: any, index: number) => (
                              <div key={index} className={`p-3 rounded-lg ${isDark ? 'bg-gray-600/50' : 'bg-white'}`}>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{contact.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{contact.relationship}</p>
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">{contact.phone}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-3">
                            <p className="text-sm text-gray-500 dark:text-gray-400">No emergency contacts added</p>
                          </div>
                        )}
                        
                        <div className="mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => {
                              setEditMode(true);
                              setTimeout(() => {
                                document.getElementById('emergency-contacts-section')?.scrollIntoView({ behavior: 'smooth' });
                              }, 100);
                            }}
                          >
                            <UserCog size={14} className="mr-1" />
                            Manage Emergency Contacts
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                  <div className={`${
                    isDark ? 'bg-gray-800/80 border border-purple-900/30' : 'bg-white/90 border border-purple-100'
                  } rounded-xl p-6 shadow-md`}>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-6">Account Settings</h3>
                    
                    <div className="space-y-4">
                      <div className={`p-3 rounded-lg flex justify-between items-center ${
                        isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                      } transition-colors cursor-pointer`}>
                        <div className="flex items-center gap-3">
                          <Shield size={18} className="text-purple-500" />
                          <span className="text-sm">Privacy Settings</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                      
                      <div className={`p-3 rounded-lg flex justify-between items-center ${
                        isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                      } transition-colors cursor-pointer`}>
                        <div className="flex items-center gap-3">
                          <User size={18} className="text-purple-500" />
                          <span className="text-sm">Account Security</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                      
                      <div className={`p-3 rounded-lg flex justify-between items-center ${
                        isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                      } transition-colors cursor-pointer`}>
                        <div className="flex items-center gap-3">
                          <Settings size={18} className="text-purple-500" />
                          <span className="text-sm">Notification Preferences</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="data" className="space-y-6">
                  <div className={`${
                    isDark ? 'bg-gray-800/80 border border-purple-900/30' : 'bg-white/90 border border-purple-100'
                  } rounded-xl p-6 shadow-md`}>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Data Management</h3>
                    
                    <div className={`p-4 rounded-lg mb-4 ${
                      isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}>
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
                    
                    {/* Data Upload Component */}
                    <DataUploadDialog 
                      onAnalysisReady={handleAnalysisReady}
                      onResetAnalysis={handleResetAnalysis}
                      analysisExists={showAnalysis}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              // Edit Mode - Profile Editor Component
              <div className="space-y-6">
                <div className={`${
                  isDark ? 'bg-gray-800/80 border border-purple-900/30' : 'bg-white/90 border border-purple-100'
                } rounded-xl p-6 shadow-md`}>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <Edit size={18} className="mr-2 text-purple-500" />
                    Edit Profile
                  </h2>
                  
                  <ProfileEditor 
                    initialData={{...profileData, avatarUrl}}
                    onSave={handleSaveProfile}
                    onCancel={() => setEditMode(false)}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        <Navbar />
      </div>
    </div>
  );
};

export default Profile;
