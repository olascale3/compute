'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface ProviderData {
  provider: string;
  total_cost: number;
  query_count: number;
  avg_latency: number;
}

const COLORS: Record<string, string> = {
  openai: '#10b981',
  anthropic: '#ff8c3c',
  google: '#4ea8c8',
  deepseek: '#9b5fbf',
  mistral: '#f59e0b',
};

export function ProviderChart({ data }: { data: ProviderData[] }) {
  const chartData = data.map((d) => ({
    name: d.provider.charAt(0).toUpperCase() + d.provider.slice(1),
    provider: d.provider,
    cost: Number(d.total_cost),
    queries: Number(d.query_count),
  }));

  if (chartData.length === 0) {
    return (
      <div className="h-[250px] flex items-center justify-center text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '13px' }}>
        No provider data yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
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
          formatter={(value: number | undefined) => {
            if (value == null) return ['—', 'Cost'];
            return [`$${value.toFixed(4)}`, 'Cost'];
          }}
        />
        <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
          {chartData.map((entry) => (
            <Cell key={entry.provider} fill={COLORS[entry.provider] || '#ff8c3c'} fillOpacity={0.8} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
