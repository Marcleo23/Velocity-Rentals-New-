import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { Booking, BookingStatus } from '../types';
import { useTheme } from '../context/ThemeContext';

interface RentalChartProps {
  bookings: Booking[];
}

export const RentalChart: React.FC<RentalChartProps> = ({ bookings }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Process data for bookings over time (last 7 days)
  const getDailyStats = () => {
    const stats: Record<string, { name: string; bookings: number; revenue: number }> = {};
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const label = date.toLocaleDateString('en-US', { weekday: 'short' });
      stats[dateStr] = { name: label, bookings: 0, revenue: 0 };
    }

    bookings.forEach(booking => {
      const dateStr = booking.createdAt.split('T')[0];
      if (stats[dateStr]) {
        stats[dateStr].bookings += 1;
        if (booking.status !== BookingStatus.CANCELLED) {
          stats[dateStr].revenue += booking.totalPrice;
        }
      }
    });

    return Object.values(stats);
  };

  // Process data for status distribution
  const getStatusStats = () => {
    const stats: Record<string, number> = {
      [BookingStatus.PENDING]: 0,
      [BookingStatus.CONFIRMED]: 0,
      [BookingStatus.COMPLETED]: 0,
      [BookingStatus.CANCELLED]: 0,
    };

    bookings.forEach(booking => {
      if (stats[booking.status] !== undefined) {
        stats[booking.status] += 1;
      }
    });

    return Object.entries(stats).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));
  };

  const dailyData = getDailyStats();
  const statusData = getStatusStats();

  const COLORS = ['#FBBF24', '#10B981', '#3B82F6', '#EF4444'];
  const gridColor = isDark ? '#ffffff10' : '#00000010';
  const tickColor = isDark ? '#ffffff40' : '#00000040';
  const tooltipBg = isDark ? '#1a1a1a' : '#000000';
  const tooltipText = '#ffffff';

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <div className="bg-white dark:bg-black p-8 rounded-[32px] border border-black/5 dark:border-white/5">
          <div className="mb-6">
            <h3 className="text-lg font-bold dark:text-white">Revenue Trend</h3>
            <p className="text-xs text-black/40 dark:text-white/60 font-medium uppercase tracking-widest">Last 7 Days</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: tickColor }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: tickColor }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: tooltipBg, 
                    border: isDark ? '1px solid #ffffff10' : 'none', 
                    borderRadius: '16px',
                    color: tooltipText,
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                  itemStyle={{ color: '#10B981' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Volume */}
        <div className="bg-white dark:bg-black p-8 rounded-[32px] border border-black/5 dark:border-white/5">
          <div className="mb-6">
            <h3 className="text-lg font-bold dark:text-white">Booking Volume</h3>
            <p className="text-xs text-black/40 dark:text-white/60 font-medium uppercase tracking-widest">Daily Activity</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: tickColor }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: tickColor }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: tooltipBg, 
                    border: isDark ? '1px solid #ffffff10' : 'none', 
                    borderRadius: '16px',
                    color: tooltipText,
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                  itemStyle={{ color: '#3B82F6' }}
                />
                <Bar 
                  dataKey="bookings" 
                  fill="#3B82F6" 
                  radius={[6, 6, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white dark:bg-black p-8 rounded-[32px] border border-black/5 dark:border-white/5">
        <div className="mb-6">
          <h3 className="text-lg font-bold dark:text-white">Booking Status Distribution</h3>
          <p className="text-xs text-black/40 dark:text-white/60 font-medium uppercase tracking-widest">Overall Performance</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridColor} />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 600, fill: tickColor }}
                width={80}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ 
                  backgroundColor: tooltipBg, 
                  border: isDark ? '1px solid #ffffff10' : 'none', 
                  borderRadius: '16px',
                  color: tooltipText,
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={40}>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
