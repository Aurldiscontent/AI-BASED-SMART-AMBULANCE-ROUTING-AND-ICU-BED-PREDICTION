
import React from 'react';
import { HeartPulse, Thermometer, ThermometerSun, AlertCircle, AlertTriangle } from 'lucide-react';

interface SeverityDetectorProps {
  currentSeverity: 'Low' | 'Moderate' | 'High' | 'Critical';
  onSeverityChange: (severity: 'Low' | 'Moderate' | 'High' | 'Critical') => void;
}

const SeverityDetector: React.FC<SeverityDetectorProps> = ({ 
  currentSeverity, 
  onSeverityChange 
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Patient Severity</span>
      <div className="flex gap-1">
        <button
          onClick={() => onSeverityChange('Low')}
          className={`flex-1 py-2 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
            currentSeverity === 'Low' 
              ? 'bg-gradient-to-b from-green-100 to-green-200 border border-green-300 shadow-md transform scale-105' 
              : 'bg-gray-100 dark:bg-gray-800 border border-transparent hover:bg-green-50 dark:hover:bg-green-900/20'
          }`}
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${
            currentSeverity === 'Low' ? 'bg-green-200 text-green-700' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            <Thermometer size={14} className={`${currentSeverity === 'Low' ? 'text-green-600' : ''}`} />
          </div>
          <span className="text-xs font-medium">Low</span>
        </button>
        
        <button
          onClick={() => onSeverityChange('Moderate')}
          className={`flex-1 py-2 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
            currentSeverity === 'Moderate' 
              ? 'bg-gradient-to-b from-blue-100 to-blue-200 border border-blue-300 shadow-md transform scale-105' 
              : 'bg-gray-100 dark:bg-gray-800 border border-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20'
          }`}
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${
            currentSeverity === 'Moderate' ? 'bg-blue-200 text-blue-700' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            <ThermometerSun size={14} className={`${currentSeverity === 'Moderate' ? 'text-blue-600' : ''}`} />
          </div>
          <span className="text-xs font-medium">Medium</span>
        </button>
        
        <button
          onClick={() => onSeverityChange('High')}
          className={`flex-1 py-2 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
            currentSeverity === 'High' 
              ? 'bg-gradient-to-b from-amber-100 to-amber-200 border border-amber-300 shadow-md transform scale-105' 
              : 'bg-gray-100 dark:bg-gray-800 border border-transparent hover:bg-amber-50 dark:hover:bg-amber-900/20'
          }`}
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${
            currentSeverity === 'High' ? 'bg-amber-200 text-amber-700' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            <AlertCircle size={14} className={`${currentSeverity === 'High' ? 'text-amber-600' : ''}`} />
          </div>
          <span className="text-xs font-medium">High</span>
        </button>
        
        <button
          onClick={() => onSeverityChange('Critical')}
          className={`flex-1 py-2 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
            currentSeverity === 'Critical' 
              ? 'bg-gradient-to-b from-emergency-100 to-emergency-200 border border-emergency-300 shadow-md transform scale-105' 
              : 'bg-gray-100 dark:bg-gray-800 border border-transparent hover:bg-emergency-50 dark:hover:bg-emergency-900/20'
          }`}
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${
            currentSeverity === 'Critical' ? 'bg-emergency-200 text-emergency-700 animate-pulse' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            <AlertTriangle size={14} className={`${currentSeverity === 'Critical' ? 'text-emergency-600' : ''}`} />
          </div>
          <span className="text-xs font-medium">Critical</span>
        </button>
      </div>
    </div>
  );
};

export default SeverityDetector;
