
import React from 'react';
import { useLanguage, Language } from '@/hooks/use-language';
import { Check, Globe } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useTheme } from '@/hooks/use-theme';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const languages: { value: Language; label: string }[] = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिन्दी (Hindi)' },
    { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' }
  ];

  return (
    <div className="relative z-10">
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger 
          className={`w-[180px] ${
            isDark 
              ? 'bg-gray-800/80 border-gray-700 text-gray-200' 
              : 'bg-white/80 border-gray-200 text-gray-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Globe size={16} />
            <SelectValue placeholder="Select language" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              <div className="flex items-center justify-between w-full">
                <span>{lang.label}</span>
                {language === lang.value && <Check size={16} className="ml-2" />}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
