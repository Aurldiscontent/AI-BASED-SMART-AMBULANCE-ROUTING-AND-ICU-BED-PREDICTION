
import { createContext, useContext, useEffect, useState } from "react";

// Define settings structure
interface AppSettings {
  maps: {
    realTimeTraffic: boolean;
    smartRerouting: boolean;
    roadClosureAlerts: boolean;
    threeMap: boolean;
    laneGuidance: boolean;
  };
  notifications: {
    emergencyAlerts: boolean;
    hospitalStatusUpdates: boolean;
    trafficConditionAlerts: boolean;
    pushNotifications: boolean;
    audioAlerts: boolean;
  };
  performance: {
    aiPoweredRecommendations: boolean;
    survivalRatePrediction: boolean;
    anonymousDataSharing: boolean;
    detailedAnalytics: boolean;
  };
  system: {
    voiceCommands: boolean;
    dataSync: boolean;
  };
}

// Default settings
const defaultSettings: AppSettings = {
  maps: {
    realTimeTraffic: true,
    smartRerouting: true,
    roadClosureAlerts: true,
    threeMap: false,
    laneGuidance: true,
  },
  notifications: {
    emergencyAlerts: true,
    hospitalStatusUpdates: true,
    trafficConditionAlerts: true,
    pushNotifications: true,
    audioAlerts: true,
  },
  performance: {
    aiPoweredRecommendations: true,
    survivalRatePrediction: true,
    anonymousDataSharing: true,
    detailedAnalytics: true,
  },
  system: {
    voiceCommands: true,
    dataSync: true,
  },
};

// Define context type
type SettingsContextType = {
  settings: AppSettings;
  updateSetting: (category: keyof AppSettings, key: string, value: boolean) => void;
  resetSettings: () => void;
};

// Create settings context
const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSetting: () => {},
  resetSettings: () => {},
});

// Settings provider component
export function SettingsProvider({
  children,
  storageKey = "app-settings",
}: {
  children: React.ReactNode;
  storageKey?: string;
}) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const savedSettings = localStorage.getItem(storageKey);
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(settings));
  }, [settings, storageKey]);

  // Update a single setting
  const updateSetting = (category: keyof AppSettings, key: string, value: boolean) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [key]: value,
      },
    }));
  };

  // Reset settings to defaults
  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const value = {
    settings,
    updateSetting,
    resetSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

// Hook to use the settings context
export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
};
