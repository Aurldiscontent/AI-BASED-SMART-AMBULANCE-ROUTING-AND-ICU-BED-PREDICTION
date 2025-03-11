
import React, { useState } from 'react';
import { Search, MapPin, Mic } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  showVoiceCommand?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search or enter location...", 
  onSearch,
  className = "",
  showVoiceCommand = true
}) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formQuery = new FormData(form).get('query') as string;
    if (onSearch) onSearch(formQuery);
  };

  const handleVoiceCommand = () => {
    setIsVoiceActive(true);
    
    // In a real implementation, this would trigger voice recognition
    console.log('Voice command activated');
    toast({
      title: "Voice Command Activated",
      description: "Listening for commands...",
    });
    
    // Simulate voice recognition completion after 3 seconds
    setTimeout(() => {
      setIsVoiceActive(false);
      
      // Simulate a voice search result
      const voiceQuery = "nearest hospital with ICU beds";
      setQuery(voiceQuery);
      
      toast({
        title: "Voice Command Detected",
        description: `Searching for: "${voiceQuery}"`,
      });
      
      if (onSearch) onSearch(voiceQuery);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
        <MapPin size={18} className="transition-colors hover:text-medical-500 dark:hover:text-medical-400" />
      </div>
      <input
        type="text"
        name="query"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input-field w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-sm dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-gray-200 focus:ring-medical-500 focus:border-medical-500 transition-colors"
      />
      {showVoiceCommand && (
        <button 
          type="button" 
          onClick={handleVoiceCommand}
          aria-label="Voice Command"
          className={`absolute right-12 top-1/2 transform -translate-y-1/2 ${
            isVoiceActive 
              ? 'text-medical-500 dark:text-medical-400 animate-pulse' 
              : 'text-gray-400 hover:text-medical-500 dark:text-gray-500 dark:hover:text-medical-400'
          } transition-colors hover:scale-110`}
        >
          <Mic size={18} />
        </button>
      )}
      <button 
        type="submit" 
        aria-label="Search"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-medical-500 dark:text-gray-500 dark:hover:text-medical-400 transition-colors hover:scale-110"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
