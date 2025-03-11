
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useToast } from '@/hooks/use-toast';
import { FileSpreadsheet, CheckCircle2, Upload, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DataUploadDialogProps {
  onAnalysisReady: () => void;
  onResetAnalysis: () => void;
  analysisExists: boolean;
}

const DataUploadDialog: React.FC<DataUploadDialogProps> = ({ 
  onAnalysisReady, 
  onResetAnalysis,
  analysisExists
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  
  // Set up drag and drop event handlers
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return;
    
    const preventDefaults = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    const highlight = () => {
      dropArea.classList.add('bg-gray-100', 'dark:bg-gray-600');
    };
    
    const unhighlight = () => {
      dropArea.classList.remove('bg-gray-100', 'dark:bg-gray-600');
    };
    
    const handleDrop = (e: DragEvent) => {
      preventDefaults(e);
      unhighlight();
      
      if (e.dataTransfer?.files && e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];
        handleFile(file);
      }
    };
    
    // Event listeners for drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    dropArea.addEventListener('drop', handleDrop, false);
    
    // Cleanup
    return () => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea?.removeEventListener(eventName, preventDefaults);
      });
      
      ['dragenter', 'dragover'].forEach(eventName => {
        dropArea?.removeEventListener(eventName, highlight);
      });
      
      ['dragleave', 'drop'].forEach(eventName => {
        dropArea?.removeEventListener(eventName, unhighlight);
      });
      
      dropArea?.removeEventListener('drop', handleDrop);
    };
  }, []);
  
  // Process the uploaded file
  const handleFile = (file: File) => {
    // Check file type
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file format",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      });
      return;
    }
    
    // Start upload simulation
    setIsUploading(true);
    
    // Simulate file processing with progress
    const totalTime = 1500; // Total time for simulation in ms
    const updateInterval = 300; // Update interval in ms
    let progress = 0;
    
    const progressInterval = setInterval(() => {
      progress += updateInterval / totalTime * 100;
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        setIsUploading(false);
        setUploadDialogOpen(false);
        
        toast({
          title: t("dataset-uploaded-title"),
          description: `${t("dataset-uploaded-desc")}: "${file.name}"`,
          variant: "default",
        });
        
        // Notify parent component
        onAnalysisReady();
      }
    }, updateInterval);
  };
  
  // Handle file input change
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  // Handle reset analysis
  const handleReset = () => {
    onResetAnalysis();
    
    toast({
      title: t("dataset-reset-title"),
      description: t("dataset-reset-desc"),
      variant: "default",
    });
    
    setUploadDialogOpen(false);
  };

  return (
    <>
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            id="data-upload-trigger"
            variant={analysisExists ? "default" : "outline"} 
            className={`flex items-center gap-2 backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md`}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                {t("uploading")}
              </>
            ) : analysisExists ? (
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
        </DialogTrigger>
        <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:text-gray-200">
          <DialogHeader>
            <DialogTitle>{analysisExists ? t("dataset-options") : t("upload-dataset")}</DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              {analysisExists ? t("dataset-options-desc") : t("dataset-instructions")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {analysisExists ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center text-green-500 p-6">
                  <CheckCircle2 size={48} className="mb-2" />
                  <p className="text-center">{t("analysis-active")}</p>
                </div>
                <Button 
                  variant="destructive" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleReset}
                >
                  <RefreshCw size={16} />
                  {t("reset-analysis")}
                </Button>
              </div>
            ) : (
              <>
                <div 
                  ref={dropAreaRef}
                  className="border-2 border-dashed dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center text-medical-500">
                      <div className="animate-spin mb-2">
                        <Upload size={48} />
                      </div>
                      <p>{t("uploading")}</p>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center cursor-pointer">
                      <Upload size={48} className="mb-2 text-gray-400 dark:text-gray-500" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("drag-drop-csv")}
                      </p>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept=".csv" 
                        className="hidden" 
                        onChange={handleFileUpload} 
                      />
                    </label>
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p>{t("supported-format")}: .CSV</p>
                  <p>{t("max-file-size")}: 5MB</p>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DataUploadDialog;
