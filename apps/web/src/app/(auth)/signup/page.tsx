'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/callback` },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  async function handleGitHubLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/callback` },
    });
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06080c] px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-[rgba(255,140,60,0.12)] border border-[rgba(255,140,60,0.25)] rounded-lg p-8">
            <h2 className="text-xl font-serif text-[#ff8c3c] mb-3">Check your email</h2>
            <p className="text-[#8a8379] font-mono text-sm">
              We sent a confirmation link to <strong className="text-[#ffb87a]">{email}</strong>.
              Click it to activate your account.
            </p>
          </div>
        </div>
      </div>
    );
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

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-[rgba(255,140,60,0.08)]" />
            <span className="text-xs font-mono text-[#5a554e]">OR</span>
            <div className="flex-1 h-px bg-[rgba(255,140,60,0.08)]" />
          </div>

          <button
            onClick={handleGitHubLogin}
            className="w-full py-2.5 bg-transparent border border-[rgba(255,140,60,0.25)] text-[#ddd8d0] font-mono text-sm rounded-md hover:bg-[rgba(255,140,60,0.05)] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Continue with GitHub
          </button>

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
