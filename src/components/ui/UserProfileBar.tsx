
import React, { useState, useEffect } from 'react';
import { User, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/hooks/use-language';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import ProfileVerificationBadge from './ProfileVerificationBadge';

const UserProfileBar = () => {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'verified' | 'pending' | 'unverified'>('unverified');
  
  const [userData, setUserData] = useState({
    name: 'SREEJITH S',
    email: 'sreejithsunitha@gmail.com',
    role: 'Ml Engineer',
    location: 'Bangalore',
  });
  
  // Load user data from localStorage once when component mounts
  useEffect(() => {
    // If no data in localStorage, set default SREEJITH data
    if (!localStorage.getItem('userName')) {
      localStorage.setItem('userName', 'SREEJITH');
      localStorage.setItem('userEmail', 'sreejith@example.com');
      localStorage.setItem('userRole', 'First Responder');
      localStorage.setItem('userLocation', 'Bangalore');
    }
    
    // Update state with localStorage data
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole');
    const location = localStorage.getItem('userLocation');
    
    setUserData({
      name: name || 'SREEJITH',
      email: email || 'sreejith@example.com',
      role: role || 'First Responder',
      location: location || 'Bangalore',
    });
    
    // Get verification status
    const savedVerificationStatus = localStorage.getItem('userVerificationStatus');
    if (savedVerificationStatus) {
      setVerificationStatus(savedVerificationStatus as 'verified' | 'pending' | 'unverified');
    } else if (email && email.includes('@medresponse.org')) {
      // Auto-verify users with medresponse.org emails
      setVerificationStatus('verified');
      localStorage.setItem('userVerificationStatus', 'verified');
    }
    
    // Load avatar if exists
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
  }, []);
  
  const handleSignOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userLocation');
    localStorage.removeItem('analysisData');
    
    // Show toast notification
    toast({
      title: t("signed-out"),
      description: t("signed-out-success"),
      variant: "default",
    });
    
    // Close the dialog
    setOpen(false);
    
    // Redirect to auth page
    window.location.href = '/auth';
  };
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as any);
    toast({
      title: t("language"),
      description: `${t("language")} ${t("change")}d to ${lang}`,
      variant: "default",
    });
  };
  
  const handleEditProfile = () => {
    setOpen(false);
    navigate('/profile');
  };
  
  return (
    <div className="flex items-center w-full py-2">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <Avatar className="h-10 w-10 rounded-full">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={userData.name} className="object-cover" />
          ) : (
            <AvatarFallback className="bg-medical-500 text-white">
              {userData.name.charAt(0)}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="text-left flex items-center gap-1.5">
          <div>
            <h3 className="font-medium text-sm dark:text-gray-200">{userData.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{userData.role} • {userData.location}</p>
          </div>
          {verificationStatus === 'verified' && (
            <ProfileVerificationBadge status="verified" size="sm" />
          )}
        </div>
      </motion.div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="ml-auto text-sm text-primary hover:underline">
            {t("profile")}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:text-gray-200">
          <DialogHeader>
            <DialogTitle>{t("user-profile")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center relative">
                <Avatar className="h-24 w-24">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={userData.name} className="object-cover" />
                  ) : (
                    <AvatarFallback className="bg-medical-500 text-white text-xl">
                      {userData.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                {verificationStatus === 'verified' && (
                  <div className="absolute -bottom-1 -right-1">
                    <ProfileVerificationBadge status="verified" size="md" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("name")}: {userData.name}</p>
                <p className="text-sm">{t("email")}: {userData.email}</p>
                <p className="text-sm">{t("role")}: {userData.role}</p>
                <p className="text-sm">{t("location")}: {userData.location}</p>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleEditProfile}
              >
                <Pencil size={16} />
                {t("edit-profile")}
              </Button>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("language")}</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant={language === "english" ? "default" : "outline"}
                    onClick={() => handleLanguageChange("english")}
                  >
                    English
                  </Button>
                  <Button 
                    size="sm" 
                    variant={language === "kannada" ? "default" : "outline"}
                    onClick={() => handleLanguageChange("kannada")}
                  >
                    ಕನ್ನಡ
                  </Button>
                  <Button 
                    size="sm" 
                    variant={language === "hindi" ? "default" : "outline"}
                    onClick={() => handleLanguageChange("hindi")}
                  >
                    हिंदी
                  </Button>
                  <Button 
                    size="sm" 
                    variant={language === "tamil" ? "default" : "outline"}
                    onClick={() => handleLanguageChange("tamil")}
                  >
                    தமிழ்
                  </Button>
                  <Button 
                    size="sm" 
                    variant={language === "telugu" ? "default" : "outline"}
                    onClick={() => handleLanguageChange("telugu")}
                  >
                    తెలుగు
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={handleSignOut}>
                {t("sign-out")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfileBar;
