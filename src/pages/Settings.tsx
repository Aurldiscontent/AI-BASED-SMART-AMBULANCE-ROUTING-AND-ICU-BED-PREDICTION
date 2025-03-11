
import React from 'react';
import { useSettings } from '@/hooks/use-settings';
import { useLanguage } from '@/hooks/use-language';
import { useTheme } from '@/hooks/use-theme';
import { useUnits } from '@/hooks/use-units';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import TopHeader from '@/components/ui/TopHeader';
import Navbar from '@/components/ui/Navbar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const { settings, updateSetting, resetSettings } = useSettings();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { unitSystem, setUnitSystem } = useUnits();
  
  const languages = [
    { value: 'english', label: 'English' },
    { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' },
  ];
  
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center transition-all duration-500"
      style={{ 
        backgroundImage: `url('/lovable-uploads/7c8af1f3-722f-4ce8-a1f9-aa995983760e.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={`min-h-screen w-full backdrop-blur-sm transition-all duration-500 pb-20 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900/90 via-purple-900/70 to-gray-900/90' 
          : 'bg-gradient-to-br from-blue-50/90 via-purple-100/70 to-blue-50/90'
      }`}>
        {/* Top Header */}
        <TopHeader />
        
        <div className="container mx-auto px-4 pt-4 pb-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">{t("settings")}</h1>
            
            {/* Language & System Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{t("system-preferences")}</h2>
              
              <div className="space-y-6">
                {/* Language Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <Label htmlFor="language">{t("language")}</Label>
                  <Select
                    value={language}
                    onValueChange={(value: any) => setLanguage(value)}
                  >
                    <SelectTrigger id="language" className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Units Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <Label htmlFor="units">{t("units")}</Label>
                  <Select
                    value={unitSystem}
                    onValueChange={(value: any) => setUnitSystem(value)}
                  >
                    <SelectTrigger id="units" className="w-full">
                      <SelectValue placeholder="Select unit system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">{t("metric")}</SelectItem>
                      <SelectItem value="imperial">{t("imperial")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Map & Navigation Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{t("map-navigation-settings")}</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="real-time-traffic">{t("real-time-traffic-updates")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("receive-live-traffic")}</p>
                  </div>
                  <Switch
                    id="real-time-traffic"
                    checked={settings.maps.realTimeTraffic}
                    onCheckedChange={(checked) => updateSetting('maps', 'realTimeTraffic', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smart-rerouting">{t("smart-rerouting")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("auto-reroute")}</p>
                  </div>
                  <Switch
                    id="smart-rerouting"
                    checked={settings.maps.smartRerouting}
                    onCheckedChange={(checked) => updateSetting('maps', 'smartRerouting', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="road-closure-alerts">{t("road-closure-alerts")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("get-road-closure")}</p>
                  </div>
                  <Switch
                    id="road-closure-alerts"
                    checked={settings.maps.roadClosureAlerts}
                    onCheckedChange={(checked) => updateSetting('maps', 'roadClosureAlerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="3d-map">{t("3d-map-visualization")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("show-3d-buildings")}</p>
                  </div>
                  <Switch
                    id="3d-map"
                    checked={settings.maps.threeMap}
                    onCheckedChange={(checked) => updateSetting('maps', 'threeMap', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="lane-guidance">{t("lane-guidance")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("show-lanes")}</p>
                  </div>
                  <Switch
                    id="lane-guidance"
                    checked={settings.maps.laneGuidance}
                    onCheckedChange={(checked) => updateSetting('maps', 'laneGuidance', checked)}
                  />
                </div>
              </div>
            </div>
            
            {/* Notifications & Alerts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{t("notifications-alerts")}</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emergency-alerts">{t("emergency-alerts")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("critical-alerts")}</p>
                  </div>
                  <Switch
                    id="emergency-alerts"
                    checked={settings.notifications.emergencyAlerts}
                    onCheckedChange={(checked) => updateSetting('notifications', 'emergencyAlerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="hospital-status">{t("hospital-status-updates")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("bed-availability")}</p>
                  </div>
                  <Switch
                    id="hospital-status"
                    checked={settings.notifications.hospitalStatusUpdates}
                    onCheckedChange={(checked) => updateSetting('notifications', 'hospitalStatusUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="traffic-alerts">{t("traffic-condition-alerts")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("traffic-alerts")}</p>
                  </div>
                  <Switch
                    id="traffic-alerts"
                    checked={settings.notifications.trafficConditionAlerts}
                    onCheckedChange={(checked) => updateSetting('notifications', 'trafficConditionAlerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">{t("push-notifications")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("mobile-alerts")}</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audio-alerts">{t("audio-alerts")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("voice-announcements")}</p>
                  </div>
                  <Switch
                    id="audio-alerts"
                    checked={settings.notifications.audioAlerts}
                    onCheckedChange={(checked) => updateSetting('notifications', 'audioAlerts', checked)}
                  />
                </div>
              </div>
            </div>
            
            {/* Performance & Data */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{t("performance-data")}</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-powered">{t("ai-powered-recommendations")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("smart-hospital")}</p>
                  </div>
                  <Switch
                    id="ai-powered"
                    checked={settings.performance.aiPoweredRecommendations}
                    onCheckedChange={(checked) => updateSetting('performance', 'aiPoweredRecommendations', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="survival-rate">{t("survival-rate-prediction")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("show-survival")}</p>
                  </div>
                  <Switch
                    id="survival-rate"
                    checked={settings.performance.survivalRatePrediction}
                    onCheckedChange={(checked) => updateSetting('performance', 'survivalRatePrediction', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-sharing">{t("anonymous-data-sharing")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("share-data")}</p>
                  </div>
                  <Switch
                    id="data-sharing"
                    checked={settings.performance.anonymousDataSharing}
                    onCheckedChange={(checked) => updateSetting('performance', 'anonymousDataSharing', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="detailed-analytics">{t("detailed-analytics")}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("performance-metrics")}</p>
                  </div>
                  <Switch
                    id="detailed-analytics"
                    checked={settings.performance.detailedAnalytics}
                    onCheckedChange={(checked) => updateSetting('performance', 'detailedAnalytics', checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <Navbar />
      </div>
    </div>
  );
};

export default Settings;
