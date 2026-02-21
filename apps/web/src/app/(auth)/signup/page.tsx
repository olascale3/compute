'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const oauthError = params?.get('error');

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
          {(oauthError || error) && (
            <p className="text-red-400 text-sm font-mono mb-4 text-center">
              {error || (oauthError === 'oauth_denied' ? 'Sign-up was cancelled.' : 'Something went wrong. Please try again.')}
            </p>
          )}

          <div className="space-y-3">
            <a
              href="/api/auth/google"
              className="w-full flex items-center justify-center gap-3 py-2.5 bg-white text-[#1f1f1f] font-medium text-sm rounded-md hover:bg-gray-100 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 2.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </a>

            <a
              href="/api/auth/github"
              className="w-full flex items-center justify-center gap-3 py-2.5 bg-[#24292f] text-white font-medium text-sm rounded-md hover:bg-[#32383f] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              Continue with GitHub
            </a>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(255,140,60,0.1)]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#0a0c10] text-[#5a554e] font-mono">or</span>
            </div>
          </div>

          {!showEmail ? (
            <button
              onClick={() => setShowEmail(true)}
              className="w-full py-2.5 border border-[rgba(255,140,60,0.15)] text-[#8a8379] font-mono text-sm rounded-md hover:border-[rgba(255,140,60,0.3)] hover:text-[#ddd8d0] transition-colors"
            >
              Continue with email
            </button>
          ) : (
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#ff8c3c] text-[#06080c] font-mono font-bold text-sm rounded-md hover:bg-[#ffb87a] transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}

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
