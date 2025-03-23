import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';
import DataUploadDialog from '@/components/DataUploadDialog';
import TopHeader from '@/components/ui/TopHeader';
import EnhancedMapView from '@/components/ui/EnhancedMapView';
import EnhancedICUAvailability from '@/components/ui/EnhancedICUAvailability';
import GeographicDistribution from '@/components/ui/GeographicDistribution';
import HospitalDashboard from '@/components/ui/HospitalDashboard';
import Navbar from '@/components/ui/Navbar';
import EmergencyDashboard from '@/components/ui/EmergencyDashboard';
import MedicalAnalytics from '@/components/ui/MedicalAnalytics';
import PatientSeveritySelector from '@/components/ui/PatientSeveritySelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Wifi, WifiOff, Zap, AlertTriangle, Info, Clock, MapPin, Sun, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'normal' | 'warning' | 'critical'>('normal');
  const [transportMode, setTransportMode] = useState<'ground' | 'air'>('ground');
  const [patientSeverity, setPatientSeverity] = useState<'critical' | 'non-critical'>('non-critical');
  const [selectedAnalyticView, setSelectedAnalyticView] = useState('icu');
  const [sourceLocation, setSourceLocation] = useState('');
  
  const [hospitals] = useState([
    { id: '1', name: 'City General Hospital', icuBeds: 12, totalBeds: 20, aiSurvivalRate: 92, distance: '2.3 km', waitTime: '5 min', specialties: ['Trauma', 'Cardiac'] },
    { id: '2', name: 'Memorial Care', icuBeds: 8, totalBeds: 15, aiSurvivalRate: 88, distance: '3.6 km', waitTime: '8 min', specialties: ['Pediatric'] },
    { id: '3', name: 'Community Medical', icuBeds: 5, totalBeds: 12, aiSurvivalRate: 85, distance: '4.1 km', waitTime: '15 min', specialties: ['Cardiac', 'Neuro'] },
    { id: '4', name: 'St. Mary\'s Hospital', icuBeds: 10, totalBeds: 18, aiSurvivalRate: 90, distance: '5.8 km', waitTime: '10 min', specialties: ['Trauma', 'Burns'] },
    { id: '5', name: 'Lakeside Health', icuBeds: 7, totalBeds: 15, aiSurvivalRate: 83, distance: '7.2 km', waitTime: '12 min', specialties: ['Cardiac'] },
    { id: '6', name: 'University Medical', icuBeds: 15, totalBeds: 25, aiSurvivalRate: 94, distance: '6.5 km', waitTime: '7 min', specialties: ['Pediatric', 'Trauma', 'Research'] },
    { id: '7', name: 'Central Hospital', icuBeds: 9, totalBeds: 16, aiSurvivalRate: 87, distance: '8.3 km', waitTime: '13 min', specialties: ['General', 'Orthopedic'] },
    { id: '8', name: 'Eastside Medical', icuBeds: 6, totalBeds: 14, aiSurvivalRate: 82, distance: '9.7 km', waitTime: '18 min', specialties: ['Maternity', 'Geriatric'] },
    { id: '9', name: 'North General', icuBeds: 11, totalBeds: 22, aiSurvivalRate: 89, distance: '10.1 km', waitTime: '14 min', specialties: ['Oncology', 'Cardiac'] },
    { id: '10', name: 'West Valley Medical', icuBeds: 8, totalBeds: 17, aiSurvivalRate: 86, distance: '11.5 km', waitTime: '16 min', specialties: ['Neuro', 'Respiratory'] },
  ]);
  
  const [alerts] = useState([
    { id: '1', type: 'critical', message: 'Traffic accident on Main St. - Multiple casualties', timestamp: '3 min ago' },
    { id: '2', type: 'warning', message: 'Heavy traffic on Highway 101 - Potential delays', timestamp: '12 min ago' },
    { id: '3', name: 'St. Mary\'s Hospital ICU capacity reduced to 60%', timestamp: '27 min ago' },
    { id: '4', type: 'info', message: 'Air ambulance availability: 2 units on standby', timestamp: '45 min ago' },
    { id: '5', type: 'warning', message: 'Potential mass casualty incident reported downtown', timestamp: '8 min ago' },
    { id: '6', type: 'critical', message: 'Ambulance #243 breakdown - Rerouting required', timestamp: '1 min ago' },
    { id: '7', type: 'info', message: 'System maintenance scheduled for 02:00 AM', timestamp: '1 hr ago' },
  ]);
  
  const [analyticData] = useState({
    icu: [
      { time: '00:00', cityGeneral: 75, memorial: 60, community: 80, stMarys: 65, lakeside: 70, universityMed: 82, centralHospital: 68, eastside: 55, northGeneral: 78, westValley: 63 },
      { time: '04:00', cityGeneral: 78, memorial: 65, community: 83, stMarys: 68, lakeside: 73, universityMed: 80, centralHospital: 70, eastside: 58, northGeneral: 76, westValley: 65 },
      { time: '08:00', cityGeneral: 85, memorial: 72, community: 88, stMarys: 75, lakeside: 78, universityMed: 85, centralHospital: 75, eastside: 65, northGeneral: 80, westValley: 70 },
      { time: '12:00', cityGeneral: 90, memorial: 80, community: 92, stMarys: 83, lakeside: 85, universityMed: 90, centralHospital: 82, eastside: 72, northGeneral: 85, westValley: 78 },
      { time: '16:00', cityGeneral: 95, memorial: 85, community: 95, stMarys: 88, lakeside: 90, universityMed: 93, centralHospital: 87, eastside: 80, northGeneral: 90, westValley: 83 },
      { time: '20:00', cityGeneral: 88, memorial: 78, community: 90, stMarys: 80, lakeside: 82, universityMed: 87, centralHospital: 80, eastside: 73, northGeneral: 83, westValley: 75 },
      { time: 'Now', cityGeneral: 82, memorial: 73, community: 85, stMarys: 76, lakeside: 78, universityMed: 84, centralHospital: 75, eastside: 68, northGeneral: 80, westValley: 70 },
    ],
    response: [
      { time: '00:00', avg: 7.5 },
      { time: '04:00', avg: 6.8 },
      { time: '08:00', avg: 8.2 },
      { time: '12:00', avg: 9.5 },
      { time: '16:00', avg: 12.3 },
      { time: '20:00', avg: 10.8 },
      { time: 'Now', avg: 9.2 },
    ],
    cases: [
      { time: '00:00', trauma: 3, cardiac: 2, general: 6 },
      { time: '04:00', trauma: 2, cardiac: 1, general: 4 },
      { time: '08:00', trauma: 5, cardiac: 3, general: 8 },
      { time: '12:00', trauma: 7, cardiac: 4, general: 10 },
      { time: '16:00', trauma: 12, cardiac: 8, general: 15 },
      { time: '20:00', trauma: 10, cardiac: 5, general: 12 },
      { time: 'Now', trauma: 8, cardiac: 6, general: 9 },
    ],
  });
  
  const [geoDistributionData] = useState({
    regions: [
      { id: '1', name: t("north-bangalore"), incidents: 45, response: 8.3, color: "#8884d8" },
      { id: '2', name: t("central-bangalore"), incidents: 78, response: 6.2, color: "#82ca9d" },
      { id: '3', name: t("south-bangalore"), incidents: 52, response: 7.5, color: "#ffc658" },
      { id: '4', name: t("east-bangalore"), incidents: 63, response: 8.1, color: "#ff8042" },
      { id: '5', name: t("west-bangalore"), incidents: 41, response: 9.0, color: "#0088fe" },
    ]
  });
  
  const [icuBedData] = useState([
    { hospital: 'City General', available: 12, total: 20, waitTime: 15, occupancyRate: 65 },
    { hospital: 'Memorial', available: 8, total: 15, waitTime: 22, occupancyRate: 78 },
    { hospital: 'Community', available: 5, total: 12, waitTime: 30, occupancyRate: 82 },
    { hospital: 'St. Mary\'s', available: 10, total: 18, waitTime: 18, occupancyRate: 70 },
    { hospital: 'Lakeside', available: 7, total: 15, waitTime: 25, occupancyRate: 75 },
    { hospital: 'University', available: 15, total: 25, waitTime: 12, occupancyRate: 60 },
    { hospital: 'Central', available: 9, total: 16, waitTime: 20, occupancyRate: 72 },
    { hospital: 'Eastside', available: 6, total: 14, waitTime: 28, occupancyRate: 80 },
    { hospital: 'North Gen', available: 11, total: 22, waitTime: 16, occupancyRate: 68 },
    { hospital: 'West Valley', available: 8, total: 17, waitTime: 24, occupancyRate: 76 },
  ]);
  
  const [patientData] = useState({
    id: 'P12345',
    severity: 'Critical',
    estimatedSurvivalRate: 85,
    aiRecommendedHospital: '1',
    location: 'Koramangala, Bangalore'
  });
  
  const [destinations] = useState(
    hospitals.map(h => ({
      id: h.id,
      name: h.name,
      location: {
        lat: 12.9716 + (Math.random() * 0.2 - 0.1),
        lng: 77.5946 + (Math.random() * 0.2 - 0.1)
      },
      icuAvailable: h.icuBeds,
      icuTotal: h.totalBeds,
      waitTime: parseInt(h.waitTime.split(' ')[0]),
      specialties: h.specialties
    }))
  );
  
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  
  useEffect(() => {
    const checkAnalysisData = () => {
      const hasAnalysisData = localStorage.getItem('analysisData') === 'true';
      setShowAnalysis(hasAnalysisData);
    };

    checkAnalysisData();
    window.addEventListener('storage', checkAnalysisData);
    
    const statusInterval = setInterval(() => {
      const statuses: Array<'normal' | 'warning' | 'critical'> = ['normal', 'warning', 'critical'];
      const randomIndex = Math.floor(Math.random() * 10);
      if (randomIndex < 7) {
        setSystemStatus('normal');
      } else if (randomIndex < 9) {
        setSystemStatus('warning');
      } else {
        setSystemStatus('critical');
      }
    }, 15000);
    
    return () => {
      window.removeEventListener('storage', checkAnalysisData);
      clearInterval(statusInterval);
    };
  }, []);
  
  const handleAnalysisReady = () => {
    localStorage.setItem('analysisData', 'true');
    setShowAnalysis(true);
    toast({
      title: "Analysis Ready",
      description: "Real-time data analysis has been completed and is now available.",
    });
  };

  const handleResetAnalysis = () => {
    localStorage.removeItem('analysisData');
    setShowAnalysis(false);
  };

  const handlePatientSeverityChange = (severity: 'critical' | 'non-critical') => {
    setPatientSeverity(severity);
    
    if (severity === 'critical' && transportMode !== 'air') {
      toast({
        title: "Critical Patient",
        description: "Air transport is recommended for critical patients.",
      });
    }
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
    toast({
      title: `Switched to ${isDark ? 'Light' : 'Dark'} Mode`,
      description: `Display has been updated to ${isDark ? 'light' : 'dark'} mode.`,
    });
  };

  const handleSearchLocation = () => {
    if (!sourceLocation.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a source location to search.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Location Set",
      description: `Source location set to: ${sourceLocation}`,
    });
  };
  
  return (
    <div 
      className={`min-h-screen w-full bg-cover bg-center transition-all duration-500`}
      style={{ 
        backgroundImage: `url('/lovable-uploads/7c8af1f3-722f-4ce8-a1f9-aa995983760e.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={`min-h-screen w-full ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95' 
          : 'bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95'
        } backdrop-blur-sm transition-all duration-500 pb-20`}>
        
        <div className="container mx-auto px-4">
          <div className={`py-4 flex flex-col sm:flex-row justify-between items-center border-b ${
            isDark ? 'border-blue-900/30' : 'border-blue-200/80'
          }`}>
            <div className="text-left mb-3 sm:mb-0">
              <h1 className={`text-2xl font-bold ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent' 
                  : 'text-blue-700'
              }`}>
                {t('ai-smart-ambulance-routing')}
              </h1>
              <p className={isDark ? 'text-sm text-blue-300/80' : 'text-sm text-blue-600/80'}>
                {t('emergency-route')}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              
              <div className="flex items-center gap-2">
                <Sun size={16} className={isDark ? "text-gray-400" : "text-amber-500"} />
                <Switch
                  checked={isDark}
                  onCheckedChange={toggleTheme}
                  className={isDark ? "bg-blue-900/50" : "bg-blue-200"}
                />
                <Moon size={16} className={isDark ? "text-blue-400" : "text-gray-400"} />
              </div>
              
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                systemStatus === 'normal' 
                  ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700' 
                  : systemStatus === 'warning'
                    ? isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
                    : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
              }`}>
                {systemStatus === 'normal' ? (
                  <Wifi size={14} className={isDark ? "text-green-400" : "text-green-600"} />
                ) : systemStatus === 'warning' ? (
                  <AlertTriangle size={14} className={isDark ? "text-amber-400" : "text-amber-600"} />
                ) : (
                  <WifiOff size={14} className={isDark ? "text-red-400" : "text-red-600"} />
                )}
                <span>
                  {systemStatus === 'normal' 
                    ? t('network-active') 
                    : systemStatus === 'warning'
                      ? t('partial-network-connection')
                      : t('network-connection-issues')
                  }
                </span>
              </div>
            </div>
            
            <TopHeader />
          </div>
          
          <div className={`flex flex-wrap justify-center gap-2 py-2 ${
            isDark ? 'bg-gray-800/50' : 'bg-white/50'
          } backdrop-blur-sm rounded-lg mt-2`}>
            {[
              { label: t("dashboard"), onClick: () => navigate("/home") },
              { label: t("search-hospitals"), onClick: () => navigate("/search") },
              { label: t("patient-entry"), onClick: () => navigate("/profile") },
              { label: t("map-view"), onClick: () => navigate("/map") },
              { label: t("analysis"), onClick: () => setShowAnalysis(true) },
            ].map((item, index) => (
              <Button 
                key={index} 
                variant="ghost" 
                size="sm"
                onClick={item.onClick}
                className={isDark ? "text-blue-300 hover:text-blue-100" : "text-blue-700 hover:text-blue-900"}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 pt-2">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
              <div className="lg:col-span-3">
                <div className={`${
                  isDark ? 'bg-gray-800/70 border border-blue-900/30' : 'bg-white/80 border border-blue-100'
                } rounded-xl p-4 space-y-4 shadow-md`}>
                  <h2 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'} mb-3`}>{t('nearby-icu')}</h2>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-none pr-2">
                    {hospitals.map(hospital => (
                      <div 
                        key={hospital.id}
                        className={`p-3 rounded-lg transition-all cursor-pointer ${
                          selectedHospitalId === hospital.id 
                            ? isDark 
                              ? 'bg-blue-900/40 border border-blue-500/30' 
                              : 'bg-blue-50 border border-blue-200'
                            : isDark
                              ? 'bg-gray-800/60 border border-gray-700/60 hover:bg-gray-800 hover:border-blue-900/30'
                              : 'bg-white/70 border border-gray-200 hover:bg-blue-50/50 hover:border-blue-200/50'
                        }`}
                        onClick={() => setSelectedHospitalId(hospital.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{hospital.name}</h3>
                            <div className={`flex items-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1 gap-1`}>
                              <MapPin size={10} />
                              <span>{hospital.distance}</span>
                              <span className="mx-1">•</span>
                              <Clock size={10} />
                              <span>{hospital.waitTime}</span>
                            </div>
                          </div>
                          <div className={`${
                            isDark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-700'
                          } px-2 py-0.5 rounded text-xs font-mono`}>ID: {hospital.id}</div>
                        </div>
                        
                        <div className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>ICU Availability</span>
                            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{hospital.icuBeds}/{hospital.totalBeds}</span>
                          </div>
                          <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                            <div 
                              className={`h-2 rounded-full ${
                                (hospital.icuBeds / hospital.totalBeds) > 0.5 
                                  ? 'bg-green-500' 
                                  : (hospital.icuBeds / hospital.totalBeds) > 0.2 
                                    ? 'bg-amber-500' 
                                    : 'bg-red-500'
                              }`}
                              style={{ width: `${(hospital.icuBeds / hospital.totalBeds) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {hospital.specialties.map(specialty => (
                            <span 
                              key={specialty}
                              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                isDark 
                                  ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' 
                                  : 'bg-blue-100 text-blue-700 border border-blue-200'
                              }`}
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h2 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'} mt-6 mb-3`}>{t('emergency-alerts')}</h2>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-none pr-2">
                    {alerts.map(alert => (
                      <div 
                        key={alert.id}
                        className={`p-3 rounded-lg border ${
                          alert.type === 'critical' 
                            ? isDark 
                              ? 'bg-red-900/20 border-red-700/30 text-red-200' 
                              : 'bg-red-50 border-red-200 text-red-800'
                            : alert.type === 'warning'
                              ? isDark
                                ? 'bg-amber-900/20 border-amber-700/30 text-amber-200'
                                : 'bg-amber-50 border-amber-200 text-amber-800'
                              : isDark
                                ? 'bg-blue-900/20 border-blue-700/30 text-blue-200'
                                : 'bg-blue-50 border-blue-200 text-blue-800'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {alert.type === 'critical' ? (
                            <AlertTriangle size={16} className={isDark ? "text-red-400" : "text-red-600"} />
                          ) : alert.type === 'warning' ? (
                            <AlertTriangle size={16} className={isDark ? "text-amber-400" : "text-amber-600"} />
                          ) : (
                            <Info size={16} className={isDark ? "text-blue-400" : "text-blue-600"} />
                          )}
                          <div>
                            <p className="text-sm">{alert.message}</p>
                            <p className="text-xs mt-1 opacity-70">{alert.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <MedicalAnalytics theme={theme} />
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-6">
                <div className={`${
                  isDark ? 'bg-gray-800/70 border border-blue-900/30' : 'bg-white/80 border border-blue-100'
                } rounded-xl p-4 shadow-md h-full`}>
                  <h2 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'} mb-3`}>{t('live-route')}</h2>
                  
                  <EnhancedMapView 
                    destinations={destinations}
                    selectedHospitalId={selectedHospitalId}
                    onHospitalClick={(id) => setSelectedHospitalId(id)}
                    transportMode={transportMode}
                    theme={theme}
                  />
                  
                  <div className="mt-4 mb-6">
                    <Tabs defaultValue="icu" onValueChange={setSelectedAnalyticView}>
                      <div className="flex justify-between items-center mb-3">
                        <h2 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>{t('real-time-analytics')}</h2>
                        <TabsList className={isDark ? "bg-gray-700/50" : "bg-gray-200"}>
                          <TabsTrigger 
                            value="icu" 
                            className={isDark ? "data-[state=active]:bg-blue-900/50" : "data-[state=active]:bg-blue-100"}
                          >
                            {t('icu-status')}
                          </TabsTrigger>
                          <TabsTrigger 
                            value="response" 
                            className={isDark ? "data-[state=active]:bg-blue-900/50" : "data-[state=active]:bg-blue-100"}
                          >
                            {t('response-time')}
                          </TabsTrigger>
                          <TabsTrigger 
                            value="cases" 
                            className={isDark ? "data-[state=active]:bg-blue-900/50" : "data-[state=active]:bg-blue-100"}
                          >
                            {t('cases')}
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      
                      <TabsContent value="icu" className="mt-0">
                        <div className={`${
                          isDark ? 'bg-gray-800/90 border border-gray-700/60' : 'bg-white/90 border border-gray-200'
                        } rounded-lg p-3 h-60`}>
                          <EmergencyDashboard data={analyticData.icu} view="icu" />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="response" className="mt-0">
                        <div className={`${
                          isDark ? 'bg-gray-800/90 border border-gray-700/60' : 'bg-white/90 border border-gray-200'
                        } rounded-lg p-3 h-60`}>
                          <EmergencyDashboard data={analyticData.response} view="response" />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="cases" className="mt-0">
                        <div className={`${
                          isDark ? 'bg-gray-800/90 border border-gray-700/60' : 'bg-white/90 border border-gray-200'
                        } rounded-lg p-3 h-60`}>
                          <EmergencyDashboard data={analyticData.cases} view="cases" />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <HospitalDashboard 
                    hospitals={hospitals}
                    patientData={patientData}
                    theme={theme}
                  />
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <div className={`${
                  isDark ? 'bg-gray-800/70 border border-blue-900/30' : 'bg-white/80 border border-blue-100'
                } rounded-xl p-4 space-y-4 shadow-md`}>
                  <h2 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'} mb-3`}>{t('patient-emergency')}</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{t('patient-location')}</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          className={`w-full ${
                            isDark 
                              ? 'bg-gray-900/60 border border-gray-700 text-gray-200' 
                              : 'bg-white/60 border border-gray-300 text-gray-700'
                          } rounded-lg px-3 py-2`}
                          value={sourceLocation}
                          onChange={(e) => setSourceLocation(e.target.value)}
                          placeholder="Enter exact location"
                        />
                        <Button 
                          onClick={handleSearchLocation}
                          className={`${
                            isDark ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-500'
                          }`}
                        >
                          Set
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{t('selected-hospital')}</label>
                      <select 
                        className={`w-full ${
                          isDark 
                            ? 'bg-gray-900/60 border border-gray-700 text-gray-200' 
                            : 'bg-white/60 border border-gray-300 text-gray-700'
                        } rounded-lg px-3 py-2`}
                        value={selectedHospitalId || ''}
                        onChange={(e) => setSelectedHospitalId(e.target.value)}
                      >
                        <option value="">Select hospital</option>
                        {hospitals.map(hospital => (
                          <option key={hospital.id} value={hospital.id}>
                            {hospital.name} ({hospital.icuBeds} ICU beds)
                          </option>
                        ))}
                      </select>
                      
                      {patientData.aiRecommendedHospital && (
                        <div className="mt-1 flex items-center">
                          <Zap size={14} className={isDark ? "text-blue-400" : "text-blue-600"} />
                          <span className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                            AI recommended: {
                              hospitals.find(h => h.id === patientData.aiRecommendedHospital)?.name
                            }
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <PatientSeveritySelector 
                        severity={patientSeverity}
                        onChange={handlePatientSeverityChange}
                        theme={isDark ? 'dark' : 'light'}
                      />
                      
                      {patientSeverity === 'critical' && transportMode !== 'air' && (
                        <div className={`mt-2 text-xs ${isDark ? 'text-amber-400' : 'text-amber-600'} flex items-center`}>
                          <AlertTriangle size={12} className="mr-1" />
                          Air transport recommended for critical patients
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className={`block text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('transport-mode')}</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border ${
                              transportMode === 'ground'
                                ? isDark
                                  ? 'bg-blue-900/40 border-blue-500/50 text-blue-300'
                                  : 'bg-blue-100 border-blue-300 text-blue-700'
                                : isDark
                                  ? 'bg-gray-800/60 border-gray-700 text-gray-400 hover:bg-gray-800'
                                  : 'bg-white/60 border-gray-300 text-gray-500 hover:bg-gray-100'
                            }`}
                            onClick={() => setTransportMode('ground')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                              <circle cx="7" cy="17" r="2"></circle>
                              <path d="M9 17h6"></path>
                              <circle cx="17" cy="17" r="2"></circle>
                            </svg>
                            {t('ground')}
                          </button>
                          <button
                            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border ${
                              transportMode === 'air'
                                ? isDark
                                  ? 'bg-blue-900/40 border-blue-500/50 text-blue-300'
                                  : 'bg-blue-100 border-blue-300 text-blue-700'
                                : isDark
                                  ? 'bg-gray-800/60 border-gray-700 text-gray-400 hover:bg-gray-800'
                                  : 'bg-white/60 border-gray-300 text-gray-500 hover:bg-gray-100'
                            }`}
                            onClick={() => setTransportMode('air')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M8.5 19h-4a1 1 0 0 1-.8-1.6l9.8-13"></path>
                              <path d="M17 5.5v13a1 1 0 0 0 1.6.8l2.7-2.7"></path>
                              <path d="M13 1.1l-5.9 5.3a1 1 0 0 0-.3.7v2.9l-3.8 3.4a1 1 0 0 0 .7 1.7h7.5"></path>
                            </svg>
                            {t('air')}
                          </button>
                        </div>
                      </div>
                    
                      <button 
                        className={`w-full ${
                          isDark 
                            ? 'bg-blue-700 hover:bg-blue-600 text-white' 
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        } py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 mt-4`}
                        onClick={() => {
                          if (!sourceLocation) {
                            toast({
                              title: "Location Required",
                              description: "Please enter a source location.",
                              variant: "destructive"
                            });
                            return;
                          }
                          
                          toast({
                            title: "Emergency Response Dispatched",
                            description: `Ambulance dispatched to ${sourceLocation}. ETA: 8 minutes.`,
                          });
                        }}
                      >
                        <Zap size={16} />
                        {t('dispatch')}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div className={`${
                    isDark ? 'bg-gray-800/70 border border-blue-900/30' : 'bg-white/80 border border-blue-100'
                  } rounded-xl p-4 shadow-md`}>
                    <EnhancedICUAvailability data={icuBedData} theme={theme} />
                  </div>
                  
                  <div className={`${
                    isDark ? 'bg-gray-800/70 border border-blue-900/30' : 'bg-white/80 border border-blue-100'
                  } rounded-xl p-4 shadow-md`}>
                    <GeographicDistribution regions={geoDistributionData.regions} theme={theme} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <Navbar />
      </div>
    </div>
  );
};

export default Home;
