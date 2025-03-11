
import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Hospital, Users, Clock, TrendingUp } from 'lucide-react';

interface HospitalData {
  id: string;
  name: string;
  icuBeds: number;
  totalBeds: number;
  aiSurvivalRate: number;
}

interface PatientData {
  id: string;
  severity: string;
  estimatedSurvivalRate: number;
  aiRecommendedHospital: string;
}

interface HospitalDashboardProps {
  hospitals: HospitalData[];
  patientData: PatientData;
  theme?: string;
}

const HospitalDashboard: React.FC<HospitalDashboardProps> = ({ hospitals, patientData, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  
  // Prepare data for charts
  const bedAvailabilityData = hospitals.slice(0, 5).map(hospital => ({
    name: hospital.name.split(' ')[0],
    totalBeds: hospital.totalBeds,
    availableBeds: hospital.totalBeds - (hospital.totalBeds - hospital.icuBeds),
    icuBeds: hospital.icuBeds,
  }));

  const survivalRateData = hospitals.slice(0, 6).map(hospital => ({
    name: hospital.name.split(' ')[0],
    rate: hospital.aiSurvivalRate,
  }));

  // Mock time series data for ICU occupancy (in a real app, this would come from a backend)
  const timeSeriesData = [
    { time: '00:00', occupancy: 85 },
    { time: '04:00', occupancy: 78 },
    { time: '08:00', occupancy: 82 },
    { time: '12:00', occupancy: 90 },
    { time: '16:00', occupancy: 95 },
    { time: '20:00', occupancy: 88 },
    { time: 'Now', occupancy: 92 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Calculate summaries
  const totalICUBeds = hospitals.reduce((sum, h) => sum + h.icuBeds, 0);
  const totalBeds = hospitals.reduce((sum, h) => sum + h.totalBeds, 0);
  const averageSurvivalRate = Math.round(
    hospitals.reduce((sum, h) => sum + h.aiSurvivalRate, 0) / hospitals.length
  );
  
  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 mb-4 shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Emergency Dashboard</h3>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className={`${isDark ? 'bg-blue-900/20' : 'bg-blue-50'} p-3 rounded-lg`}>
          <div className="flex items-center mb-1">
            <Hospital size={16} className={`${isDark ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
            <span className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Available ICU Beds</span>
          </div>
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>{totalICUBeds}</span>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} ml-2`}>of {totalBeds} total</span>
          </div>
        </div>
        
        <div className={`${isDark ? 'bg-green-900/20' : 'bg-green-50'} p-3 rounded-lg`}>
          <div className="flex items-center mb-1">
            <TrendingUp size={16} className={`${isDark ? 'text-green-400' : 'text-green-600'} mr-2`} />
            <span className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Avg. Survival Rate</span>
          </div>
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-700'}`}>{averageSurvivalRate}%</span>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} ml-2`}>across hospitals</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* ICU Bed Availability Chart */}
        <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} p-3 rounded-lg`}>
          <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>ICU Bed Availability</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bedAvailabilityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDark ? '#333' : '#ddd'} />
                <XAxis type="number" domain={[0, 'dataMax']} stroke={isDark ? '#888' : '#666'} tick={{fontSize: 10}} />
                <YAxis dataKey="name" type="category" width={40} stroke={isDark ? '#888' : '#666'} tick={{fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#333' : '#fff', 
                    borderColor: isDark ? '#444' : '#ddd',
                    color: isDark ? '#eee' : '#333',
                    fontSize: '12px',
                    borderRadius: '4px'
                  }}
                />
                <Bar dataKey="icuBeds" stackId="a" fill={isDark ? "#4ade80" : "#22c55e"} name="Available ICU" />
                <Bar dataKey="totalBeds" stackId="a" fill={isDark ? "#d1d5db" : "#e5e7eb"} name="Total Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Survival Rate Chart */}
        <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} p-3 rounded-lg`}>
          <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>AI Survival Rate</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={survivalRateData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="rate"
                  nameKey="name"
                  label={({ name, rate }) => `${name}: ${rate}%`}
                  labelLine={false}
                >
                  {survivalRateData.map((entry, index) => (
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
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* ICU Occupancy Trend */}
      <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} p-3 rounded-lg`}>
        <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>ICU Occupancy Trend (24h)</h4>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#333' : '#ddd'} />
              <XAxis dataKey="time" stroke={isDark ? '#888' : '#666'} tick={{fontSize: 10}} />
              <YAxis domain={[50, 100]} stroke={isDark ? '#888' : '#666'} tick={{fontSize: 10}} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#333' : '#fff', 
                  borderColor: isDark ? '#444' : '#ddd',
                  color: isDark ? '#eee' : '#333',
                  fontSize: '12px',
                  borderRadius: '4px'
                }}
              />
              <Line type="monotone" dataKey="occupancy" stroke={isDark ? "#3b82f6" : "#2563eb"} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
