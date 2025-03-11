
import { createContext, useContext, useEffect, useState } from "react";

// Define available unit systems
export type UnitSystem = "metric" | "imperial";

// Define context type
type UnitsContextType = {
  unitSystem: UnitSystem;
  setUnitSystem: (units: UnitSystem) => void;
  convertDistance: (value: number, withUnit?: boolean) => string;
  convertSpeed: (value: number, withUnit?: boolean) => string;
  convertTemperature: (value: number, withUnit?: boolean) => string;
};

// Create units context
const UnitsContext = createContext<UnitsContextType>({
  unitSystem: "metric",
  setUnitSystem: () => {},
  convertDistance: () => "",
  convertSpeed: () => "",
  convertTemperature: () => "",
});

// Units provider component
export function UnitsProvider({
  children,
  defaultUnitSystem = "metric",
  storageKey = "app-units",
}: {
  children: React.ReactNode;
  defaultUnitSystem?: UnitSystem;
  storageKey?: string;
}) {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(
    () => (localStorage.getItem(storageKey) as UnitSystem) || defaultUnitSystem
  );

  // Save unit preference to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, unitSystem);
  }, [unitSystem, storageKey]);

  // Convert distance based on current unit system
  const convertDistance = (value: number, withUnit: boolean = true): string => {
    if (unitSystem === "imperial") {
      // Convert km to miles (1 km = 0.621371 miles)
      const miles = value * 0.621371;
      return withUnit ? `${miles.toFixed(1)} mi` : miles.toFixed(1);
    }
    return withUnit ? `${value.toFixed(1)} km` : value.toFixed(1);
  };

  // Convert speed based on current unit system
  const convertSpeed = (value: number, withUnit: boolean = true): string => {
    if (unitSystem === "imperial") {
      // Convert km/h to mph (1 km/h = 0.621371 mph)
      const mph = value * 0.621371;
      return withUnit ? `${mph.toFixed(0)} mph` : mph.toFixed(0);
    }
    return withUnit ? `${value.toFixed(0)} km/h` : value.toFixed(0);
  };

  // Convert temperature based on current unit system
  const convertTemperature = (value: number, withUnit: boolean = true): string => {
    if (unitSystem === "imperial") {
      // Convert Celsius to Fahrenheit
      const fahrenheit = (value * 9/5) + 32;
      return withUnit ? `${fahrenheit.toFixed(1)}°F` : fahrenheit.toFixed(1);
    }
    return withUnit ? `${value.toFixed(1)}°C` : value.toFixed(1);
  };

  const value = {
    unitSystem,
    setUnitSystem,
    convertDistance,
    convertSpeed,
    convertTemperature
  };

  return (
    <UnitsContext.Provider value={value}>
      {children}
    </UnitsContext.Provider>
  );
}

// Hook to use the units context
export const useUnits = () => {
  const context = useContext(UnitsContext);

  if (context === undefined) {
    throw new Error("useUnits must be used within a UnitsProvider");
  }

  return context;
};
