'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface DailySpend {
  date: string;
  total_cost: number;
  query_count: number;
}

export function SpendChart({ data }: { data: DailySpend[] }) {
  const chartData = data.map((d) => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    cost: Number(d.total_cost),
    queries: Number(d.query_count),
  }));

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '13px' }}>
        No data yet. Start sending events with the SDK.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff8c3c" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#ff8c3c" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,140,60,0.06)" />
        <XAxis
          dataKey="date"
          stroke="#5a554e"
          fontSize={11}
          fontFamily="var(--font-jetbrains), monospace"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#5a554e"
          fontSize={11}
          fontFamily="var(--font-jetbrains), monospace"
          tickFormatter={(v) => `$${v.toFixed(2)}`}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: '#0b0e14',
            border: '1px solid rgba(255,140,60,0.25)',
            borderRadius: 8,
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: 12,
          }}
          labelStyle={{ color: '#ddd8d0' }}
          formatter={(value: number | undefined) => [`$${(value ?? 0).toFixed(4)}`, 'Cost']}
        />
        <Area
          type="monotone"
          dataKey="cost"
          stroke="#ff8c3c"
          fill="url(#costGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
