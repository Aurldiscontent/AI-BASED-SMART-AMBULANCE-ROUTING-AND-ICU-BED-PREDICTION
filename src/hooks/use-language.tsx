
import { createContext, useContext, useEffect, useState } from "react";

// Define available languages
export type Language = 'en' | 'hi' | 'kn' | 'ta' | 'te' | 'ml' | 'english' | 'hindi' | 'kannada' | 'tamil' | 'telugu';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    "ai-smart-ambulance-routing": "AI Smart Ambulance Routing",
    "emergency-route": "Emergency Route Optimization System",
    "geographic-incident-distribution": "Geographic Incident Distribution",
    "icu-bed-occupancy": "ICU Bed Occupancy",
    "hospital-wait-times": "Hospital Wait Times",
    "north-bangalore": "North Bangalore",
    "central-bangalore": "Central Bangalore",
    "south-bangalore": "South Bangalore",
    "east-bangalore": "East Bangalore",
    "west-bangalore": "West Bangalore",
    "available-beds": "Available Beds",
    "total-beds": "Total Beds",
    "network-connection-issues": "Network Connection Issues",
    "partial-network-connection": "Partial Network Connection",
    "medical-response-analytics": "Medical Response Analytics",
    "patient-survival-rate": "Patient Survival Rate by Hospital",
    "emergency-response-time": "Emergency Response Time",
    "incidents-by-category": "Incidents by Category",
    "icu-occupancy-forecast": "ICU Occupancy Forecast",
    "receive-live-traffic": "Receive Live Traffic",
  },
  
  hi: {
    "ai-smart-ambulance-routing": "एआई स्मार्ट एम्बुलेंस मार्गदर्शन",
    "emergency-route": "आपातकालीन मार्ग अनुकूलन प्रणाली",
    "geographic-incident-distribution": "भौगोलिक घटना वितरण",
    "icu-bed-occupancy": "आईसीयू बेड अधिग्रहण",
    "hospital-wait-times": "अस्पताल प्रतीक्षा समय",
    "north-bangalore": "उत्तर बैंगलोर",
    "central-bangalore": "मध्य बैंगलोर",
    "south-bangalore": "दक्षिण बैंगलोर",
    "east-bangalore": "पूर्व बैंगलोर",
    "west-bangalore": "पश्चिम बैंगलोर",
    "available-beds": "उपलब्ध बिस्तर",
    "total-beds": "कुल बिस्तर",
    "network-connection-issues": "नेटवर्क कनेक्शन समस्याएं",
    "partial-network-connection": "आंशिक नेटवर्क कनेक्शन",
    "medical-response-analytics": "चिकित्सा प्रतिक्रिया विश्लेषण",
    "patient-survival-rate": "अस्पताल द्वारा रोगी जीवित रहने की दर",
    "emergency-response-time": "आपातकालीन प्रतिक्रिया समय",
    "incidents-by-category": "श्रेणी के अनुसार घटनाएँ",
    "icu-occupancy-forecast": "आईसीयू अधिग्रहण पूर्वानुमान",
    "receive-live-traffic": "लाइव ट्रैफिक प्राप्त करें",
  },

  kn: {
    "ai-smart-ambulance-routing": "ಎಐ ಸ್ಮಾರ್ಟ್ ಆಂಬುಲೆನ್ಸ್ ಮಾರ್ಗದರ್ಶನ",
    "emergency-route": "ತುರ್ತು ಮಾರ್ಗ ಆಪ್ಟಿಮೈಸೇಶನ್ ಸಿಸ್ಟಮ್",
    "geographic-incident-distribution": "ಭೌಗೋಳಿಕ ಘಟನೆಗಳ ವಿತರಣೆ",
    "icu-bed-occupancy": "ಐಸಿಯು ಹಾಸಿಗೆ ಆಕ್ರಮಣ",
    "hospital-wait-times": "ಆಸ್ಪತ್ರೆ ಕಾಯುವ ಸಮಯಗಳು",
    "north-bangalore": "ಉತ್ತರ ಬೆಂಗಳೂರು",
    "central-bangalore": "ಕೇಂದ್ರ ಬೆಂಗಳೂರು",
    "south-bangalore": "ದಕ್ಷಿಣ ಬೆಂಗಳೂರು",
    "east-bangalore": "ಪೂರ್ವ ಬೆಂಗಳೂರು",
    "west-bangalore": "ಪಶ್ಚಿಮ ಬೆಂಗಳೂರು",
    "available-beds": "ಲಭ್ಯವಿರುವ ಹಾಸಿಗೆಗಳು",
    "total-beds": "ಒಟ್ಟು ಹಾಸಿಗೆಗಳು",
    "network-connection-issues": "ನೆಟ್‌ವರ್ಕ್ ಸಂಪರ್ಕ ಸಮಸ್ಯೆಗಳು",
    "partial-network-connection": "ಭಾಗಶಃ ನೆಟ್‌ವರ್ಕ್ ಸಂಪರ್ಕ",
    "medical-response-analytics": "ವೈದ್ಯಕೀಯ ಪ್ರತಿಕ್ರಿಯೆ ವಿಶ್ಲೇಷಣೆ",
    "patient-survival-rate": "ಆಸ್ಪತ್ರೆಯ ಮೂಲಕ ರೋಗಿಯ ಬದುಕುಳಿಯುವ ದರ",
    "emergency-response-time": "ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ",
    "incidents-by-category": "ವರ್ಗದ ಪ್ರಕಾರ ಘಟನೆಗಳು",
    "icu-occupancy-forecast": "ಐಸಿಯು ಆಕ್ರಮಣ ಮುನ್ಸೂಚನೆ",
    "receive-live-traffic": "ಲೈವ್ ಟ್ರಾಫಿಕ್ ಸ್ವೀಕರಿಸಿ",
  },

  ta: {
    "ai-smart-ambulance-routing": "AI ஸ்மார்ட் ஆம்புலன்ஸ் வழிசெலுத்தல்",
    "emergency-route": "அவசர வழித்தட உகப்பாக்க அமைப்பு",
    "geographic-incident-distribution": "புவியியல் சம்பவ விநியோகம்",
    "icu-bed-occupancy": "ICU படுக்கை ஆக்கிரமிப்பு",
    "hospital-wait-times": "மருத்துவமனை காத்திருப்பு நேரங்கள்",
    "north-bangalore": "வடக்கு பெங்களூர்",
    "central-bangalore": "மத்திய பெங்களூர்",
    "south-bangalore": "தெற்கு பெங்களூர்",
    "east-bangalore": "கிழக்கு பெங்களூர்",
    "west-bangalore": "மேற்கு பெங்களூர்",
    "available-beds": "கிடைக்கும் படுக்கைகள்",
    "total-beds": "மொத்த படுக்கைகள்",
    "network-connection-issues": "நெட்வொர்க் இணைப்பு சிக்கல்கள்",
    "partial-network-connection": "பகுதி நெட்வொர்க் இணைப்பு",
    "medical-response-analytics": "மருத்துவ பதில் பகுப்பாய்வு",
    "patient-survival-rate": "மருத்துவமனையால் நோயாளி உயிர்வாழ்வு விகிதம்",
    "emergency-response-time": "அவசர பதில் நேரம்",
    "incidents-by-category": "வகை வாரியாக சம்பவங்கள்",
    "icu-occupancy-forecast": "ICU ஆக்கிரமிப்பு முன்னறிவிப்பு",
    "receive-live-traffic": "நேரடி ட்ராஃபிக்கைப் பெறுக",
  },

  te: {
    "ai-smart-ambulance-routing": "AI స్మార్ట్ అంబులెన్స్ రూటింగ్",
    "emergency-route": "అత్యవసర మార్గం ఆప్టిమైజేషన్ సిస్టమ్",
    "geographic-incident-distribution": "భౌగోళిక సంఘటన పంపిణీ",
    "icu-bed-occupancy": "ICU బెడ్ ఆక్రమణ",
    "hospital-wait-times": "ఆసుపత్రి వేచి ఉండే సమయాలు",
    "north-bangalore": "ఉత్తర బెంగళూరు",
    "central-bangalore": "సెంట్రల్ బెంగళూరు",
    "south-bangalore": "దక్షిణ బెంగళూరు",
    "east-bangalore": "తూర్పు బెంగళూరు",
    "west-bangalore": "పశ్చిమ బెంగళూరు",
    "available-beds": "అందుబాటులో ఉన్న పడకలు",
    "total-beds": "మొత్తం పడకలు",
    "network-connection-issues": "నెట్‌వర్క్ కనెక్షన్ సమస్యలు",
    "partial-network-connection": "పాక్షిక నెట్‌వర్క్ కనెక్షన్",
    "medical-response-analytics": "వైద్య స్పందన విశ్లేషణ",
    "patient-survival-rate": "ఆసుపత్రి ద్వారా రోగి మనుగడ రేటు",
    "emergency-response-time": "అత్యవసర స్పందన సమయం",
    "incidents-by-category": "వర్గం వారీగా సంఘటనలు",
    "icu-occupancy-forecast": "ICU ఆక్రమణ ఫోర్‌కాస్ట్",
    "receive-live-traffic": "ప్రత్యక్ష ట్రాఫిక్‌ను స్వీకరించండి",
  },

  ml: {
    "ai-smart-ambulance-routing": "AI സ്മാർട്ട് ആംബുലൻസ് റൂട്ടിംഗ്",
    "emergency-route": "അടിയന്തിര റൂട്ട് ഒപ്റ്റിമൈസേഷൻ സിസ്റ്റം",
    "geographic-incident-distribution": "ഭൂമിശാസ്ത്രപരമായ സംഭവ വിതരണം",
    "icu-bed-occupancy": "ICU കിടക്ക താമസം",
    "hospital-wait-times": "ആശുപത്രി കാത്തിരിപ്പ് സമയം",
    "north-bangalore": "വടക്കൻ ബംഗളൂരു",
    "central-bangalore": "സെൻട്രൽ ബംഗളൂരു",
    "south-bangalore": "തെക്കൻ ബംഗളൂരു",
    "east-bangalore": "കിഴക്കൻ ബംഗളൂരു",
    "west-bangalore": "പടിഞ്ഞാറൻ ബംഗളൂരു",
    "available-beds": "ലഭ്യമായ കിടക്കകൾ",
    "total-beds": "ആകെ കിടക്കകൾ",
    "network-connection-issues": "നെറ്റ്‌വർക്ക് കണക്ഷൻ പ്രശ്നങ്ങൾ",
    "partial-network-connection": "ഭാഗിക നെറ്റ്‌വർക്ക് കണക്ഷൻ",
    "medical-response-analytics": "മെഡിക്കൽ പ്രതികരണ അനലിറ്റിക്സ്",
    "patient-survival-rate": "ആശുപത്രി അനുസരിച്ച് രോഗി അതിജീവന നിരക്ക്",
    "emergency-response-time": "അടിയന്തിര പ്രതികരണ സമയം",
    "incidents-by-category": "വിഭാഗം അനുസരിച്ച് സംഭവങ്ങൾ",
    "icu-occupancy-forecast": "ICU ഓക്യുപൻസി ഫോർകാസ്റ്റ്",
    "receive-live-traffic": "തത്സമയ ട്രാഫിക് സ്വീകരിക്കുക",
  },
  
  // Add mappings for the string values being used in the components
  english: {
    // Same as 'en'
    "ai-smart-ambulance-routing": "AI Smart Ambulance Routing",
    "emergency-route": "Emergency Route Optimization System",
    "geographic-incident-distribution": "Geographic Incident Distribution",
    "icu-bed-occupancy": "ICU Bed Occupancy",
    "hospital-wait-times": "Hospital Wait Times",
    "north-bangalore": "North Bangalore",
    "central-bangalore": "Central Bangalore",
    "south-bangalore": "South Bangalore",
    "east-bangalore": "East Bangalore",
    "west-bangalore": "West Bangalore",
    "available-beds": "Available Beds",
    "total-beds": "Total Beds",
    "network-connection-issues": "Network Connection Issues",
    "partial-network-connection": "Partial Network Connection",
    "medical-response-analytics": "Medical Response Analytics",
    "patient-survival-rate": "Patient Survival Rate by Hospital",
    "emergency-response-time": "Emergency Response Time",
    "incidents-by-category": "Incidents by Category",
    "icu-occupancy-forecast": "ICU Occupancy Forecast",
    "receive-live-traffic": "Receive Live Traffic",
  },
  
  hindi: {
    // Same as 'hi'
    "ai-smart-ambulance-routing": "एआई स्मार्ट एम्बुलेंस मार्गदर्शन",
    "emergency-route": "आपातकालीन मार्ग अनुकूलन प्रणाली",
    "geographic-incident-distribution": "भौगोलिक घटना वितरण",
    "icu-bed-occupancy": "आईसीयू बेड अधिग्रहण",
    "hospital-wait-times": "अस्पताल प्रतीक्षा समय",
    "north-bangalore": "उत्तर बैंगलोर",
    "central-bangalore": "मध्य बैंगलोर",
    "south-bangalore": "दक्षिण बैंगलोर",
    "east-bangalore": "पूर्व बैंगलोर",
    "west-bangalore": "पश्चिम बैंगलोर",
    "available-beds": "उपलब्ध बिस्तर",
    "total-beds": "कुल बिस्तर",
    "network-connection-issues": "नेटवर्क कनेक्शन समस्याएं",
    "partial-network-connection": "आंशिक नेटवर्क कनेक्शन",
    "medical-response-analytics": "चिकित्सा प्रतिक्रिया विश्लेषण",
    "patient-survival-rate": "अस्पताल द्वारा रोगी जीवित रहने की दर",
    "emergency-response-time": "आपातकालीन प्रतिक्रिया समय",
    "incidents-by-category": "श्रेणी के अनुसार घटनाएँ",
    "icu-occupancy-forecast": "आईसीयू अधिग्रहण पूर्वानुमान",
    "receive-live-traffic": "लाइव ट्रैफिक प्राप्त करें",
  },
  
  kannada: {
    // Same as 'kn'
    "ai-smart-ambulance-routing": "ಎಐ ಸ್ಮಾರ್ಟ್ ಆಂಬುಲೆನ್ಸ್ ಮಾರ್ಗದರ್ಶನ",
    "emergency-route": "ತುರ್ತು ಮಾರ್ಗ ಆಪ್ಟಿಮೈಸೇಶನ್ ಸಿಸ್ಟಮ್",
    "geographic-incident-distribution": "ಭೌಗೋಳಿಕ ಘಟನೆಗಳ ವಿತರಣೆ",
    "icu-bed-occupancy": "ಐಸಿಯು ಹಾಸಿಗೆ ಆಕ್ರಮಣ",
    "hospital-wait-times": "ಆಸ್ಪತ್ರೆ ಕಾಯುವ ಸಮಯಗಳು",
    "north-bangalore": "ಉತ್ತರ ಬೆಂಗಳೂರು",
    "central-bangalore": "ಕೇಂದ್ರ ಬೆಂಗಳೂರು",
    "south-bangalore": "ದಕ್ಷಿಣ ಬೆಂಗಳೂರು",
    "east-bangalore": "ಪೂರ್ವ ಬೆಂಗಳೂರು",
    "west-bangalore": "ಪಶ್ಚಿಮ ಬೆಂಗಳೂರು",
    "available-beds": "ಲಭ್ಯವಿರುವ ಹಾಸಿಗೆಗಳು",
    "total-beds": "ಒಟ್ಟು ಹಾಸಿಗೆಗಳು",
    "network-connection-issues": "ನೆಟ್‌ವರ್ಕ್ ಸಂಪರ್ಕ ಸಮಸ್ಯೆಗಳು",
    "partial-network-connection": "ಭಾಗಶಃ ನೆಟ್‌ವರ್ಕ್ ಸಂಪರ್ಕ",
    "medical-response-analytics": "ವೈದ್ಯಕೀಯ ಪ್ರತಿಕ್ರಿಯೆ ವಿಶ್ಲೇಷಣೆ",
    "patient-survival-rate": "ಆಸ್ಪತ್ರೆಯ ಮೂಲಕ ರೋಗಿಯ ಬದುಕುಳಿಯುವ ದರ",
    "emergency-response-time": "ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ",
    "incidents-by-category": "ವರ್ಗದ ಪ್ರಕಾರ ಘಟನೆಗಳು",
    "icu-occupancy-forecast": "ಐಸಿಯು ಆಕ್ರಮಣ ಮುನ್ಸೂಚನೆ",
    "receive-live-traffic": "ಲೈವ್ ಟ್ರಾಫಿಕ್ ಸ್ವೀಕರಿಸಿ",
  },
  
  tamil: {
    // Same as 'ta'
    "ai-smart-ambulance-routing": "AI ஸ்மார்ட் ஆம்புலன்ஸ் வழிசெலுத்தல்",
    "emergency-route": "அவசர வழித்தட உகப்பாக்க அமைப்பு",
    "geographic-incident-distribution": "புவியியல் சம்பவ விநியோகம்",
    "icu-bed-occupancy": "ICU படுக்கை ஆக்கிரமிப்பு",
    "hospital-wait-times": "மருத்துவமனை காத்திருப்பு நேரங்கள்",
    "north-bangalore": "வடக்கு பெங்களூர்",
    "central-bangalore": "மத்திய பெங்களூர்",
    "south-bangalore": "தெற்கு பெங்களூர்",
    "east-bangalore": "கிழக்கு பெங்களூர்",
    "west-bangalore": "மேற்கு பெங்களூர்",
    "available-beds": "கிடைக்கும் படுக்கைகள்",
    "total-beds": "மொத்த படுக்கைகள்",
    "network-connection-issues": "நெட்வொர்க் இணைப்பு சிக்கல்கள்",
    "partial-network-connection": "பகுதி நெட்வொர்க் இணைப்பு",
    "medical-response-analytics": "மருத்துவ பதில் பகுப்பாய்வு",
    "patient-survival-rate": "மருத்துவமனையால் நோயாளி உயிர்வாழ்வு விகிதம்",
    "emergency-response-time": "அவசர பதில் நேரம்",
    "incidents-by-category": "வகை வாரியாக சம்பவங்கள்",
    "icu-occupancy-forecast": "ICU ஆக்கிரமிப்பு முன்னறிவிப்பு",
    "receive-live-traffic": "நேரடி ட்ராஃபிக்கைப் பெறுக",
  },
  
  telugu: {
    // Same as 'te'
    "ai-smart-ambulance-routing": "AI స్మార్ట్ అంబులెన్స్ రూటింగ్",
    "emergency-route": "అత్యవసర మార్గం ఆప్టిమైజేషన్ సిస్టమ్",
    "geographic-incident-distribution": "భౌగోళిక సంఘటన పంపిణీ",
    "icu-bed-occupancy": "ICU బెడ్ ఆక్రమణ",
    "hospital-wait-times": "ఆసుపత్రి వేచి ఉండే సమయాలు",
    "north-bangalore": "ఉత్తర బెంగళూరు",
    "central-bangalore": "సెంట్రల్ బెంగళూరు",
    "south-bangalore": "దక్షిణ బెంగళూరు",
    "east-bangalore": "తూర్పు బెంగళూరు",
    "west-bangalore": "పశ్చిమ బెంగళూరు",
    "available-beds": "అందుబాటులో ఉన్న పడకలు",
    "total-beds": "మొత్తం పడకలు",
    "network-connection-issues": "నెట్‌వర్క్ కనెక్షన్ సమస్యలు",
    "partial-network-connection": "పాక్షిక నెట్‌వర్క్ కనెక్షన్",
    "medical-response-analytics": "వైద్య స్పందన విశ్లేషణ",
    "patient-survival-rate": "ఆసుపత్రి ద్వారా రోగి మనుగడ రేటు",
    "emergency-response-time": "అత్యవసర స్పందన సమయం",
    "incidents-by-category": "వర్గం వారీగా సంఘటనలు",
    "icu-occupancy-forecast": "ICU ఆక్రమణ ఫోర్‌కాస్ట్",
    "receive-live-traffic": "ప్రత్యక్ష ట్రాఫిక్‌ను స్వీకరించండి",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ 
  children,
  defaultLanguage = 'en'
}: { 
  children: React.ReactNode;
  defaultLanguage?: Language;
}) => {
  
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};
