
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Activity, Flame, Ambulance, Clock, AlertCircle, Map as MapIcon } from 'lucide-react';

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
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  
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
    return 0.4 + (ratio * 0.6); // Scale opacity between 40% and 100%
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
          <MapIcon className="text-medical-500 h-5 w-5" />
          <h3 className="text-lg font-bold">Geographic Distribution Analysis</h3>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedView('incidents')}
            className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
              selectedView === 'incidents' 
                ? 'bg-medical-100 text-medical-800 dark:bg-medical-900/30 dark:text-medical-300 ring-1 ring-medical-200 dark:ring-medical-800' 
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
            className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
              selectedView === 'response' 
                ? 'bg-medical-100 text-medical-800 dark:bg-medical-900/30 dark:text-medical-300 ring-1 ring-medical-200 dark:ring-medical-800' 
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
            className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
              selectedView === 'hospitals' 
                ? 'bg-medical-100 text-medical-800 dark:bg-medical-900/30 dark:text-medical-300 ring-1 ring-medical-200 dark:ring-medical-800' 
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
        {/* Enhanced map background with subtle topography */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
            </pattern>
          </defs>
          
          <rect x="0" y="0" width="100%" height="100%" fill="#F3F4F6" />
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
          
          {/* Topographic features */}
          <path 
            d="M10,40 Q30,35 50,45 T90,40" 
            fill="none" 
            stroke="#E5E7EB" 
            strokeWidth="1" 
          />
          <path 
            d="M10,60 Q30,55 50,65 T90,60" 
            fill="none" 
            stroke="#E5E7EB" 
            strokeWidth="1" 
          />
          
          {/* City outline with more detail */}
          <path 
            d="M20,20 L45,15 L75,25 L90,50 L75,75 L45,85 L20,70 Z" 
            fill="none" 
            stroke="#D1D5DB" 
            strokeWidth="1.5"
          />
          
          {/* Major roads */}
          <path 
            d="M30,20 L70,80 M20,50 L90,50" 
            fill="none" 
            stroke="#D1D5DB" 
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          {/* Rivers or water bodies */}
          <path 
            d="M10,30 Q30,35 40,30 T60,35 T90,30" 
            fill="none" 
            stroke="#BFDBFE" 
            strokeWidth="2" 
          />
        </svg>
        
        {/* Heatmap overlay with improved visual effect */}
        <div className="absolute inset-0">
          {regions.map((region) => {
            // Position each region's heatmap
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
              boxShadow: '0 0 20px rgba(0,0,0,0.1)',
              transition: 'all 0.5s ease',
              filter: hoveredRegion === region.id ? 'brightness(1.2) contrast(1.2)' : 'none'
            };
            
            return (
              <motion.div
                key={region.id}
                style={style}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: parseInt(region.id) * 0.1 }}
                className="flex items-center justify-center cursor-pointer"
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                whileHover={{ scale: 1.1 }}
              >
                {selectedView === 'hospitals' && (
                  <Ambulance className="text-white drop-shadow-md" size={16} />
                )}
                
                {/* Show info tooltip when hovered */}
                {hoveredRegion === region.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-xs z-10 whitespace-nowrap mt-2">
                    <p className="font-semibold">{region.name}</p>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="flex items-center">
                        <Flame size={10} className="text-red-500 mr-1" />
                        <span>{region.incidents} incidents</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={10} className="text-blue-500 mr-1" />
                        <span>{region.response} min</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Enhanced legend with better visual distinction */}
        <div className="absolute bottom-2 right-2 glass-card backdrop-blur-md rounded-lg p-2 text-xs">
          <div className="flex flex-col space-y-1">
            {selectedView === 'incidents' ? (
              <>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full mr-1 bg-red-500 shadow-sm"></div>
                  <span>High Incidents (70+)</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full mr-1 bg-amber-500 shadow-sm"></div>
                  <span>Medium Incidents (40-70)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-1 bg-green-500 shadow-sm"></div>
                  <span>Low Incidents (&lt;40)</span>
                </div>
              </>
            ) : selectedView === 'response' ? (
              <>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full mr-1 bg-green-500 shadow-sm"></div>
                  <span>Fast Response (&lt;6min)</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full mr-1 bg-amber-500 shadow-sm"></div>
                  <span>Medium Response (6-8min)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-1 bg-red-500 shadow-sm"></div>
                  <span>Slow Response (8min+)</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full mr-1 bg-purple-500 shadow-sm"></div>
                  <span>Main Hospital</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full mr-1 bg-green-500 shadow-sm"></div>
                  <span>Secondary Hospital</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-1 bg-amber-500 shadow-sm"></div>
                  <span>Clinic</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Enhanced statistics with interactive elements */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-center text-red-600 dark:text-red-400 mb-1">
            <Flame size={14} className="mr-1" />
            <span className="text-xs font-medium">Incidents</span>
          </div>
          <p className="text-lg font-bold">
            {regions.reduce((acc, curr) => acc + curr.incidents, 0)}
          </p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1">
            <Activity size={14} className="mr-1" />
            <span className="text-xs font-medium">Avg. Response</span>
          </div>
          <p className="text-lg font-bold">
            {(regions.reduce((acc, curr) => acc + curr.response, 0) / regions.length).toFixed(1)} min
          </p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-center text-green-600 dark:text-green-400 mb-1">
            <Ambulance size={14} className="mr-1" />
            <span className="text-xs font-medium">Hospitals</span>
          </div>
          <p className="text-lg font-bold">{regions.length}</p>
        </motion.div>
      </div>
      
      {/* Tip message */}
      <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
        <AlertCircle size={12} className="mr-1" />
        <span>Hover over regions for detailed information</span>
      </div>
    </motion.div>
  );
};

export default GeographicDistribution;
