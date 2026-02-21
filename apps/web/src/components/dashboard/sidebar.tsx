'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: '/' },
  { href: '/dashboard/providers', label: 'Providers', icon: '/' },
  { href: '/dashboard/models', label: 'Models', icon: '/' },
  { href: '/dashboard/queries', label: 'Queries', icon: '/' },
  { href: '/dashboard/budget', label: 'Budget', icon: '/' },
];

const settingsItems = [
  { href: '/dashboard/settings/api-keys', label: 'API Keys' },
  { href: '/dashboard/settings/team', label: 'Team' },
  { href: '/dashboard/settings/billing', label: 'Billing' },
];

export function Sidebar({ orgName, plan }: { orgName: string; plan: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 bg-[#0b0e14] border-r border-[rgba(255,140,60,0.08)] flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[rgba(255,140,60,0.08)]">
        <Link href="/dashboard" className="text-xl font-light tracking-tight text-[#ff8c3c]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
          TrueCompute
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-[#8a8379]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{orgName}</span>
          <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-[rgba(255,140,60,0.12)] text-[#ff8c3c] rounded" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            {plan}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <div className="mb-2 px-2 text-[10px] uppercase tracking-widest text-[#3d3935]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
          Analytics
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm mb-0.5 transition-colors ${
                isActive
                  ? 'bg-[rgba(255,140,60,0.12)] text-[#ff8c3c] border border-[rgba(255,140,60,0.25)]'
                  : 'text-[#5a554e] hover:text-[#8a8379] hover:bg-[rgba(255,255,255,0.02)] border border-transparent'
              }`}
              style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '12px' }}
            >
              {item.label}
            </Link>
          );
        })}

        <div className="mt-6 mb-2 px-2 text-[10px] uppercase tracking-widest text-[#3d3935]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
          Settings
        </div>
        {settingsItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm mb-0.5 transition-colors ${
                isActive
                  ? 'bg-[rgba(255,140,60,0.12)] text-[#ff8c3c] border border-[rgba(255,140,60,0.25)]'
                  : 'text-[#5a554e] hover:text-[#8a8379] hover:bg-[rgba(255,255,255,0.02)] border border-transparent'
              }`}
              style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '12px' }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[rgba(255,140,60,0.08)] flex items-center justify-between">
        <a href="/" className="text-[10px] text-[#3d3935] hover:text-[#5a554e] transition-colors" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
          truecompute.io
        </a>
        <a
          href="/api/logout"
          className="text-[10px] text-[#3d3935] hover:text-red-400 transition-colors cursor-pointer"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          Sign Out
        </a>
      </div>
    </aside>
  );
}
