import Link from 'next/link';

export const dynamic = 'force-static';

const steps = [
  {
    number: '01',
    title: 'Sign up & get your API key',
    desc: 'Create a free account in 30 seconds. No credit card needed.',
  },
  {
    number: '02',
    title: 'Add 3 lines to your code',
    desc: 'Wrap your existing AI client. Everything else stays the same.',
  },
  {
    number: '03',
    title: 'See every dollar in real time',
    desc: 'Your dashboard lights up with cost, token, and latency data instantly.',
  },
];

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
    <div className="min-h-screen bg-[#FAFAF8]">
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="text-xl font-semibold tracking-tight text-[#1a1a1a]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
          TrueCompute
        </span>
        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors hidden sm:inline" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            How It Works
          </a>
          <a href="#pricing" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors hidden sm:inline" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Pricing
          </a>
          <Link href="/login" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 bg-[#1a1a1a] text-white font-medium text-sm rounded-full hover:bg-[#333] transition-colors"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0ede8] mb-10">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs text-[#666]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Tracking costs for 15+ AI providers
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light leading-[1.05] mb-8 text-[#1a1a1a]" style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          letterSpacing: '-2px',
        }}>
          Know what your<br />
          <span className="italic">AI actually costs</span>
        </h1>

        <p className="text-lg text-[#888] max-w-xl mx-auto mb-12 leading-relaxed">
          Every API call to OpenAI, Anthropic, or Google has a price.
          TrueCompute tracks it all in one place — per query, per model, per cent.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
          <Link
            href="/signup"
            className="px-10 py-4 bg-[#1a1a1a] text-white font-medium text-sm rounded-full hover:bg-[#333] transition-all hover:shadow-lg"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Start Free
          </Link>
          <a
            href="#how-it-works"
            className="px-10 py-4 text-[#666] text-sm hover:text-[#1a1a1a] transition-colors"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            See how it works &darr;
          </a>
        </div>
        <p className="text-xs text-[#bbb]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
          No credit card required &middot; 1,000 free queries/month
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-3xl border border-[#e8e5e0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[#f0ede8]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
            <span className="ml-4 text-xs text-[#bbb]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Dashboard</span>
          </div>

          <div className="p-6 sm:p-8 bg-gradient-to-b from-[#FAFAF8] to-white">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Today's Spend", value: '$4.82', color: '#1a1a1a' },
                { label: 'This Month', value: '$127.43', color: '#1a1a1a' },
                { label: 'API Calls', value: '3,847', color: '#1a1a1a' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl border border-[#f0ede8] p-5 text-center">
                  <p className="text-[11px] text-[#999] mb-2 uppercase tracking-wider" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: stat.color }}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-[#f0ede8] p-5">
                <p className="text-[11px] text-[#999] mb-5 uppercase tracking-wider" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Cost by Provider</p>
                <div className="space-y-4">
                  {[
                    { name: 'OpenAI', amount: '$68.21', pct: 54, color: '#10a37f' },
                    { name: 'Anthropic', amount: '$42.15', pct: 33, color: '#c96442' },
                    { name: 'Google', amount: '$12.07', pct: 9, color: '#4285f4' },
                    { name: 'DeepSeek', amount: '$3.80', pct: 3, color: '#7c6ce0' },
                    { name: 'Mistral', amount: '$1.20', pct: 1, color: '#ff7000' },
                  ].map((p) => (
                    <div key={p.name}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-[#666]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{p.name}</span>
                        <span className="text-[#1a1a1a] font-medium" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{p.amount}</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#f5f3ef]">
                        <div className="h-2 rounded-full transition-all" style={{ width: `${Math.max(p.pct, 3)}%`, backgroundColor: p.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#f0ede8] p-5">
                <p className="text-[11px] text-[#999] mb-5 uppercase tracking-wider" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Recent Queries</p>
                <div className="space-y-0">
                  {[
                    { model: 'gpt-4o', cost: '$0.0130', tokens: '2,800', latency: '1.2s', dotColor: '#10a37f' },
                    { model: 'claude-3.5-sonnet', cost: '$0.0089', tokens: '1,450', latency: '0.9s', dotColor: '#c96442' },
                    { model: 'gemini-1.5-pro', cost: '$0.0042', tokens: '3,200', latency: '1.8s', dotColor: '#4285f4' },
                    { model: 'gpt-4o-mini', cost: '$0.0006', tokens: '890', latency: '0.4s', dotColor: '#10a37f' },
                    { model: 'deepseek-chat', cost: '$0.0003', tokens: '620', latency: '0.3s', dotColor: '#7c6ce0' },
                  ].map((q) => (
                    <div key={q.model} className="flex items-center justify-between py-2.5 border-b border-[#f5f3ef] last:border-0">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: q.dotColor }}></span>
                        <span className="text-xs text-[#444] truncate" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{q.model}</span>
                      </div>
                      <div className="flex gap-4 text-xs shrink-0">
                        <span className="text-[#1a1a1a] font-medium" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{q.cost}</span>
                        <span className="text-[#bbb] hidden sm:inline" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{q.tokens}</span>
                        <span className="text-[#ccc]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{q.latency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-[#f0ede8]">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center flex-wrap gap-8 sm:gap-14">
          <span className="text-[11px] text-[#ccc] uppercase tracking-wider" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Works with</span>
          {[
            { name: 'OpenAI', color: '#10a37f' },
            { name: 'Anthropic', color: '#c96442' },
            { name: 'Google', color: '#4285f4' },
            { name: 'DeepSeek', color: '#7c6ce0' },
            { name: 'Mistral', color: '#ff7000' },
          ].map((p) => (
            <span key={p.name} className="text-sm font-medium" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: p.color }}>
              {p.name}
            </span>
          ))}
          <span className="text-xs text-[#ccc]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>+ 15 more</span>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-28">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-light text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', letterSpacing: '-1px' }}>
            Sound familiar?
          </h2>
        </div>

        <div className="space-y-5 max-w-2xl mx-auto">
          {[
            { before: 'Checking 5 different provider billing pages', after: 'One unified dashboard for all providers' },
            { before: 'Guessing which AI model costs more', after: 'Exact per-query cost down to the fraction of a cent' },
            { before: 'Surprise AI bills at end of month', after: 'Real-time budget alerts before you overspend' },
            { before: 'No visibility into which feature drives cost', after: 'Granular breakdowns by model, team, and query' },
          ].map((p, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-6 items-center bg-white rounded-2xl border border-[#f0ede8] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-red-50 text-red-400 flex items-center justify-center text-xs shrink-0">&#x2717;</span>
                <p className="text-sm text-[#999] line-through" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{p.before}</p>
              </div>
              <div className="hidden sm:block">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-xs shrink-0">&#x2713;</span>
                <p className="text-sm text-[#1a1a1a] font-medium" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{p.after}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[11px] text-[#bbb] uppercase tracking-[4px] mb-4" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>How it works</p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1a1a1a]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', letterSpacing: '-1px' }}>
              Up and running in 2 minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center md:text-left">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+40px)] right-[calc(-50%+40px)] border-t border-dashed border-[#e0ddd8]"></div>
                )}
                <div className="w-12 h-12 rounded-full bg-[#FAFAF8] border border-[#e8e5e0] flex items-center justify-center mb-5 mx-auto md:mx-0">
                  <span className="text-sm font-bold text-[#999]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{step.number}</span>
                </div>
                <h3 className="text-lg font-medium text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>{step.title}</h3>
                <p className="text-xs text-[#999] leading-relaxed" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
              <span className="ml-3 text-[10px] text-[#555]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>your-app.ts</span>
            </div>
            <div className="p-6" style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '13px', lineHeight: '2.1' }}>
              <div className="text-[#555]">{'// npm install @truecompute/sdk'}</div>
              <div className="mt-2">
                <span className="text-[#7eb8e0]">import</span>{' '}
                <span className="text-[#e0e0e0]">{'{ TrueCompute }'}</span>{' '}
                <span className="text-[#7eb8e0]">from</span>{' '}
                <span className="text-[#a8d8a8]">{`'@truecompute/sdk'`}</span>;
              </div>
              <div className="mt-1">
                <span className="text-[#7eb8e0]">const</span>{' '}
                <span className="text-[#e0e0e0]">tc</span>{' = '}
                <span className="text-[#7eb8e0]">new</span>{' '}
                <span className="text-[#e0e0e0]">TrueCompute</span>
                <span className="text-[#888]">{'({ apiKey: '}</span>
                <span className="text-[#a8d8a8]">{`'tc_live_...'`}</span>
                <span className="text-[#888]">{' })'}</span>;
              </div>
              <div>
                <span className="text-[#7eb8e0]">const</span>{' '}
                <span className="text-[#e0e0e0]">openai</span>{' = '}
                <span className="text-[#e0e0e0]">tc.wrap</span>
                <span className="text-[#888]">(</span>
                <span className="text-[#7eb8e0]">new</span>{' '}
                <span className="text-[#e0e0e0]">OpenAI</span>
                <span className="text-[#888]">());</span>
              </div>
              <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                <span className="text-[#555]">{'// That\'s it. Use openai as normal.'}</span>
              </div>
              <div>
                <span className="text-[#7eb8e0]">const</span>{' '}
                <span className="text-[#e0e0e0]">res</span>{' = '}
                <span className="text-[#7eb8e0]">await</span>{' '}
                <span className="text-[#e0e0e0]">openai.chat.completions.create</span>
                <span className="text-[#888]">({'{ ... }'})</span>;
              </div>
              <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                <span className="text-[#febc2e]">{'// '}</span>
                <span className="text-[#febc2e]">{'Dashboard shows: $0.0043 | 1,247 tokens | 892ms'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="text-[11px] text-[#bbb] uppercase tracking-[4px] mb-4" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Features</p>
          <h2 className="text-3xl sm:text-4xl font-light text-[#1a1a1a]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', letterSpacing: '-1px' }}>
            Everything you need to control AI spend
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              ),
              title: 'Per-Query Costs',
              desc: 'See what each API call costs down to the fraction of a cent.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              ),
              title: 'Unified Dashboard',
              desc: 'All your AI providers in one view. No more tab-switching.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10"></path>
                  <path d="M12 20V4"></path>
                  <path d="M6 20v-6"></path>
                </svg>
              ),
              title: 'Budget Alerts',
              desc: 'Set limits. Get notified at 80%. No more surprise bills.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
                </svg>
              ),
              title: 'Zero Overhead',
              desc: 'No latency. Telemetry fires in the background silently.',
            },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-[#f0ede8] p-6 hover:border-[#ddd8d0] hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#f0ede8] flex items-center justify-center mb-5 text-[#999] group-hover:text-[#1a1a1a] group-hover:border-[#ddd8d0] transition-colors">
                {f.icon}
              </div>
              <h3 className="text-base font-medium text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>{f.title}</h3>
              <p className="text-xs text-[#999] leading-relaxed" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="bg-white py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] text-[#bbb] uppercase tracking-[4px] mb-4" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1a1a1a] mb-3" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', letterSpacing: '-1px' }}>
              Simple, transparent pricing
            </h2>
            <p className="text-sm text-[#999]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              Start free. Upgrade when you&apos;re ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 transition-all ${
                  plan.highlighted
                    ? 'bg-[#1a1a1a] text-white shadow-xl relative scale-[1.02]'
                    : 'bg-[#FAFAF8] border border-[#f0ede8]'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Most Popular</span>
                  </div>
                )}
                <h3 className={`text-xl ${plan.highlighted ? 'text-white' : 'text-[#1a1a1a]'}`} style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>{plan.name}</h3>
                <p className={`text-xs mt-1 mb-5 ${plan.highlighted ? 'text-[#888]' : 'text-[#999]'}`} style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-7">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-[#1a1a1a]'}`} style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{plan.price}</span>
                  <span className={`text-sm ${plan.highlighted ? 'text-[#666]' : 'text-[#bbb]'}`} style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 text-xs ${plan.highlighted ? 'text-[#aaa]' : 'text-[#888]'}`} style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
                      <span className="text-emerald-500">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block w-full px-4 py-3 font-medium text-sm rounded-full text-center transition-all ${
                    plan.highlighted
                      ? 'bg-white text-[#1a1a1a] hover:bg-[#f0f0f0]'
                      : 'bg-[#1a1a1a] text-white hover:bg-[#333]'
                  }`}
                  style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                >
                  {plan.name === 'Free' ? 'Get Started Free' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Pro Trial'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-28 text-center">
        <h2 className="text-3xl sm:text-4xl font-light text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', letterSpacing: '-1px' }}>
          Your AI bill shouldn&apos;t be a mystery
        </h2>
        <p className="text-sm text-[#999] mb-10 max-w-md mx-auto" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
          Sign up in 30 seconds. Add 3 lines of code.
          See your first cost report before your coffee gets cold.
        </p>
        <Link
          href="/signup"
          className="inline-block px-12 py-4 bg-[#1a1a1a] text-white font-medium text-sm rounded-full hover:bg-[#333] transition-all hover:shadow-lg"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          Create Free Account
        </Link>
      </section>

      <footer className="border-t border-[#f0ede8] py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="text-xs text-[#ccc]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            TrueCompute &copy; {new Date().getFullYear()}
          </span>
          <div className="flex gap-6">
            <a href="#how-it-works" className="text-xs text-[#ccc] hover:text-[#666] transition-colors" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              How It Works
            </a>
            <a href="#pricing" className="text-xs text-[#ccc] hover:text-[#666] transition-colors" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              Pricing
            </a>
            <Link href="/login" className="text-xs text-[#ccc] hover:text-[#666] transition-colors" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
