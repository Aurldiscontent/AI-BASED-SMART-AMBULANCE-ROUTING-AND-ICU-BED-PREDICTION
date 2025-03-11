
import { useSettings } from "@/hooks/use-settings";
import { Toggle } from "@/components/ui/toggle";
import { useLanguage } from "@/hooks/use-language";

interface SettingsToggleProps {
  category: "maps" | "notifications" | "performance" | "system";
  setting: string;
  label: string;
  description: string;
  className?: string;
}

const SettingsToggle = ({
  category,
  setting,
  label,
  description,
  className = ""
}: SettingsToggleProps) => {
  const { settings, updateSetting } = useSettings();
  const { t } = useLanguage();
  
  const value = settings[category][setting as keyof typeof settings[typeof category]];
  
  const handleToggle = () => {
    updateSetting(category, setting, !value);
  };
  
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div>
        <p className="font-medium">{t(label)}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t(description)}</p>
      </div>
      <Toggle
        pressed={value}
        onPressedChange={handleToggle}
        aria-label={`Toggle ${setting}`}
        className={`data-[state=on]:bg-blue-500`}
      />
    </div>
  );
};

export default SettingsToggle;
