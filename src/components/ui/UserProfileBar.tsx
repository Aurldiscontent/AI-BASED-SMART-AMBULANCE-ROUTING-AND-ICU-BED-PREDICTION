
import React, { useState } from 'react';
import { User, Upload, FileUp, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const UserProfileBar = () => {
  // This would typically come from your auth context or state
  // Here we're using mock data that would be replaced with actual user data
  const [userData, setUserData] = useState({
    name: localStorage.getItem('userName') || 'John Doe',
    email: localStorage.getItem('userEmail') || 'john.doe@example.com',
    role: localStorage.getItem('userRole') || 'Paramedic',
    location: localStorage.getItem('userLocation') || 'Central Hospital',
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if it's a CSV file
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      
      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded successfully`,
        variant: "default"
      });
      
      // Reset success state after a while
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1500);
  };
  
  return (
    <div className="flex items-center justify-between w-full py-2">
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
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 text-xs py-1 px-3 h-8 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <Upload size={14} />
            <span className="hidden sm:inline">Upload Dataset</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:text-gray-200">
          <DialogHeader>
            <DialogTitle>Upload CSV Dataset</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="border-2 border-dashed dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              {uploadSuccess ? (
                <div className="flex flex-col items-center justify-center text-success-500">
                  <CheckCircle size={48} className="mb-2" />
                  <p>Upload successful!</p>
                </div>
              ) : isUploading ? (
                <div className="flex flex-col items-center justify-center text-medical-500">
                  <div className="animate-spin mb-2">
                    <FileUp size={48} />
                  </div>
                  <p>Uploading...</p>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer">
                  <FileUp size={48} className="mb-2 text-gray-400 dark:text-gray-500" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Drag and drop your CSV file here, or click to browse
                  </p>
                  <input 
                    type="file" 
                    accept=".csv" 
                    className="hidden" 
                    onChange={handleFileUpload} 
                  />
                </label>
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p>Supported format: .CSV</p>
              <p>Maximum file size: 5MB</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfileBar;
