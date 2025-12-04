import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface EnergyChartProps {
  data: number[];
}

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const EnergyChart: React.FC<EnergyChartProps> = ({ data }) => {
  const chartData = data.map((val, idx) => ({
    name: months[idx],
    energy: val
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#9ca3af', fontSize: 10 }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            hide 
            domain={[0, 100]} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e1b4b', borderColor: '#4338ca', color: '#fff' }}
            itemStyle={{ color: '#fbbf24' }}
            formatter={(value: number) => [`${value}%`, 'Energía Financiera']}
          />
          <Area 
            type="monotone" 
            dataKey="energy" 
            stroke="#fbbf24" 
            fillOpacity={1} 
            fill="url(#colorEnergy)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyChart;
