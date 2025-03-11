
import React, { useState, useEffect } from 'react';
import { Clock, Ambulance, BarChart3, AlertTriangle } from 'lucide-react';

const RealtimeMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    avgResponseTime: 12.5, // minutes
    criticalCasesInTransit: 3,
    ambulancesAvailable: 8,
    incidentsLast24Hours: 42
  });
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        avgResponseTime: parseFloat((prev.avgResponseTime + (Math.random() * 0.6 - 0.3)).toFixed(1)),
        criticalCasesInTransit: Math.max(0, prev.criticalCasesInTransit + (Math.random() > 0.7 ? 1 : Math.random() > 0.7 ? -1 : 0)),
        ambulancesAvailable: Math.max(1, prev.ambulancesAvailable + (Math.random() > 0.8 ? 1 : Math.random() > 0.8 ? -1 : 0)),
        incidentsLast24Hours: prev.incidentsLast24Hours + (Math.random() > 0.9 ? 1 : 0)
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Real-Time Metrics</h3>
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            Live Updates
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-0.5 p-0.5 bg-gray-50">
        <div className="bg-white p-3">
          <div className="flex items-center mb-1">
            <Clock size={14} className="text-medical-600 mr-1.5" />
            <span className="text-xs font-medium">Avg. Response Time</span>
          </div>
          <p className="text-lg font-bold">
            {metrics.avgResponseTime} <span className="text-xs font-normal text-gray-500">min</span>
          </p>
        </div>
        
        <div className="bg-white p-3">
          <div className="flex items-center mb-1">
            <AlertTriangle size={14} className="text-emergency-500 mr-1.5" />
            <span className="text-xs font-medium">Critical Cases In Transit</span>
          </div>
          <p className="text-lg font-bold">
            {metrics.criticalCasesInTransit}
          </p>
        </div>
        
        <div className="bg-white p-3">
          <div className="flex items-center mb-1">
            <Ambulance size={14} className="text-gray-600 mr-1.5" />
            <span className="text-xs font-medium">Ambulances Available</span>
          </div>
          <p className="text-lg font-bold">
            {metrics.ambulancesAvailable}
          </p>
        </div>
        
        <div className="bg-white p-3">
          <div className="flex items-center mb-1">
            <BarChart3 size={14} className="text-blue-600 mr-1.5" />
            <span className="text-xs font-medium">Incidents (24h)</span>
          </div>
          <p className="text-lg font-bold">
            {metrics.incidentsLast24Hours}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealtimeMetrics;
