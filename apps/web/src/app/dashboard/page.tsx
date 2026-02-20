'use client';

import { useEffect, useState } from 'react';
import { StatCard } from '@/components/dashboard/stat-card';
import { SpendChart } from '@/components/dashboard/spend-chart';
import { ProviderChart } from '@/components/dashboard/provider-chart';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface OverviewData {
  todaySpend: number;
  monthSpend: number;
  monthQueries: number;
  dailySpend: { date: string; total_cost: number; query_count: number }[];
  providerBreakdown: { provider: string; total_cost: number; query_count: number; avg_latency: number }[];
}

export default function DashboardOverview() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/usage?view=overview&days=30')
      .then((res) => res.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[#5a554e] animate-pulse" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Loading...</div>
      </div>
    );
  }

  const avgCostPerQuery = data && data.monthQueries > 0
    ? data.monthSpend / data.monthQueries
    : 0;

  return (
    <div>
      <h1 className="text-2xl font-light text-[#ddd8d0] mb-6" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
        Overview
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Today's Spend" value={formatCurrency(data?.todaySpend ?? 0)} />
        <StatCard label="This Month" value={formatCurrency(data?.monthSpend ?? 0)} />
        <StatCard label="Monthly Queries" value={formatNumber(data?.monthQueries ?? 0)} />
        <StatCard label="Avg Cost / Query" value={formatCurrency(avgCostPerQuery)} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg p-5">
          <h2 className="text-sm font-medium text-[#8a8379] mb-4" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Daily Spend (Last 30 Days)
          </h2>
          <SpendChart data={data?.dailySpend ?? []} />
        </div>

        <div className="bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg p-5">
          <h2 className="text-sm font-medium text-[#8a8379] mb-4" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            By Provider
          </h2>
          <ProviderChart data={data?.providerBreakdown ?? []} />
        </div>
      </div>
    </div>
  );
}
