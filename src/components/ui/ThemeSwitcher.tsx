
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
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`p-2 rounded-full shadow-lg ${
        isDark 
          ? 'bg-gray-800/70 border border-purple-700/40' 
          : 'bg-white/70 border border-purple-200/40'
      } backdrop-blur-md`}
    >
      <Toggle 
        pressed={isDark}
        onPressedChange={toggleTheme}
        className={`w-10 h-10 rounded-full ${
          isDark 
            ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-700/50' 
            : 'bg-gradient-to-br from-purple-300/50 to-purple-200/30 border border-purple-200/50'
        }`}
        aria-label="Toggle theme"
      >
        <motion.div
          animate={{ 
            rotate: isDark ? 0 : 180,
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 0.5,
            scale: { times: [0, 0.5, 1], duration: 0.5 }
          }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon size={18} className="text-purple-300" />
          ) : (
            <Sun size={18} className="text-amber-500" />
          )}
        </motion.div>
      </Toggle>
    </motion.div>
  );
};

export default ThemeSwitcher;
