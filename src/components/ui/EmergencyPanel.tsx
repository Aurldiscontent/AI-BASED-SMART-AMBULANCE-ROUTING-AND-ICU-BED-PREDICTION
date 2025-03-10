
import React from 'react';
import { AlertTriangle, Phone, Siren } from 'lucide-react';
import ActionButton from './ActionButton';

interface EmergencyPanelProps {
  onSOSClick: () => void;
  onEmergencyCall: () => void;
}

const EmergencyPanel: React.FC<EmergencyPanelProps> = ({
  onSOSClick,
  onEmergencyCall
}) => {
  return (
    <div className="fixed bottom-24 left-0 right-0 px-4 z-30 animate-fade-in">
      <div className="relative">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-emergency-500/20 to-emergency-500/5 rounded-2xl blur-xl"
          style={{ transform: 'scale(0.95) translateY(5px)' }}
        />
        <div className="glass-card border-emergency-500/30 rounded-2xl p-4 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <AlertTriangle className="text-emergency-500 mr-2" size={20} />
              <h3 className="font-semibold text-gray-800">Emergency Access</h3>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">
            Need immediate assistance? Use these emergency options:
          </p>
          
          <div className="flex gap-3">
            <ActionButton
              variant="outline"
              fullWidth
              icon={<Phone size={18} />}
              onClick={onEmergencyCall}
            >
              Emergency Call
            </ActionButton>
            
            <ActionButton
              variant="emergency"
              fullWidth
              icon={<Siren size={18} />}
              onClick={onSOSClick}
            >
              SOS
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPanel;
