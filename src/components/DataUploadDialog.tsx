
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useToast } from '@/hooks/use-toast';
import { FileSpreadsheet, CheckCircle2, Upload } from 'lucide-react';
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
}

const DataUploadDialog: React.FC<DataUploadDialogProps> = ({ onAnalysisReady }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  // Check if analysis data already exists
  React.useEffect(() => {
    const hasData = localStorage.getItem('analysisData') === 'true';
    if (hasData) {
      setUploadSuccess(true);
    }
  }, []);

  // Handle CSV upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadSuccess(false);
      
      // Simulate file processing
      setTimeout(() => {
        setIsUploading(false);
        setUploadSuccess(true);
        setUploadDialogOpen(false);
        
        toast({
          title: t("dataset-uploaded-title"),
          description: `${t("dataset-uploaded-desc")}: "${file.name}"`,
          variant: "default",
        });
        
        // Save to localStorage for persistence
        localStorage.setItem('analysisData', 'true');
        
        // Notify parent component
        onAnalysisReady();
      }, 1500);
    }
  };

  return (
    <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={uploadSuccess ? "default" : "outline"} 
          className={`flex items-center gap-2 backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md`}
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:text-gray-200">
        <DialogHeader>
          <DialogTitle>{t("upload-dataset")}</DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            {t("dataset-instructions")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="border-2 border-dashed dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            {uploadSuccess ? (
              <div className="flex flex-col items-center justify-center text-green-500">
                <CheckCircle2 size={48} className="mb-2" />
                <p>{t("upload-successful")}</p>
              </div>
            ) : isUploading ? (
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataUploadDialog;
