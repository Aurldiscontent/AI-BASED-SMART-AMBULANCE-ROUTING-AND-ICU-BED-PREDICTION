
import React from 'react';
import { useUnits } from "@/hooks/use-units";
import { useLanguage } from "@/hooks/use-language";
import { Ruler, Scale } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { motion } from "framer-motion";

const UnitSwitcher = () => {
  const { unitSystem, setUnitSystem } = useUnits();
  const { t } = useLanguage();
  const isImperial = unitSystem === "imperial";

  const toggleUnitSystem = () => {
    setUnitSystem(isImperial ? "metric" : "imperial");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`p-2 rounded-full shadow-lg mt-3 ${
        isImperial 
          ? 'bg-gray-800/70 border border-purple-700/40' 
          : 'bg-white/70 border border-purple-200/40'
      } backdrop-blur-md`}
      title={isImperial ? t("switch-to-metric") : t("switch-to-imperial")}
    >
      <Toggle 
        pressed={isImperial}
        onPressedChange={toggleUnitSystem}
        className={`w-10 h-10 rounded-full ${
          isImperial 
            ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-700/50' 
            : 'bg-gradient-to-br from-purple-300/50 to-purple-200/30 border border-purple-200/50'
        }`}
        aria-label="Toggle unit system"
      >
        <motion.div
          animate={{ 
            rotate: isImperial ? 0 : 180,
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 0.5,
            scale: { times: [0, 0.5, 1], duration: 0.5 }
          }}
          className="flex items-center justify-center"
        >
          {isImperial ? (
            <Ruler size={18} className="text-purple-300" />
          ) : (
            <Scale size={18} className="text-purple-600" />
          )}
        </motion.div>
      </Toggle>
    </motion.div>
  );
};

export default UnitSwitcher;
