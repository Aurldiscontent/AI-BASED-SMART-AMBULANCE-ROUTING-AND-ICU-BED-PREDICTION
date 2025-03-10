
import React from 'react';
import { Phone, Navigation, Heart, Map, AlertCircle } from 'lucide-react';
import ActionButton from './ActionButton';

interface HospitalCardProps {
  name: string;
  distance: string;
  address: string;
  icuBeds: number;
  totalBeds: number;
  isOpen: boolean;
  estimatedTime: string;
  phone: string;
  onNavigate: () => void;
  onCall: () => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({
  name,
  distance,
  address,
  icuBeds,
  totalBeds,
  isOpen,
  estimatedTime,
  phone,
  onNavigate,
  onCall,
}) => {
  const hasAvailableBeds = icuBeds > 0;
  
  return (
    <div className="w-full mb-4 overflow-hidden animate-fade-in">
      <div className="glass-card rounded-2xl p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-0.5 text-left">{name}</h3>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Map size={14} className="mr-1" />
              <span>{distance} • {estimatedTime}</span>
            </div>
            <p className="text-xs text-gray-500 text-left">{address}</p>
          </div>
          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${isOpen ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
            {isOpen ? 'Open' : 'Closing Soon'}
          </div>
        </div>
        
        <div className="flex items-center justify-between my-3 px-1">
          <div className="flex items-center">
            <Heart 
              size={16} 
              className={`${hasAvailableBeds ? 'text-green-600' : 'text-emergency-500'} mr-1.5`} 
              fill={hasAvailableBeds ? '#10b981' : '#ef4444'} 
            />
            <span className={`text-sm font-medium ${hasAvailableBeds ? 'text-green-700' : 'text-emergency-600'}`}>
              {icuBeds} ICU {icuBeds === 1 ? 'Bed' : 'Beds'}
            </span>
            {!hasAvailableBeds && (
              <div className="ml-2 flex items-center">
                <AlertCircle size={14} className="text-amber-500 mr-1" />
                <span className="text-xs text-amber-600">Full</span>
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {totalBeds} Total Beds
          </div>
        </div>
        
        <div className="flex gap-2 mt-3">
          <ActionButton 
            variant="outline" 
            fullWidth 
            size="sm"
            icon={<Phone size={16} />}
            onClick={onCall}
          >
            Call
          </ActionButton>
          <ActionButton 
            variant="medical" 
            fullWidth 
            size="sm"
            icon={<Navigation size={16} />}
            onClick={onNavigate}
          >
            Navigate
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
