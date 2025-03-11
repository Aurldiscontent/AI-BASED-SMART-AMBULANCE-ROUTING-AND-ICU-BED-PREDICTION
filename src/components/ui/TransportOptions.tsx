
import React from 'react';
import { Truck, Helicopter } from 'lucide-react';

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
        <span className="text-xs font-medium text-gray-500">Transport Mode</span>
        {isAirRecommended && (
          <span className="text-xs font-medium text-emergency-600 animate-pulse">
            Air Recommended
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onModeChange('ground')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center ${
            currentMode === 'ground'
              ? 'bg-gray-200 border border-gray-300'
              : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <Truck size={16} className="text-gray-700 mr-2" />
          <span className="text-xs font-medium">Ground</span>
        </button>
        
        <button
          onClick={() => onModeChange('air')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center ${
            currentMode === 'air'
              ? 'bg-blue-200 border border-blue-300'
              : 'bg-gray-100 border border-gray-200 hover:bg-blue-100'
          } ${isAirRecommended ? 'relative overflow-hidden' : ''}`}
        >
          {isAirRecommended && (
            <div className="absolute inset-0 bg-blue-400 opacity-20 animate-pulse"></div>
          )}
          <Helicopter size={16} className={`${currentMode === 'air' ? 'text-blue-700' : 'text-gray-700'} mr-2`} />
          <span className="text-xs font-medium">Air</span>
        </button>
      </div>
    </div>
  );
};

export default TransportOptions;
