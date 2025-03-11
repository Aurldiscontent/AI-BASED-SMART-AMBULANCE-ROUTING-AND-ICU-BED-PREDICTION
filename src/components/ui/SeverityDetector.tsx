
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
      <span className="text-xs font-medium text-gray-500 mb-2">Patient Severity</span>
      <div className="flex gap-1">
        <button
          onClick={() => onSeverityChange('Low')}
          className={`flex-1 py-1.5 rounded-lg flex flex-col items-center transition ${
            currentSeverity === 'Low' 
              ? 'bg-green-100 border border-green-200' 
              : 'bg-gray-100 border border-transparent hover:bg-gray-200'
          }`}
        >
          <Thermometer size={14} className="text-green-600 mb-1" />
          <span className="text-xs font-medium">Low</span>
        </button>
        
        <button
          onClick={() => onSeverityChange('Moderate')}
          className={`flex-1 py-1.5 rounded-lg flex flex-col items-center transition ${
            currentSeverity === 'Moderate' 
              ? 'bg-blue-100 border border-blue-200' 
              : 'bg-gray-100 border border-transparent hover:bg-gray-200'
          }`}
        >
          <ThermometerSun size={14} className="text-blue-600 mb-1" />
          <span className="text-xs font-medium">Medium</span>
        </button>
        
        <button
          onClick={() => onSeverityChange('High')}
          className={`flex-1 py-1.5 rounded-lg flex flex-col items-center transition ${
            currentSeverity === 'High' 
              ? 'bg-amber-100 border border-amber-200' 
              : 'bg-gray-100 border border-transparent hover:bg-gray-200'
          }`}
        >
          <AlertCircle size={14} className="text-amber-600 mb-1" />
          <span className="text-xs font-medium">High</span>
        </button>
        
        <button
          onClick={() => onSeverityChange('Critical')}
          className={`flex-1 py-1.5 rounded-lg flex flex-col items-center transition ${
            currentSeverity === 'Critical' 
              ? 'bg-emergency-100 border border-emergency-200 animate-pulse' 
              : 'bg-gray-100 border border-transparent hover:bg-gray-200'
          }`}
        >
          <AlertTriangle size={14} className={`${currentSeverity === 'Critical' ? 'text-emergency-600 animate-pulse' : 'text-gray-600'} mb-1`} />
          <span className="text-xs font-medium">Critical</span>
        </button>
      </div>
    </div>
  );
};

export default SeverityDetector;
