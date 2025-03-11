
import React from 'react';
import { Phone, Navigation, Heart, Map, AlertCircle, Clock, Zap, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import ActionButton from './ActionButton';

interface HospitalCardProps {
  id: string;
  name: string;
  distance: string;
  address: string;
  icuBeds: number;
  totalBeds: number;
  isOpen: boolean;
  estimatedTime: string;
  phone: string;
  specialties?: string[];
  aiSurvivalRate?: number;
  lastUpdated?: string;
  trafficCondition?: string;
  severity?: 'Low' | 'Moderate' | 'High' | 'Critical';
  isRecommended?: boolean;
  onNavigate: () => void;
  onCall: () => void;
  onClick?: () => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({
  id,
  name,
  distance,
  address,
  icuBeds,
  totalBeds,
  isOpen,
  estimatedTime,
  phone,
  specialties = [],
  aiSurvivalRate = 0,
  lastUpdated = '',
  trafficCondition = 'Moderate',
  severity = 'Moderate',
  isRecommended = false,
  onNavigate,
  onCall,
  onClick,
}) => {
  const hasAvailableBeds = icuBeds > 0;
  const isUrgent = severity === 'Critical' || severity === 'High';
  const isSuitable = hasAvailableBeds && (aiSurvivalRate > 85 || !isUrgent);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mb-4 overflow-hidden"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div 
        className={`glass-card rounded-2xl p-4 border-l-4 cursor-pointer ${
          isRecommended 
            ? 'border-l-medical-500' 
            : isSuitable 
              ? 'border-l-green-500' 
              : !hasAvailableBeds && isUrgent 
                ? 'border-l-emergency-500' 
                : 'border-l-transparent'
        }`}
        onClick={onClick}
      >
        {isRecommended && (
          <div className="flex items-center mb-2 bg-medical-50 dark:bg-medical-900/30 p-1.5 rounded-lg">
            <Award size={14} className="text-medical-500 mr-1.5" />
            <span className="text-xs font-medium text-medical-700 dark:text-medical-300">AI Recommended Hospital</span>
          </div>
        )}
        
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-0.5 text-left">{name}</h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
              <Map size={14} className="mr-1" />
              <span>{distance} • {estimatedTime}</span>
              {trafficCondition === 'Heavy' && (
                <span className="ml-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded-full text-xs">
                  Heavy Traffic
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-left">{address}</p>
          </div>
          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${isOpen ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'}`}>
            {isOpen ? 'Open' : 'Closing Soon'}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 my-3">
          <div className="flex flex-col bg-gray-50 dark:bg-gray-700/30 rounded-lg p-2">
            <div className="flex items-center mb-1">
              <Heart 
                size={14} 
                className={`${hasAvailableBeds ? 'text-green-600 dark:text-green-400' : 'text-emergency-500 dark:text-emergency-400'} mr-1`} 
                fill={hasAvailableBeds ? '#10b981' : '#ef4444'} 
              />
              <span className="text-xs font-semibold">ICU Availability</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold ${hasAvailableBeds ? 'text-green-700 dark:text-green-400' : 'text-emergency-600 dark:text-emergency-400'}`}>
                {icuBeds} {icuBeds === 1 ? 'Bed' : 'Beds'}
              </span>
              {!hasAvailableBeds && (
                <div className="flex items-center">
                  <AlertCircle size={12} className="text-amber-500 mr-1" />
                  <span className="text-xs text-amber-600 dark:text-amber-400">Full</span>
                </div>
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                of {totalBeds}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col bg-gray-50 dark:bg-gray-700/30 rounded-lg p-2">
            <div className="flex items-center mb-1">
              <TrendingUp 
                size={14} 
                className={`${aiSurvivalRate > 85 ? 'text-green-600 dark:text-green-400' : 'text-amber-500 dark:text-amber-400'} mr-1`}
              />
              <span className="text-xs font-semibold">AI Survival Rate</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-600 h-1.5 rounded-full">
                <div 
                  className={`h-full rounded-full ${
                    aiSurvivalRate > 90 
                      ? 'bg-green-500' 
                      : aiSurvivalRate > 80 
                        ? 'bg-green-400' 
                        : 'bg-amber-500'
                  }`} 
                  style={{ width: `${aiSurvivalRate}%` }}
                />
              </div>
              <span className="ml-2 text-sm font-bold">{aiSurvivalRate}%</span>
            </div>
          </div>
        </div>
        
        {specialties.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {specialties.map((specialty, index) => (
              <span 
                key={`${id}-specialty-${index}`}
                className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
          <Clock size={12} className="mr-1" />
          <span>Updated {lastUpdated}</span>
        </div>
        
        <div className="flex gap-2 mt-3">
          <ActionButton 
            variant="outline" 
            fullWidth 
            size="sm"
            icon={<Phone size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              onCall();
            }}
          >
            Call
          </ActionButton>
          <ActionButton 
            variant="medical" 
            fullWidth 
            size="sm"
            icon={<Navigation size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate();
            }}
          >
            Navigate
          </ActionButton>
        </div>
      </div>
    </motion.div>
  );
};

export default HospitalCard;
