'use client';

import { useEffect, useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface QueryEvent {
  id: string;
  provider: string;
  model: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  cost_usd: number;
  latency_ms: number;
  status_code: number;
  created_at: string;
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<QueryEvent[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 50;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/usage?view=queries&page=${page}`)
      .then((r) => r.json())
      .then((d) => {
        setQueries(d.queries ?? []);
        setTotal(d.total ?? 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-light text-[#ddd8d0]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
          Recent Queries
        </h1>
        <span className="text-xs text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
          {formatNumber(total)} total
        </span>
      </div>

      {loading ? (
        <div className="text-center text-[#5a554e] py-8" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Loading...</div>
      ) : (
        <>
          <div className="bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg overflow-x-auto">
            <table className="w-full" style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '12px' }}>
              <thead>
                <tr className="border-b border-[rgba(255,140,60,0.08)]">
                  <th className="text-left px-4 py-3 text-[#5a554e] font-medium text-xs whitespace-nowrap">Timestamp</th>
                  <th className="text-left px-4 py-3 text-[#5a554e] font-medium text-xs">Provider</th>
                  <th className="text-left px-4 py-3 text-[#5a554e] font-medium text-xs">Model</th>
                  <th className="text-right px-4 py-3 text-[#5a554e] font-medium text-xs">Input</th>
                  <th className="text-right px-4 py-3 text-[#5a554e] font-medium text-xs">Output</th>
                  <th className="text-right px-4 py-3 text-[#5a554e] font-medium text-xs">Cost</th>
                  <th className="text-right px-4 py-3 text-[#5a554e] font-medium text-xs">Latency</th>
                  <th className="text-right px-4 py-3 text-[#5a554e] font-medium text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((q) => (
                  <tr key={q.id} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,140,60,0.03)] transition-colors">
                    <td className="px-4 py-2.5 text-[#8a8379] whitespace-nowrap">
                      {new Date(q.created_at).toLocaleString('en-US', {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
                      })}
                    </td>
                    <td className="px-4 py-2.5 text-[#8a8379] capitalize">{q.provider}</td>
                    <td className="px-4 py-2.5 text-[#ddd8d0]">{q.model}</td>
                    <td className="px-4 py-2.5 text-right text-[#8a8379]">{formatNumber(q.input_tokens)}</td>
                    <td className="px-4 py-2.5 text-right text-[#8a8379]">{formatNumber(q.output_tokens)}</td>
                    <td className="px-4 py-2.5 text-right text-[#ff8c3c]">{formatCurrency(Number(q.cost_usd))}</td>
                    <td className="px-4 py-2.5 text-right text-[#8a8379]">{q.latency_ms}ms</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={q.status_code === 200 ? 'text-[#3ec96a]' : 'text-red-400'}>
                        {q.status_code}
                      </span>
                    </td>
                  </tr>
                ))}
                {queries.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-[#5a554e]">No queries yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="px-3 py-1 text-xs text-[#8a8379] border border-[rgba(255,140,60,0.08)] rounded disabled:opacity-30 hover:border-[rgba(255,140,60,0.25)] transition-colors"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                Prev
              </button>
              <span className="text-xs text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1 text-xs text-[#8a8379] border border-[rgba(255,140,60,0.08)] rounded disabled:opacity-30 hover:border-[rgba(255,140,60,0.25)] transition-colors"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
