import React from "react";
import { useNavigate } from "react-router-dom";
import AnimatedLogo from "./ui/AnimatedLogo";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Hospital,
  Clock,
  Navigation,
  HeartPulse,
} from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/hooks/use-language";
import LanguageSelector from "./ui/LanguageSelector";

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  // ✅ Features with translated text
  const featuresData = [
    {
      icon: <Navigation className="w-6 h-6 text-cyan-400" />,
      text: t("ai-route-finding"),
    },
    {
      icon: <Hospital className="w-6 h-6 text-cyan-400" />,
      text: t("bed-availability"),
    },
    {
      icon: <Clock className="w-6 h-6 text-cyan-400" />,
      text: t("save-minutes"),
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-cyan-400" />,
      text: t("every-second-counts"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen flex flex-col items-center justify-center
        bg-gradient-to-br from-[#0c1e3e] to-[#1b2340] p-6 relative"
    >
      {/* 🌍 Language Selector */}
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      {/* 🚑 Logo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90, delay: 0.2 }}
        className="mb-4"
      >
        <AnimatedLogo size="lg" showText={false} />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
          {t("rapid")} <span className="text-cyan-400">{t("aid")}</span>{" "}
          {t("innovators")}
        </h1>
        <p className="text-lg md:text-xl font-medium text-blue-200 mb-8 px-2">
          {t("smart-routing")} ⚡
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-10"
      >
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md 
              rounded-lg border border-white/20 p-4 shadow-md hover:shadow-lg 
              transition-all"
          >
            {feature.icon}
            <span className="text-blue-100 font-medium">{feature.text}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <Button
          onClick={handleGetStarted}
          className="w-full py-6 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 
            hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl 
            font-bold transition-all duration-300 flex items-center justify-center gap-3 
            shadow-lg group text-lg tracking-wide"
        >
          {t("get-started")}
          <ArrowRight
            size={22}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
