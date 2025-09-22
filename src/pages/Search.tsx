import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';
import TopHeader from '@/components/ui/TopHeader';
import Navbar from '@/components/ui/Navbar';
import { Search as SearchIcon, MapPin, ArrowRight, Clock, Ambulance, Building, Phone, Star, QrCode, Filter, Mic, AlertCircle, CheckCircle, Moon, Sun } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import HospitalSearchResults, { Hospital } from '@/components/ui/HospitalSearchResults';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QRCode from 'qrcode.react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SearchBar from '@/components/ui/SearchBar';
import TransportOptions from '@/components/ui/TransportOptions';
import { Switch } from '@/components/ui/switch';

const Search = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState<Hospital[]>([]);
  // ✅ default to Bangalore so it's accepted by the filter
  const [location, setLocation] = useState('Bangalore');
  const [specialty, setSpecialty] = useState('all');
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [transportMode, setTransportMode] = useState<'ground' | 'air'>('ground');
  const [showEmergencyCallDialog, setShowEmergencyCallDialog] = useState(false);
  const [emergencyCallActive, setEmergencyCallActive] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showBedAvailability, setShowBedAvailability] = useState(true);
  const [showOnlyOpen24Hours, setShowOnlyOpen24Hours] = useState(false);
  const [minRating, setMinRating] = useState('0');
  const [chatbotDialogOpen, setChatbotDialogOpen] = useState(false);

  // ✅ Start chatbot with only greeting
  const [chatbotMessages, setChatbotMessages] = useState<
    { text: string; isUser: boolean }[]
  >([
    {
      text: "Hello! I'm MediBot 👩‍⚕️. I can help with hospital info, ambulances, and emergency guidance. How can I assist you?",
      isUser: false
    }
  ]);

  const [chatbotInput, setChatbotInput] = useState('');

  // ✅ Q&A Knowledge Base (map of canonical question/keyword → answer)
  // Keep this list updated with other common phrasings you expect.
  const botKnowledge: Record<string, string> = {
    "which hospitals have icu availability right now": "Apollo Hospital (8/15 beds free) and Manipal Hospital (5/20 beds free) currently have ICU capacity.",
    "icu availability": "Apollo Hospital (8/15 beds free) and Manipal Hospital (5/20 beds free) currently have ICU capacity.",
    "ambulance time to mg road": "Ground ambulances usually take 7–10 minutes to reach MG Road depending on traffic. Air ambulances are available for severe cases.",
    "ambulance": "Ground ambulances usually take 7–10 minutes depending on traffic. Air ambulances are available for severe cases.",
    "24/7 hospitals nearby": "Yes, Apollo Hospital and MS Ramaiah Hospital operate 24/7 with emergency facilities.",
    "pediatric care": "Narayana Healthcare specializes in pediatrics with a dedicated children's department.",
    "burn unit": "Victoria Hospital has a specialized burn unit available 24/7.",
    "cardiac emergency center": "Fortis Hospital and Jayadeva Institute have dedicated cardiac emergency departments.",
    "emergency helpline number in india": "You can dial 112 for all emergencies, 108 for medical ambulance services, and 102 for maternal/child health transport.",
    "air ambulance rural": "Air ambulances can be dispatched to rural areas within 30–45 minutes depending on weather and logistics.",
    "heart attack": "Call emergency services immediately. Keep the patient calm, loosen tight clothing, and if available, give 325 mg aspirin (unless allergic).",
    "dialysis facilities": "Aster CMI and Apollo Hospitals both have round-the-clock dialysis facilities.",
    "unconscious after road accident": "Check breathing and pulse. If absent, begin CPR (30 compressions : 2 breaths). Call an ambulance immediately.",
    "trauma care center": "Manipal Hospital and NIMHANS have advanced trauma care units.",
    "blood availability": "You can contact hospital blood banks directly or use the National Blood Transfusion Portal to check availability."
  };

  // Utility: normalize text for matching
  const normalize = (s: string) => {
    if (!s) return '';
    // convert smart quotes to regular, lowercase, remove punctuation except / hyphen, keep words
    const smart = s.replace(/[‘’‚‛“”„‟]/g, '"').replace(/[”“]/g, '"');
    const lower = smart.toLowerCase();
    // remove punctuation
    const cleaned = lower.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
    return cleaned;
  };

  // improved matching: exact normalized, contains, token keywords
  const findBestAnswer = (userText: string): string | null => {
    const n = normalize(userText);
    if (!n) return null;

    // 1) Exact normalized match
    for (const key of Object.keys(botKnowledge)) {
      if (normalize(key) === n) {
        return botKnowledge[key];
      }
    }

    // 2) "Contains" match: if key phrase appears inside user input or vice versa
    for (const key of Object.keys(botKnowledge)) {
      const nk = normalize(key);
      if (n.includes(nk) || nk.includes(n)) {
        return botKnowledge[key];
      }
    }

    // 3) Keyword token match: split user input into tokens and see if any key token matches a key
    const tokens = n.split(' ').filter(Boolean);
    if (tokens.length > 0) {
      for (const key of Object.keys(botKnowledge)) {
        const nk = normalize(key);
        for (const token of tokens) {
          if (nk.includes(token) && token.length >= 3) { // require token length >=3 to reduce false positives
            return botKnowledge[key];
          }
        }
      }
    }

    // no match
    return null;
  };

  // ✅ Handle sending user message + bot response (used by chat UI)
  const handleUserMessage = (userText: string) => {
    if (!userText || !userText.trim()) return;

    // Add user message to chat
    setChatbotMessages(prev => [...prev, { text: userText, isUser: true }]);

    // attempt to find best answer
    const reply = findBestAnswer(userText) ?? "I'm not sure about that. For urgent issues call emergency services (112). You can ask about ICUs, ambulances, 24/7 hospitals, pediatric care, trauma, dialysis, blood availability, etc.";

    // simulate slight typing delay so UX feels natural
    setTimeout(() => {
      setChatbotMessages(prev => [...prev, { text: reply, isUser: false }]);
    }, 500);

    // clear input field in UI
    setChatbotInput('');
  };

  // Keep your existing search data and behavior...
  const mockHospitals: Hospital[] = [
    { 
      id: '1', 
      name: 'Manipal Hospital', 
      address: 'Kodihalli Main Road, Bangalore, 560017',
      distance: '1.5 km', 
      travelTime: '8 min', 
      icuAvailable: 5, 
      icuTotal: 20, 
      waitTime: 10,
      phone: '112',
      rating: 4.5,
      reviews: [
        { id: '1', user: 'John D.', rating: 5, comment: 'Excellent care and friendly staff!' },
        { id: '2', user: 'Sarah M.', rating: 4, comment: 'Good experience overall, short wait times.' }
      ],
      specialties: ['Cardiology', 'Neurology', 'Pediatrics'],
      operatingHours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM',
      emergencyFacilities: ['ICU', 'Emergency Room', 'Trauma Center', 'CT Scan'],
      location: { lat: 34.052235, lng: -118.243683 },
      insurance: ['Medicare', 'Blue Cross', 'Kaiser'],
      isOpen24Hours: false
    },
    { 
      id: '2', 
      name: 'Apollo Hospital', 
      address: 'Marthalli Brigde Towards Kadubeeshanahalli, Bangalore',
      distance: '6.2 km', 
      travelTime: '12 min', 
      icuAvailable: 8, 
      icuTotal: 15, 
      waitTime: 5,
      phone: '112',
      rating: 4.8,
      reviews: [
        { id: '3', user: 'Robert J.', rating: 5, comment: 'Top-notch medical care and excellent doctors!' },
        { id: '4', user: 'Maria L.', rating: 5, comment: 'The staff went above and beyond for my family.' },
        { id: '5', user: 'David W.', rating: 4, comment: 'Clean facilities and professional service.' }
      ],
      specialties: ['Oncology', 'Orthopedics', 'Gastroenterology'],
      operatingHours: 'Open 24 Hours',
      emergencyFacilities: ['ICU', 'Emergency Room', 'MRI'],
      location: { lat: 34.052235, lng: -118.243683 },
      insurance: ['Medicare', 'Aetna', 'United Healthcare'],
      isOpen24Hours: true
    },
    { 
      id: '3', 
      name: 'Fortis Hospital', 
      address: 'Trinity Circle , MG Road, Bangalore-56102',
      distance: '7.8 km', 
      travelTime: '14 min', 
      icuAvailable: 2, 
      icuTotal: 10, 
      waitTime: 15,
      phone: '112',
      rating: 4.2,
      reviews: [
        { id: '6', user: 'Emily K.', rating: 4, comment: 'Good neighborhood hospital, friendly nurses.' },
        { id: '7', user: 'Michael P.', rating: 4, comment: 'Reasonable wait time for an emergency visit.' }
      ],
      specialties: ['Family Medicine', 'Internal Medicine', 'Dermatology'],
      operatingHours: 'Mon-Sun: 7AM-9PM',
      emergencyFacilities: ['Emergency Room', 'X-Ray'],
      location: { lat: 34.052235, lng: -118.243683 },
      insurance: ['Medicare', 'Blue Shield', 'Cigna'],
      isOpen24Hours: false
    },
    { 
      id: '4', 
      name: 'MS Ramaiah Hospital', 
      address: 'Basvanagudi, Bangalore-560015',
      distance: '3.1 km', 
      travelTime: '18 min', 
      icuAvailable: 10, 
      icuTotal: 25, 
      waitTime: 8,
      phone: '112',
      rating: 4.7,
      reviews: [
        { id: '8', user: 'Thomas G.', rating: 5, comment: 'Exceptional emergency care, saved my life!' },
        { id: '9', user: 'Linda S.', rating: 4, comment: 'The ICU staff were extremely attentive and professional.' }
      ],
      specialties: ['Cardiology', 'Pulmonology', 'Urology'],
      operatingHours: 'Open 24 Hours',
      emergencyFacilities: ['ICU', 'Emergency Room', 'Trauma Center', 'MRI', 'CT Scan'],
      location: { lat: 34.052235, lng: -118.243683 },
      insurance: ['Medicare', 'Blue Cross', 'Humana', 'Cigna'],
      isOpen24Hours: true
    },
    { 
      id: '5', 
      name: 'Narayana Healthcare', 
      address: 'Murugeshpalaya Kr Garden Bangalore- 560013',
      distance: '4.3 km', 
      travelTime: '20 min', 
      icuAvailable: 3, 
      icuTotal: 12, 
      waitTime: 12,
      phone: '112',
      rating: 4.0,
      reviews: [
        { id: '10', user: 'Jennifer B.', rating: 4, comment: 'Good pediatric care, child-friendly environment.' },
        { id: '11', user: 'William T.', rating: 3, comment: 'Decent service but long waiting times.' }
      ],
      specialties: ['Pediatrics', 'OB/GYN', 'Geriatrics'],
      operatingHours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-3PM',
      emergencyFacilities: ['Emergency Room', 'X-Ray', 'Ultrasound'],
      location: { lat: 34.052235, lng: -118.243683 },
      insurance: ['Medicare', 'Kaiser', 'Blue Shield'],
      isOpen24Hours: false
    },
  ];

  const specialties = [...new Set(mockHospitals.flatMap(h => h.specialties || []))].sort();
  const insuranceProviders = [...new Set(mockHospitals.flatMap(h => h.insurance || []))].sort();

  // 🔎 helper to find an exact hospital name match (case-insensitive, trimmed)
  const findExactHospitalByName = (name: string) => {
    const target = name.trim().toLowerCase();
    if (!target) return null;
    return mockHospitals.find(h => h.name.trim().toLowerCase() === target) || null;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ auto-accept Bangalore if user leaves it blank
    const effectiveLocation = location.trim() ? location : 'Bangalore';
    if (!location.trim()) setLocation('Bangalore');

    if (!searchTerm.trim() && !effectiveLocation.trim() && specialty === 'all' && !showOnlyOpen24Hours && minRating === '0') {
      toast({
        title: "Input Required",
        description: "Please enter a hospital name, location, or select some filters to search.",
        variant: "destructive"
      });
      return;
    }

    setSearching(true);

    setTimeout(() => {
      // ✅ if exact hospital name provided, return that hospital with details
      const exact = findExactHospitalByName(searchTerm);
      if (exact) {
        setSearchResults([exact]);
        setSelectedHospital(exact);
        setSearchPerformed(true);
        setSearching(false);
        toast({
          title: "Hospital Found",
          description: `Showing details for ${exact.name}.`,
        });
        return;
      }

      // fallback: regular filtered search
      let results = [...mockHospitals];

      if (searchTerm.trim()) {
        results = results.filter(hospital =>
          hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (effectiveLocation.trim()) {
        results = results.filter(hospital =>
          hospital.address.toLowerCase().includes(effectiveLocation.toLowerCase())
        );
      }

      if (specialty && specialty !== 'all') {
        results = results.filter(hospital =>
          hospital.specialties?.some(s => s.toLowerCase() === specialty.toLowerCase())
        );
      }

      if (showOnlyOpen24Hours) {
        results = results.filter(hospital => hospital.isOpen24Hours);
      }

      if (minRating !== '0') {
        const minRatingValue = parseFloat(minRating);
        results = results.filter(hospital => (hospital.rating || 0) >= minRatingValue);
      }

      setSearchResults(results.length > 0 ? results : []);
      setSelectedHospital(results.length === 1 ? results[0] : null);
      setSearchPerformed(true);
      setSearching(false);

      if (results.length === 0) {
        toast({
          title: "No Results Found",
          description: "We couldn't find any hospitals matching your search criteria.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Hospitals Found",
          description: `We found ${results.length} hospitals matching your criteria.`,
        });
      }
    }, 800);
  };

  const handleVoiceSearch = () => {
    setIsVoiceActive(true);

    toast({
      title: "Voice Search Activated",
      description: "Please speak your hospital search query...",
    });

    // Simulate voice recognition completion after 3 seconds
    setTimeout(() => {
      setIsVoiceActive(false);

      // Simulate voice search results
      const voiceQuery = "hospitals with cardiology department";
      setSearchTerm("cardiology");
      setSpecialty("Cardiology");
      // ✅ make sure location is Bangalore for voice too
      if (!location.trim()) setLocation('Bangalore');

      toast({
        title: "Voice Search Completed",
        description: `Searching for: "${voiceQuery}"`,
      });

      // Trigger search with the voice query
      const filteredResults = mockHospitals.filter(hospital =>
        hospital.specialties?.some(s => s.toLowerCase() === "cardiology") &&
        hospital.address.toLowerCase().includes('bangalore')
      );

      setSearchResults(filteredResults);
      setSelectedHospital(filteredResults.length === 1 ? filteredResults[0] : null);
      setSearchPerformed(true);
    }, 3000);
  };

  const handleNavigateToHospital = (hospitalId: string) => {
    toast({
      title: "Navigation Started",
      description: "Generating route to selected hospital...",
    });
    navigate(`/map?hospital=${hospitalId}`);
  };

  const openQrCode = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setQrDialogOpen(true);
  };

  const generateQrCodeData = (hospital: Hospital) => {
    return JSON.stringify({
      name: hospital.name,
      address: hospital.address,
      phone: hospital.phone,
      specialties: hospital.specialties?.join(', ') || '',
      operatingHours: hospital.operatingHours || 'Not specified',
      emergencyFacilities: hospital.emergencyFacilities.join(', '),
      insurance: hospital.insurance?.join(', ') || '',
      rating: hospital.rating || 'No rating'
    });
  };

  const handleEmergencyCall = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setShowEmergencyCallDialog(true);
  };

  const confirmEmergencyCall = () => {
    if (!selectedHospital) return;

    setEmergencyCallActive(true);
    setShowEmergencyCallDialog(false);

    toast({
      title: "Emergency Call Initiated",
      description: `Connecting to ${selectedHospital.name}...`,
      variant: "destructive"
    });

    // Simulate emergency response after 2 seconds
    setTimeout(() => {
      setEmergencyCallActive(false);

      toast({
        title: "Emergency Response Confirmed",
        description: `Ambulance dispatched from ${selectedHospital.name}. ETA: ${Math.floor(parseInt(selectedHospital.travelTime) * 0.7)} minutes.`,
      });
    }, 2000);
  };

  // Handler used by the chat UI submit button
  const handleChatbotSend = () => {
    // If user typed something, process it through the MediBot matcher
    const userText = chatbotInput;
    if (!userText.trim()) return;

    handleUserMessage(userText);
  };

  const getAvailabilityStatus = (available: number, total: number) => {
    const ratio = available / total;

    if (ratio === 0) return { text: "Full", indicator: "🔴" };
    if (ratio < 0.2) return { text: "Critical", indicator: "🔴" };
    if (ratio < 0.5) return { text: "Limited", indicator: "🟡" };
    return { text: "Available", indicator: "🟢" };
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `url('/lovable-uploads/7c8af1f3-722f-4ce8-a1f9-aa995983760e.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={`min-h-screen w-full backdrop-blur-sm transition-all duration-500 pb-20 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900/90 via-purple-900/70 to-gray-900/90'
          : 'bg-gradient-to-br from-blue-50/90 via-purple-100/70 to-blue-50/90'
      }`}>
        <TopHeader />

        <div className="container mx-auto px-4 pt-4 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {t("search-hospitals")}
              </h1>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setChatbotDialogOpen(true)}
                  className="flex items-center gap-1 bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm"
                >
                  <span className="text-blue-500 dark:text-blue-400">🤖</span>
                  AI Assistant
                </Button>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Find hospitals nearby, check availability and services
            </p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg rounded-xl p-6 mb-8"
            >
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="flex">
                      <div className="relative flex-grow">
                        <Input
                          type="text"
                          placeholder="Search by hospital name"
                          className="pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleVoiceSearch}
                        className={`ml-2 ${isVoiceActive ? 'bg-red-100 text-red-500 animate-pulse dark:bg-red-900/50 dark:text-red-400' : ''}`}
                      >
                        <Mic className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter your location (default: Bangalore)"
                      className="pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Select
                      value={specialty}
                      onValueChange={setSpecialty}
                    >
                      <SelectTrigger className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Filter className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="relative">
                    <Select
                      value={minRating}
                      onValueChange={setMinRating}
                    >
                      <SelectTrigger className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <SelectValue placeholder="Minimum rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any Rating</SelectItem>
                        <SelectItem value="3">3+ Stars</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Star className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="open24"
                      checked={showOnlyOpen24Hours}
                      onCheckedChange={setShowOnlyOpen24Hours}
                    />
                    <label htmlFor="open24" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                      24/7 Open Only
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="showBeds"
                      checked={showBedAvailability}
                      onCheckedChange={setShowBedAvailability}
                    />
                    <label htmlFor="showBeds" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                      Show Bed Availability
                    </label>
                  </div>

                  <TransportOptions
                    currentMode={transportMode}
                    onModeChange={(mode) => setTransportMode(mode)}
                    isAirRecommended={false}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    type="submit"
                    className="py-5 rounded-lg bg-medical-500 hover:bg-medical-600 shadow-md"
                    disabled={searching}
                  >
                    {searching ?
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> :
                      <SearchIcon className="mr-2 h-4 w-4" />}
                    {searching ? "Searching..." : t("search-hospitals").split('...')[0]}
                  </Button>

                  <Button
                    type="button"
                    className="py-5 rounded-lg bg-red-500 hover:bg-red-600 shadow-md"
                    onClick={() => {
                      if (mockHospitals.length > 0) {
                        handleEmergencyCall(mockHospitals[0]);
                      }
                    }}
                    disabled={emergencyCallActive}
                  >
                    {emergencyCallActive ?
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> :
                      <Ambulance className="mr-2 h-4 w-4" />}
                    {emergencyCallActive ? "Connecting..." : "Emergency SOS"}
                  </Button>
                </div>
              </form>
            </motion.div>

            {searchPerformed && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {searchResults.length > 0 ? (
                  <HospitalSearchResults
                    hospitals={searchResults}
                    onSelectHospital={(hospital) => setSelectedHospital(hospital)}
                    selectedHospitalId={selectedHospital?.id || null}
                    isLoading={searching}
                    onQrCodeShow={openQrCode}
                  />
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md">
                    <p className="text-gray-500 dark:text-gray-400">
                      No hospitals found matching your search criteria.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* QR Code Dialog */}
        <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Hospital Information QR Code</DialogTitle>
            </DialogHeader>

            {selectedHospital && (
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg mb-4">
                  <QRCode
                    value={generateQrCodeData(selectedHospital)}
                    size={200}
                    level="H"
                    includeMargin={true}
                    renderAs="svg"
                  />
                </div>

                <p className="text-sm text-center text-gray-500">
                  Scan this QR code to get detailed information about {selectedHospital.name}
                </p>

                <div className="mt-4 space-y-2 w-full text-sm">
                  <div className="flex items-start">
                    <Building className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{selectedHospital.name}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{selectedHospital.address}</span>
                  </div>
                  <div className="flex items-start">
                    <Phone className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{selectedHospital.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <Clock className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{selectedHospital.operatingHours}</span>
                  </div>
                </div>

                <div className="mt-4 w-full">
                  <Button
                    className="w-full"
                    onClick={() => {
                      // In a real app, this would save the QR code to gallery
                      toast({
                        title: "QR Code Saved",
                        description: "The QR code has been saved to your gallery",
                      });
                      setQrDialogOpen(false);
                    }}
                  >
                    Save QR to Gallery
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Emergency Call Dialog */}
        <Dialog open={showEmergencyCallDialog} onOpenChange={setShowEmergencyCallDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-red-600 dark:text-red-500">Emergency Call Confirmation</DialogTitle>
            </DialogHeader>

            {selectedHospital && (
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-center text-red-700 dark:text-red-400">
                    You are about to place an emergency call to:
                  </p>
                  <p className="text-center font-bold text-red-800 dark:text-red-300 text-lg mt-2">
                    {selectedHospital.name}
                  </p>
                  <p className="text-center text-red-600 dark:text-red-400 mt-1">
                    {selectedHospital.phone}
                  </p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  This will request immediate emergency assistance. Only proceed if this is a genuine emergency.
                </p>

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowEmergencyCallDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={confirmEmergencyCall}
                  >
                    Confirm Emergency
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* AI Chatbot Dialog */}
        <Dialog open={chatbotDialogOpen} onOpenChange={setChatbotDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center flex items-center justify-center gap-2">
                <span className="text-blue-500">🤖</span> MediBot Assistant
              </DialogTitle>
            </DialogHeader>

            <div className="h-80 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
              {chatbotMessages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-3 ${message.isUser ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-500 text-white dark:bg-blue-600'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    } max-w-[80%]`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask about hospitals, specialties, or emergencies..."
                value={chatbotInput}
                onChange={(e) => setChatbotInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleChatbotSend();
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleChatbotSend}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Navbar />
      </div>
    </div>
  );
};

export default Search;
