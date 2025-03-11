
import React, { useState } from 'react';
import HomePage from '@/components/HomePage';
import { useTheme } from '@/hooks/use-theme';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { motion } from 'framer-motion';
import UserProfileBar from '@/components/ui/UserProfileBar';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  
  // Handle CSV upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate file upload
      setTimeout(() => {
        setIsUploading(false);
        toast({
          title: "Dataset Uploaded",
          description: `Successfully uploaded ${file.name}`,
          variant: "default",
        });
      }, 1500);
    }
  };
  
  return (
    <div 
      className={`min-h-screen bg-cover bg-center transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}
      style={{ 
        backgroundImage: `url('/lovable-uploads/7c8af1f3-722f-4ce8-a1f9-aa995983760e.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={`min-h-screen ${
        isDark 
          ? 'bg-gradient-to-b from-gray-900/80 via-gray-800/70 to-gray-900/80' 
          : 'bg-gradient-to-b from-blue-50/80 via-white/70 to-blue-50/80'
      }`}>
        <div className="container mx-auto px-4 py-2">
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
              />
              <label htmlFor="csv-upload">
                <Button 
                  variant="outline" 
                  className={`flex items-center gap-2 ${
                    isDark 
                      ? 'bg-gray-800/60 hover:bg-gray-700/60 border-gray-700' 
                      : 'bg-white/60 hover:bg-white/80 border-gray-200'
                  } backdrop-blur-sm`}
                  disabled={isUploading}
                >
                  <Upload size={16} /> 
                  {isUploading ? 'Uploading...' : 'Upload Dataset'}
                </Button>
              </label>
            </motion.div>
          </motion.div>
        </div>
        
        <HomePage />
        
        <div className="fixed top-5 right-5 z-50">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Home;
