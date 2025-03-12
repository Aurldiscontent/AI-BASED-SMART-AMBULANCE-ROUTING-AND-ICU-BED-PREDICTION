
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ThumbsUp } from 'lucide-react';

interface PatientSeveritySelectorProps {
  severity: 'critical' | 'non-critical';
  onChange: (severity: 'critical' | 'non-critical') => void;
  theme?: 'dark' | 'light';
}

const PatientSeveritySelector: React.FC<PatientSeveritySelectorProps> = ({ 
  severity, 
  onChange,
  theme = 'light'
}) => {
  const isDark = theme === 'dark';

  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className={`block text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Patient Severity
        </label>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          className={`flex items-center justify-center gap-2 py-3 ${
            severity === 'non-critical'
              ? isDark
                ? 'bg-green-700 hover:bg-green-600 text-white'
                : 'bg-green-600 hover:bg-green-500 text-white'
              : isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          onClick={() => onChange('non-critical')}
        >
          <ThumbsUp size={16} />
          Non-Critical
        </Button>
        
        <Button
          type="button"
          className={`flex items-center justify-center gap-2 py-3 ${
            severity === 'critical'
              ? isDark
                ? 'bg-red-700 hover:bg-red-600 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white'
              : isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          onClick={() => onChange('critical')}
        >
          <AlertTriangle size={16} />
          Critical
        </Button>
      </div>
    </div>
  );
};

export default PatientSeveritySelector;
