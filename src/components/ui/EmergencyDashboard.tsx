
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

type ICUData = {
  time: string;
  cityGeneral: number;
  memorial: number;
  community: number;
  stMarys: number;
  lakeside: number;
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
};

const EmergencyDashboard: React.FC<EmergencyDashboardProps> = ({ data, view }) => {
  if (view === 'icu') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data as ICUData[]}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }}
            labelStyle={{ color: '#ccc' }}
          />
          <Legend wrapperStyle={{ color: '#ccc' }} />
          <Line type="monotone" dataKey="cityGeneral" stroke="#2196F3" name="City General" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="memorial" stroke="#4CAF50" name="Memorial" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="community" stroke="#FF5722" name="Community" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="stMarys" stroke="#FFC107" name="St. Mary's" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="lakeside" stroke="#9C27B0" name="Lakeside" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
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
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }}
            labelStyle={{ color: '#ccc' }}
          />
          <Area type="monotone" dataKey="avg" stroke="#3b82f6" fill="url(#responseGradient)" strokeWidth={2} name="Avg. Response Time (min)" />
          <defs>
            <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
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
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="time" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }}
          labelStyle={{ color: '#ccc' }}
        />
        <Legend wrapperStyle={{ color: '#ccc' }} />
        <Bar dataKey="trauma" stackId="a" fill="#ef4444" name="Trauma" />
        <Bar dataKey="cardiac" stackId="a" fill="#f59e0b" name="Cardiac" />
        <Bar dataKey="general" stackId="a" fill="#3b82f6" name="General" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EmergencyDashboard;
