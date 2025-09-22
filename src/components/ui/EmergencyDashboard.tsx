import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

type ICUData = {
  time: string;
  Manipal: number;
  Fortis: number;
  Sakra: number;
  Apollo: number;
  Aster: number;
  Ramaiah: number;
  Johns: number;
  Rainbow: number;
  Sparsh: number;
  Narayana: number;
};

type ResponseData = {
  time: string;
  avg: number;
};

type CasesData = {
  time: string;
  trauma: number;
  cardiac: number;
  general: number;
};

type EmergencyDashboardProps = {
  data: ICUData[] | ResponseData[] | CasesData[];
  view: 'icu' | 'response' | 'cases';
  theme?: string;
};

const EmergencyDashboard: React.FC<EmergencyDashboardProps> = ({ data, view, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  
  // Adjust colors based on theme
  const colors = {
    text: isDark ? '#ccc' : '#333',
    background: isDark ? '#222' : '#fff',
    grid: isDark ? '#444' : '#ddd',
    tooltip: {
      bg: isDark ? '#222' : '#fff',
      border: isDark ? '#444' : '#ddd',
      text: isDark ? '#fff' : '#333'
    }
  };
  
  if (view === 'icu') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data as ICUData[]}
          margin={{ top: 10, right: 30, left: 0, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis 
            dataKey="time" 
            stroke={colors.text} 
            tick={{ fontSize: 10 }}
            tickMargin={10}
          />
          <YAxis 
            stroke={colors.text} 
            domain={[0, 100]} 
            tick={{ fontSize: 10 }}
            tickMargin={10}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: colors.tooltip.bg, 
              borderColor: colors.tooltip.border, 
              color: colors.tooltip.text,
              fontSize: '12px',
              padding: '8px',
              borderRadius: '4px'
            }}
            labelStyle={{ color: colors.tooltip.text, fontWeight: 'bold', marginBottom: '4px' }}
            itemStyle={{ padding: '2px 0' }}
          />
          <Legend 
            wrapperStyle={{ color: colors.text, fontSize: '11px', paddingTop: '10px' }} 
            iconSize={8}
            iconType="circle"
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
          />
          {/* Increased line thickness here */}
          <Line type="monotone" dataKey="Manipal" stroke="#2196F3" strokeWidth={2.5} name="Manipal" />
          <Line type="monotone" dataKey="Fortis" stroke="#4CAF50" strokeWidth={2.5} name="Fortis" />
          <Line type="monotone" dataKey="Sakra" stroke="#FF5722" strokeWidth={2.5} name="Sakra" />
          <Line type="monotone" dataKey="Apollo" stroke="#FFC107" strokeWidth={2.5} name="Apollo" />
          <Line type="monotone" dataKey="Aster" stroke="#9C27B0" strokeWidth={2.5} name="Aster" />
          <Line type="monotone" dataKey="Ramaiah" stroke="#E91E63" strokeWidth={2.5} name="Ramaiah" />
          <Line type="monotone" dataKey="Johns" stroke="#00BCD4" strokeWidth={2.5} name="St. Johns" />
          <Line type="monotone" dataKey="Rainbow" stroke="#FF9800" strokeWidth={2.5} name="Rainbow" />
          <Line type="monotone" dataKey="Sparsh" stroke="#8BC34A" strokeWidth={2.5} name="Sparsh" />
          <Line type="monotone" dataKey="Narayana" stroke="#3F51B5" strokeWidth={2.5} name="Narayana" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  
  if (view === 'response') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data as ResponseData[]}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis dataKey="time" stroke={colors.text} tick={{ fontSize: 10 }} />
          <YAxis stroke={colors.text} tick={{ fontSize: 10 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: colors.tooltip.bg, 
              borderColor: colors.tooltip.border, 
              color: colors.tooltip.text,
              fontSize: '12px',
              borderRadius: '4px'
            }}
            labelStyle={{ color: colors.tooltip.text }}
          />
          <Area 
            type="monotone" 
            dataKey="avg" 
            stroke="#3b82f6" 
            fill={`url(#responseGradient-${theme})`} 
            strokeWidth={2} 
            name="Avg. Response Time (min)" 
          />
          <defs>
            <linearGradient id={`responseGradient-${theme}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  
  // Cases view
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data as CasesData[]}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis dataKey="time" stroke={colors.text} tick={{ fontSize: 10 }} />
        <YAxis stroke={colors.text} tick={{ fontSize: 10 }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: colors.tooltip.bg, 
            borderColor: colors.tooltip.border, 
            color: colors.tooltip.text,
            fontSize: '12px',
            borderRadius: '4px'
          }}
          labelStyle={{ color: colors.tooltip.text }}
        />
        <Legend 
          wrapperStyle={{ color: colors.text, fontSize: '11px' }} 
          iconSize={8}
          layout="horizontal"
          verticalAlign="top"
          align="right"
        />
        <Bar dataKey="trauma" stackId="a" fill="#ef4444" name="Trauma" />
        <Bar dataKey="cardiac" stackId="a" fill="#f59e0b" name="Cardiac" />
        <Bar dataKey="general" stackId="a" fill="#3b82f6" name="General" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EmergencyDashboard;
