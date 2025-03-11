
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
}

const HospitalDashboard: React.FC<HospitalDashboardProps> = ({ hospitals, patientData }) => {
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
    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
      <h3 className="text-lg font-bold mb-4">Emergency Dashboard</h3>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <Hospital size={16} className="text-medical-600 mr-2" />
            <span className="text-sm font-semibold">Available ICU Beds</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-medical-700">{totalICUBeds}</span>
            <span className="text-xs text-gray-500 ml-2">of {totalBeds} total</span>
          </div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <TrendingUp size={16} className="text-green-600 mr-2" />
            <span className="text-sm font-semibold">Avg. Survival Rate</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-green-700">{averageSurvivalRate}%</span>
            <span className="text-xs text-gray-500 ml-2">across hospitals</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* ICU Bed Availability Chart */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">ICU Bed Availability</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bedAvailabilityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 'dataMax']} />
                <YAxis dataKey="name" type="category" width={40} />
                <Tooltip />
                <Bar dataKey="icuBeds" stackId="a" fill="#4ade80" name="Available ICU" />
                <Bar dataKey="totalBeds" stackId="a" fill="#d1d5db" name="Total Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Survival Rate Chart */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">AI Survival Rate</h4>
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* ICU Occupancy Trend */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <h4 className="text-sm font-semibold mb-2">ICU Occupancy Trend (24h)</h4>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" />
              <YAxis domain={[50, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="occupancy" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
