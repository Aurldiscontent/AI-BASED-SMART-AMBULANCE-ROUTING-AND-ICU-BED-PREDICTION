
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
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="glass-card p-2 rounded-full shadow-lg"
    >
      <Toggle 
        pressed={isDark}
        onPressedChange={toggleTheme}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100/30 to-blue-300/20 dark:from-blue-900/30 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50"
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
    </motion.div>
  );
};

export default ThemeSwitcher;
