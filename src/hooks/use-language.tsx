
import { createContext, useContext, useEffect, useState } from "react";

// Define available languages
export type Language = "english" | "kannada" | "hindi" | "tamil" | "telugu";

// Store translations for each language
export const translations: Record<Language, Record<string, string>> = {
  english: {
    // Navigation
    "dashboard": "Dashboard",
    "live-route": "Live Route",
    "hospitals": "Hospitals",
    "reports": "Reports",
    "settings": "Settings",
    
    // Page Titles
    "ai-smart-ambulance-routing": "AI Smart Ambulance Routing",
    "emergency-route": "Emergency Route",
    "hospitals-near-you": "Hospitals Near You",
    
    // Patient Status
    "patient-status": "Patient Status",
    "critical": "CRITICAL",
    
    // Hospital Info
    "icu-availability": "ICU Availability",
    "total-icu-beds": "Total ICU Beds",
    "view-all-hospitals": "View All Hospitals",
    "navigate-to": "Navigate to",
    "calling-hospital": "Calling Hospital",
    "connecting-to": "Connecting to",
    
    // Upload Dataset
    "upload-dataset": "Upload Dataset",
    "dataset-ready": "Dataset Ready",
    "uploading": "Uploading...",
    "dataset-uploaded-title": "Dataset Uploaded Successfully",
    "dataset-uploaded-desc": "File has been processed and is ready for analysis",
    
    // Settings
    "map-navigation-settings": "Map & Navigation Settings",
    "notifications-alerts": "Notifications & Alerts",
    "performance-data": "Performance & Data",
    "system-preferences": "System Preferences",
    "real-time-traffic-updates": "Real-time Traffic Updates",
    "smart-rerouting": "Smart Rerouting",
    "road-closure-alerts": "Road Closure Alerts",
    "3d-map-visualization": "3D Map Visualization",
    "lane-guidance": "Lane Guidance",
    "emergency-alerts": "Emergency Alerts",
    "hospital-status-updates": "Hospital Status Updates",
    "traffic-condition-alerts": "Traffic Condition Alerts",
    "push-notifications": "Push Notifications",
    "audio-alerts": "Audio Alerts",
    "ai-powered-recommendations": "AI-Powered Recommendations",
    "survival-rate-prediction": "Survival Rate Prediction",
    "anonymous-data-sharing": "Anonymous Data Sharing",
    "detailed-analytics": "Detailed Analytics",
    "dark-mode": "Dark Mode",
    "voice-commands": "Voice Commands",
    "data-sync": "Data Sync",
    "language": "Language",
    "current-language": "Current",
    "units": "Units",
    "metric": "Metric",
    "imperial": "Imperial",
    "switch-to-light": "Switch to Light Mode",
    "switch-to-dark": "Switch to Dark Mode",
    "change": "Change",
    
    // Themes
    "light": "Light",
    "dark": "Dark",
    
    // Profile
    "edit-profile": "Edit Profile",
    "sign-out": "Sign Out",
    
    // Common actions
    "search-hospitals": "Search hospitals or enter accident location for routing...",
    "receive-live-traffic": "Receive live traffic data for optimal routing",
    "auto-reroute": "Automatically reroute when faster paths are available",
    "get-road-closure": "Get notified of closed roads along your route",
    "show-3d-buildings": "Show buildings and landmarks in 3D",
    "show-lanes": "Show recommended lanes for faster navigation",
    "critical-alerts": "Critical patient and high priority alerts",
    "bed-availability": "Changes in bed availability and wait times",
    "traffic-alerts": "Significant changes in traffic conditions",
    "mobile-alerts": "Receive alerts on mobile devices",
    "voice-announcements": "Voice announcements for critical updates",
    "smart-hospital": "Smart hospital selection based on patient data",
    "show-survival": "Show predicted survival rates for hospitals",
    "share-data": "Share anonymized data to improve the system",
    "performance-metrics": "View comprehensive performance metrics",
    "switch-themes": "Switch between light and dark themes",
    "enable-voice": "Enable hands-free voice control",
    "sync-data": "Sync data across devices",
  },
  
  kannada: {
    // Navigation
    "dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "live-route": "ಲೈವ್ ಮಾರ್ಗ",
    "hospitals": "ಆಸ್ಪತ್ರೆಗಳು",
    "reports": "ವರದಿಗಳು",
    "settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    
    // Page Titles
    "ai-smart-ambulance-routing": "AI ಸ್ಮಾರ್ಟ್ ಆಂಬುಲೆನ್ಸ್ ಮಾರ್ಗ",
    "emergency-route": "ತುರ್ತು ಮಾರ್ಗ",
    "hospitals-near-you": "ನಿಮ್ಮ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು",
    
    // Patient Status
    "patient-status": "ರೋಗಿಯ ಸ್ಥಿತಿ",
    "critical": "ಗಂಭೀರ",
    
    // Hospital Info
    "icu-availability": "ICU ಲಭ್ಯತೆ",
    "total-icu-beds": "ಒಟ್ಟು ICU ಹಾಸಿಗೆಗಳು",
    "view-all-hospitals": "ಎಲ್ಲ ಆಸ್ಪತ್ರೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    "navigate-to": "ನ್ಯಾವಿಗೇಟ್ ಮಾಡಿ",
    "calling-hospital": "ಆಸ್ಪತ್ರೆಗೆ ಕರೆ ಮಾಡುತ್ತಿದೆ",
    "connecting-to": "ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ",
    
    // Upload Dataset
    "upload-dataset": "ಡೇಟಾಸೆಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "dataset-ready": "ಡೇಟಾಸೆಟ್ ಸಿದ್ಧವಾಗಿದೆ",
    "uploading": "ಅಪ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    "dataset-uploaded-title": "ಡೇಟಾಸೆಟ್ ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಲೋಡ್ ಆಗಿದೆ",
    "dataset-uploaded-desc": "ಫೈಲ್ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗಿದೆ ಮತ್ತು ವಿಶ್ಲೇಷಣೆಗೆ ಸಿದ್ಧವಾಗಿದೆ",
    
    // Settings
    "map-navigation-settings": "ನಕ್ಷೆ ಮತ್ತು ನ್ಯಾವಿಗೇಶನ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "notifications-alerts": "ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು",
    "performance-data": "ಕಾರ್ಯಕ್ಷಮತೆ ಮತ್ತು ಡೇಟಾ",
    "system-preferences": "ಸಿಸ್ಟಮ್ ಆದ್ಯತೆಗಳು",
    "real-time-traffic-updates": "ರಿಯಲ್-ಟೈಮ್ ಟ್ರಾಫಿಕ್ ಅಪ್‌ಡೇಟ್‌ಗಳು",
    "smart-rerouting": "ಸ್ಮಾರ್ಟ್ ರೀರೂಟಿಂಗ್",
    "road-closure-alerts": "ರಸ್ತೆ ಮುಚ್ಚುವಿಕೆ ಎಚ್ಚರಿಕೆಗಳು",
    "3d-map-visualization": "3D ನಕ್ಷೆ ದೃಶ್ಯೀಕರಣ",
    "lane-guidance": "ಲೇನ್ ಮಾರ್ಗದರ್ಶನ",
    "emergency-alerts": "ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳು",
    "hospital-status-updates": "ಆಸ್ಪತ್ರೆ ಸ್ಥಿತಿ ಅಪ್‌ಡೇಟ್‌ಗಳು",
    "traffic-condition-alerts": "ಟ್ರಾಫಿಕ್ ಸ್ಥಿತಿ ಎಚ್ಚರಿಕೆಗಳು",
    "push-notifications": "ಪುಶ್ ಅಧಿಸೂಚನೆಗಳು",
    "audio-alerts": "ಆಡಿಯೋ ಎಚ್ಚರಿಕೆಗಳು",
    "ai-powered-recommendations": "AI-ಆಧಾರಿತ ಶಿಫಾರಸುಗಳು",
    "survival-rate-prediction": "ಬದುಕುಳಿಯುವ ದರ ಭವಿಷ್ಯ",
    "anonymous-data-sharing": "ಅನಾಮಧೇಯ ಡೇಟಾ ಹಂಚಿಕೆ",
    "detailed-analytics": "ವಿವರವಾದ ವಿಶ್ಲೇಷಣೆ",
    "dark-mode": "ಡಾರ್ಕ್ ಮೋಡ್",
    "voice-commands": "ಧ್ವನಿ ಆದೇಶಗಳು",
    "data-sync": "ಡೇಟಾ ಸಿಂಕ್",
    "language": "ಭಾಷೆ",
    "current-language": "ಪ್ರಸ್ತುತ",
    "units": "ಘಟಕಗಳು",
    "metric": "ಮೆಟ್ರಿಕ್",
    "imperial": "ಇಂಪೀರಿಯಲ್",
    "switch-to-light": "ಲೈಟ್ ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ",
    "switch-to-dark": "ಡಾರ್ಕ್ ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ",
    "change": "ಬದಲಾಯಿಸಿ",

    // Themes
    "light": "ಬೆಳಕು",
    "dark": "ಕತ್ತಲೆ",
    
    // Profile
    "edit-profile": "ಪ್ರೊಫೈಲ್ ಎಡಿಟ್ ಮಾಡಿ",
    "sign-out": "ಸೈನ್ ಔಟ್",
    
    // Common actions
    "search-hospitals": "ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ ಅಥವಾ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಅಪಘಾತ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ...",
    "receive-live-traffic": "ಅನುಕೂಲಕರ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಲೈವ್ ಟ್ರಾಫಿಕ್ ಡೇಟಾವನ್ನು ಪಡೆಯಿರಿ",
    "auto-reroute": "ವೇಗದ ಮಾರ್ಗಗಳು ಲಭ್ಯವಿದ್ದಾಗ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಮರುಮಾರ್ಗಗೊಳಿಸಿ",
    "get-road-closure": "ನಿಮ್ಮ ಮಾರ್ಗದಲ್ಲಿ ಮುಚ್ಚಿದ ರಸ್ತೆಗಳ ಬಗ್ಗೆ ಸೂಚನೆ ಪಡೆಯಿರಿ",
    "show-3d-buildings": "3D ನಲ್ಲಿ ಕಟ್ಟಡಗಳು ಮತ್ತು ಲ್ಯಾಂಡ್‌ಮಾರ್ಕ್‌ಗಳನ್ನು ತೋರಿಸಿ",
    "show-lanes": "ವೇಗದ ನ್ಯಾವಿಗೇಶನ್‌ಗಾಗಿ ಶಿಫಾರಸು ಮಾಡಿದ ಲೇನ್‌ಗಳನ್ನು ತೋರಿಸಿ",
    "critical-alerts": "ಗಂಭೀರ ರೋಗಿ ಮತ್ತು ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ಎಚ್ಚರಿಕೆಗಳು",
    "bed-availability": "ಹಾಸಿಗೆ ಲಭ್ಯತೆ ಮತ್ತು ನಿರೀಕ್ಷಣಾ ಸಮಯದಲ್ಲಿ ಬದಲಾವಣೆಗಳು",
    "traffic-alerts": "ಟ್ರಾಫಿಕ್ ಪರಿಸ್ಥಿತಿಗಳಲ್ಲಿ ಗಮನಾರ್ಹ ಬದಲಾವಣೆಗಳು",
    "mobile-alerts": "ಮೊಬೈಲ್ ಸಾಧನಗಳಲ್ಲಿ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ",
    "voice-announcements": "ಪ್ರಮುಖ ಅಪ್‌ಡೇಟ್‌ಗಳಿಗಾಗಿ ಧ್ವನಿ ಪ್ರಕಟಣೆಗಳು",
    "smart-hospital": "ರೋಗಿಯ ದತ್ತಾಂಶದ ಆಧಾರದ ಮೇಲೆ ಸ್ಮಾರ್ಟ್ ಆಸ್ಪತ್ರೆ ಆಯ್ಕೆ",
    "show-survival": "ಆಸ್ಪತ್ರೆಗಳಿಗೆ ನಿರೀಕ್ಷಿತ ಬದುಕುಳಿಯುವ ದರಗಳನ್ನು ತೋರಿಸಿ",
    "share-data": "ವ್ಯವಸ್ಥೆಯನ್ನು ಸುಧಾರಿಸಲು ಅನಾಮಧೇಯ ಡೇಟಾವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
    "performance-metrics": "ಸಮಗ್ರ ಕಾರ್ಯಕ್ಷಮತೆ ಮೆಟ್ರಿಕ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    "switch-themes": "ಲೈಟ್ ಮತ್ತು ಡಾರ್ಕ್ ಥೀಮ್‌ಗಳ ನಡುವೆ ಬದಲಾಯಿಸಿ",
    "enable-voice": "ಹ್ಯಾಂಡ್‌ಫ್ರೀ ಧ್ವನಿ ನಿಯಂತ್ರಣವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ",
    "sync-data": "ಸಾಧನಗಳ ನಡುವೆ ಡೇಟಾವನ್ನು ಸಿಂಕ್ ಮಾಡಿ",
  },
  
  hindi: {
    // Navigation
    "dashboard": "डैशबोर्ड",
    "live-route": "लाइव रूट",
    "hospitals": "अस्पताल",
    "reports": "रिपोर्ट्स",
    "settings": "सेटिंग्स",
    
    // Page Titles
    "ai-smart-ambulance-routing": "AI स्मार्ट एम्बुलेंस मार्गदर्शन",
    "emergency-route": "आपातकालीन मार्ग",
    "hospitals-near-you": "आपके पास के अस्पताल",
    
    // Patient Status
    "patient-status": "मरीज की स्थिति",
    "critical": "गंभीर",
    
    // Hospital Info
    "icu-availability": "ICU उपलब्धता",
    "total-icu-beds": "कुल ICU बेड",
    "view-all-hospitals": "सभी अस्पताल देखें",
    "navigate-to": "नेविगेट करें",
    "calling-hospital": "अस्पताल को कॉल कर रहे हैं",
    "connecting-to": "से जुड़ रहे हैं",
    
    // Upload Dataset
    "upload-dataset": "डेटासेट अपलोड करें",
    "dataset-ready": "डेटासेट तैयार है",
    "uploading": "अपलोड हो रहा है...",
    "dataset-uploaded-title": "डेटासेट सफलतापूर्वक अपलोड किया गया",
    "dataset-uploaded-desc": "फ़ाइल को संसाधित किया गया है और विश्लेषण के लिए तैयार है",
    
    // Settings
    "map-navigation-settings": "मैप और नेविगेशन सेटिंग्स",
    "notifications-alerts": "नोटिफिकेशन और अलर्ट",
    "performance-data": "प्रदर्शन और डेटा",
    "system-preferences": "सिस्टम प्राथमिकताएँ",
    "real-time-traffic-updates": "रीयल-टाइम ट्रैफिक अपडेट",
    "smart-rerouting": "स्मार्ट रीरूटिंग",
    "road-closure-alerts": "सड़क बंद होने के अलर्ट",
    "3d-map-visualization": "3D मैप विज़ुअलाइज़ेशन",
    "lane-guidance": "लेन गाइडेंस",
    "emergency-alerts": "आपातकालीन अलर्ट",
    "hospital-status-updates": "अस्पताल स्थिति अपडेट",
    "traffic-condition-alerts": "ट्रैफिक स्थिति अलर्ट",
    "push-notifications": "पुश नोटिफिकेशन",
    "audio-alerts": "ऑडियो अलर्ट",
    "ai-powered-recommendations": "AI-संचालित सिफारिशें",
    "survival-rate-prediction": "जीवित रहने की दर की भविष्यवाणी",
    "anonymous-data-sharing": "अनाम डेटा शेयरिंग",
    "detailed-analytics": "विस्तृत एनालिटिक्स",
    "dark-mode": "डार्क मोड",
    "voice-commands": "वॉइस कमांड",
    "data-sync": "डेटा सिंक",
    "language": "भाषा",
    "current-language": "वर्तमान",
    "units": "इकाइयाँ",
    "metric": "मेट्रिक",
    "imperial": "इम्पीरियल",
    "switch-to-light": "लाइट मोड में स्विच करें",
    "switch-to-dark": "डार्क मोड में स्विच करें",
    "change": "बदलें",
    
    // Themes
    "light": "लाइट",
    "dark": "डार्क",
    
    // Profile
    "edit-profile": "प्रोफाइल एडिट करें",
    "sign-out": "साइन आउट",
    
    // Common actions
    "search-hospitals": "अस्पतालों को खोजें या रूटिंग के लिए दुर्घटना स्थान दर्ज करें...",
    "receive-live-traffic": "इष्टतम रूटिंग के लिए लाइव ट्रैफिक डेटा प्राप्त करें",
    "auto-reroute": "तेज मार्ग उपलब्ध होने पर स्वचालित रूप से रीरूट करें",
    "get-road-closure": "अपने मार्ग पर बंद सड़कों के बारे में सूचित रहें",
    "show-3d-buildings": "3D में इमारतों और लैंडमार्क्स को दिखाएं",
    "show-lanes": "तेज नेविगेशन के लिए अनुशंसित लेन दिखाएं",
    "critical-alerts": "गंभीर मरीज और उच्च प्राथमिकता वाले अलर्ट",
    "bed-availability": "बेड उपलब्धता और प्रतीक्षा समय में परिवर्तन",
    "traffic-alerts": "ट्रैफिक स्थितियों में महत्वपूर्ण परिवर्तन",
    "mobile-alerts": "मोबाइल डिवाइस पर अलर्ट प्राप्त करें",
    "voice-announcements": "महत्वपूर्ण अपडेट के लिए वॉइस घोषणाएं",
    "smart-hospital": "मरीज के डेटा के आधार पर स्मार्ट अस्पताल चयन",
    "show-survival": "अस्पतालों के लिए अनुमानित जीवित रहने की दर दिखाएं",
    "share-data": "सिस्टम को बेहतर बनाने के लिए अनाम डेटा साझा करें",
    "performance-metrics": "व्यापक प्रदर्शन मेट्रिक्स देखें",
    "switch-themes": "लाइट और डार्क थीम के बीच स्विच करें",
    "enable-voice": "हैंड्स-फ्री वॉइस कंट्रोल सक्षम करें",
    "sync-data": "डिवाइसों के बीच डेटा सिंक करें",
  },
  
  tamil: {
    // Navigation
    "dashboard": "டாஷ்போர்டு",
    "live-route": "நேரடி வழி",
    "hospitals": "மருத்துவமனைகள்",
    "reports": "அறிக்கைகள்",
    "settings": "அமைப்புகள்",
    
    // Page Titles
    "ai-smart-ambulance-routing": "AI ஸ்மார்ட் ஆம்புலன்ஸ் வழித்தடம்",
    "emergency-route": "அவசர வழித்தடம்",
    "hospitals-near-you": "உங்களுக்கு அருகிலுள்ள மருத்துவமனைகள்",
    
    // Patient Status
    "patient-status": "நோயாளி நிலை",
    "critical": "கடுமையான",
    
    // Hospital Info
    "icu-availability": "ICU கிடைக்கும் தன்மை",
    "total-icu-beds": "மொத்த ICU படுக்கைகள்",
    "view-all-hospitals": "அனைத்து மருத்துவமனைகளையும் காண்க",
    "navigate-to": "வழிசெலுத்து",
    "calling-hospital": "மருத்துவமனைக்கு அழைக்கிறது",
    "connecting-to": "இணைக்கிறது",
    
    // Upload Dataset
    "upload-dataset": "தரவுத்தொகுப்பை பதிவேற்றுக",
    "dataset-ready": "தரவுத்தொகுப்பு தயார்",
    "uploading": "பதிவேற்றுகிறது...",
    "dataset-uploaded-title": "தரவுத்தொகுப்பு வெற்றிகரமாக பதிவேற்றப்பட்டது",
    "dataset-uploaded-desc": "கோப்பு செயலாக்கப்பட்டு பகுப்பாய்வுக்கு தயாராக உள்ளது",
    
    // Settings
    "map-navigation-settings": "வரைபட மற்றும் வழிசெலுத்தல் அமைப்புகள்",
    "notifications-alerts": "அறிவிப்புகள் மற்றும் எச்சரிக்கைகள்",
    "performance-data": "செயல்திறன் மற்றும் தரவு",
    "system-preferences": "கணினி விருப்பங்கள்",
    "real-time-traffic-updates": "நேரடி போக்குவரத்து புதுப்பிப்புகள்",
    "smart-rerouting": "ஸ்மார்ட் மறுவழிப்படுத்தல்",
    "road-closure-alerts": "சாலை மூடல் எச்சரிக்கைகள்",
    "3d-map-visualization": "3D வரைபட காட்சிப்படுத்தல்",
    "lane-guidance": "பாதை வழிகாட்டுதல்",
    "emergency-alerts": "அவசர எச்சரிக்கைகள்",
    "hospital-status-updates": "மருத்துவமனை நிலை புதுப்பிப்புகள்",
    "traffic-condition-alerts": "போக்குவரத்து நிலை எச்சரிக்கைகள்",
    "push-notifications": "புஷ் அறிவிப்புகள்",
    "audio-alerts": "ஒலி எச்சரிக்கைகள்",
    "ai-powered-recommendations": "AI-உந்தப்பட்ட பரிந்துரைகள்",
    "survival-rate-prediction": "உயிர் வாழும் விகித கணிப்பு",
    "anonymous-data-sharing": "அநாமதேய தரவு பகிர்வு",
    "detailed-analytics": "விரிவான பகுப்பாய்வு",
    "dark-mode": "டார்க் மோட்",
    "voice-commands": "குரல் கட்டளைகள்",
    "data-sync": "தரவு ஒத்திசைவு",
    "language": "மொழி",
    "current-language": "தற்போதைய",
    "units": "அலகுகள்",
    "metric": "மெட்ரிக்",
    "imperial": "இம்பீரியல்",
    "switch-to-light": "லைட் மோடுக்கு மாறவும்",
    "switch-to-dark": "டார்க் மோடுக்கு மாறவும்",
    "change": "மாற்று",
    
    // Themes
    "light": "வெளிச்சம்",
    "dark": "இருள்",
    
    // Profile
    "edit-profile": "சுயவிவரத்தைத் திருத்து",
    "sign-out": "வெளியேறு",
    
    // Common actions
    "search-hospitals": "மருத்துவமனைகளைத் தேடுங்கள் அல்லது வழிசெலுத்துவதற்கு விபத்து இடத்தை உள்ளிடவும்...",
    "receive-live-traffic": "சிறந்த வழிசெலுத்தலுக்கு நேரடி போக்குவரத்து தரவைப் பெறுங்கள்",
    "auto-reroute": "வேகமான பாதைகள் கிடைக்கும்போது தானாகவே மறுவழிப்படுத்தவும்",
    "get-road-closure": "உங்கள் பாதையில் மூடப்பட்ட சாலைகளைப் பற்றி அறிவிக்கப்படுங்கள்",
    "show-3d-buildings": "3D இல் கட்டிடங்கள் மற்றும் நிலக்குறிகளைக் காட்டு",
    "show-lanes": "வேகமான வழிசெலுத்தலுக்கு பரிந்துரைக்கப்பட்ட பாதைகளைக் காட்டு",
    "critical-alerts": "கடுமையான நோயாளி மற்றும் உயர் முன்னுரிமை எச்சரிக்கைகள்",
    "bed-availability": "படுக்கை கிடைக்கும் தன்மை மற்றும் காத்திருப்பு நேரங்களில் மாற்றங்கள்",
    "traffic-alerts": "போக்குவரத்து நிலைகளில் குறிப்பிடத்தக்க மாற்றங்கள்",
    "mobile-alerts": "மொபைல் சாதனங்களில் எச்சரிக்கைகளைப் பெறுங்கள்",
    "voice-announcements": "முக்கியமான புதுப்பிப்புகளுக்கான குரல் அறிவிப்புகள்",
    "smart-hospital": "நோயாளியின் தரவின் அடிப்படையில் ஸ்மார்ட் மருத்துவமனை தேர்வு",
    "show-survival": "மருத்துவமனைகளுக்கான கணிக்கப்பட்ட உயிர் வாழும் விகிதங்களைக் காட்டு",
    "share-data": "அமைப்பை மேம்படுத்த அநாமதேய தரவைப் பகிரவும்",
    "performance-metrics": "விரிவான செயல்திறன் அளவீடுகளைப் பார்க்கவும்",
    "switch-themes": "லைட் மற்றும் டார்க் தீம்களுக்கு இடையே மாறவும்",
    "enable-voice": "ஹேண்ட்ஸ்-ஃப்ரீ குரல் கட்டுப்பாட்டை இயக்கவும்",
    "sync-data": "சாதனங்களுக்கு இடையில் தரவை ஒத்திசைக்கவும்",
  },
  
  telugu: {
    // Navigation
    "dashboard": "డాష్‌బోర్డ్",
    "live-route": "లైవ్ రూట్",
    "hospitals": "ఆసుపత్రులు",
    "reports": "నివేదికలు",
    "settings": "సెట్టింగ్‌లు",
    
    // Page Titles
    "ai-smart-ambulance-routing": "AI స్మార్ట్ అంబులెన్స్ రూటింగ్",
    "emergency-route": "అత్యవసర మార్గం",
    "hospitals-near-you": "మీ దగ్గరలో ఉన్న ఆసుపత్రులు",
    
    // Patient Status
    "patient-status": "రోగి స్థితి",
    "critical": "క్రిటికల్",
    
    // Hospital Info
    "icu-availability": "ICU లభ్యత",
    "total-icu-beds": "మొత్తం ICU పడకలు",
    "view-all-hospitals": "అన్ని ఆసుపత్రులను వీక్షించండి",
    "navigate-to": "నేవిగేట్ చేయండి",
    "calling-hospital": "ఆసుపత్రికి కాల్ చేస్తోంది",
    "connecting-to": "కనెక్ట్ అవుతోంది",
    
    // Upload Dataset
    "upload-dataset": "డేటాసెట్‌ను అప్‌లోడ్ చేయండి",
    "dataset-ready": "డేటాసెట్ సిద్ధంగా ఉంది",
    "uploading": "అప్‌లోడ్ అవుతోంది...",
    "dataset-uploaded-title": "డేటాసెట్ విజయవంతంగా అప్‌లోడ్ చేయబడింది",
    "dataset-uploaded-desc": "ఫైల్ ప్రాసెస్ చేయబడింది మరియు విశ్లేషణకు సిద్ధంగా ఉంది",
    
    // Settings
    "map-navigation-settings": "మ్యాప్ & నావిగేషన్ సెట్టింగ్‌లు",
    "notifications-alerts": "నోటిఫికేషన్‌లు & అలర్ట్‌లు",
    "performance-data": "పనితీరు & డేటా",
    "system-preferences": "సిస్టమ్ ప్రిఫరెన్సెస్",
    "real-time-traffic-updates": "రియల్-టైమ్ ట్రాఫిక్ అప్‌డేట్‌లు",
    "smart-rerouting": "స్మార్ట్ రీరూటింగ్",
    "road-closure-alerts": "రోడ్ మూసివేత అలర్ట్‌లు",
    "3d-map-visualization": "3D మ్యాప్ విజువలైజేషన్",
    "lane-guidance": "లేన్ గైడెన్స్",
    "emergency-alerts": "అత్యవసర అలర్ట్‌లు",
    "hospital-status-updates": "ఆసుపత్రి స్థితి అప్‌డేట్‌లు",
    "traffic-condition-alerts": "ట్రాఫిక్ పరిస్థితి అలర్ట్‌లు",
    "push-notifications": "పుష్ నోటిఫికేషన్‌లు",
    "audio-alerts": "ఆడియో అలర్ట్‌లు",
    "ai-powered-recommendations": "AI-ఆధారిత సిఫార్సులు",
    "survival-rate-prediction": "సర్వైవల్ రేట్ ప్రెడిక్షన్",
    "anonymous-data-sharing": "అనానిమస్ డేటా షేరింగ్",
    "detailed-analytics": "వివరణాత్మక విశ్లేషణలు",
    "dark-mode": "డార్క్ మోడ్",
    "voice-commands": "వాయిస్ కమాండ్‌లు",
    "data-sync": "డేటా సింక్",
    "language": "భాష",
    "current-language": "ప్రస్తుతం",
    "units": "యూనిట్లు",
    "metric": "మెట్రిక్",
    "imperial": "ఇంపీరియల్",
    "switch-to-light": "లైట్ మోడ్‌కి మారండి",
    "switch-to-dark": "డార్క్ మోడ్‌కి మారండి",
    "change": "మార్చు",
    
    // Themes
    "light": "లైట్",
    "dark": "డార్క్",
    
    // Profile
    "edit-profile": "ప్రొఫైల్‌ని సవరించండి",
    "sign-out": "సైన్ అవుట్",
    
    // Common actions
    "search-hospitals": "ఆసుపత్రులను శోధించండి లేదా రూటింగ్ కోసం ప్రమాద స్థలాన్ని నమోదు చేయండి...",
    "receive-live-traffic": "అత్యుత్తమ రూటింగ్ కోసం లైవ్ ట్రాఫిక్ డేటాను స్వీకరించండి",
    "auto-reroute": "వేగవంతమైన మార్గాలు అందుబాటులో ఉన్నప్పుడు స్వయంచాలకంగా రీరూట్ చేయండి",
    "get-road-closure": "మీ మార్గంలో మూసివేసిన రోడ్ల గురించి తెలియజేయబడండి",
    "show-3d-buildings": "3D లో భవనాలు మరియు ల్యాండ్‌మార్క్‌లను చూపించు",
    "show-lanes": "వేగవంతమైన నావిగేషన్ కోసం సిఫార్సు చేయబడిన లేన్‌లను చూపించండి",
    "critical-alerts": "క్రిటికల్ పేషెంట్ మరియు అధిక ప్రాధాన్యత అలర్ట్‌లు",
    "bed-availability": "బెడ్ లభ్యత మరియు వేచి ఉండే సమయాల్లో మార్పులు",
    "traffic-alerts": "ట్రాఫిక్ పరిస్థితుల్లో గణనీయమైన మార్పులు",
    "mobile-alerts": "మొబైల్ పరికరాలలో అలర్ట్‌లను స్వీకరించండి",
    "voice-announcements": "కీలక అప్‌డేట్‌ల కోసం వాయిస్ ప్రకటనలు",
    "smart-hospital": "పేషెంట్ డేటా ఆధారంగా స్మార్ట్ ఆసుపత్రి ఎంపిక",
    "show-survival": "ఆసుపత్రుల కోసం అంచనా వేయబడిన సర్వైవల్ రేట్‌లను చూపించండి",
    "share-data": "సిస్టమ్‌ను మెరుగుపరచడానికి అనానిమస్ డేటాను షేర్ చేయండి",
    "performance-metrics": "సమగ్ర పనితీరు కొలమానాలను వీక్షించండి",
    "switch-themes": "లైట్ మరియు డార్క్ థీమ్‌ల మధ్య మారండి",
    "enable-voice": "హ్యాండ్స్-ఫ్రీ వాయిస్ కంట్రోల్‌ను ప్రారంభించండి",
    "sync-data": "పరికరాల మధ్య డేటాను సింక్ చేయండి",
  }
};

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create language context
const LanguageContext = createContext<LanguageContextType>({
  language: "english",
  setLanguage: () => {},
  t: (key: string) => key,
});

// Language provider component
export function LanguageProvider({
  children,
  defaultLanguage = "english",
  storageKey = "app-language",
}: {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
}) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage
  );

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, language);
  }, [language, storageKey]);

  // Translate function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Context value
  const value = {
    language,
    setLanguage: (lang: Language) => {
      setLanguage(lang);
    },
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
