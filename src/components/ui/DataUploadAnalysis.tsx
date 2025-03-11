
import React, { useState, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, Loader2, ChartBarIcon, PieChart } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RePieChart, Pie, Cell } from 'recharts';

interface DataUploadAnalysisProps {
  onAnalysisReady?: () => void;
}

const DataUploadAnalysis: React.FC<DataUploadAnalysisProps> = ({ onAnalysisReady }) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'complete'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisView, setAnalysisView] = useState<'occupancy' | 'distribution'>('occupancy');
  
  // Mock data for analysis graphs
  const occupancyData = [
    { day: 'Mon', average: 78, maximum: 92, minimum: 65 },
    { day: 'Tue', average: 82, maximum: 95, minimum: 70 },
    { day: 'Wed', average: 85, maximum: 98, minimum: 72 },
    { day: 'Thu', average: 76, maximum: 90, minimum: 62 },
    { day: 'Fri', average: 84, maximum: 96, minimum: 69 },
    { day: 'Sat', average: 79, maximum: 91, minimum: 64 },
    { day: 'Sun', average: 73, maximum: 88, minimum: 60 },
  ];
  
  const distributionData = [
    { name: 'Trauma', value: 35, color: '#ef4444' },
    { name: 'Cardiac', value: 25, color: '#f59e0b' },
    { name: 'Respiratory', value: 15, color: '#3b82f6' },
    { name: 'Neuro', value: 10, color: '#8b5cf6' },
    { name: 'General', value: 15, color: '#10b981' },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };
  
  const handleUpload = () => {
    if (!selectedFile) return;
    
    setUploadStatus('uploading');
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus('analyzing');
      
      // Simulate analysis process
      setTimeout(() => {
        setUploadStatus('complete');
        
        toast({
          title: "Analysis Complete",
          description: `Successfully analyzed ${selectedFile.name}`,
        });
        
        if (onAnalysisReady) {
          onAnalysisReady();
        }
      }, 2500);
    }, 1500);
  };
  
  const renderUploadUI = () => {
    if (uploadStatus === 'idle') {
      return (
        <div className="text-center py-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".csv,.xlsx,.json"
          />
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-16 h-16 rounded-full ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            } flex items-center justify-center mx-auto mb-4 cursor-pointer`}
            onClick={handleSelectFile}
          >
            <Upload className={isDark ? 'text-blue-400' : 'text-blue-600'} size={24} />
          </motion.div>
          
          <h3 className={`font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Upload Data File
          </h3>
          
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Upload hospital or patient data for analysis
          </p>
          
          {selectedFile ? (
            <div className="mb-4">
              <div className={`flex items-center justify-center p-2 rounded ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <FileText size={16} className="mr-2" />
                <span className="text-sm truncate max-w-[180px]">{selectedFile.name}</span>
              </div>
              
              <Button 
                onClick={handleUpload}
                className="mt-4 bg-medical-500 hover:bg-medical-600"
              >
                Start Analysis
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleSelectFile}
              className={isDark ? 'border-gray-600' : 'border-gray-300'}
            >
              Select File
            </Button>
          )}
        </div>
      );
    }
    
    if (uploadStatus === 'uploading' || uploadStatus === 'analyzing') {
      return (
        <div className="text-center py-12">
          <Loader2 className={`h-12 w-12 animate-spin mx-auto mb-4 ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`} />
          
          <h3 className={`font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {uploadStatus === 'uploading' ? 'Uploading File...' : 'Analyzing Data...'}
          </h3>
          
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {uploadStatus === 'uploading' 
              ? 'This might take a few moments' 
              : 'AI is processing the data patterns'
            }
          </p>
        </div>
      );
    }
    
    // Complete status
    return (
      <div className="py-2">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
          <h3 className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Analysis Complete
          </h3>
        </div>
        
        <div className="flex justify-center gap-2 mb-4">
          <Button
            variant={analysisView === 'occupancy' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAnalysisView('occupancy')}
            className={analysisView === 'occupancy' 
              ? 'bg-medical-500 hover:bg-medical-600' 
              : isDark ? 'border-gray-700' : ''
            }
          >
            <ChartBarIcon size={14} className="mr-1" />
            Occupancy Trends
          </Button>
          
          <Button
            variant={analysisView === 'distribution' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAnalysisView('distribution')}
            className={analysisView === 'distribution' 
              ? 'bg-medical-500 hover:bg-medical-600' 
              : isDark ? 'border-gray-700' : ''
            }
          >
            <PieChart size={14} className="mr-1" />
            Case Distribution
          </Button>
        </div>
        
        <div className="h-64">
          {analysisView === 'occupancy' ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={occupancyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#444' : '#ddd'} />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 10 }}
                  stroke={isDark ? '#ccc' : '#333'}
                />
                <YAxis 
                  stroke={isDark ? '#ccc' : '#333'}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#222' : '#fff',
                    borderColor: isDark ? '#444' : '#ddd',
                    color: isDark ? '#fff' : '#333',
                    fontSize: '12px',
                    borderRadius: '4px'
                  }}
                  labelStyle={{ color: isDark ? '#fff' : '#333' }}
                />
                <Legend 
                  wrapperStyle={{ 
                    fontSize: '10px',
                    color: isDark ? '#ccc' : '#333'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="maximum"
                  name="Max Occupancy"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  name="Avg Occupancy"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="minimum"
                  name="Min Occupancy"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: isDark ? '#222' : '#fff',
                    borderColor: isDark ? '#444' : '#ddd',
                    color: isDark ? '#fff' : '#333',
                    fontSize: '12px',
                    borderRadius: '4px'
                  }}
                  formatter={(value) => [`${value} cases`, 'Count']}
                />
              </RePieChart>
            </ResponsiveContainer>
          )}
        </div>
        
        <div className="text-center mt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setUploadStatus('idle');
              setSelectedFile(null);
            }}
            className={`text-xs ${isDark ? 'border-gray-700' : ''}`}
          >
            Upload New Data
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`rounded-xl shadow-md ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className="bg-gradient-to-r from-medical-500 to-medical-600 p-4">
        <h2 className="text-lg font-bold text-white flex items-center">
          <ChartBarIcon className="mr-2" size={18} />
          Data Upload & Analysis
        </h2>
      </div>
      
      {renderUploadUI()}
    </div>
  );
};

export default DataUploadAnalysis;
