
import React, { useState } from 'react';
import HomePage from '@/components/HomePage';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { motion } from 'framer-motion';
import UserProfileBar from '@/components/ui/UserProfileBar';
import { Button } from '@/components/ui/button';
import { Upload, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Home = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Handle CSV upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadSuccess(false);
      
      // Simulate file upload
      setTimeout(() => {
        setIsUploading(false);
        setUploadSuccess(true);
        
        toast({
          title: t("dataset-uploaded-title"),
          description: `${t("dataset-uploaded-desc")}: "${file.name}"`,
          variant: "default",
        });
        
        // Reset success indicator after 3 seconds
        setTimeout(() => {
          setUploadSuccess(false);
        }, 3000);
      }, 1500);
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
            
            {/* CSV Upload Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center"
            >
              <input
                type="file"
                id="csv-upload"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              <label htmlFor="csv-upload">
                <Button 
                  variant={uploadSuccess ? "default" : "outline"} 
                  className={`flex items-center gap-2 ${
                    isDark 
                      ? uploadSuccess 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gray-800/70 hover:bg-gray-700/70 border-gray-700'
                      : uploadSuccess 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-white/70 hover:bg-white/90 border-gray-200'
                  } backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md`}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      {t("uploading")}
                    </>
                  ) : uploadSuccess ? (
                    <>
                      <CheckCircle2 size={16} className="text-white" /> 
                      {t("dataset-ready")}
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet size={16} /> 
                      {t("upload-dataset")}
                    </>
                  )}
                </Button>
              </label>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
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
