
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { useSettings } from '@/hooks/use-settings';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Bell, Gauge, Map, Settings, LayoutDashboard } from 'lucide-react';
import SettingsToggle from './SettingsToggle';
import LanguageSelector from './LanguageSelector';
import UnitSelector from './UnitSelector';

const SettingsContent = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { settings } = useSettings();
  
  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="dark:bg-gray-800/50 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Map size={18} className="text-blue-500 mr-2" />
            {t("map-navigation-settings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingsToggle 
            category="maps" 
            setting="realTimeTraffic" 
            label="real-time-traffic-updates" 
            description="receive-live-traffic" 
          />
          
          <SettingsToggle 
            category="maps" 
            setting="smartRerouting" 
            label="smart-rerouting" 
            description="auto-reroute" 
          />
          
          <SettingsToggle 
            category="maps" 
            setting="roadClosureAlerts" 
            label="road-closure-alerts" 
            description="get-road-closure" 
          />
          
          <SettingsToggle 
            category="maps" 
            setting="threeMap" 
            label="3d-map-visualization" 
            description="show-3d-buildings" 
          />
          
          <SettingsToggle 
            category="maps" 
            setting="laneGuidance" 
            label="lane-guidance" 
            description="show-lanes" 
          />
        </CardContent>
      </Card>
      
      <Card className="dark:bg-gray-800/50 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Bell size={18} className="text-blue-500 mr-2" />
            {t("notifications-alerts")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingsToggle 
            category="notifications" 
            setting="emergencyAlerts" 
            label="emergency-alerts" 
            description="critical-alerts" 
          />
          
          <SettingsToggle 
            category="notifications" 
            setting="hospitalStatusUpdates" 
            label="hospital-status-updates" 
            description="bed-availability" 
          />
          
          <SettingsToggle 
            category="notifications" 
            setting="trafficConditionAlerts" 
            label="traffic-condition-alerts" 
            description="traffic-alerts" 
          />
          
          <SettingsToggle 
            category="notifications" 
            setting="pushNotifications" 
            label="push-notifications" 
            description="mobile-alerts" 
          />
          
          <SettingsToggle 
            category="notifications" 
            setting="audioAlerts" 
            label="audio-alerts" 
            description="voice-announcements" 
          />
        </CardContent>
      </Card>
      
      <Card className="dark:bg-gray-800/50 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Gauge size={18} className="text-blue-500 mr-2" />
            {t("performance-data")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingsToggle 
            category="performance" 
            setting="aiPoweredRecommendations" 
            label="ai-powered-recommendations" 
            description="smart-hospital" 
          />
          
          <SettingsToggle 
            category="performance" 
            setting="survivalRatePrediction" 
            label="survival-rate-prediction" 
            description="show-survival" 
          />
          
          <SettingsToggle 
            category="performance" 
            setting="anonymousDataSharing" 
            label="anonymous-data-sharing" 
            description="share-data" 
          />
          
          <SettingsToggle 
            category="performance" 
            setting="detailedAnalytics" 
            label="detailed-analytics" 
            description="performance-metrics" 
          />
        </CardContent>
      </Card>
      
      <Card className="dark:bg-gray-800/50 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Settings size={18} className="text-blue-500 mr-2" />
            {t("system-preferences")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingsToggle 
            category="system" 
            setting="dataSync" 
            label="data-sync" 
            description="sync-data" 
          />
          
          <SettingsToggle 
            category="system" 
            setting="voiceCommands" 
            label="voice-commands" 
            description="enable-voice" 
          />
          
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{t("dark-mode")}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("switch-themes")}</p>
            </div>
            <button 
              onClick={handleThemeToggle}
              className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
            >
              {theme === "dark" ? t("light") : t("dark")}
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{t("language")}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("current-language")}: {t(theme)}</p>
            </div>
            <LanguageSelector />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{t("units")}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("units")}</p>
            </div>
            <UnitSelector />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsContent;
