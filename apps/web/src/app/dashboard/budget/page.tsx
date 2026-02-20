'use client';

import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';

export default function BudgetPage() {
  const [budget, setBudget] = useState<{
    monthly_limit_usd: number;
    alert_threshold_pct: number;
    alert_email: string | null;
  } | null>(null);
  const [monthSpend, setMonthSpend] = useState(0);
  const [limit, setLimit] = useState('');
  const [threshold, setThreshold] = useState('80');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/v1/budgets').then((r) => r.json()),
      fetch('/api/v1/usage?view=overview').then((r) => r.json()),
    ]).then(([budgetData, usageData]) => {
      if (budgetData.budget) {
        setBudget(budgetData.budget);
        setLimit(String(budgetData.budget.monthly_limit_usd));
        setThreshold(String(budgetData.budget.alert_threshold_pct));
        setEmail(budgetData.budget.alert_email || '');
      }
      setMonthSpend(usageData.monthSpend ?? 0);
      setLoading(false);
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/v1/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        monthly_limit_usd: parseFloat(limit),
        alert_threshold_pct: parseInt(threshold),
        alert_email: email || null,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setBudget(data.budget);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

  if (loading) {
    return <div className="text-center text-[#5a554e] py-8" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Loading...</div>;
  }

  const budgetLimit = budget?.monthly_limit_usd ?? (parseFloat(limit) || 0);
  const pct = budgetLimit > 0 ? (monthSpend / budgetLimit) * 100 : 0;
  const barColor = pct < 60 ? '#3ec96a' : pct < 80 ? '#f59e0b' : pct < 100 ? '#ff8c3c' : '#ef4444';

  return (
    <div>
      <h1 className="text-2xl font-light text-[#ddd8d0] mb-6" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
        Budget
      </h1>

      {/* Current status */}
      {budgetLimit > 0 && (
        <div className="bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg p-6 mb-6">
          <div className="flex justify-between items-end mb-3">
            <div>
              <span className="text-sm text-[#8a8379]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Monthly Budget</span>
              <div className="text-2xl font-bold text-[#ff8c3c]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
                {formatCurrency(monthSpend)} <span className="text-sm text-[#5a554e]">/ {formatCurrency(budgetLimit)}</span>
              </div>
            </div>
            <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: barColor }}>
              {pct.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(pct, 100)}%`, background: barColor }}
            />
          </div>
          {pct >= (budget?.alert_threshold_pct ?? 80) && (
            <div className="mt-3 px-3 py-2 bg-[rgba(255,140,60,0.08)] border border-[rgba(255,140,60,0.2)] rounded text-xs text-[#ffb87a]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              You&apos;ve reached {pct.toFixed(0)}% of your monthly budget.
            </div>
          )}
        </div>
      )}

      {/* Settings form */}
      <div className="bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg p-6">
        <h2 className="text-sm font-medium text-[#8a8379] mb-4" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
          Budget Settings
        </h2>
        <form onSubmit={handleSave} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs text-[#5a554e] mb-1" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              Monthly Limit (USD)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              required
              className="w-full px-3 py-2 bg-[#06080c] border border-[rgba(255,140,60,0.15)] rounded-md text-[#ddd8d0] text-sm focus:outline-none focus:border-[#ff8c3c] transition-colors"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              placeholder="100.00"
            />
          </div>
          <div>
            <label className="block text-xs text-[#5a554e] mb-1" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              Alert Threshold (%)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="w-full px-3 py-2 bg-[#06080c] border border-[rgba(255,140,60,0.15)] rounded-md text-[#ddd8d0] text-sm focus:outline-none focus:border-[#ff8c3c] transition-colors"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            />
          </div>
          <div>
            <label className="block text-xs text-[#5a554e] mb-1" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              Alert Email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#06080c] border border-[rgba(255,140,60,0.15)] rounded-md text-[#ddd8d0] text-sm focus:outline-none focus:border-[#ff8c3c] transition-colors"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              placeholder="alerts@company.com"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-[#ff8c3c] text-[#06080c] font-bold text-sm rounded-md hover:bg-[#ffb87a] transition-colors disabled:opacity-50"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Budget'}
          </button>
        </form>
      </div>
    </div>
  );
}
