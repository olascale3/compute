import Link from 'next/link';

export const dynamic = 'force-static';

const plans = [
  {
    name: 'Free',
    price: '$0',
    desc: 'For individual developers',
    features: ['1,000 queries/mo', '1 team member', '7-day data retention', 'Basic dashboard'],
  },
  {
    name: 'Pro',
    price: '$49',
    desc: 'For growing teams',
    features: ['50,000 queries/mo', '10 team members', '90-day retention', 'Budget alerts', 'Model comparison'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$499',
    desc: 'For organizations at scale',
    features: ['Unlimited queries', 'Unlimited members', '1-year retention', 'Priority support', 'SLA guarantee', 'Custom integrations'],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0D1117', fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-glow {
          background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,140,60,0.15), transparent);
        }
        .card-glow:hover {
          box-shadow: 0 0 40px rgba(255,140,60,0.08), 0 8px 32px rgba(0,0,0,0.4);
        }
        .shimmer-text {
          background: linear-gradient(90deg, #ff8c3c, #ffcb8e, #ff8c3c, #ffcb8e, #ff8c3c);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 6s linear infinite;
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style={{ background: 'rgba(13,17,23,0.8)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-lg font-bold text-white tracking-tight">
              TrueCompute
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[13px] text-[#8b949e] hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-[13px] text-[#8b949e] hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="text-[13px] text-[#8b949e] hover:text-white transition-colors">Pricing</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[13px] text-[#8b949e] hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 text-[13px] font-semibold rounded-full transition-all hover:shadow-[0_0_20px_rgba(255,140,60,0.3)]"
              style={{ background: 'linear-gradient(135deg, #ff8c3c, #ff6b1a)', color: '#fff' }}
            >
              Start for Free
            </Link>
          </div>
        </div>
      </header>

      <section className="relative pb-8 hero-glow" style={{ paddingTop: 'calc(64px + 3rem)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(255,140,60,0.08)', border: '1px solid rgba(255,140,60,0.15)' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[13px] text-[#8b949e]">Now tracking 15+ AI providers in real time</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-8 tracking-tight" style={{ fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif' }}>
            <span className="text-white">Know what your AI</span>
            <br />
            <span className="shimmer-text">actually costs</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8b949e] max-w-2xl mx-auto mb-12 leading-relaxed">
            Every API call to OpenAI, Anthropic, or Google has a price tag.
            TrueCompute gives you the visibility to track every dollar, every token, every millisecond.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-5">
            <Link
              href="/signup"
              className="px-8 py-4 text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(255,140,60,0.35)] hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #ff8c3c, #ff6b1a)', color: '#fff' }}
            >
              Start for Free
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 text-sm text-[#8b949e] hover:text-white rounded-full transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              See How It Works
            </a>
          </div>
          <p className="text-xs text-[#484f58] mb-20">No credit card required &middot; Free tier includes 1,000 queries/month</p>
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(255,140,60,0.12), rgba(255,140,60,0.02))',
            padding: '1px',
          }}>
            <div className="rounded-2xl overflow-hidden" style={{ background: '#161b22' }}>
              <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }}></div>
                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }}></div>
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }}></div>
                <span className="ml-4 text-xs text-[#484f58]">TrueCompute &mdash; Dashboard</span>
              </div>

              <div className="p-5 sm:p-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "TODAY'S SPEND", value: '$4.82', sub: '+12% from yesterday', subColor: '#ff8c3c' },
                    { label: 'THIS MONTH', value: '$127.43', sub: '64% of budget used', subColor: '#febc2e' },
                    { label: 'API CALLS', value: '3,847', sub: '↑ 231 today', subColor: '#28c840' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl p-4 sm:p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-[10px] text-[#484f58] uppercase tracking-widest mb-2">{stat.label}</p>
                      <p className="text-xl sm:text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{stat.value}</p>
                      <p className="text-[11px]" style={{ color: stat.subColor }}>{stat.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  <div className="sm:col-span-3 rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center justify-between mb-5">
                      <p className="text-[10px] text-[#484f58] uppercase tracking-widest">Spend Over Time</p>
                      <span className="text-[10px] text-[#484f58] px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.04)' }}>30 days</span>
                    </div>
                    <div className="flex items-end gap-[3px] h-24">
                      {[18, 22, 12, 28, 35, 20, 42, 38, 25, 15, 30, 45, 32, 18, 40, 35, 22, 28, 50, 42, 30, 20, 38, 55, 45, 35, 25, 40, 48, 32].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t transition-all hover:opacity-100" style={{
                          height: `${h}%`,
                          background: i >= 27 ? 'linear-gradient(to top, #ff8c3c, #ffb87a)' : 'rgba(255,140,60,0.25)',
                          opacity: i >= 27 ? 1 : 0.6,
                        }}></div>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2 rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[10px] text-[#484f58] uppercase tracking-widest mb-5">By Provider</p>
                    <div className="space-y-3">
                      {[
                        { name: 'OpenAI', pct: 54, amount: '$68.21', color: '#10a37f' },
                        { name: 'Anthropic', pct: 33, amount: '$42.15', color: '#d4a27a' },
                        { name: 'Google', pct: 9, amount: '$12.07', color: '#4285f4' },
                        { name: 'DeepSeek', pct: 3, amount: '$3.80', color: '#7c6ce0' },
                        { name: 'Mistral', pct: 1, amount: '$1.20', color: '#ff7000' },
                      ].map((p) => (
                        <div key={p.name}>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-[#8b949e]">{p.name}</span>
                            <span className="text-white font-medium" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{p.amount}</span>
                          </div>
                          <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <div className="h-1.5 rounded-full" style={{ width: `${Math.max(p.pct, 4)}%`, background: p.color }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-12 marquee-track" style={{ width: 'max-content' }}>
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-12">
              <span className="text-[11px] text-[#30363d] uppercase tracking-widest shrink-0 px-4">Works with</span>
              {[
                { name: 'OpenAI', color: '#10a37f' },
                { name: 'Anthropic', color: '#d4a27a' },
                { name: 'Google AI', color: '#4285f4' },
                { name: 'DeepSeek', color: '#7c6ce0' },
                { name: 'Mistral', color: '#ff7000' },
                { name: 'Cohere', color: '#39a0ed' },
                { name: 'Together AI', color: '#6ee7b7' },
                { name: 'Groq', color: '#f97316' },
                { name: 'Perplexity', color: '#22d3ee' },
                { name: 'Replicate', color: '#ef4444' },
              ].map((p) => (
                <span key={`${setIdx}-${p.name}`} className="text-sm font-semibold shrink-0 opacity-50 hover:opacity-100 transition-opacity cursor-default" style={{ color: p.color }}>
                  {p.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <p className="text-[11px] text-[#ff8c3c] uppercase tracking-[5px] mb-5 font-semibold">Features</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Built for answers, not guesswork
          </h2>
          <p className="text-lg text-[#8b949e] max-w-xl mx-auto">
            Everything you need to understand, control, and optimize your AI spending in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: 'Real-Time Cost Tracking',
              desc: 'See exactly what each API call costs the moment it happens. Per-query precision down to the fraction of a cent across every provider and model.',
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#ff8c3c"/>
                </svg>
              ),
              gradient: 'rgba(255,140,60,0.06)',
            },
            {
              title: 'Multi-Provider Dashboard',
              desc: 'Stop tab-switching between billing pages. OpenAI, Anthropic, Google, DeepSeek, Mistral and 15+ providers unified in a single view.',
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="#4285f4"/>
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="#4285f4"/>
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="#4285f4"/>
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="#4285f4"/>
                </svg>
              ),
              gradient: 'rgba(66,133,244,0.06)',
            },
            {
              title: 'Budget Alerts & Limits',
              desc: 'Set monthly spending caps and get notified at 80% usage. Never be surprised by your AI bill again. Protect your budget automatically.',
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#28c840"/>
                  <line x1="12" y1="9" x2="12" y2="13" stroke="#28c840"/>
                  <line x1="12" y1="17" x2="12.01" y2="17" stroke="#28c840"/>
                </svg>
              ),
              gradient: 'rgba(40,200,64,0.06)',
            },
            {
              title: 'Zero-Overhead SDK',
              desc: 'Three lines of code. No latency impact. Telemetry fires asynchronously in the background. Your application performance stays untouched.',
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" stroke="#febc2e"/>
                  <polyline points="8 6 2 12 8 18" stroke="#febc2e"/>
                  <line x1="14" y1="4" x2="10" y2="20" stroke="#febc2e" opacity="0.5"/>
                </svg>
              ),
              gradient: 'rgba(254,188,46,0.06)',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-8 transition-all duration-300 card-glow group"
              style={{ background: `linear-gradient(135deg, ${f.gradient}, transparent)`, border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-sm text-[#8b949e] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] text-[#ff8c3c] uppercase tracking-[5px] mb-5 font-semibold">The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
              AI costs are invisible until the bill arrives
            </h2>
            <p className="text-[#8b949e] mb-10 leading-relaxed">
              You use multiple AI providers. Each has its own billing page that shows totals, not per-query costs.
              You can&apos;t compare models, you can&apos;t track by feature, and you only find out you overspent after it&apos;s too late.
            </p>
            <div className="space-y-5">
              {[
                { before: '5 billing dashboards to check', after: 'One unified view' },
                { before: 'No idea which model costs more', after: 'Per-query cost comparison' },
                { before: 'Surprise bills every month', after: 'Real-time budget alerts' },
                { before: 'Can\'t attribute cost to features', after: 'Granular breakdowns' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px]" style={{ background: 'rgba(255,80,80,0.1)', color: '#ff5050' }}>&#x2717;</span>
                    <span className="text-sm text-[#484f58] line-through truncate">{item.before}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0"><path d="M3 8h10m0 0l-3-3m3 3l-3 3" stroke="#30363d" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px]" style={{ background: 'rgba(40,200,64,0.1)', color: '#28c840' }}>&#x2713;</span>
                    <span className="text-sm text-white font-medium truncate">{item.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[10px] text-[#484f58] uppercase tracking-widest mb-5">Live Query Feed</p>
            <div className="space-y-2">
              {[
                { model: 'gpt-4o', cost: '$0.0130', tokens: '2,800 tok', time: '1.2s', dot: '#10a37f' },
                { model: 'claude-3.5-sonnet', cost: '$0.0089', tokens: '1,450 tok', time: '0.9s', dot: '#d4a27a' },
                { model: 'gemini-1.5-pro', cost: '$0.0042', tokens: '3,200 tok', time: '1.8s', dot: '#4285f4' },
                { model: 'gpt-4o-mini', cost: '$0.0006', tokens: '890 tok', time: '0.4s', dot: '#10a37f' },
                { model: 'claude-3-haiku', cost: '$0.0003', tokens: '620 tok', time: '0.3s', dot: '#d4a27a' },
                { model: 'deepseek-chat', cost: '$0.0002', tokens: '1,100 tok', time: '0.6s', dot: '#7c6ce0' },
                { model: 'mistral-large', cost: '$0.0058', tokens: '1,800 tok', time: '1.1s', dot: '#ff7000' },
              ].map((q) => (
                <div key={q.model} className="flex items-center justify-between py-2.5 rounded-lg px-3 hover:bg-[rgba(255,255,255,0.03)] transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: q.dot }}></span>
                    <span className="text-[12px] text-[#c9d1d9]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{q.model}</span>
                  </div>
                  <div className="flex gap-5 text-[11px]">
                    <span className="text-[#ff8c3c] font-semibold" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{q.cost}</span>
                    <span className="text-[#484f58] hidden sm:inline" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{q.tokens}</span>
                    <span className="text-[#30363d]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{q.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-32" style={{ background: 'linear-gradient(180deg, rgba(255,140,60,0.03) 0%, transparent 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[11px] text-[#ff8c3c] uppercase tracking-[5px] mb-5 font-semibold">How It Works</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
              Up and running in 2 minutes
            </h2>
            <p className="text-lg text-[#8b949e] max-w-lg mx-auto">
              No infrastructure changes. No new dependencies. Just wrap your client and go.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { num: '01', title: 'Sign up & get your key', desc: 'Create a free account and grab your API key from the dashboard.', color: '#ff8c3c' },
              { num: '02', title: 'Wrap your AI client', desc: 'Install the SDK and wrap your existing OpenAI, Anthropic, or Google client in one line.', color: '#4285f4' },
              { num: '03', title: 'Watch costs appear', desc: 'Every API call is tracked automatically. Your dashboard shows cost, tokens, and latency in real time.', color: '#28c840' },
            ].map((step, i) => (
              <div key={step.num} className="relative">
                {i < 2 && <div className="hidden md:block absolute top-8 right-0 w-6 h-px" style={{ background: 'rgba(255,255,255,0.1)' }}></div>}
                <div className="rounded-2xl p-8 h-full" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                    <span className="text-sm font-bold" style={{ color: step.color, fontFamily: 'var(--font-jetbrains), monospace' }}>{step.num}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-[#8b949e] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden" style={{ background: '#161b22', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
              <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }}></div>
                </div>
                <span className="text-[11px] text-[#484f58]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>your-app.ts</span>
                <div className="w-16"></div>
              </div>
              <div className="p-6 sm:p-8" style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '13px', lineHeight: '2.2' }}>
                <div className="text-[#484f58]">{'// npm install @truecompute/sdk'}</div>
                <div className="mt-3">
                  <span className="text-[#ff7b72]">import</span>{' '}
                  <span className="text-[#c9d1d9]">{'{ TrueCompute }'}</span>{' '}
                  <span className="text-[#ff7b72]">from</span>{' '}
                  <span className="text-[#a5d6ff]">{`'@truecompute/sdk'`}</span>
                </div>
                <div className="mt-1">
                  <span className="text-[#ff7b72]">const</span>{' '}
                  <span className="text-[#c9d1d9]">tc</span>{' = '}
                  <span className="text-[#ff7b72]">new</span>{' '}
                  <span className="text-[#d2a8ff]">TrueCompute</span>
                  <span className="text-[#8b949e]">{'({ apiKey: '}</span>
                  <span className="text-[#a5d6ff]">{`'tc_live_...'`}</span>
                  <span className="text-[#8b949e]">{' })'}</span>
                </div>
                <div>
                  <span className="text-[#ff7b72]">const</span>{' '}
                  <span className="text-[#c9d1d9]">openai</span>{' = '}
                  <span className="text-[#c9d1d9]">tc.wrap</span>
                  <span className="text-[#8b949e]">(</span>
                  <span className="text-[#ff7b72]">new</span>{' '}
                  <span className="text-[#d2a8ff]">OpenAI</span>
                  <span className="text-[#8b949e]">())</span>
                </div>
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-[#484f58]">{'// Use as normal — every call is tracked automatically'}</span>
                </div>
                <div>
                  <span className="text-[#ff7b72]">const</span>{' '}
                  <span className="text-[#c9d1d9]">res</span>{' = '}
                  <span className="text-[#ff7b72]">await</span>{' '}
                  <span className="text-[#c9d1d9]">openai.chat.completions.create</span>
                  <span className="text-[#8b949e]">({'{ ... }'})</span>
                </div>
                <div className="mt-4 pt-4 flex items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[#28c840]">Dashboard: $0.0043 &middot; 1,247 tokens &middot; 892ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pt-40 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] text-[#ff8c3c] uppercase tracking-[5px] mb-5 font-semibold">Pricing</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-[#8b949e]">Start free. Scale when you&apos;re ready.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl transition-all relative flex flex-col ${plan.highlighted ? 'md:scale-[1.04] pt-14 pb-10 px-8' : 'pt-10 pb-10 px-8'}`}
                style={{
                  background: plan.highlighted
                    ? 'linear-gradient(135deg, rgba(255,140,60,0.08), rgba(255,140,60,0.02))'
                    : 'rgba(255,255,255,0.02)',
                  border: plan.highlighted
                    ? '1px solid rgba(255,140,60,0.3)'
                    : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                    style={{ background: 'linear-gradient(135deg, #ff8c3c, #ff6b1a)', color: '#fff' }}>
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-[#484f58] mt-2 mb-8">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{plan.price}</span>
                  <span className="text-sm text-[#484f58]">/mo</span>
                </div>
                <div className="w-full h-px mb-8" style={{ background: 'rgba(255,255,255,0.06)' }}></div>
                <ul className="space-y-4 mb-auto pb-10 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[13px] text-[#8b949e]">
                      <span className="text-emerald-400 shrink-0">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block w-full py-3.5 font-semibold text-sm rounded-full text-center transition-all ${
                    plan.highlighted
                      ? 'hover:shadow-[0_0_25px_rgba(255,140,60,0.3)] hover:scale-[1.02]'
                      : 'hover:bg-[rgba(255,255,255,0.08)]'
                  }`}
                  style={{
                    background: plan.highlighted ? 'linear-gradient(135deg, #ff8c3c, #ff6b1a)' : 'rgba(255,255,255,0.06)',
                    color: plan.highlighted ? '#fff' : '#c9d1d9',
                    border: plan.highlighted ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {plan.name === 'Free' ? 'Get Started Free' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Pro Trial'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 mt-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-bold text-[#30363d]">TrueCompute</span>
          <div className="flex gap-8">
            <a href="#features" className="text-xs text-[#484f58] hover:text-[#8b949e] transition-colors">Features</a>
            <a href="#how-it-works" className="text-xs text-[#484f58] hover:text-[#8b949e] transition-colors">How It Works</a>
            <a href="#pricing" className="text-xs text-[#484f58] hover:text-[#8b949e] transition-colors">Pricing</a>
            <Link href="/login" className="text-xs text-[#484f58] hover:text-[#8b949e] transition-colors">Sign In</Link>
          </div>
          <span className="text-xs text-[#30363d]">&copy; {new Date().getFullYear()} TrueCompute</span>
        </div>
      </footer>
    </div>
  );
}
