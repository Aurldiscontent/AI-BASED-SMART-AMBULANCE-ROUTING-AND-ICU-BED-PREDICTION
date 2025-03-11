
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { BarChart, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  Legend
} from 'recharts';

interface DataAnalysisSectionProps {
  geoDistributionData: {
    regions: {
      name: string;
      incidents: number;
      response: number;
      color: string;
    }[];
    timeData: {
      time: string;
      incidents: number;
      response: number;
    }[];
  };
}

const DataAnalysisSection: React.FC<DataAnalysisSectionProps> = ({ geoDistributionData }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = React.useState("map");

  return (
    <div
      className={`rounded-lg ${
        isDark ? 'bg-gray-800/80' : 'bg-white/80'
      } backdrop-blur-sm p-4 shadow-lg mb-6`}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BarChart size={20} />
        {t("data-analysis")}
      </h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">{t("geographic-distribution")}</TabsTrigger>
          <TabsTrigger value="stats">{t("response-metrics")}</TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col h-64">
              <h3 className="text-md font-semibold mb-2 flex items-center">
                <MapPin size={16} className="mr-1 text-medical-500" />
                {t("incident-distribution-map")}
              </h3>
              <div className="flex-1 flex items-center justify-center">
                {/* This could be replaced with an actual map component */}
                <div className="text-center">
                  <MapPin size={32} className="mx-auto mb-2 text-medical-500" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t("interactive-map-placeholder")}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-64">
              <h3 className="text-md font-semibold mb-2">{t("incident-by-region")}</h3>
              <ResponsiveContainer width="100%" height="90%">
                <RechartsBarChart
                  data={geoDistributionData.regions}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="incidents" name={t("incidents")}>
                    {geoDistributionData.regions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("incident-hotspots")}</h3>
              <div className="space-y-3">
                {geoDistributionData.regions.map((region, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{region.name}</span>
                      <span>{region.incidents} {t("incidents")}</span>
                    </div>
                    <Progress value={(region.incidents / 100) * 100} className="h-2" 
                      style={{ backgroundColor: 'rgba(0,0,0,0.1)', '--tw-progress-fill': region.color } as any} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("avg-response-time")}</h3>
              <div className="space-y-3">
                {geoDistributionData.regions.map((region, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{region.name}</span>
                      <span>{region.response} {t("minutes")}</span>
                    </div>
                    <Progress value={(region.response / 15) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="stats" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("total-incidents")}</h3>
              <p className="text-2xl font-bold">279</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <span>↑ 12%</span>
                <span className="ml-1">{t("from-previous")}</span>
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("avg-response-time")}</h3>
              <p className="text-2xl font-bold">7.5 {t("minutes")}</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <span>↓ 1.2</span>
                <span className="ml-1">{t("from-previous")}</span>
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("survival-rate")}</h3>
              <p className="text-2xl font-bold">94.3%</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <span>↑ 2.1%</span>
                <span className="ml-1">{t("from-previous")}</span>
              </p>
            </div>
          </div>
          
          <div className="mt-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3">{t("incident-trends")}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={geoDistributionData.timeData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="incidents" stroke="#8884d8" fill="#8884d8" name={t("incidents")} />
                <Area type="monotone" dataKey="response" stroke="#82ca9d" fill="#82ca9d" name={t("response-time")} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3">{t("response-statistics")}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t("critical-cases")}</span>
                  <span>82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t("moderate-cases")}</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t("mild-cases")}</span>
                  <span>91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataAnalysisSection;
