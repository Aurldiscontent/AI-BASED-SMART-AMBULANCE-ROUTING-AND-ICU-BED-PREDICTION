
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell } from 'recharts';
import { Theme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';

export interface EnhancedICUAvailabilityProps {
  data: {
    hospital: string;
    available: number;
    total: number;
    waitTime: number;
    occupancyRate: number;
  }[];
  theme?: Theme;
}

const EnhancedICUAvailability: React.FC<EnhancedICUAvailabilityProps> = ({ data, theme }) => {
  const isDark = theme === 'dark';
  const { t } = useLanguage();

  const COLORS = isDark
    ? ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#0088FE', '#00C49F']
    : ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#0088FE', '#00C49F'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={`text-md font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
        {t('icu-bed-occupancy')}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className={isDark ? 'stroke-gray-700' : 'stroke-gray-200'} />
          <XAxis 
            dataKey="hospital" 
            className={isDark ? 'text-gray-400' : 'text-gray-600'} 
            tick={{ fontSize: 12 }} 
            angle={-20} 
            textAnchor="end" 
            height={50} 
          />
          <YAxis 
            className={isDark ? 'text-gray-400' : 'text-gray-600'} 
            tick={{ fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: isDark ? '#374151' : '#fff', border: 'none' }}
            labelStyle={{ color: isDark ? '#fff' : '#374151' }}
            itemStyle={{ color: isDark ? '#fff' : '#374151' }}
          />
          <Legend wrapperStyle={{ color: isDark ? '#fff' : '#374151' }} />
          <Bar dataKey="available" name={t('available-beds')} fill="#82ca9d" />
          <Bar dataKey="total" name={t('total-beds')} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3 className={`text-md font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mt-6 mb-3`}>
        {t('hospital-wait-times')}
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="waitTime"
          >
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: isDark ? '#374151' : '#fff', border: 'none' }}
            labelStyle={{ color: isDark ? '#fff' : '#374151' }}
            itemStyle={{ color: isDark ? '#fff' : '#374151' }}
          />
          <Legend wrapperStyle={{ color: isDark ? '#fff' : '#374151' }} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default EnhancedICUAvailability;
