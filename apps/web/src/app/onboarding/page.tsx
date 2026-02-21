'use client';

import { useState } from 'react';
import { slugify } from '@/lib/utils';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [orgName, setOrgName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCreateOrg(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/v1/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: orgName, slug: slugify(orgName) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create organization');

      setApiKey(data.apiKey);
      setStep(2);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06080c] px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-tight text-[#ff8c3c] font-serif">
            Welcome to TrueCompute
          </h1>
          <p className="text-[#8a8379] mt-2 font-serif text-lg">
            {step === 1 ? 'Set up your organization' : 'Your API key is ready'}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm ${
            step >= 1 ? 'bg-[#ff8c3c] text-[#06080c]' : 'bg-[rgba(255,140,60,0.12)] text-[#5a554e]'
          }`}>
            1
          </div>
          <div className="w-12 h-px bg-[rgba(255,140,60,0.15)]" />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm ${
            step >= 2 ? 'bg-[#ff8c3c] text-[#06080c]' : 'bg-[rgba(255,140,60,0.12)] text-[#5a554e]'
          }`}>
            2
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg p-8">
          {step === 1 && (
            <form onSubmit={handleCreateOrg} className="space-y-4">
              <div>
                <label htmlFor="orgName" className="block text-sm font-mono text-[#8a8379] mb-1">
                  Organization Name
                </label>
                <input
                  id="orgName"
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#06080c] border border-[rgba(255,140,60,0.15)] rounded-md text-[#ddd8d0] font-mono text-sm focus:outline-none focus:border-[#ff8c3c] transition-colors"
                  placeholder="Acme Corp"
                />
                {orgName && (
                  <p className="text-xs font-mono text-[#5a554e] mt-1">
                    Slug: {slugify(orgName)}
                  </p>
                )}
              </div>

              {error && <p className="text-red-400 text-sm font-mono">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#ff8c3c] text-[#06080c] font-mono font-bold text-sm rounded-md hover:bg-[#ffb87a] transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Organization'}
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-mono text-[#8a8379] mb-3">
                  Your API key (shown only once — copy it now):
                </p>
                <div className="relative">
                  <code className="block w-full px-3 py-3 bg-[#06080c] border border-[rgba(255,140,60,0.25)] rounded-md text-[#ff8c3c] font-mono text-xs break-all">
                    {apiKey}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 px-2 py-1 bg-[rgba(255,140,60,0.12)] text-[#ff8c3c] font-mono text-xs rounded hover:bg-[rgba(255,140,60,0.2)] transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm font-mono text-[#8a8379] mb-2">Quick start:</p>
                <div className="bg-[rgba(0,0,0,0.45)] border border-[rgba(255,140,60,0.15)] rounded-lg p-4 font-mono text-xs leading-relaxed">
                  <div className="text-[#5a554e]">{'// npm install @truecompute/sdk'}</div>
                  <div className="mt-1">
                    <span className="text-[#6ba4d4]">import</span>{' '}
                    <span className="text-[#ddd8d0]">{'{ TrueCompute }'}</span>{' '}
                    <span className="text-[#6ba4d4]">from</span>{' '}
                    <span className="text-[#3ec96a]">{`'@truecompute/sdk'`}</span>;
                  </div>
                  <div className="mt-1">
                    <span className="text-[#6ba4d4]">const</span>{' '}
                    <span className="text-[#ddd8d0]">tc</span>{' '}
                    <span className="text-[#ddd8d0]">=</span>{' '}
                    <span className="text-[#6ba4d4]">new</span>{' '}
                    <span className="text-[#ddd8d0]">TrueCompute</span>
                    <span className="text-[#5a554e]">{'({ apiKey: '}</span>
                    <span className="text-[#3ec96a]">{`'${apiKey.slice(0, 20)}...'`}</span>
                    <span className="text-[#5a554e]">{' })'}</span>;
                  </div>
                  <div className="mt-1">
                    <span className="text-[#6ba4d4]">const</span>{' '}
                    <span className="text-[#ddd8d0]">openai</span>{' '}
                    <span className="text-[#ddd8d0]">=</span>{' '}
                    <span className="text-[#ddd8d0]">tc.wrap</span>
                    <span className="text-[#5a554e]">(</span>
                    <span className="text-[#6ba4d4]">new</span>{' '}
                    <span className="text-[#ddd8d0]">OpenAI</span>
                    <span className="text-[#5a554e]">());</span>
                  </div>
                </div>
              </div>

              <a
                href="/dashboard"
                className="block w-full py-2.5 bg-[#ff8c3c] text-[#06080c] font-mono font-bold text-sm rounded-md hover:bg-[#ffb87a] transition-colors text-center"
              >
                Go to Dashboard
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
