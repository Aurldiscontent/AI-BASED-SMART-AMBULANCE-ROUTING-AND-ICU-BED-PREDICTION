
import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';

export interface MedicalAnalyticsProps {
  theme?: string;
}

const MedicalAnalytics: React.FC<MedicalAnalyticsProps> = ({ theme: propTheme }) => {
  const { theme: contextTheme } = useTheme();
  const isDark = (propTheme || contextTheme) === 'dark';
  const { t } = useLanguage();
  
  // Sample data for patient survival rate by hospital
  const survivalRateData = [
    { name: 'City General', rate: 92 },
    { name: 'Memorial', rate: 88 },
    { name: 'Community', rate: 85 },
    { name: 'St. Mary\'s', rate: 90 },
    { name: 'Lakeside', rate: 83 },
  ];
  
  // Sample data for emergency response time trend
  const responseTimeData = [
    { month: 'Jan', time: 9.2 },
    { month: 'Feb', time: 8.7 },
    { month: 'Mar', time: 8.1 },
    { month: 'Apr', time: 7.8 },
    { month: 'May', time: 7.5 },
    { month: 'Jun', time: 7.3 },
    { month: 'Jul', time: 7.0 },
  ];
  
  // Sample data for incidents by category
  const incidentsByCategoryData = [
    { name: 'Trauma', value: 45 },
    { name: 'Cardiac', value: 30 },
    { name: 'Respiratory', value: 15 },
    { name: 'Others', value: 10 },
  ];
  
  // Sample data for ICU occupancy forecast
  const icuForecastData = [
    { day: 'Today', occupancy: 85 },
    { day: 'Tomorrow', occupancy: 87 },
    { day: 'Day 3', occupancy: 90 },
    { day: 'Day 4', occupancy: 88 },
    { day: 'Day 5', occupancy: 83 },
    { day: 'Day 6', occupancy: 82 },
    { day: 'Day 7', occupancy: 80 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h3 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'} mb-2`}>
        {t('medical-response-analytics')}
      </h3>
      
      {/* Patient Survival Rate Chart */}
      <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} p-3 rounded-lg`}>
        <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {t('patient-survival-rate')}
        </h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={survivalRateData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke={isDark ? '#333' : '#ddd'} />
              <XAxis 
                type="number" 
                domain={[80, 100]} 
                tick={{ fontSize: 10 }} 
                stroke={isDark ? '#888' : '#666'} 
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                tick={{ fontSize: 10 }} 
                width={80} 
                stroke={isDark ? '#888' : '#666'} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#333' : '#fff',
                  borderColor: isDark ? '#444' : '#ddd',
                  color: isDark ? '#eee' : '#333',
                  fontSize: '12px',
                  borderRadius: '4px'
                }}
                formatter={(value: any) => [`${value}%`, 'Survival Rate']}
              />
              <Bar dataKey="rate" fill={isDark ? "#4ade80" : "#22c55e"} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Emergency Response Time Chart */}
      <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} p-3 rounded-lg`}>
        <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {t('emergency-response-time')}
        </h4>
        <div className="h-28">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={responseTimeData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#ddd'} />
              <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke={isDark ? '#888' : '#666'} />
              <YAxis domain={[6, 10]} tick={{ fontSize: 9 }} stroke={isDark ? '#888' : '#666'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#333' : '#fff',
                  borderColor: isDark ? '#444' : '#ddd',
                  color: isDark ? '#eee' : '#333',
                  fontSize: '12px',
                  borderRadius: '4px'
                }}
                formatter={(value: any) => [`${value} min`, 'Avg. Response Time']}
              />
              <defs>
                <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isDark ? "#3b82f6" : "#2563eb"} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={isDark ? "#3b82f6" : "#2563eb"} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="time" 
                stroke={isDark ? "#3b82f6" : "#2563eb"} 
                fillOpacity={1} 
                fill="url(#responseGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Incidents by Category Chart */}
        <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} p-3 rounded-lg`}>
          <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('incidents-by-category')}
          </h4>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentsByCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={45}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {incidentsByCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#333' : '#fff',
                    borderColor: isDark ? '#444' : '#ddd',
                    color: isDark ? '#eee' : '#333',
                    fontSize: '12px',
                    borderRadius: '4px'
                  }}
                  formatter={(value: any) => [`${value}%`, 'Incidents']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-1 mt-1">
            {incidentsByCategoryData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center text-xs">
                <div 
                  className="w-2 h-2 rounded-full mr-1" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* ICU Occupancy Forecast Chart */}
        <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} p-3 rounded-lg`}>
          <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('icu-occupancy-forecast')}
          </h4>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={icuForecastData}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#333' : '#ddd'} />
                <XAxis dataKey="day" tick={{ fontSize: 8 }} stroke={isDark ? '#888' : '#666'} />
                <YAxis domain={[75, 95]} tick={{ fontSize: 8 }} stroke={isDark ? '#888' : '#666'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#333' : '#fff',
                    borderColor: isDark ? '#444' : '#ddd',
                    color: isDark ? '#eee' : '#333',
                    fontSize: '12px',
                    borderRadius: '4px'
                  }}
                  formatter={(value: any) => [`${value}%`, 'Occupancy']}
                />
                <Bar 
                  dataKey="occupancy" 
                  fill={isDark ? "#f59e0b" : "#d97706"} 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MedicalAnalytics;
