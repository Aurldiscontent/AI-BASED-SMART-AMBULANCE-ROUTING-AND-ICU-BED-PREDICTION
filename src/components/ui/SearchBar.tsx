
import React from 'react';
import { Search, MapPin, Mic } from 'lucide-react';

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = new FormData(form).get('query') as string;
    if (onSearch) onSearch(query);
  };

  const handleVoiceCommand = () => {
    // In a real implementation, this would trigger voice recognition
    console.log('Voice command activated');
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
        <MapPin size={18} />
      </div>
      <input
        type="text"
        name="query"
        placeholder={placeholder}
        className="input-field w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-sm dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-gray-200 focus:ring-medical-500 focus:border-medical-500"
      />
      {showVoiceCommand && (
        <button 
          type="button" 
          onClick={handleVoiceCommand}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-medical-500 dark:text-gray-500 dark:hover:text-medical-400 transition-colors"
        >
          <Mic size={18} />
        </button>
      )}
      <button 
        type="submit" 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-medical-500 dark:text-gray-500 dark:hover:text-medical-400 transition-colors"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
