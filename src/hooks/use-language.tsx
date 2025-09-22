import { createContext, useContext, useEffect, useState } from "react";

// ----------------------------
// Define available languages
// ----------------------------
export type Language = "english" | "hindi" | "kannada" | "tamil" | "telugu" | "ml";

// ----------------------------
// Translation dictionaries
// ----------------------------

// English translations
const baseEnglish: Record<string, string> = {
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
  "rapid": "RAPID",
  "aid": "AID",
  "innovators": "INNOVATORS",
  "smart-routing": "Smart AI Ambulance Routing for Life-Saving Response!",
  "what-we-do": "What We Do",
  "ai-route-finding": "AI-powered system finds the fastest routes for ambulances through traffic",
  "bed-availability": "Real-time hospital bed availability tracking",
  "save-minutes": "Helps save precious minutes during emergencies",
  "every-second-counts": "Every second counts when saving lives!",
  "get-started": "Get Started",
  "dashboard": "Dashboard",
  "search-hospitals": "Search Hospitals",
  "patient-entry": "Patient Entry",
  "map-view": "Map View",
  "analysis": "Analysis",
  "nearby-icu": "Nearby ICU Availability",
  "emergency-alerts": "Emergency Alerts",
  "live-route": "Live Route Mapping",
  "real-time-analytics": "Real-Time Analytics",
  "icu-status": "ICU Status",
  "response-time": "Response Time",
  "cases": "Cases",
  "patient-emergency": "Patient & Emergency Details",
  "patient-location": "Patient Location",
  "selected-hospital": "Selected Hospital",
  "transport-mode": "Transport Mode",
  "ground": "Ground",
  "air": "Air",
  "dispatch": "Dispatch Emergency Response",
  "network-active": "Network Active",
};

// Tamil translations
const ta: Record<string, string> = {
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
  "rapid": "ராபிட்",
  "aid": "எய்ட்",
  "innovators": "இன்னோவேட்டர்ஸ்",
  "smart-routing": "உயிர் காக்கும் பதிலளிப்புக்கான ஸ்மார்ட் AI ஆம்புலன்ஸ் வழிசெலுத்தல்!",
  "what-we-do": "நாங்கள் என்ன செய்கிறோம்",
  "ai-route-finding": "AI-செயல்படுத்தப்பட்ட அமைப்பு ஆம்புலன்ஸ்களுக்கு போக்குவரத்து வழியாக வேகமான பாதைகளைக் கண்டறிகிறது",
  "bed-availability": "நிகழ்நேர மருத்துவமனை படுக்கை இருப்பு கண்காணிப்பு",
  "save-minutes": "அவசரகாலங்களில் விலைமதிப்பற்ற நிமிடங்களை சேமிக்க உதவுகிறது",
  "every-second-counts": "உயிர்களை காப்பாற்றும் போது ஒவ்வொரு வினாடியும் முக்கியம்!",
  "get-started": "தொடங்கவும்",
  "dashboard": "டாஷ்போர்டு",
  "search-hospitals": "மருத்துவமனைகளைத் தேடுங்கள்",
  "patient-entry": "நோயாளி உள்ளீடு",
  "map-view": "வரைபடக் காட்சி",
  "analysis": "பகுப்பாய்வு",
  "nearby-icu": "அருகிலுள்ள ICU இருப்பு",
  "emergency-alerts": "அவசர எச்சரிக்கைகள்",
  "live-route": "நேரடி பாதை வரைபடம்",
  "real-time-analytics": "நிகழ்நேர பகுப்பாய்வு",
  "icu-status": "ICU நிலை",
  "response-time": "பதிலளிப்பு நேரம்",
  "cases": "வழக்குகள்",
  "patient-emergency": "நோயாளி மற்றும் அவசர விவரங்கள்",
  "patient-location": "நோயாளி இருப்பிடம்",
  "selected-hospital": "தேர்ந்தெடுக்கப்பட்ட மருத்துவமனை",
  "transport-mode": "போக்குவரத்து முறை",
  "ground": "தரை",
  "air": "காற்று",
  "dispatch": "அவசர பதிலளிப்பை அனுப்பவும்",
  "network-active": "நெட்வொர்க் செயலில் உள்ளது",
};

// Hindi translations
const hi: Record<string, string> = {
  "ai-smart-ambulance-routing": "एआई स्मार्ट एंबुलेंस रूटिंग",
  "emergency-route": "आपातकालीन मार्ग अनुकूलन प्रणाली",
  "geographic-incident-distribution": "भौगोलिक घटना वितरण",
  "icu-bed-occupancy": "आईसीयू बेड अधिभोग",
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
  "patient-survival-rate": "अस्पताल द्वारा रोगी उत्तरजीविता दर",
  "emergency-response-time": "आपातकालीन प्रतिक्रिया समय",
  "incidents-by-category": "श्रेणी द्वारा घटनाएँ",
  "icu-occupancy-forecast": "आईसीयू अधिभोग पूर्वानुमान",
  "receive-live-traffic": "लाइव ट्रैफिक प्राप्त करें",
  "rapid": "तेज़",
  "aid": "सहायता",
  "innovators": "नवप्रवर्तक",
  "smart-routing": "जीवन रक्षक प्रतिक्रिया के लिए स्मार्ट एआई एंबुलेंस रूटिंग!",
  "what-we-do": "हम क्या करते हैं",
  "ai-route-finding": "एआई-संचालित सिस्टम एंबुलेंस के लिए सबसे तेज़ मार्ग ढूंढता है",
  "bed-availability": "असली समय में अस्पताल बिस्तर उपलब्धता ट्रैकिंग",
  "save-minutes": "आपातकाल में बहुमूल्य मिनट बचाने में मदद करता है",
  "every-second-counts": "जीवन बचाने में हर सेकंड महत्वपूर्ण है!",
  "get-started": "शुरू करें",
  "dashboard": "डैशबोर्ड",
  "search-hospitals": "अस्पताल खोजें",
  "patient-entry": "रोगी प्रविष्टि",
  "map-view": "मानचित्र दृश्य",
  "analysis": "विश्लेषण",
  "nearby-icu": "निकटतम आईसीयू उपलब्धता",
  "emergency-alerts": "आपातकालीन अलर्ट",
  "live-route": "लाइव मार्ग मानचित्रण",
  "real-time-analytics": "रीयल-टाइम एनालिटिक्स",
  "icu-status": "आईसीयू स्थिति",
  "response-time": "प्रतिक्रिया समय",
  "cases": "मामले",
  "patient-emergency": "रोगी और आपातकालीन विवरण",
  "patient-location": "रोगी स्थान",
  "selected-hospital": "चयनित अस्पताल",
  "transport-mode": "परिवहन का साधन",
  "ground": "स्थलीय",
  "air": "वायु",
  "dispatch": "आपातकालीन प्रतिक्रिया भेजें",
  "network-active": "नेटवर्क सक्रिय",
};

// Kannada translations
const kn: Record<string, string> = {
  "ai-smart-ambulance-routing": "AI ಸ್ಮಾರ್ಟ್ ಅಮ್ಬ್ಯುಲೆನ್ಸ್ ಮಾರ್ಗದರ್ಶನ",
  "emergency-route": "ತುರ್ತು ಮಾರ್ಗ ಆಪ್ಟಿಮೈಸೇಶನ್ ವ್ಯವಸ್ಥೆ",
  "geographic-incident-distribution": "ಭೌಗೋಳಿಕ ಘಟನೆ ವಿತರಣೆ",
  "icu-bed-occupancy": "ICU ಹಾಸಿಗೆ ಭರ್ತಿಯ ಪ್ರಮಾಣ",
  "hospital-wait-times": "ಆಸ್ಪತ್ರೆ ಕಾಯುವ ಸಮಯ",
  "north-bangalore": "ಉತ್ತರ ಬ್ಯಾಂಗ್ಲೂರು",
  "central-bangalore": "ಮಧ್ಯ ಬ್ಯಾಂಗ್ಲೂರು",
  "south-bangalore": "ದಕ್ಷಿಣ ಬ್ಯಾಂಗ್ಲೂರು",
  "east-bangalore": "ಪೂರ್ವ ಬ್ಯಾಂಗ್ಲೂರು",
  "west-bangalore": "ಪಶ್ಚಿಮ ಬ್ಯಾಂಗ್ಲೂರು",
  "available-beds": "ಲಭ್ಯವಿರುವ ಹಾಸಿಗೆಗಳು",
  "total-beds": "ಒಟ್ಟು ಹಾಸಿಗೆಗಳು",
  "network-connection-issues": "ನೆಟ್‌ವರ್ಕ್ ಸಂಪರ್ಕ ಸಮಸ್ಯೆಗಳು",
  "partial-network-connection": "ಭಾಗಶಃ ನೆಟ್‌ವರ್ಕ್ ಸಂಪರ್ಕ",
  "medical-response-analytics": "ವೈದ್ಯಕೀಯ ಪ್ರತಿಕ್ರಿಯಾ ವಿಶ್ಲೇಷಣೆ",
  "patient-survival-rate": "ಆಸ್ಪತ್ರೆ ಪ್ರತಿ ರೋಗಿಯ ಬದುಕು ಉಳಿಸುವ ಪ್ರಮಾಣ",
  "emergency-response-time": "ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ",
  "incidents-by-category": "ವರ್ಗದ ಮೂಲಕ ಘಟನೆಗಳು",
  "icu-occupancy-forecast": "ICU ಹಾಸಿಗೆ ಭರ್ತಿಯ ಮುನ್ಸೂಚನೆ",
  "receive-live-traffic": "ಪ್ರತಿಕ್ರಿಯಾತ್ಮಕ ಸಂಚಾರ ಪಡೆಯಿರಿ",
  "rapid": "ವೇಗವಾಗಿ",
  "aid": "ಸಹಾಯ",
  "innovators": "ನವೋದ್ಯಮಿಗಳು",
  "smart-routing": "ಜೀವನ ರಕ್ಷಿಸುವ ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಸ್ಮಾರ್ಟ್ AI ಅಮ್ಬುಲೆನ್ಸ್ ಮಾರ್ಗದರ್ಶನ!",
  "what-we-do": "ನಾವು ಏನು ಮಾಡುತ್ತೇವೆ",
  "ai-route-finding": "AI ಚಾಲಿತ ವ್ಯವಸ್ಥೆ ಆಂಬುಲೆನ್ಸ್‌ಗಳಿಗೆ ವೇಗದ ಮಾರ್ಗಗಳನ್ನು ಕಂಡುಹಿಡಿಯುತ್ತದೆ",
  "bed-availability": "ನಿರಂತರ ಆಸ್ಪತ್ರೆ ಹಾಸಿಗೆ ಲಭ್ಯತೆ ಟ್ರ್ಯಾಕಿಂಗ್",
  "save-minutes": "ತುರ್ತು ಸಂದರ್ಭಗಳಲ್ಲಿ ಅಮೂಲ್ಯ ನಿಮಿಷಗಳನ್ನು ಉಳಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ",
  "every-second-counts": "ಜೀವನ ಉಳಿಸಲು ಪ್ರತಿ ಸೆಕೆಂಡ್ ಮುಖ್ಯವಾಗಿದೆ!",
  "get-started": "ಪ್ರಾರಂಭಿಸಿ",
  "dashboard": "ಡ್ಯಾಶ್ಬೋರ್ಡ್",
  "search-hospitals": "ಆಸ್ಪತ್ರೆ ಹುಡುಕಿ",
  "patient-entry": "ರೋಗಿಯ ನಮೂದಿಸಿ",
  "map-view": "ನಕ್ಷೆ ವೀಕ್ಷಣೆ",
  "analysis": "ವಿಶ್ಲೇಷಣೆ",
  "nearby-icu": "ಹತ್ತಿರದ ICU ಲಭ್ಯತೆ",
  "emergency-alerts": "ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳು",
  "live-route": "ಲೈವ್ ಮಾರ್ಗ ನಕ್ಷೆ",
  "real-time-analytics": "ರಿಯಲ್-ಟೈಮ್ ವಿಶ್ಲೇಷಣೆ",
  "icu-status": "ICU ಸ್ಥಿತಿ",
  "response-time": "ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ",
  "cases": "ಘಟನೆಗಳು",
  "patient-emergency": "ರೋಗಿ ಮತ್ತು ತುರ್ತು ವಿವರಗಳು",
  "patient-location": "ರೋಗಿಯ ಸ್ಥಳ",
  "selected-hospital": "ಆಯ್ದ ಆಸ್ಪತ್ರೆ",
  "transport-mode": " ಸಾರಿಗೆ ವಿಧಾನ",
  "ground": "ಭೂಮಿಯ",
  "air": "ಗಾಳಿಯ",
  "dispatch": "ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಕಳುಹಿಸಿ",
  "network-active": "ನೆಟ್‌ವರ್ಕ್ ಸಕ್ರಿಯವಾಗಿದೆ",
};

// Telugu translations
const te: Record<string, string> = {
  "ai-smart-ambulance-routing": "AI స్మార్ట్ అంబులెన్స్ రూటింగ్",
  "emergency-route": "అత్యవసర మార్గ ఆప్టిమైజేషన్ సిస్టమ్",
  "geographic-incident-distribution": "భౌగోళిక ఘటన పంపిణీ",
  "icu-bed-occupancy": "ICU బెడ్ ఆక్యుపెన్సీ",
  "hospital-wait-times": "ఆసుపత్రి వేచి ఉన్న సమయాలు",
  "north-bangalore": "ఉత్తరం బెంగళూరు",
  "central-bangalore": "మధ్య బెంగళూరు",
  "south-bangalore": "దక్షిణ బెంగళూరు",
  "east-bangalore": "తూర్పు బెంగళూరు",
  "west-bangalore": "పశ్చిమ బెంగళూరు",
  "available-beds": "అందుబాటులో ఉన్న పడకలు",
  "total-beds": "మొత్తం పడకలు",
  "network-connection-issues": "నెట్‌వర్క్ కనెక్షన్ సమస్యలు",
  "partial-network-connection": "పాక్షిక నెట్‌వర్క్ కనెక్షన్",
  "medical-response-analytics": "మెడికల్ రెస్పాన్స్ విశ్లేషణ",
  "patient-survival-rate": "ఆసుపత్రి ద్వారా రోగి సర్వైవల్ రేటు",
  "emergency-response-time": "అత్యవసర స్పందన సమయం",
  "incidents-by-category": "వర్గం వారీగా ఘటనలు",
  "icu-occupancy-forecast": "ICU ఆక్యుపెన్సీ ఫోర్కాస్ట్",
  "receive-live-traffic": "లైవ్ ట్రాఫిక్ పొందండి",
  "rapid": "వేగంగా",
  "aid": "సహాయం",
  "innovators": "ఇన్నోవేటర్స్",
  "smart-routing": "జీవనాన్ని రక్షించే స్పందన కోసం స్మార్ట్ AI అంబులెన్స్ రూటింగ్!",
  "what-we-do": "మేము ఏమి చేస్తాము",
  "ai-route-finding": "AI-చాలిత సిస్టమ్ అంబులెన్స్ కోసం వేగవంతమైన మార్గాలను కనుగొంటుంది",
  "bed-availability": "రియల్ టైమ్ ఆసుపత్రి పడకల అందుబాటును ట్రాక్ చేస్తుంది",
  "save-minutes": "అత్యవసర సమయంలో విలువైన నిమిషాలను సేవ్ చేయడంలో సహాయపడుతుంది",
  "every-second-counts": "జీవులను రక్షించడంలో ప్రతి సెకన్ ముఖ్యం!",
  "get-started": "ప్రారంభించండి",
  "dashboard": "డాష్‌బోర్డ్",
  "search-hospitals": "ఆసుపత్రులను వెతకండి",
  "patient-entry": "రోగి నమోదు",
  "map-view": "నక్శా వీక్షణ",
  "analysis": "విశ్లేషణ",
  "nearby-icu": "నికటంలోని ICU అందుబాటు",
  "emergency-alerts": "అత్యవసర అలర్ట్స్",
  "live-route": "లైవ్ మార్గం మ్యాపింగ్",
  "real-time-analytics": "రియల్ టైమ్ విశ్లేషణ",
  "icu-status": "ICU స్థితి",
  "response-time": "స్పందన సమయం",
  "cases": "కేసులు",
  "patient-emergency": "రోగి & అత్యవసర వివరాలు",
  "patient-location": "రోగి స్థానం",
  "selected-hospital": "ఎంచుకున్న ఆసుపత్రి",
  "transport-mode": "రవాణా మోడ్",
  "ground": "భూలోకం",
  "air": "వాయు",
  "dispatch": "అత్యవసర స్పందన పంపండి",
  "network-active": "నెట్‌వర్క్ యాక్టివ్",
};

// Malayalam
const ml: Record<string, string> = {
  "ai-smart-ambulance-routing": "AI സ്മാർട്ട് ആംബുലൻസ് റൂട്ടിംഗ്",
  "emergency-route": "അപകടമാർഗ്ഗ ഒപ്റ്റിമൈസേഷൻ സിസ്റ്റം",
  "geographic-incident-distribution": "ഭൗമിക സംഭവം വിതരണ",
  "icu-bed-occupancy": "ICU ബെഡ് ഓക്കുപൻസി",
  "hospital-wait-times": "ആസ്പത്രി കാത്തിരിക്കാനുള്ള സമയം",
  "north-bangalore": "വടക്കൻ ബെംഗളൂർ",
  "central-bangalore": "മദ്ധ്യ ബെംഗളൂർ",
  "south-bangalore": "ദക്ഷിണ ബെംഗളൂർ",
  "east-bangalore": "കിഴക്ക് ബെംഗളൂർ",
  "west-bangalore": "പശ്ചിമ ബെംഗളൂർ",
  "available-beds": "ലഭ്യമായ ബെഡുകൾ",
  "total-beds": "മൊത്തം ബെഡുകൾ",
  "network-connection-issues": "നെറ്റ്‌വർക്ക് കണക്ഷൻ പ്രശ്‌നങ്ങൾ",
  "partial-network-connection": "ഭാഗിക നെറ്റ്‌വർക്ക് കണക്ഷൻ",
  "medical-response-analytics": "മെഡിക്കൽ പ്രതികരണ വിശകലനം",
  "patient-survival-rate": "ആസ്പത്രി വഴി രോഗിയുടെ ജീവിച്ചിരിപ്പിൻ നിരക്ക്",
  "emergency-response-time": "അപകട പ്രതികരണ സമയം",
  "incidents-by-category": "വിഭാഗംപ്രകാരം സംഭവങ്ങൾ",
  "icu-occupancy-forecast": "ICU ഓക്കുപൻസി പ്രവചനം",
  "receive-live-traffic": "ലൈവ് ട്രാഫിക് സ്വീകരിക്കുക",
  "rapid": "വേഗം",
  "aid": "സഹായം",
  "innovators": "ഇന്നോവേറ്റേഴ്സ്",
  "smart-routing": "ജീവനൻ രക്ഷയുള്ള പ്രതികരണത്തിനായുള്ള സ്മാർട്ട് AI ആംബുലൻസ് റൂട്ടിംഗ്!",
  "what-we-do": "ഞങ്ങൾ ചെയ്യുന്നത്",
  "ai-route-finding": "AI സിസ്റ്റം ആംബുലൻസിന് വേഗത്തിലുള്ള മാർഗ്ഗങ്ങൾ കണ്ടെത്തുന്നു",
  "bed-availability": "റിയൽ ടൈം ആശുപത്രി ബെഡ് ലഭ്യത ട്രാക്കിംഗ്",
  "save-minutes": "അപകട സമയത്ത് വിലപ്പെട്ട മിനിറ്റ് സംരക്ഷിക്കാൻ സഹായിക്കുന്നു",
  "every-second-counts": "ജീവൻ രക്ഷിക്കാൻ ഓരോ സെക്കൻഡും വിലയുള്ളതാണ്!",
  "get-started": "ആരംഭിക്കുക",
  "dashboard": "ഡാഷ്ബോർഡ്",
  "search-hospitals": "ആസ്പത്രി അന്വേഷിക്കുക",
  "patient-entry": "രോഗി എൻട്രി",
  "map-view": "മാപ്പ് കാഴ്ച",
  "analysis": "വിശകലനം",
  "nearby-icu": "അടുത്തുള്ള ICU ലഭ്യത",
  "emergency-alerts": "അപകട അലർട്ടുകൾ",
  "live-route": "ലൈവ് മാർഗ്ഗം",
  "real-time-analytics": "റിയൽ ടൈം വിശകലനം",
  "icu-status": "ICU സ്ഥിതി",
  "response-time": "പ്രതികരണ സമയം",
  "cases": "കേസുകൾ",
  "patient-emergency": "രോഗിയും അപകട വിവരങ്ങളും",
  "patient-location": "രോഗി സ്ഥലം",
  "selected-hospital": "തിരഞ്ഞെടുത്ത ആശുപത്രി",
  "transport-mode": "ഗതാഗത മോഡ്",
  "ground": "നില",
  "air": "വായു",
  "dispatch": "അപകട പ്രതികരണം അയയ്ക്കുക",
  "network-active": "നെറ്റ്‌വർക്ക് സജീവമാണ്",
};

// ----------------------------
// Context
// ----------------------------
interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

// ----------------------------
// Provider
// ----------------------------
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("english");

  const getTranslation = (key: string): string => {
    switch (language) {
      case "english":
        return baseEnglish[key] || key;
      case "tamil":
        return ta[key] || key;
      case "hindi":
        return hi[key] || key;
      case "kannada":
        return kn[key] || key;
      case "telugu":
        return te[key] || key;
      case "ml":
        return ml[key] || key;
      default:
        return key;
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: getTranslation }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// ----------------------------
// Hook
// ----------------------------
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
