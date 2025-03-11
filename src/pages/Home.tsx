
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wifi, WifiOff, Zap, AlertTriangle, Info, Clock, MapPin } from 'lucide-react';

const Home = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'normal' | 'warning' | 'critical'>('normal');
  const [transportMode, setTransportMode] = useState<'ground' | 'air'>('ground');
  const [patientSeverity, setPatientSeverity] = useState(5);
  const [selectedAnalyticView, setSelectedAnalyticView] = useState('icu');
  
  // Mock data for hospitals
  const [hospitals] = useState([
    { id: '1', name: 'City General Hospital', icuBeds: 12, totalBeds: 20, aiSurvivalRate: 92, distance: '2.3 km', waitTime: '5 min', specialties: ['Trauma', 'Cardiac'] },
    { id: '2', name: 'Memorial Care', icuBeds: 8, totalBeds: 15, aiSurvivalRate: 88, distance: '3.6 km', waitTime: '8 min', specialties: ['Pediatric'] },
    { id: '3', name: 'Community Medical', icuBeds: 5, totalBeds: 12, aiSurvivalRate: 85, distance: '4.1 km', waitTime: '15 min', specialties: ['Cardiac', 'Neuro'] },
    { id: '4', name: 'St. Mary\'s Hospital', icuBeds: 10, totalBeds: 18, aiSurvivalRate: 90, distance: '5.8 km', waitTime: '10 min', specialties: ['Trauma', 'Burns'] },
    { id: '5', name: 'Lakeside Health', icuBeds: 7, totalBeds: 15, aiSurvivalRate: 83, distance: '7.2 km', waitTime: '12 min', specialties: ['Cardiac'] },
  ]);
  
  // Mock emergency alerts
  const [alerts] = useState([
    { id: '1', type: 'critical', message: 'Traffic accident on Main St. - Multiple casualties', timestamp: '3 min ago' },
    { id: '2', type: 'warning', message: 'Heavy traffic on Highway 101 - Potential delays', timestamp: '12 min ago' },
    { id: '3', type: 'info', message: 'St. Mary\'s Hospital ICU capacity reduced to 60%', timestamp: '27 min ago' },
    { id: '4', type: 'info', message: 'Air ambulance availability: 2 units on standby', timestamp: '45 min ago' },
  ]);
  
  // Mock analytics data
  const [analyticData] = useState({
    icu: [
      { time: '08:00', cityGeneral: 75, memorial: 60, community: 80, stMarys: 65, lakeside: 70 },
      { time: '12:00', cityGeneral: 80, memorial: 70, community: 85, stMarys: 75, lakeside: 80 },
      { time: '16:00', cityGeneral: 90, memorial: 80, community: 90, stMarys: 85, lakeside: 75 },
      { time: '20:00', cityGeneral: 85, memorial: 75, community: 80, stMarys: 80, lakeside: 70 },
      { time: 'Now', cityGeneral: 82, memorial: 85, community: 92, stMarys: 75, lakeside: 78 },
    ],
    response: [
      { time: '08:00', avg: 8.2 },
      { time: '12:00', avg: 9.5 },
      { time: '16:00', avg: 12.3 },
      { time: '20:00', avg: 10.8 },
      { time: 'Now', avg: 9.2 },
    ],
    cases: [
      { time: '08:00', trauma: 5, cardiac: 3, general: 8 },
      { time: '12:00', trauma: 7, cardiac: 4, general: 10 },
      { time: '16:00', trauma: 12, cardiac: 8, general: 15 },
      { time: '20:00', trauma: 10, cardiac: 5, general: 12 },
      { time: 'Now', trauma: 8, cardiac: 6, general: 9 },
    ],
  });
  
  // Mock data for geographic distribution
  const [geoDistributionData] = useState({
    regions: [
      { id: '1', name: t("north-bangalore"), incidents: 45, response: 8.3, color: "#8884d8" },
      { id: '2', name: t("central-bangalore"), incidents: 78, response: 6.2, color: "#82ca9d" },
      { id: '3', name: t("south-bangalore"), incidents: 52, response: 7.5, color: "#ffc658" },
      { id: '4', name: t("east-bangalore"), incidents: 63, response: 8.1, color: "#ff8042" },
      { id: '5', name: t("west-bangalore"), incidents: 41, response: 9.0, color: "#0088fe" },
    ]
  });
  
  // Mock data for ICU beds
  const [icuBedData] = useState([
    { hospital: 'City General', available: 12, total: 20, waitTime: 15, occupancyRate: 65 },
    { hospital: 'Memorial Care', available: 8, total: 15, waitTime: 22, occupancyRate: 78 },
    { hospital: 'Community Med', available: 5, total: 12, waitTime: 30, occupancyRate: 82 },
    { hospital: 'St. Mary\'s', available: 10, total: 18, waitTime: 18, occupancyRate: 70 },
    { hospital: 'Lakeside', available: 7, total: 15, waitTime: 25, occupancyRate: 75 },
  ]);
  
  // Mock patient data
  const [patientData] = useState({
    id: 'P12345',
    severity: 'Critical',
    estimatedSurvivalRate: 85,
    aiRecommendedHospital: '1',
    location: 'Koramangala, Bangalore'
  });
  
  // Mock hospital destinations for map
  const [destinations] = useState(
    hospitals.map(h => ({
      id: h.id,
      name: h.name,
      location: {
        lat: 12.9716 + (Math.random() * 0.1 - 0.05),
        lng: 77.5946 + (Math.random() * 0.1 - 0.05)
      }
    }))
  );
  
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  
  // Check if analysis data exists on component mount
  useEffect(() => {
    const checkAnalysisData = () => {
      const hasAnalysisData = localStorage.getItem('analysisData') === 'true';
      setShowAnalysis(hasAnalysisData);
    };

    checkAnalysisData();
    window.addEventListener('storage', checkAnalysisData);
    
    // Simulate changing system status
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

  // Handle severity change
  const handleSeverityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientSeverity(parseInt(e.target.value));
  };

  // Get severity label
  const getSeverityLabel = (value: number) => {
    if (value <= 3) return 'Minor';
    if (value <= 7) return 'Moderate';
    return 'Critical';
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
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-sm transition-all duration-500 pb-20">
        {/* Top Header with Smart Ambulance title */}
        <div className="container mx-auto px-4">
          <div className="py-4 flex flex-col sm:flex-row justify-between items-center border-b border-blue-900/30">
            <div className="text-left mb-3 sm:mb-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Smart Ambulance Routing & ICU Predictor
              </h1>
              <p className="text-sm text-blue-300/80">AI-powered emergency response system</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                systemStatus === 'normal' 
                  ? 'bg-green-900/30 text-green-400' 
                  : systemStatus === 'warning'
                    ? 'bg-amber-900/30 text-amber-400'
                    : 'bg-red-900/30 text-red-400'
              }`}>
                {systemStatus === 'normal' ? (
                  <Wifi size={14} className="text-green-400" />
                ) : systemStatus === 'warning' ? (
                  <AlertTriangle size={14} className="text-amber-400" />
                ) : (
                  <WifiOff size={14} className="text-red-400" />
                )}
                <span>
                  {systemStatus === 'normal' 
                    ? 'Connected to Emergency Network' 
                    : systemStatus === 'warning'
                      ? 'Partial Network Connection'
                      : 'Network Connection Issues'
                  }
                </span>
              </div>
            </div>
            <TopHeader />
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
              {/* Left Panel - Data Dashboard */}
              <div className="lg:col-span-3">
                <div className="bg-gray-800/70 rounded-xl p-4 space-y-4 border border-blue-900/30">
                  <h2 className="text-lg font-bold text-blue-400 mb-3">Nearby ICU Availability</h2>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-none pr-2">
                    {hospitals.map(hospital => (
                      <div 
                        key={hospital.id}
                        className={`p-3 rounded-lg transition-all cursor-pointer ${
                          selectedHospitalId === hospital.id 
                            ? 'bg-blue-900/40 border border-blue-500/30' 
                            : 'bg-gray-800/60 border border-gray-700/60 hover:bg-gray-800 hover:border-blue-900/30'
                        }`}
                        onClick={() => setSelectedHospitalId(hospital.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-200">{hospital.name}</h3>
                            <div className="flex items-center text-xs text-gray-400 mt-1 gap-1">
                              <MapPin size={10} />
                              <span>{hospital.distance}</span>
                              <span className="mx-1">•</span>
                              <Clock size={10} />
                              <span>{hospital.waitTime}</span>
                            </div>
                          </div>
                          <div className="bg-blue-900/40 px-2 py-0.5 rounded text-xs font-mono text-blue-300">ID: {hospital.id}</div>
                        </div>
                        
                        <div className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">ICU Availability</span>
                            <span className="text-gray-300">{hospital.icuBeds}/{hospital.totalBeds}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
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
                              className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h2 className="text-lg font-bold text-blue-400 mt-6 mb-3">Emergency Alerts</h2>
                  <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-none pr-2">
                    {alerts.map(alert => (
                      <div 
                        key={alert.id}
                        className={`p-3 rounded-lg border ${
                          alert.type === 'critical' 
                            ? 'bg-red-900/20 border-red-700/30 text-red-200' 
                            : alert.type === 'warning'
                              ? 'bg-amber-900/20 border-amber-700/30 text-amber-200'
                              : 'bg-blue-900/20 border-blue-700/30 text-blue-200'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {alert.type === 'critical' ? (
                            <AlertTriangle size={16} className="text-red-400 mt-0.5" />
                          ) : alert.type === 'warning' ? (
                            <AlertTriangle size={16} className="text-amber-400 mt-0.5" />
                          ) : (
                            <Info size={16} className="text-blue-400 mt-0.5" />
                          )}
                          <div>
                            <p className="text-sm">{alert.message}</p>
                            <p className="text-xs mt-1 opacity-70">{alert.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Main Content Area - Live Mapping */}
              <div className="lg:col-span-6">
                <div className="bg-gray-800/70 rounded-xl p-4 border border-blue-900/30 h-full">
                  <h2 className="text-lg font-bold text-blue-400 mb-3">Live Route Mapping</h2>
                  
                  {/* Enhanced Map View */}
                  <EnhancedMapView 
                    destinations={destinations}
                    selectedHospitalId={selectedHospitalId}
                    onHospitalClick={(id) => setSelectedHospitalId(id)}
                    transportMode={transportMode}
                  />
                  
                  <div className="mt-4 mb-6">
                    <Tabs defaultValue="icu" onValueChange={setSelectedAnalyticView}>
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-bold text-blue-400">Real-Time Analytics</h2>
                        <TabsList className="bg-gray-700/50">
                          <TabsTrigger value="icu" className="data-[state=active]:bg-blue-900/50">ICU Status</TabsTrigger>
                          <TabsTrigger value="response" className="data-[state=active]:bg-blue-900/50">Response Time</TabsTrigger>
                          <TabsTrigger value="cases" className="data-[state=active]:bg-blue-900/50">Cases</TabsTrigger>
                        </TabsList>
                      </div>
                      
                      <TabsContent value="icu" className="mt-0">
                        <div className="bg-gray-800/90 rounded-lg border border-gray-700/60 p-3 h-60">
                          <EmergencyDashboard data={analyticData.icu} view="icu" />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="response" className="mt-0">
                        <div className="bg-gray-800/90 rounded-lg border border-gray-700/60 p-3 h-60">
                          <EmergencyDashboard data={analyticData.response} view="response" />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="cases" className="mt-0">
                        <div className="bg-gray-800/90 rounded-lg border border-gray-700/60 p-3 h-60">
                          <EmergencyDashboard data={analyticData.cases} view="cases" />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  {/* Hospital Dashboard */}
                  <HospitalDashboard 
                    hospitals={hospitals}
                    patientData={patientData}
                  />
                </div>
              </div>
              
              {/* Right Sidebar - Patient & Emergency Details */}
              <div className="lg:col-span-3">
                <div className="bg-gray-800/70 rounded-xl p-4 space-y-4 border border-blue-900/30">
                  <h2 className="text-lg font-bold text-blue-400 mb-3">Patient & Emergency Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Patient Location</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-900/60 border border-gray-700 rounded-lg px-3 py-2 text-gray-200"
                        defaultValue={patientData.location}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Selected Hospital</label>
                      <select 
                        className="w-full bg-gray-900/60 border border-gray-700 rounded-lg px-3 py-2 text-gray-200"
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
                          <Zap size={14} className="text-blue-400 mr-1" />
                          <span className="text-xs text-blue-300">
                            AI recommended: {
                              hospitals.find(h => h.id === patientData.aiRecommendedHospital)?.name
                            }
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="block text-sm text-gray-400">Patient Severity</label>
                        <span className="text-sm font-medium" style={{
                          color: patientSeverity <= 3 
                            ? '#34d399' 
                            : patientSeverity <= 7 
                              ? '#fbbf24' 
                              : '#ef4444'
                        }}>
                          {getSeverityLabel(patientSeverity)}
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={patientSeverity}
                        onChange={handleSeverityChange}
                        className="w-full"
                        style={{
                          '--range-color': patientSeverity <= 3 
                            ? '#10b981' 
                            : patientSeverity <= 7 
                              ? '#f59e0b' 
                              : '#dc2626'
                        } as React.CSSProperties}
                      />
                      <div className="flex justify-between text-xs text-gray-500 px-1">
                        <span>1</span>
                        <span>5</span>
                        <span>10</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Transport Mode</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border ${
                            transportMode === 'ground'
                              ? 'bg-blue-900/40 border-blue-500/50 text-blue-300'
                              : 'bg-gray-800/60 border-gray-700 text-gray-400 hover:bg-gray-800'
                          }`}
                          onClick={() => setTransportMode('ground')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                            <circle cx="7" cy="17" r="2"></circle>
                            <path d="M9 17h6"></path>
                            <circle cx="17" cy="17" r="2"></circle>
                          </svg>
                          Ground
                        </button>
                        <button
                          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border ${
                            transportMode === 'air'
                              ? 'bg-blue-900/40 border-blue-500/50 text-blue-300'
                              : 'bg-gray-800/60 border-gray-700 text-gray-400 hover:bg-gray-800'
                          }`}
                          onClick={() => setTransportMode('air')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8.5 19h-4a1 1 0 0 1-.8-1.6l9.8-13"></path>
                            <path d="M17 5.5v13a1 1 0 0 0 1.6.8l2.7-2.7"></path>
                            <path d="M13 1.1l-5.9 5.3a1 1 0 0 0-.3.7v2.9l-3.8 3.4a1 1 0 0 0 .7 1.7h7.5"></path>
                          </svg>
                          Air
                        </button>
                      </div>
                      {patientSeverity > 8 && transportMode !== 'air' && (
                        <div className="mt-2 text-xs text-amber-400 flex items-center">
                          <AlertTriangle size={12} className="mr-1" />
                          Air transport recommended for critical patients
                        </div>
                      )}
                    </div>
                    
                    <button 
                      className="w-full bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 mt-4"
                    >
                      <Zap size={16} />
                      Dispatch Emergency Response
                    </button>
                  </div>
                </div>
                
                {/* Enhanced ICU Availability & Geographic Distribution graphs */}
                <div className="mt-4 space-y-4">
                  <div className="bg-gray-800/70 rounded-xl p-4 border border-blue-900/30">
                    <EnhancedICUAvailability data={icuBedData} />
                  </div>
                  
                  <div className="bg-gray-800/70 rounded-xl p-4 border border-blue-900/30">
                    <GeographicDistribution regions={geoDistributionData.regions} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Navigation */}
        <Navbar />
      </div>
    </div>
  );
};

export default Home;
