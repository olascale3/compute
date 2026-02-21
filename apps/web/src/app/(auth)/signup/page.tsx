'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      window.location.href = '/onboarding';
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06080c] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-light tracking-tight text-[#ff8c3c] font-serif">
            TrueCompute
          </Link>
          <p className="text-[#8a8379] mt-2 font-serif text-lg">Start tracking your AI costs</p>
        </div>

        <div className="bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg p-8">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-mono text-[#8a8379] mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-3 py-2 bg-[#06080c] border border-[rgba(255,140,60,0.15)] rounded-md text-[#ddd8d0] font-mono text-sm focus:outline-none focus:border-[#ff8c3c] transition-colors"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-mono text-[#8a8379] mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full px-3 py-2 bg-[#06080c] border border-[rgba(255,140,60,0.15)] rounded-md text-[#ddd8d0] font-mono text-sm focus:outline-none focus:border-[#ff8c3c] transition-colors"
                placeholder="Min 8 characters"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm font-mono">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#ff8c3c] text-[#06080c] font-mono font-bold text-sm rounded-md hover:bg-[#ffb87a] transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm font-mono text-[#5a554e] mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#ff8c3c] hover:text-[#ffb87a]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
