
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search...", 
  onSearch,
  className = ""
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = new FormData(form).get('query') as string;
    if (onSearch) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <input
        type="text"
        name="query"
        placeholder={placeholder}
        className="input-field w-full pl-10 pr-4 py-3 dark:bg-gray-800/70 dark:text-white"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
        <Search size={18} />
      </div>
    </form>
  );
};

export default SearchBar;
