import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";

interface TrendData {
  date: string;
  responses: number;
  positive: number;
  negative: number;
  neutral: number;
}

const TrendChart = () => {
  const [data, setData] = useState<TrendData[]>([]);

  // Generate initial data for the past 7 days
  const generateInitialData = (): TrendData[] => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      days.push({
        date: dateStr,
        responses: Math.floor(Math.random() * 30) + 15,
        positive: Math.floor(Math.random() * 20) + 10,
        negative: Math.floor(Math.random() * 8) + 2,
        neutral: Math.floor(Math.random() * 10) + 3,
      });
    }
    
    return days;
  };

  // Initialize data
  useEffect(() => {
    setData(generateInitialData());
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const lastEntry = newData[newData.length - 1];
        
        // Update today's data with small random variations
        const updatedEntry = {
          ...lastEntry,
          responses: Math.max(1, lastEntry.responses + (Math.random() > 0.5 ? 1 : -1)),
          positive: Math.max(1, lastEntry.positive + (Math.random() > 0.6 ? 1 : 0)),
          negative: Math.max(0, lastEntry.negative + (Math.random() > 0.8 ? 1 : 0)),
          neutral: Math.max(0, lastEntry.neutral + (Math.random() > 0.7 ? 1 : 0)),
        };
        
        newData[newData.length - 1] = updatedEntry;
        return newData;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-3 shadow-lg border-2">
          <p className="font-semibold mb-2">{payload[0].payload.date}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">Total Responses:</span>{" "}
              <span className="font-bold">{payload[0].payload.responses}</span>
            </p>
            <p className="text-sm text-[#4CAF50]">
              <span className="font-medium">Positive:</span>{" "}
              <span className="font-bold">{payload[0].payload.positive}</span>
            </p>
            <p className="text-sm text-[#EF5350]">
              <span className="font-medium">Negative:</span>{" "}
              <span className="font-bold">{payload[0].payload.negative}</span>
            </p>
            <p className="text-sm text-[#FFC107]">
              <span className="font-medium">Neutral:</span>{" "}
              <span className="font-bold">{payload[0].payload.neutral}</span>
            </p>
          </div>
        </Card>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-card border-2 border-border/60 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Response Trends - Last 7 Days
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time sentiment tracking with live updates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="responses" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            name="Total Responses"
            dot={{ fill: 'hsl(var(--primary))', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="positive" 
            stroke="#4CAF50" 
            strokeWidth={2}
            name="Positive"
            dot={{ fill: '#4CAF50', r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="negative" 
            stroke="#EF5350" 
            strokeWidth={2}
            name="Negative"
            dot={{ fill: '#EF5350', r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="neutral" 
            stroke="#FFC107" 
            strokeWidth={2}
            name="Neutral"
            dot={{ fill: '#FFC107', r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 pt-4 border-t border-border/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Avg Daily</p>
            <p className="text-lg font-bold">
              {data.length > 0 ? Math.round(data.reduce((sum, d) => sum + d.responses, 0) / data.length) : 0}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Peak Day</p>
            <p className="text-lg font-bold">
              {data.length > 0 ? Math.max(...data.map(d => d.responses)) : 0}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Trend</p>
            <p className="text-lg font-bold text-[#4CAF50]">↑ 12%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Today</p>
            <p className="text-lg font-bold">
              {data.length > 0 ? data[data.length - 1].responses : 0}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrendChart;
