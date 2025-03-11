
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
    "critical": "Critical",
    // Hospital Info
    "icu-availability": "ICU Availability",
    "total-icu-beds": "Total ICU Beds",
    "view-all-hospitals": "View All Hospitals",
    "navigate": "Navigate to",
    "calling": "Calling Hospital",
    "connecting": "Connecting to",
    // Upload Dataset
    "upload-dataset": "Upload Dataset",
    "dataset-ready": "Dataset Ready",
    "uploading": "Uploading...",
    "dataset-uploaded-title": "Dataset Uploaded Successfully",
    "dataset-uploaded-desc": "File processed and ready for analysis",
    "dataset-reset-title": "Dataset Reset",
    "dataset-reset-desc": "Analysis data has been reset",
    "dataset-options": "Dataset Options",
    "dataset-options-desc": "Manage your uploaded dataset",
    "analysis-active": "Analysis is currently active",
    "reset-analysis": "Reset Analysis",
    // Settings Page
    "system-preferences": "System Preferences",
    "language": "Language",
    "units": "Units",
    "metric": "Metric",
    "imperial": "Imperial",
    "map-navigation-settings": "Map & Navigation Settings",
    "real-time-traffic-updates": "Real-time Traffic Updates",
    "smart-rerouting": "Smart Rerouting",
    "auto-reroute": "Automatically reroute around traffic and closures",
    "road-closure-alerts": "Road Closure Alerts",
    "get-road-closure": "Get notified about road closures and incidents",
    "3d-map-visualization": "3D Map Visualization",
    "show-3d-buildings": "Show 3D buildings and landmarks on the map",
    "lane-guidance": "Lane Guidance",
    "show-lanes": "Show lane guidance during navigation",
    "notifications-alerts": "Notifications & Alerts",
    "emergency-alerts": "Emergency Alerts",
    "critical-alerts": "Receive critical emergency alerts",
    "hospital-status-updates": "Hospital Status Updates",
    "bed-availability": "Get updates on bed availability",
    "traffic-condition-alerts": "Traffic Condition Alerts",
    "traffic-alerts": "Receive alerts about traffic conditions",
    "push-notifications": "Push Notifications",
    "mobile-alerts": "Receive alerts on your mobile device",
    "audio-alerts": "Audio Alerts",
    "voice-announcements": "Enable voice announcements for alerts",
    "performance-data": "Performance & Data",
    "ai-powered-recommendations": "AI-Powered Recommendations",
    "smart-hospital": "Get smart hospital recommendations",
    "survival-rate-prediction": "Survival Rate Prediction",
    "show-survival": "Show survival rate predictions",
    "anonymous-data-sharing": "Anonymous Data Sharing",
    "share-data": "Share anonymous data to improve the app",
    "detailed-analytics": "Detailed Analytics",
    "performance-metrics": "Track performance metrics",
    // Profile Page
    "profile": "Profile",
    "email": "Email",
    "role": "Role",
    "location": "Location",
    "edit-profile": "Edit Profile",
    "sign-out": "Sign Out",
    "signed-out": "Signed Out",
    "signed-out-success": "You have been successfully signed out",
    // Search Page
    "search-hospitals": "Search Hospitals...",
    // Map Page
    // Welcome Page
    "welcome-title": "Welcome to MedResponse",
    "welcome-description": "Your AI-powered emergency response assistant",
    "get-started": "Get Started",
    // Not Found Page
    "page-not-found": "Page Not Found",
    "go-home": "Go Home",
    // Regions
    "north-bangalore": "North Bangalore",
    "central-bangalore": "Central Bangalore",
    "south-bangalore": "South Bangalore",
    "east-bangalore": "East Bangalore",
    "west-bangalore": "West Bangalore",
    
    // Network status
    "partial-network-connection": "Partial Network Connection",
    "network-connection-issues": "Network Connection Issues",
    
    // Chart titles and labels
    "geographic-incident-distribution": "Geographic Incident Distribution",
    "icu-bed-occupancy": "ICU Bed Occupancy",
    "hospital-wait-times": "Hospital Wait Times",
    "available-beds": "Available Beds",
    "total-beds": "Total Beds",
  },
  
  kannada: {
    // Navigation
    "dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "live-route": "ಲೈವ್ ಮಾರ್ಗ",
    "hospitals": "ಆಸ್ಪತ್ರೆಗಳು",
    "reports": "ವರದಿಗಳು",
    "settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    // Page Titles
    "ai-smart-ambulance-routing": "AI ಸ್ಮಾರ್ಟ್ ಅಂಬುಲೆನ್ಸ್ ರೂಟಿಂಗ್",
    "emergency-route": "ತುರ್ತು ಮಾರ್ಗ",
    "hospitals-near-you": "ನಿಮ್ಮ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು",
    // Patient Status
    "patient-status": "ರೋಗಿಯ ಸ್ಥಿತಿ",
    "critical": "ನಿರ್ಣಾಯಕ",
    // Hospital Info
    "icu-availability": "ಐಸಿಯು ಲಭ್ಯತೆ",
    "total-icu-beds": "ಒಟ್ಟು ಐಸಿಯು ಹಾಸಿಗೆಗಳು",
    "view-all-hospitals": "ಎಲ್ಲಾ ಆಸ್ಪತ್ರೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    "navigate": "ನ್ಯಾವಿಗೇಟ್ ಮಾಡಲು",
    "calling": "ಆಸ್ಪತ್ರೆಗೆ ಕರೆ ಮಾಡಲಾಗುತ್ತಿದೆ",
    "connecting": "ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ",
    // Upload Dataset
    "upload-dataset": "ಡೇಟಾಸೆಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "dataset-ready": "ಡೇಟಾಸೆಟ್ ಸಿದ್ಧವಾಗಿದೆ",
    "uploading": "ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    "dataset-uploaded-title": "ಡೇಟಾಸೆಟ್ ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ",
    "dataset-uploaded-desc": "ಫೈಲ್ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗಿದೆ ಮತ್ತು ವಿಶ್ಲೇಷಣೆಗೆ ಸಿದ್ಧವಾಗಿದೆ",
    "dataset-reset-title": "ಡೇಟಾಸೆಟ್ ಮರುಹೊಂದಿಸಿ",
    "dataset-reset-desc": "ವಿಶ್ಲೇಷಣೆ ಡೇಟಾವನ್ನು ಮರುಹೊಂದಿಸಲಾಗಿದೆ",
    "dataset-options": "ಡೇಟಾಸೆಟ್ ಆಯ್ಕೆಗಳು",
    "dataset-options-desc": "ನಿಮ್ಮ ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಡೇಟಾಸೆಟ್ ಅನ್ನು ನಿರ್ವಹಿಸಿ",
    "analysis-active": "ವಿಶ್ಲೇಷಣೆ ಪ್ರಸ್ತುತ ಸಕ್ರಿಯವಾಗಿದೆ",
    "reset-analysis": "ವಿಶ್ಲೇಷಣೆಯನ್ನು ಮರುಹೊಂದಿಸಿ",
    // Settings Page
    "system-preferences": "ಸಿಸ್ಟಮ್ ಆದ್ಯತೆಗಳು",
    "language": "ಭಾಷೆ",
    "units": "ಘಟಕಗಳು",
    "metric": "ಮೆಟ್ರಿಕ್",
    "imperial": "ಸಾಮ್ರಾಜ್ಯಶಾಹಿ",
    "map-navigation-settings": "ನಕ್ಷೆ ಮತ್ತು ನ್ಯಾವಿಗೇಷನ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "real-time-traffic-updates": "ನೈಜ-ಸಮಯದ ಟ್ರಾಫಿಕ್ ನವೀಕರಣಗಳು",
    "receive-live-traffic": "ವೇಗವಾದ ಮಾರ್ಗಗಳಿಗಾಗಿ ಲೈವ್ ಟ್ರಾಫಿಕ್ ನವೀಕರಣಗಳನ್ನು ಸ್ವೀಕರಿಸಿ",
    "smart-rerouting": "ಸ್ಮಾರ್ಟ್ ಮರುರೂಟಿಂಗ್",
    "auto-reroute": "ಟ್ರಾಫಿಕ್ ಮತ್ತು ಮುಚ್ಚುವಿಕೆಗಳ ಸುತ್ತಲೂ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಮರುರೂಟ್ ಮಾಡಿ",
    "road-closure-alerts": "ರಸ್ತೆ ಮುಚ್ಚುವ ಎಚ್ಚರಿಕೆಗಳು",
    "get-road-closure": "ರಸ್ತೆ ಮುಚ್ಚುವಿಕೆಗಳು ಮತ್ತು ಘಟನೆಗಳ ಬಗ್ಗೆ ಸೂಚನೆ ಪಡೆಯಿರಿ",
    "3d-map-visualization": "3D ನಕ್ಷೆ ದೃಶ್ಯೀಕರಣ",
    "show-3d-buildings": "ನಕ್ಷೆಯಲ್ಲಿ 3D ಕಟ್ಟಡಗಳು ಮತ್ತು ಹೆಗ್ಗುರುತುಗಳನ್ನು ತೋರಿಸಿ",
    "lane-guidance": "ಲೇನ್ ಮಾರ್ಗದರ್ಶನ",
    "show-lanes": "ನ್ಯಾವಿಗೇಷನ್ ಸಮಯದಲ್ಲಿ ಲೇನ್ ಮಾರ್ಗದರ್ಶನವನ್ನು ತೋರಿಸಿ",
    "notifications-alerts": "ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು",
    "emergency-alerts": "ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳು",
    "critical-alerts": "ನಿರ್ಣಾಯಕ ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ",
    "hospital-status-updates": "ಆಸ್ಪತ್ರೆ ಸ್ಥಿತಿ ನವೀಕರಣಗಳು",
    "bed-availability": "ಹಾಸಿಗೆ ಲಭ್ಯತೆಯ ಕುರಿತು ನವೀಕರಣಗಳನ್ನು ಪಡೆಯಿರಿ",
    "traffic-condition-alerts": "ಟ್ರಾಫಿಕ್ ಸ್ಥಿತಿ ಎಚ್ಚರಿಕೆಗಳು",
    "traffic-alerts": "ಟ್ರಾಫಿಕ್ ಪರಿಸ್ಥಿತಿಗಳ ಬಗ್ಗೆ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ",
    "push-notifications": "ಪುಶ್ ಅಧಿಸೂಚನೆಗಳು",
    "mobile-alerts": "ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಾಧನದಲ್ಲಿ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ",
    "audio-alerts": "ಆಡಿಯೋ ಎಚ್ಚರಿಕೆಗಳು",
    "voice-announcements": "ಎಚ್ಚರಿಕೆಗಳಿಗಾಗಿ ಧ್ವನಿ ಪ್ರಕಟಣೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ",
    "performance-data": "ಕಾರ್ಯಕ್ಷಮತೆ ಮತ್ತು ಡೇಟಾ",
    "ai-powered-recommendations": "AI-ಚಾಲಿತ ಶಿಫಾರಸುಗಳು",
    "smart-hospital": "ಸ್ಮಾರ್ಟ್ ಆಸ್ಪತ್ರೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
    "survival-rate-prediction": "ಉಳಿವಿನ ದರ ಮುನ್ಸೂಚನೆ",
    "show-survival": "ಉಳಿವಿನ ದರ ಮುನ್ಸೂಚನೆಗಳನ್ನು ತೋರಿಸಿ",
    "anonymous-data-sharing": "ಅನಾಮಧೇಯ ಡೇಟಾ ಹಂಚಿಕೆ",
    "share-data": "ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಸುಧಾರಿಸಲು ಅನಾಮಧೇಯ ಡೇಟಾವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
    "detailed-analytics": "ವಿವರವಾದ ವಿಶ್ಲೇಷಣೆ",
    "performance-metrics": "ಕಾರ್ಯಕ್ಷಮತೆ ಮೆಟ್ರಿಕ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    // Profile Page
    "profile": "ಪ್ರೊಫೈಲ್",
    "email": "ಇಮೇಲ್",
    "role": "ಪಾತ್ರ",
    "location": "ಸ್ಥಳ",
    "edit-profile": "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
    "sign-out": "ನಿರ್ಗಮಿಸಿ",
    "signed-out": "ಸೈನ್ ಔಟ್ ಮಾಡಲಾಗಿದೆ",
    "signed-out-success": "ನೀವು ಯಶಸ್ವಿಯಾಗಿ ಸೈನ್ ಔಟ್ ಆಗಿದ್ದೀರಿ",
    // Search Page
    "search-hospitals": "ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ...",
    // Map Page
    // Welcome Page
    "welcome-title": "ಮೆಡ್‌ರೆಸ್ಪಾನ್ಸ್‌ಗೆ ಸ್ವಾಗತ",
    "welcome-description": "ನಿಮ್ಮ AI-ಚಾಲಿತ ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಸಹಾಯಕ",
    "get-started": "ಪ್ರಾರಂಭಿಸಿ",
    // Not Found Page
    "page-not-found": "ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ",
    "go-home": "ಮನೆಗೆ ಹೋಗಿ",
    // Regions
    "north-bangalore": "ಉತ್ತರ ಬೆಂಗಳೂರು",
    "central-bangalore": "ಕೇಂದ್ರ ಬೆಂಗಳೂರು",
    "south-bangalore": "ದಕ್ಷಿಣ ಬೆಂಗಳೂರು",
    "east-bangalore": "ಪೂರ್ವ ಬೆಂಗಳೂರು",
    "west-bangalore": "ಪಶ್ಚಿಮ ಬೆಂಗಳೂರು",
    
    // Network status
    "partial-network-connection": "ಭಾಗಶಃ ನೆಟ್‌ವರ್ಕ್ ಸಂಪರ್ಕ",
    "network-connection-issues": "ನೆಟ್‌ವರ್ಕ್ ಸಂಪರ್ಕ ಸಮಸ್ಯೆಗಳು",
    
    // Chart titles and labels
    "geographic-incident-distribution": "ಭೌಗೋಳಿಕ ಘಟನೆ ವಿತರಣೆ",
    "icu-bed-occupancy": "ಐಸಿಯು ಹಾಸಿಗೆ ಆಕ್ರಮಣ",
    "hospital-wait-times": "ಆಸ್ಪತ್ರೆ ಕಾಯುವ ಸಮಯಗಳು",
    "available-beds": "ಲಭ್ಯವಿರುವ ಹಾಸಿಗೆಗಳು",
    "total-beds": "ಒಟ್ಟು ಹಾಸಿಗೆಗಳು",
  },
  
  hindi: {
    // Navigation
    "dashboard": "डैशबोर्ड",
    "live-route": "लाइव रूट",
    "hospitals": "अस्पताल",
    "reports": "रिपोर्ट्स",
    "settings": "सेटिंग्स",
    // Page Titles
    "ai-smart-ambulance-routing": "AI स्मार्ट एम्बुलेंस रूटिंग",
    "emergency-route": "आपातकालीन मार्ग",
    "hospitals-near-you": "आपके पास के अस्पताल",
    // Patient Status
    "patient-status": "रोगी की स्थिति",
    "critical": "गंभीर",
    // Hospital Info
    "icu-availability": "आईसीयू उपलब्धता",
    "total-icu-beds": "कुल आईसीयू बिस्तर",
    "view-all-hospitals": "सभी अस्पतालों को देखें",
    "navigate": "नेविगेट करने के लिए",
    "calling": "अस्पताल को कॉल किया जा रहा है",
    "connecting": "कनेक्ट हो रहा है",
    // Upload Dataset
    "upload-dataset": "डेटासेट अपलोड करें",
    "dataset-ready": "डेटासेट तैयार है",
    "uploading": "अपलोड हो रहा है...",
    "dataset-uploaded-title": "डेटासेट सफलतापूर्वक अपलोड किया गया",
    "dataset-uploaded-desc": "फ़ाइल संसाधित की गई और विश्लेषण के लिए तैयार है",
    "dataset-reset-title": "डेटासेट रीसेट",
    "dataset-reset-desc": "विश्लेषण डेटा रीसेट किया गया है",
    "dataset-options": "डेटासेट विकल्प",
    "dataset-options-desc": "अपने अपलोड किए गए डेटासेट को प्रबंधित करें",
    "analysis-active": "विश्लेषण वर्तमान में सक्रिय है",
    "reset-analysis": "विश्लेषण रीसेट करें",
    // Settings Page
    "system-preferences": "सिस्टम प्राथमिकताएं",
    "language": "भाषा",
    "units": "इकाइयाँ",
    "metric": "मीट्रिक",
    "imperial": "साम्राज्यीय",
    "map-navigation-settings": "मानचित्र और नेविगेशन सेटिंग्स",
    "real-time-traffic-updates": "वास्तविक समय यातायात अपडेट",
    "receive-live-traffic": "तेज़ मार्गों के लिए लाइव ट्रैफ़िक अपडेट प्राप्त करें",
    "smart-rerouting": "स्मार्ट रीरूटिंग",
    "auto-reroute": "ट्रैफ़िक और बंद होने के आसपास स्वचालित रूप से रीरूट करें",
    "road-closure-alerts": "सड़क बंद होने की चेतावनी",
    "get-road-closure": "सड़क बंद होने और घटनाओं के बारे में सूचना प्राप्त करें",
    "3d-map-visualization": "3डी मानचित्र दृश्य",
    "show-3d-buildings": "मानचित्र पर 3डी इमारतें और स्थलचिह्न दिखाएं",
    "lane-guidance": "लेन मार्गदर्शन",
    "show-lanes": "नेविगेशन के दौरान लेन मार्गदर्शन दिखाएं",
    "notifications-alerts": "सूचनाएं और अलर्ट",
    "emergency-alerts": "आपातकालीन अलर्ट",
    "critical-alerts": "महत्वपूर्ण आपातकालीन अलर्ट प्राप्त करें",
    "hospital-status-updates": "अस्पताल स्थिति अपडेट",
    "bed-availability": "बिस्तर उपलब्धता पर अपडेट प्राप्त करें",
    "traffic-condition-alerts": "यातायात स्थिति अलर्ट",
    "traffic-alerts": "यातायात स्थितियों के बारे में अलर्ट प्राप्त करें",
    "push-notifications": "पुश सूचनाएं",
    "mobile-alerts": "अपने मोबाइल डिवाइस पर अलर्ट प्राप्त करें",
    "audio-alerts": "ऑडियो अलर्ट",
    "voice-announcements": "अलर्ट के लिए ध्वनि घोषणाएं सक्षम करें",
    "performance-data": "प्रदर्शन और डेटा",
    "ai-powered-recommendations": "AI-संचालित अनुशंसाएँ",
    "smart-hospital": "स्मार्ट अस्पताल अनुशंसाएँ प्राप्त करें",
    "survival-rate-prediction": "उत्तरजीविता दर भविष्यवाणी",
    "show-survival": "उत्तरजीविता दर भविष्यवाणियाँ दिखाएँ",
    "anonymous-data-sharing": "गुमनाम डेटा साझाकरण",
    "share-data": "ऐप को बेहतर बनाने के लिए गुमनाम डेटा साझा करें",
    "detailed-analytics": "विस्तृत विश्लेषिकी",
    "performance-metrics": "प्रदर्शन मेट्रिक्स को ट्रैक करें",
    // Profile Page
    "profile": "प्रोफ़ाइल",
    "email": "ईमेल",
    "role": "भूमिका",
    "location": "स्थान",
    "edit-profile": "प्रोफ़ाइल संपादित करें",
    "sign-out": "साइन आउट",
    "signed-out": "साइन आउट",
    "signed-out-success": "आप सफलतापूर्वक साइन आउट हो गए हैं",
    // Search Page
    "search-hospitals": "अस्पतालों को खोजें...",
    // Map Page
    // Welcome Page
    "welcome-title": "मेडरेस्पॉन्स में आपका स्वागत है",
    "welcome-description": "आपका एआई-संचालित आपातकालीन प्रतिक्रिया सहायक",
    "get-started": "शुरू हो जाओ",
    // Not Found Page
    "page-not-found": "पृष्ठ नहीं मिला",
    "go-home": "घर जाओ",
    // Regions
    "north-bangalore": "उत्तरी बैंगलोर",
    "central-bangalore": "मध्य बैंगलोर",
    "south-bangalore": "दक्षिण बैंगलोर",
    "east-bangalore": "पूर्वी बैंगलोर",
    "west-bangalore": "पश्चिमी बैंगलोर",
    
    // Network status
    "partial-network-connection": "आंशिक नेटवर्क कनेक्शन",
    "network-connection-issues": "नेटवर्क कनेक्शन समस्याएं",
    
    // Chart titles and labels
    "geographic-incident-distribution": "भौगोलिक घटना वितरण",
    "icu-bed-occupancy": "आईसीयू बेड का कब्जा",
    "hospital-wait-times": "अस्पताल प्रतीक्षा समय",
    "available-beds": "उपलब्ध बिस्तर",
    "total-beds": "कुल बिस्तर",
  },
  
  tamil: {
    // Navigation
    "dashboard": "டாஷ்போர்டு",
    "live-route": "நேரடி வழி",
    "hospitals": "மருத்துவமனைகள்",
    "reports": "அறிக்கைகள்",
    "settings": "அமைப்புகள்",
    // Page Titles
    "ai-smart-ambulance-routing": "AI ஸ்மார்ட் ஆம்புலன்ஸ் ரூட்டிங்",
    "emergency-route": "அவசர வழி",
    "hospitals-near-you": "உங்களுக்கு அருகிலுள்ள மருத்துவமனைகள்",
    // Patient Status
    "patient-status": "நோயாளி நிலை",
    "critical": "தீவிர",
    // Hospital Info
    "icu-availability": "ICU கிடைக்கும் தன்மை",
    "total-icu-beds": "மொத்த ICU படுக்கைகள்",
    "view-all-hospitals": "எல்லா மருத்துவமனைகளையும் காட்டு",
    "navigate": "வழிசெலுத்த",
    "calling": "மருத்துவமனைக்கு அழைக்கப்படுகிறது",
    "connecting": "இணைக்கிறது",
    // Upload Dataset
    "upload-dataset": "தரவுத்தொகுப்பை பதிவேற்றவும்",
    "dataset-ready": "தரவுத்தொகுப்பு தயாராக உள்ளது",
    "uploading": "பதிவேற்றுகிறது...",
    "dataset-uploaded-title": "தரவுத்தொகுப்பு வெற்றிகரமாக பதிவேற்றப்பட்டது",
    "dataset-uploaded-desc": "கோப்பு செயலாக்கப்பட்டு பகுப்பாய்வுக்கு தயாராக உள்ளது",
    "dataset-reset-title": "தரவுத்தொகுப்பு மீட்டமை",
    "dataset-reset-desc": "பகுப்பாய்வு தரவு மீட்டமைக்கப்பட்டது",
    "dataset-options": "தரவுத்தொகுப்பு விருப்பங்கள்",
    "dataset-options-desc": "பதிவேற்றிய தரவுத்தொகுப்பை நிர்வகிக்கவும்",
    "analysis-active": "பகுப்பாய்வு தற்போது செயலில் உள்ளது",
    "reset-analysis": "பகுப்பாய்வை மீட்டமை",
    // Settings Page
    "system-preferences": "கணினி விருப்பத்தேர்வுகள்",
    "language": "மொழி",
    "units": "அலகுகள்",
    "metric": "மெட்ரிக்",
    "imperial": "ஏகாதிபத்தியம்",
    "map-navigation-settings": "வரைபடம் & வழிசெலுத்தல் அமைப்புகள்",
    "real-time-traffic-updates": "நிகழ்நேர போக்குவரத்து புதுப்பிப்புகள்",
    "receive-live-traffic": "வேகமான வழிகளுக்கு நேரடி போக்குவரத்து புதுப்பிப்புகளைப் பெறுக",
    "smart-rerouting": "ஸ்மார்ட் மறுவழி",
    "auto-reroute": "போக்குவரத்து மற்றும் மூடல்களுக்கு தானாகவே மறுவழி",
    "road-closure-alerts": "சாலை மூடல் எச்சரிக்கைகள்",
    "get-road-closure": "சாலை மூடல்கள் மற்றும் சம்பவங்கள் பற்றி அறிவிக்கவும்",
    "3d-map-visualization": "3D வரைபட காட்சிப்படுத்தல்",
    "show-3d-buildings": "வரைபடத்தில் 3D கட்டிடங்கள் மற்றும் அடையாளங்களைக் காட்டு",
    "lane-guidance": "பாதை வழிகாட்டுதல்",
    "show-lanes": "வழிசெலுத்தலின் போது பாதை வழிகாட்டலைக் காட்டு",
    "notifications-alerts": "அறிவிப்புகள் & விழிப்பூட்டல்கள்",
    "emergency-alerts": "அவசர விழிப்பூட்டல்கள்",
    "critical-alerts": "முக்கிய அவசர விழிப்பூட்டல்களைப் பெறுக",
    "hospital-status-updates": "மருத்துவமனை நிலை புதுப்பிப்புகள்",
    "bed-availability": "படுக்கை கிடைக்கும் தன்மை குறித்த புதுப்பிப்புகளைப் பெறுங்கள்",
    "traffic-condition-alerts": "போக்குவரத்து நிலை விழிப்பூட்டல்கள்",
    "traffic-alerts": "போக்குவரத்து நிலைமைகள் பற்றிய விழிப்பூட்டல்களைப் பெறுக",
    "push-notifications": "புஷ் அறிவிப்புகள்",
    "mobile-alerts": "உங்கள் மொபைல் சாதனத்தில் விழிப்பூட்டல்களைப் பெறுக",
    "audio-alerts": "ஆடியோ விழிப்பூட்டல்கள்",
    "voice-announcements": "விழிப்பூட்டல்களுக்கான குரல் அறிவிப்புகளை இயக்கவும்",
    "performance-data": "செயல்திறன் & தரவு",
    "ai-powered-recommendations": "AI- இயங்கும் பரிந்துரைகள்",
    "smart-hospital": "ஸ்மார்ட் மருத்துவமனை பரிந்துரைகளைப் பெறுங்கள்",
    "survival-rate-prediction": "உயிர்வாழ்வு விகித கணிப்பு",
    "show-survival": "உயிர்வாழ்வு விகித கணிப்புகளைக் காட்டு",
    "anonymous-data-sharing": "அடையாளம் தெரியாத தரவு பகிர்வு",
    "share-data": "பயன்பாட்டை மேம்படுத்த அநாமதேய தரவைப் பகிரவும்",
    "detailed-analytics": "விரிவான பகுப்பாய்வு",
    "performance-metrics": "செயல்திறன் அளவீடுகளை கண்காணிக்கவும்",
    // Profile Page
    "profile": "சுயவிவரம்",
    "email": "மின்னஞ்சல்",
    "role": "பங்கு",
    "location": "இடம்",
    "edit-profile": "சுயவிவரத்தைத் திருத்து",
    "sign-out": "வெளியேறு",
    "signed-out": "வெளியேறப்பட்டது",
    "signed-out-success": "நீங்கள் வெற்றிகரமாக வெளியேறிவிட்டீர்கள்",
    // Search Page
    "search-hospitals": "மருத்துவமனைகளைத் தேடு...",
    // Map Page
    // Welcome Page
    "welcome-title": "MedResponse க்கு வரவேற்கிறோம்",
    "welcome-description": "உங்கள் AI- இயங்கும் அவசர பதில் உதவியாளர்",
    "get-started": "தொடங்கு",
    // Not Found Page
    "page-not-found": "பக்கம் காணப்படவில்லை",
    "go-home": "வீட்டிற்கு செல்",
    // Regions
    "north-bangalore": "வடக்கு பெங்களூர்",
    "central-bangalore": "மத்திய பெங்களூர்",
    "south-bangalore": "தெற்கு பெங்களூர்",
    "east-bangalore": "கிழக்கு பெங்களூர்",
    "west-bangalore": "மேற்கு பெங்களூர்",
    
    // Network status
    "partial-network-connection": "பகுதி நெட்வொர்க் இணைப்பு",
    "network-connection-issues": "நெட்வொர்க் இணைப்பு சிக்கல்கள்",
    
    // Chart titles and labels
    "geographic-incident-distribution": "புவியியல் சம்பவ பகிர்வு",
    "icu-bed-occupancy": "ICU படுக்கை நிரப்புதல்",
    "hospital-wait-times": "மருத்துவமனை காத்திருப்பு நேரங்கள்",
    "available-beds": "கிடைக்கக்கூடிய படுக்கைகள்",
    "total-beds": "மொத்த படுக்கைகள்",
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
    "navigate": "నేవిగేట్ చేయండి",
    "calling": "ఆసుపత్రికి కాల్ చేస్తోంది",
    "connecting": "కనెక్ట్ అవుతోంది",
    // Upload Dataset
    "upload-dataset": "డేటాసెట్ అప్‌లోడ్ చేయండి",
    "dataset-ready": "డేటాసెట్ సిద్ధంగా ఉంది",
    "uploading": "అప్‌లోడ్ అవుతోంది...",
    "dataset-uploaded-title": "డేటాసెట్ విజయవంతంగా అప్‌లోడ్ చేయబడింది",
    "dataset-uploaded-desc": "ఫైల్ ప్రాసెస్ చేయబడింది మరియు విశ్లేషణకు సిద్ధంగా ఉంది",
    "dataset-reset-title": "డేటాసెట్ రీసెట్",
    "dataset-reset-desc": "విశ్లేషణ డేటా రీసెట్ చేయబడింది",
    "dataset-options": "డేటాసెట్ ఎంపికలు",
    "dataset-options-desc": "మీ అప్‌లోడ్ చేసిన డేటాసెట్‌ను నిర్వహించండి",
    "analysis-active": "విశ్లేషణ ప్రస్తుతం యాక్టివ్‌గా ఉంది",
    "reset-analysis": "విశ్లేషణను రీసెట్ చేయండి",
    // Settings Page
    "system-preferences": "సిస్టమ్ ప్రాధాన్యతలు",
    "language": "భాష",
    "units": "యూనిట్లు",
    "metric": "మెట్రిక్",
    "imperial": "ఇంపీరియల్",
    "map-navigation-settings": "మ్యాప్ & నావిగేషన్ సెట్టింగ్‌లు",
    "real-time-traffic-updates": "రియల్ టైమ్ ట్రాఫిక్ అప్‌డేట్‌లు",
    "receive-live-traffic": "వేగవంతమైన మార్గాల కోసం లైవ్ ట్రాఫిక్ అప్‌డేట్‌లను స్వీకరించండి",
    "smart-rerouting": "స్మార్ట్ రీరూటింగ్",
    "auto-reroute": "ట్రాఫిక్ మరియు మూసివేతల చుట్టూ స్వయంచాలకంగా రీరూట్ చేయండి",
    "road-closure-alerts": "రోడ్డు మూసివేత హెచ్చరికలు",
    "get-road-closure": "రోడ్డు మూసివేతలు మరియు సంఘటనల గురించి తెలియజేయండి",
    "3d-map-visualization": "3D మ్యాప్ విజువలైజేషన్",
    "show-3d-buildings": "మ్యాప్‌లో 3D భవనాలు మరియు ల్యాండ్‌మార్క్‌లను చూపండి",
    "lane-guidance": "లేన్ గైడెన్స్",
    "show-lanes": "నావిగేషన్ సమయంలో లేన్ మార్గదర్శకత్వం చూపండి",
    "notifications-alerts": "నోటిఫికేషన్‌లు & హెచ్చరికలు",
    "emergency-alerts": "అత్యవసర హెచ్చరికలు",
    "critical-alerts": "తీవ్రమైన అత్యవసర హెచ్చరికలను స్వీకరించండి",
    "hospital-status-updates": "హాస్పిటల్ స్టేటస్ అప్‌డేట్‌లు",
    "bed-availability": "పడకల లభ్యతపై నవీకరణలను పొందండి",
    "traffic-condition-alerts": "ట్రాఫిక్ కండిషన్ హెచ్చరికలు",
    "traffic-alerts": "ట్రాఫిక్ పరిస్థితుల గురించి హెచ్చరికలను స్వీకరించండి",
    "push-notifications": "పుష్ నోటిఫికేషన్‌లు",
    "mobile-alerts": "మీ మొబైల్ పరికరంలో హెచ్చరికలను స్వీకరించండి",
    "audio-alerts": "ఆడియో హెచ్చరికలు",
    "voice-announcements": "హెచ్చరికల కోసం వాయిస్ ప్రకటనలను ప్రారంభించండి",
    "performance-data": "పనితీరు & డేటా",
    "ai-powered-recommendations": "AI- ఆధారిత సిఫార్సులు",
    "smart-hospital": "స్మార్ట్ హాస్పిటల్ సిఫార్సులను పొందండి",
    "survival-rate-prediction": "మనుగడ రేటు అంచనా",
    "show-survival": "మనుగడ రేటు అంచనాలను చూపించు",
    "anonymous-data-sharing": "గుర్తు తెలియని డేటా భాగస్వామ్యం",
    "share-data": "అనువర్తనాన్ని మెరుగుపరచడానికి అనామక డేటాను భాగస్వామ్యం చేయండి",
    "detailed-analytics": "వివరణాత్మక విశ్లేషణలు",
    "performance-metrics": "పనితీరు కొలమానాలను ట్రాక్ చేయండి",
    // Profile Page
    "profile": "ప్రొఫైల్",
    "email": "ఇమెయిల్",
    "role": "పాత్ర",
    "location": "స్థానం",
    "edit-profile": "ప్రొఫైల్‌ను సవరించండి",
    "sign-out": "సైన్ అవుట్",
    "signed-out": "సైన్ అవుట్ చేయబడింది",
    "signed-out-success": "మీరు విజయవంతంగా సైన్ అవుట్ చేయబడ్డారు",
    // Search Page
    "search-hospitals": "ఆసుపత్రుల కోసం వెతకండి...",
    // Map Page
    // Welcome Page
    "welcome-title": "MedResponse కు స్వాగతం",
    "welcome-description": "మీ AI- ఆధారిత అత్యవసర ప్రతిస్పందన సహాయకుడు",
    "get-started": "ప్రారంభించండి",
    // Not Found Page
    "page-not-found": "పేజీ కనుగొనబడలేదు",
    "go-home": "ఇంటికి వెళ్ళు",
    // Regions
    "north-bangalore": "ఉత్తర బెంగళూరు",
    "central-bangalore": "సెంట్రల్ బెంగళూరు",
    "south-bangalore": "దక్షిణ బెంగళూరు",
    "east-bangalore": "తూర్పు బెంగళూరు",
    "west-bangalore": "పశ్చిమ బెంగళూరు",
    
    // Network status
    "partial-network-connection": "పాక్షిక నెట్‌వర్క్ కనెక్షన్",
    "network-connection-issues": "నెట్‌వర్క్ కనెక్షన్ సమస్యలు",
    
    // Chart titles and labels
    "geographic-incident-distribution": "భౌగోళిక సంఘటన పంపిణీ",
    "icu-bed-occupancy": "ICU బెడ్ ఆక్రమణ",
    "hospital-wait-times": "ఆసుపత్రి వేచి ఉండే సమయాలు",
    "available-beds": "అందుబాటులో ఉన్న పడకలు",
    "total-beds": "మొత్తం పడకలు",
  }
};

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create language context
const LanguageContext = createContext<LanguageContextType>({
  language: "english",
  setLanguage: () => {},
  t: (key) => key,
});

// Language provider component
interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  defaultLanguage = "english",
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("app-language");
    return (savedLanguage as Language) || defaultLanguage;
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("app-language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
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
