
import React, { useState } from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { useToast } from '@/components/ui/use-toast';

const UserProfileBar = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  // Get user data from localStorage (stored during authentication)
  const userData = {
    name: localStorage.getItem('userName') || 'Guest User',
    email: localStorage.getItem('userEmail') || 'guest@example.com',
    role: localStorage.getItem('userRole') || 'User',
    location: localStorage.getItem('userLocation') || 'Not specified',
  };
  
  const handleSignOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userLocation');
    
    // Show toast notification
    toast({
      title: t("signed-out"),
      description: t("signed-out-success"),
      variant: "default",
    });
    
    // Close the dialog
    setOpen(false);
    
    // Redirect to auth page (this will be caught by RouteGuard)
    window.location.href = '/auth';
  };
  
  return (
    <div className="flex items-center w-full py-2">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <div className="h-10 w-10 rounded-full bg-medical-500 flex items-center justify-center text-white">
          <User size={20} />
        </div>
        <div className="text-left">
          <h3 className="font-medium text-sm dark:text-gray-200">{userData.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{userData.role} • {userData.location}</p>
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
            <DialogTitle>{t("edit-profile")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center">
                <div className="h-24 w-24 rounded-full bg-medical-500 flex items-center justify-center text-white">
                  <User size={48} />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("name")}: {userData.name}</p>
                <p className="text-sm">{t("email")}: {userData.email}</p>
                <p className="text-sm">{t("role")}: {userData.role}</p>
                <p className="text-sm">{t("location")}: {userData.location}</p>
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
