
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Activity, Flame, Ambulance, Clock } from 'lucide-react';

interface DistributionProps {
  regions: {
    id: string;
    name: string;
    incidents: number;
    response: number;
    color: string;
  }[];
}

const GeographicDistribution: React.FC<DistributionProps> = ({ regions }) => {
  const [selectedView, setSelectedView] = useState<'incidents' | 'response' | 'hospitals'>('incidents');
  
  // Calculate maximum values for scaling
  const maxIncidents = Math.max(...regions.map(r => r.incidents));
  const maxResponse = Math.max(...regions.map(r => r.response));
  
  const getHeatColor = (value: number, max: number, type: 'incidents' | 'response') => {
    const ratio = value / max;
    
    if (type === 'incidents') {
      // Red gradient for incidents (more incidents = more red)
      if (ratio > 0.7) return '#EF4444'; // High incidents - red
      if (ratio > 0.4) return '#F59E0B'; // Medium incidents - amber
      return '#10B981'; // Low incidents - green
    } else {
      // Green gradient for response time (lower time = more green)
      const inverseRatio = 1 - ratio;
      if (inverseRatio > 0.7) return '#10B981'; // Fast response - green
      if (inverseRatio > 0.4) return '#F59E0B'; // Medium response - amber
      return '#EF4444'; // Slow response - red
    }
  };
  
  const getIntensity = (value: number, max: number) => {
    const ratio = value / max;
    return 0.3 + (ratio * 0.7); // Scale opacity between 30% and 100%
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="text-medical-500 h-5 w-5" />
          <h3 className="text-lg font-bold">Geographic Distribution Analysis</h3>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedView('incidents')}
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              selectedView === 'incidents' 
                ? 'bg-medical-100 text-medical-800 dark:bg-medical-900/30 dark:text-medical-300' 
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center">
              <Flame size={14} className="mr-1" />
              Incidents
            </div>
          </button>
          
          <button 
            onClick={() => setSelectedView('response')}
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              selectedView === 'response' 
                ? 'bg-medical-100 text-medical-800 dark:bg-medical-900/30 dark:text-medical-300' 
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              Response Time
            </div>
          </button>
          
          <button 
            onClick={() => setSelectedView('hospitals')}
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              selectedView === 'hospitals' 
                ? 'bg-medical-100 text-medical-800 dark:bg-medical-900/30 dark:text-medical-300' 
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center">
              <Ambulance size={14} className="mr-1" />
              Hospitals
            </div>
          </button>
        </div>
      </div>
      
      <div className="relative h-64 bg-gray-100 dark:bg-gray-700/50 rounded-lg overflow-hidden">
        {/* Stylized map background */}
        <svg className="absolute inset-0 w-full h-full">
          <rect x="0" y="0" width="100%" height="100%" fill="#F3F4F6" />
          
          {/* Grid lines */}
          <g stroke="#E5E7EB" strokeWidth="1">
            <line x1="0%" y1="25%" x2="100%" y2="25%" />
            <line x1="0%" y1="50%" x2="100%" y2="50%" />
            <line x1="0%" y1="75%" x2="100%" y2="75%" />
            <line x1="25%" y1="0%" x2="25%" y2="100%" />
            <line x1="50%" y1="0%" x2="50%" y2="100%" />
            <line x1="75%" y1="0%" x2="75%" y2="100%" />
          </g>
          
          {/* City outline */}
          <path 
            d="M20,20 L80,30 L90,70 L60,90 L20,80 Z" 
            fill="none" 
            stroke="#D1D5DB" 
            strokeWidth="2"
          />
          
          {/* Major roads */}
          <path 
            d="M30,20 L70,80" 
            fill="none" 
            stroke="#D1D5DB" 
            strokeWidth="1.5"
          />
          <path 
            d="M20,50 L90,50" 
            fill="none" 
            stroke="#D1D5DB" 
            strokeWidth="1.5"
          />
        </svg>
        
        {/* Heatmap overlay */}
        <div className="absolute inset-0">
          {regions.map((region) => {
            // Position each region's heatmap
            // In a real implementation, these would be based on actual geographic coordinates
            const style: React.CSSProperties = {
              position: 'absolute',
              width: `${20 + Math.random() * 15}%`,
              height: `${20 + Math.random() * 15}%`,
              borderRadius: '50%',
              backgroundColor: selectedView === 'hospitals' 
                ? region.color
                : getHeatColor(
                    selectedView === 'incidents' ? region.incidents : region.response,
                    selectedView === 'incidents' ? maxIncidents : maxResponse,
                    selectedView as 'incidents' | 'response'
                  ),
              opacity: getIntensity(
                selectedView === 'incidents' ? region.incidents : region.response,
                selectedView === 'incidents' ? maxIncidents : maxResponse
              ),
              left: `${10 + (parseInt(region.id) * 15) % 70}%`,
              top: `${15 + (parseInt(region.id) * 20) % 60}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 15px rgba(0,0,0,0.1)',
              transition: 'all 0.5s ease'
            };
            
            return (
              <motion.div
                key={region.id}
                style={style}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: parseInt(region.id) * 0.1 }}
                className="flex items-center justify-center"
              >
                {selectedView === 'hospitals' && (
                  <Ambulance className="text-white" size={16} />
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-lg p-2 text-xs">
          <div className="flex items-center mb-1">
            <div 
              className="w-3 h-3 rounded-full mr-1"
              style={{ 
                backgroundColor: selectedView === 'incidents' ? '#EF4444' : 
                                selectedView === 'response' ? '#10B981' : '#8884d8'
              }}
            ></div>
            <span>{selectedView === 'incidents' ? 'High Incidents' : 
                  selectedView === 'response' ? 'Fast Response' : 'Main Hospital'}</span>
          </div>
          <div className="flex items-center mb-1">
            <div 
              className="w-3 h-3 rounded-full mr-1"
              style={{ 
                backgroundColor: selectedView === 'incidents' ? '#F59E0B' : 
                                selectedView === 'response' ? '#F59E0B' : '#82ca9d'
              }}
            ></div>
            <span>{selectedView === 'incidents' ? 'Medium Incidents' : 
                  selectedView === 'response' ? 'Medium Response' : 'Secondary Hospital'}</span>
          </div>
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1"
              style={{ 
                backgroundColor: selectedView === 'incidents' ? '#10B981' : 
                                selectedView === 'response' ? '#EF4444' : '#ffc658'
              }}
            ></div>
            <span>{selectedView === 'incidents' ? 'Low Incidents' : 
                  selectedView === 'response' ? 'Slow Response' : 'Clinic'}</span>
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
          <div className="flex items-center justify-center text-red-600 dark:text-red-400 mb-1">
            <Flame size={14} className="mr-1" />
            <span className="text-xs font-medium">Incidents</span>
          </div>
          <p className="text-lg font-bold">
            {regions.reduce((acc, curr) => acc + curr.incidents, 0)}
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
          <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1">
            <Activity size={14} className="mr-1" />
            <span className="text-xs font-medium">Avg. Response</span>
          </div>
          <p className="text-lg font-bold">
            {(regions.reduce((acc, curr) => acc + curr.response, 0) / regions.length).toFixed(1)} min
          </p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
          <div className="flex items-center justify-center text-green-600 dark:text-green-400 mb-1">
            <Ambulance size={14} className="mr-1" />
            <span className="text-xs font-medium">Hospitals</span>
          </div>
          <p className="text-lg font-bold">{regions.length}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default GeographicDistribution;
