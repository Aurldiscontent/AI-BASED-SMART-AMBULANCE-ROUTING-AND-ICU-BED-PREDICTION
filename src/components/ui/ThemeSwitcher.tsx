
import React from 'react';
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { motion } from "framer-motion";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Toggle 
      pressed={isDark}
      onPressedChange={toggleTheme}
      className="w-9 h-9 rounded-full"
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Moon size={18} className="text-blue-200" />
        ) : (
          <Sun size={18} className="text-amber-500" />
        )}
      </motion.div>
    </Toggle>
  );
};

export default ThemeSwitcher;
