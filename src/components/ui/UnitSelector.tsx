
import { useState } from "react";
import { useUnits, UnitSystem } from "@/hooks/use-units";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Check, Scale } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const unitSystems: { value: UnitSystem; label: string }[] = [
  { value: "metric", label: "Metric (km, °C)" },
  { value: "imperial", label: "Imperial (mi, °F)" },
];

const UnitSelector = () => {
  const { unitSystem, setUnitSystem } = useUnits();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (system: UnitSystem) => {
    setUnitSystem(system);
    setIsOpen(false);
  };

  const getCurrentUnitLabel = () => {
    return unitSystems.find((unit) => unit.value === unitSystem)?.label || "Metric";
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center justify-between w-full text-sm"
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          <Scale size={16} className="mr-2" />
          <span>{getCurrentUnitLabel()}</span>
        </div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50 border border-gray-200 dark:border-gray-700"
          >
            <ul className="py-1">
              {unitSystems.map((unit) => (
                <li key={unit.value}>
                  <button
                    className="flex items-center justify-between w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSelect(unit.value)}
                  >
                    <span>{unit.label}</span>
                    {unitSystem === unit.value && (
                      <Check size={16} className="text-green-500" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnitSelector;
