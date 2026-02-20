'use client';

import { useEffect, useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface ModelRow {
  provider: string;
  model: string;
  total_cost: number;
  query_count: number;
  avg_input_tokens: number;
  avg_output_tokens: number;
  avg_latency: number;
}

export default function ModelsPage() {
  const [data, setData] = useState<ModelRow[]>([]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/usage?view=models&days=${days}`)
      .then((r) => r.json())
      .then((d) => { setData(d.models ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [days]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-light text-[#ddd8d0]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
          Models
        </h1>
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                days === d
                  ? 'bg-[rgba(255,140,60,0.12)] text-[#ff8c3c] border border-[rgba(255,140,60,0.25)]'
                  : 'text-[#5a554e] border border-transparent hover:text-[#8a8379]'
              }`}
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center text-[#5a554e] py-8" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Loading...</div>
      ) : (
        <div className="bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg overflow-hidden">
          <table className="w-full" style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '12px' }}>
            <thead>
              <tr className="border-b border-[rgba(255,140,60,0.08)]">
                <th className="text-left px-4 py-3 text-[#5a554e] font-medium text-xs">Model</th>
                <th className="text-left px-4 py-3 text-[#5a554e] font-medium text-xs">Provider</th>
                <th className="text-right px-4 py-3 text-[#5a554e] font-medium text-xs">Total Spend</th>
                <th className="text-right px-4 py-3 text-[#5a554e] font-medium text-xs">Queries</th>
                <th className="text-right px-4 py-3 text-[#5a554e] font-medium text-xs">Avg Input</th>
                <th className="text-right px-4 py-3 text-[#5a554e] font-medium text-xs">Avg Output</th>
                <th className="text-right px-4 py-3 text-[#5a554e] font-medium text-xs">Avg Cost</th>
                <th className="text-right px-4 py-3 text-[#5a554e] font-medium text-xs">Latency</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={`${row.provider}-${row.model}`} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,140,60,0.03)] transition-colors">
                  <td className="px-4 py-3 text-[#ddd8d0]">{row.model}</td>
                  <td className="px-4 py-3 text-[#8a8379] capitalize">{row.provider}</td>
                  <td className="px-4 py-3 text-right text-[#ff8c3c]">{formatCurrency(Number(row.total_cost))}</td>
                  <td className="px-4 py-3 text-right text-[#8a8379]">{formatNumber(Number(row.query_count))}</td>
                  <td className="px-4 py-3 text-right text-[#8a8379]">{formatNumber(Math.round(Number(row.avg_input_tokens)))}</td>
                  <td className="px-4 py-3 text-right text-[#8a8379]">{formatNumber(Math.round(Number(row.avg_output_tokens)))}</td>
                  <td className="px-4 py-3 text-right text-[#8a8379]">
                    {formatCurrency(Number(row.query_count) > 0 ? Number(row.total_cost) / Number(row.query_count) : 0)}
                  </td>
                  <td className="px-4 py-3 text-right text-[#8a8379]">{Math.round(Number(row.avg_latency))}ms</td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-[#5a554e]">No model data yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
