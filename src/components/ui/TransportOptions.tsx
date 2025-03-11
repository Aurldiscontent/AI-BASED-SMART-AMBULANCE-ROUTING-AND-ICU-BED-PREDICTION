
import React from 'react';
import { Truck, Plane } from 'lucide-react';

interface TransportOptionsProps {
  currentMode: 'ground' | 'air';
  onModeChange: (mode: 'ground' | 'air') => void;
  isAirRecommended?: boolean;
}

const TransportOptions: React.FC<TransportOptionsProps> = ({
  currentMode,
  onModeChange,
  isAirRecommended = false
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Transport Mode</span>
        {isAirRecommended && (
          <span className="text-xs font-bold text-emergency-600 dark:text-emergency-500 animate-pulse flex items-center">
            <span className="mr-1">●</span>Air Recommended
          </span>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onModeChange('ground')}
          className={`flex-1 py-3 px-3 rounded-lg flex items-center justify-center transition-all duration-200 ${
            currentMode === 'ground'
              ? 'bg-gradient-to-b from-gray-200 to-gray-300 border border-gray-300 shadow-md transform scale-105'
              : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
            currentMode === 'ground' ? 'bg-gray-300 text-gray-800' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            <Truck size={16} className={`${currentMode === 'ground' ? 'text-gray-800 dark:text-white' : ''}`} />
          </div>
          <span className="text-sm font-medium">Ground</span>
        </button>
        
        <button
          onClick={() => onModeChange('air')}
          className={`flex-1 py-3 px-3 rounded-lg flex items-center justify-center transition-all duration-200 ${
            currentMode === 'air'
              ? 'bg-gradient-to-b from-blue-200 to-blue-300 border border-blue-300 shadow-md transform scale-105'
              : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30'
          } ${isAirRecommended ? 'relative overflow-hidden' : ''}`}
        >
          {isAirRecommended && (
            <div className="absolute inset-0 bg-blue-400 dark:bg-blue-600 opacity-20 animate-pulse"></div>
          )}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
            currentMode === 'air' ? 'bg-blue-300 text-blue-800 dark:bg-blue-700 dark:text-blue-300' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            <Plane size={16} className={`${currentMode === 'air' ? 'text-blue-700 dark:text-blue-300' : ''}`} />
          </div>
          <span className="text-sm font-medium">Air</span>
        </button>
      </div>
    </div>
  );
};

export default TransportOptions;
