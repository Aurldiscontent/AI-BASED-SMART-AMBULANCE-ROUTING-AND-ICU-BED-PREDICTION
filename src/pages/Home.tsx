
import React, { useState, useEffect } from 'react';
import HomePage from '@/components/HomePage';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { motion } from 'framer-motion';
import UserProfileBar from '@/components/ui/UserProfileBar';
import { Button } from '@/components/ui/button';
import { 
  FileSpreadsheet, 
  CheckCircle2, 
  MapPin, 
  BarChart,
  Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUnits } from '@/hooks/use-units';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from '@/components/ui/progress';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  Legend
} from 'recharts';

const Home = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { convertDistance } = useUnits();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [activeTab, setActiveTab] = useState("map");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  // Mock data for geographic distribution
  const [geoDistributionData] = useState({
    regions: [
      { name: "North Bangalore", incidents: 45, response: 8.3, color: "#8884d8" },
      { name: "Central Bangalore", incidents: 78, response: 6.2, color: "#82ca9d" },
      { name: "South Bangalore", incidents: 52, response: 7.5, color: "#ffc658" },
      { name: "East Bangalore", incidents: 63, response: 8.1, color: "#ff8042" },
      { name: "West Bangalore", incidents: 41, response: 9.0, color: "#0088fe" },
    ],
    timeData: [
      { time: '00:00', incidents: 12, response: 7.2 },
      { time: '04:00', incidents: 8, response: 6.5 },
      { time: '08:00', incidents: 25, response: 9.1 },
      { time: '12:00', incidents: 35, response: 8.3 },
      { time: '16:00', incidents: 42, response: 7.8 },
      { time: '20:00', incidents: 30, response: 6.9 },
    ]
  });
  
  // Load analysis data from localStorage if available
  useEffect(() => {
    const savedAnalysis = localStorage.getItem('analysisData');
    if (savedAnalysis) {
      setShowAnalysis(true);
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
        
        // Show analysis after a short delay
        setTimeout(() => {
          setShowAnalysis(true);
        }, 200);
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
            
            {/* Dataset Upload Button */}
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
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
                </motion.div>
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
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          {showAnalysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto px-4 mb-6"
            >
              <div className={`rounded-lg ${
                isDark ? 'bg-gray-800/80' : 'bg-white/80'
              } backdrop-blur-sm p-4 shadow-lg`}>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart size={20} />
                  {t("data-analysis")}
                </h2>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="map">{t("geographic-distribution")}</TabsTrigger>
                    <TabsTrigger value="stats">{t("response-metrics")}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="map" className="mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col h-64">
                        <h3 className="text-md font-semibold mb-2 flex items-center">
                          <MapPin size={16} className="mr-1 text-medical-500" />
                          {t("incident-distribution-map")}
                        </h3>
                        <div className="flex-1 flex items-center justify-center">
                          {/* This could be replaced with an actual map component */}
                          <div className="text-center">
                            <MapPin size={32} className="mx-auto mb-2 text-medical-500" />
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {t("interactive-map-placeholder")}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-64">
                        <h3 className="text-md font-semibold mb-2">{t("incident-by-region")}</h3>
                        <ResponsiveContainer width="100%" height="90%">
                          <RechartsBarChart
                            data={geoDistributionData.regions}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="incidents" name={t("incidents")}>
                              {geoDistributionData.regions.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">{t("incident-hotspots")}</h3>
                        <div className="space-y-3">
                          {geoDistributionData.regions.map((region, index) => (
                            <div key={index}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{region.name}</span>
                                <span>{region.incidents} {t("incidents")}</span>
                              </div>
                              <Progress value={(region.incidents / 100) * 100} className="h-2" 
                                style={{ backgroundColor: 'rgba(0,0,0,0.1)', '--tw-progress-fill': region.color } as any} />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">{t("avg-response-time")}</h3>
                        <div className="space-y-3">
                          {geoDistributionData.regions.map((region, index) => (
                            <div key={index}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{region.name}</span>
                                <span>{region.response} {t("minutes")}</span>
                              </div>
                              <Progress value={(region.response / 15) * 100} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="stats" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("total-incidents")}</h3>
                        <p className="text-2xl font-bold">279</p>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <span>↑ 12%</span>
                          <span className="ml-1">{t("from-previous")}</span>
                        </p>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("avg-response-time")}</h3>
                        <p className="text-2xl font-bold">7.5 {t("minutes")}</p>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <span>↓ 1.2</span>
                          <span className="ml-1">{t("from-previous")}</span>
                        </p>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("survival-rate")}</h3>
                        <p className="text-2xl font-bold">94.3%</p>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <span>↑ 2.1%</span>
                          <span className="ml-1">{t("from-previous")}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium mb-3">{t("incident-trends")}</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart
                          data={geoDistributionData.timeData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="incidents" stroke="#8884d8" fill="#8884d8" name={t("incidents")} />
                          <Area type="monotone" dataKey="response" stroke="#82ca9d" fill="#82ca9d" name={t("response-time")} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium mb-3">{t("response-statistics")}</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{t("critical-cases")}</span>
                            <span>82%</span>
                          </div>
                          <Progress value={82} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{t("moderate-cases")}</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{t("mild-cases")}</span>
                            <span>91%</span>
                          </div>
                          <Progress value={91} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          )}
          
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
