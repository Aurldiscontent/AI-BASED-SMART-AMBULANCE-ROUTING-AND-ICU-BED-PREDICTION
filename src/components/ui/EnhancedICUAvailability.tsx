
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Bed, Activity, AlertCircle, TrendingUp, InfoIcon } from 'lucide-react';

interface ICUBedData {
  hospital: string;
  available: number;
  total: number;
  waitTime: number;
  occupancyRate: number;
}

interface EnhancedICUAvailabilityProps {
  data: ICUBedData[];
}

const EnhancedICUAvailability: React.FC<EnhancedICUAvailabilityProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return '#4ADE80'; // Green for good availability
    if (ratio > 0.2) return '#FBBF24'; // Yellow for moderate
    return '#EF4444'; // Red for low
  };
  
  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };
  
  const handleMouseLeave = () => {
    setActiveIndex(null);
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
          <Bed className="text-medical-500 h-5 w-5" />
          <h3 className="text-lg font-bold">ICU Bed Availability</h3>
        </div>
        <div className="flex space-x-3 text-xs">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
            <span>High</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
            <span>Medium</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
            <span>Critical</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 'dataMax']} />
            <YAxis dataKey="hospital" type="category" width={100} />
            <Tooltip 
              formatter={(value, name) => [`${value} beds`, name === 'available' ? 'Available' : 'Total']}
              labelFormatter={(label) => `Hospital: ${label}`}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: 'none'
              }}
            />
            <Legend />
            <Bar 
              dataKey="available" 
              name="Available ICU Beds" 
              radius={[4, 4, 4, 4]}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getAvailabilityColor(entry.available, entry.total)}
                  opacity={activeIndex === index ? 1 : 0.8}
                  style={{
                    filter: activeIndex === index ? 'drop-shadow(0px 0px 6px rgba(0,0,0,0.2))' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Bar>
            <Bar 
              dataKey="total" 
              name="Total Capacity" 
              radius={[4, 4, 4, 4]}
              fill="#E5E7EB"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg transition-all duration-300 hover:shadow-md"
        >
          <div className="flex items-center text-blue-600 dark:text-blue-400 mb-1">
            <Activity size={14} className="mr-1" />
            <span className="text-xs font-medium">Avg. Occupancy</span>
          </div>
          <p className="text-lg font-bold">
            {Math.round(data.reduce((acc, curr) => acc + curr.occupancyRate, 0) / data.length)}%
          </p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg transition-all duration-300 hover:shadow-md"
        >
          <div className="flex items-center text-purple-600 dark:text-purple-400 mb-1">
            <TrendingUp size={14} className="mr-1" />
            <span className="text-xs font-medium">Bed Turnover</span>
          </div>
          <p className="text-lg font-bold">4.2/day</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg transition-all duration-300 hover:shadow-md"
        >
          <div className="flex items-center text-amber-600 dark:text-amber-400 mb-1">
            <AlertCircle size={14} className="mr-1" />
            <span className="text-xs font-medium">Wait Time</span>
          </div>
          <p className="text-lg font-bold">
            {Math.round(data.reduce((acc, curr) => acc + curr.waitTime, 0) / data.length)} min
          </p>
        </motion.div>
      </div>
      
      {/* Add info tip at the bottom */}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
        <InfoIcon size={12} className="mr-1" />
        <span>Click on bars for detailed statistics</span>
      </div>
    </motion.div>
  );
};

export default EnhancedICUAvailability;
