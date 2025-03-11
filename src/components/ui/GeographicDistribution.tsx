
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Theme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';

export interface DistributionProps {
  regions: {
    id: string;
    name: string;
    incidents: number;
    response: number;
    color: string;
  }[];
  theme?: Theme;
}

const GeographicDistribution: React.FC<DistributionProps> = ({ regions, theme }) => {
  const isDark = theme === 'dark';
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'} mb-4`}>
        {t('geographic-incident-distribution')}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={regions}
            dataKey="incidents"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {regions.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#374151' : '#fff',
              color: isDark ? '#fff' : '#374151',
              borderRadius: '8px',
              padding: '10px',
              border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
            }}
            labelStyle={{ fontWeight: 'bold', color: isDark ? '#fff' : '#374151' }}
            itemStyle={{ color: isDark ? '#fff' : '#374151' }}
            formatter={(value: any, name: string) => [`Incidents: ${value}`, t(name.toLowerCase().replace(/\s+/g, '-'))]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center mt-4">
        {regions.map((region) => (
          <div key={region.id} className="flex items-center mr-4 mb-2">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: region.color }}
            ></div>
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t(region.name.toLowerCase().replace(/\s+/g, '-'))}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default GeographicDistribution;
