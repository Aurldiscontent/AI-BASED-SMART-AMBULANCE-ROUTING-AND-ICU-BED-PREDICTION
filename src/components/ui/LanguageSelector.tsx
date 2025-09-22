import { useState } from "react";
import { useLanguage, Language } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Check, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

// ✅ Ensure no duplicate languages
const languages: { code: Language; label: string }[] = [
  { code: "english", label: "English" },
  { code: "hindi", label: "हिन्दी" },
  { code: "kannada", label: "ಕನ್ನಡ" },
  { code: "tamil", label: "தமிழ்" },
  { code: "telugu", label: "తెలుగు" },
  { code: "ml", label: "മലയാളം" },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const getCurrentLanguageLabel = () => {
    return languages.find((lang) => lang.code === language)?.label || language;
  };

  return (
    <div className="relative z-50">
      {/* Button to open dropdown */}
      <Button
        variant="ghost"
        className={`flex items-center justify-between text-sm ${
          isDark
            ? "hover:bg-gray-700/50 text-gray-200"
            : "hover:bg-gray-100/80 text-gray-700"
        }`}
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          <Languages size={16} className="mr-2" />
          <span>{getCurrentLanguageLabel()}</span>
        </div>
      </Button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute right-0 mt-1 w-40 shadow-lg rounded-md overflow-hidden z-50 border ${
              isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <ul className="py-1">
              {languages.map((lang) => (
                <li key={lang.code}>
                  <button
                    className={`flex items-center justify-between w-full px-4 py-2 text-left text-sm ${
                      isDark
                        ? "hover:bg-gray-700 text-gray-200"
                        : "hover:bg-gray-100 text-gray-800"
                    }`}
                    onClick={() => handleSelect(lang.code)}
                  >
                    <span>{lang.label}</span>
                    {language === lang.code && (
                      <Check
                        size={16}
                        className={isDark ? "text-blue-400" : "text-green-500"}
                      />
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

export default LanguageSelector;
