import Link from 'next/link';

export const dynamic = 'force-static';

const providerLogos = [
  { name: 'OpenAI', color: '#10a37f' },
  { name: 'Anthropic', color: '#d4a574' },
  { name: 'Google', color: '#4285f4' },
  { name: 'DeepSeek', color: '#6c7ee1' },
  { name: 'Mistral', color: '#ff7000' },
];

const steps = [
  {
    number: '1',
    title: 'Connect your AI stack',
    desc: 'Add 3 lines of code to wrap your existing AI client. Works with OpenAI, Anthropic, Google, and more.',
  },
  {
    number: '2',
    title: 'Make API calls as usual',
    desc: 'Your code works exactly the same. TrueCompute silently captures every call in the background.',
  },
  {
    number: '3',
    title: 'See where your money goes',
    desc: 'Open your dashboard and instantly see cost breakdowns by provider, model, and individual query.',
  },
];

const painPoints = [
  {
    before: 'Checking 5 different provider dashboards',
    after: 'One dashboard for everything',
  },
  {
    before: 'Guessing which model costs more',
    after: 'Exact per-query cost comparisons',
  },
  {
    before: 'Surprise bills at end of month',
    after: 'Real-time budget alerts',
  },
  {
    before: 'No idea which team or feature drives cost',
    after: 'Granular usage breakdowns',
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
    <div className="min-h-screen" style={{ background: '#06080c' }}>
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="text-xl font-light tracking-tight text-[#ff8c3c]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
          TrueCompute
        </span>
        <div className="flex items-center gap-5">
          <a href="#how-it-works" className="text-sm text-[#8a8379] hover:text-[#ddd8d0] transition-colors hidden sm:inline" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            How It Works
          </a>
          <a href="#pricing" className="text-sm text-[#8a8379] hover:text-[#ddd8d0] transition-colors hidden sm:inline" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Pricing
          </a>
          <Link href="/login" className="text-sm text-[#8a8379] hover:text-[#ddd8d0] transition-colors" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 bg-[#ff8c3c] text-[#06080c] font-bold text-sm rounded-lg hover:bg-[#ffb87a] transition-colors"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Start Free
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-8 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-[rgba(255,140,60,0.2)] bg-[rgba(255,140,60,0.05)] mb-8">
          <span className="text-xs text-[#ff8c3c]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Trusted by teams shipping AI products
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-6" style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          letterSpacing: '-2px',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #ff8c3c, #ffb87a, #ff8c3c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Stop guessing<br />what AI costs you
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[#8a8379] max-w-2xl mx-auto mb-12 leading-relaxed" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
          Every API call to OpenAI, Anthropic, or Google has a price tag.
          TrueCompute shows you exactly what you&apos;re spending &mdash; per query, per model, per dollar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link
            href="/signup"
            className="px-10 py-4 bg-[#ff8c3c] text-[#06080c] font-bold text-sm rounded-lg hover:bg-[#ffb87a] transition-all hover:shadow-[0_0_30px_rgba(255,140,60,0.3)]"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Start Free &mdash; No Credit Card
          </Link>
          <a
            href="#how-it-works"
            className="px-10 py-4 border border-[rgba(255,140,60,0.25)] text-[#ddd8d0] text-sm rounded-lg hover:bg-[rgba(255,140,60,0.05)] transition-colors"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            See How It Works
          </a>
        </div>

        <p className="text-xs text-[#3d3935] mb-16" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
          Free tier includes 1,000 queries/month
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,140,60,0.12)] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[rgba(255,140,60,0.08)] bg-[rgba(0,0,0,0.3)]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
            <span className="ml-3 text-xs text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>TrueCompute Dashboard</span>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[rgba(255,140,60,0.04)] border border-[rgba(255,140,60,0.1)] rounded-xl p-4 text-center">
                <p className="text-xs text-[#5a554e] mb-1" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Today&apos;s Spend</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#ff8c3c]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>$4.82</p>
              </div>
              <div className="bg-[rgba(255,140,60,0.04)] border border-[rgba(255,140,60,0.1)] rounded-xl p-4 text-center">
                <p className="text-xs text-[#5a554e] mb-1" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>This Month</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#ffb87a]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>$127.43</p>
              </div>
              <div className="bg-[rgba(255,140,60,0.04)] border border-[rgba(255,140,60,0.1)] rounded-xl p-4 text-center">
                <p className="text-xs text-[#5a554e] mb-1" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>API Calls</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#ddd8d0]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>3,847</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,140,60,0.08)] rounded-xl p-5">
                <p className="text-xs text-[#5a554e] mb-4" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Cost by Provider</p>
                <div className="space-y-3">
                  {[
                    { name: 'OpenAI', amount: '$68.21', pct: 54, color: '#10a37f' },
                    { name: 'Anthropic', amount: '$42.15', pct: 33, color: '#d4a574' },
                    { name: 'Google', amount: '$12.07', pct: 9, color: '#4285f4' },
                    { name: 'DeepSeek', amount: '$3.80', pct: 3, color: '#6c7ee1' },
                    { name: 'Mistral', amount: '$1.20', pct: 1, color: '#ff7000' },
                  ].map((p) => (
                    <div key={p.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#8a8379]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{p.name}</span>
                        <span className="text-[#ddd8d0]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{p.amount}</span>
                      </div>
                      <div className="h-2 rounded-full bg-[rgba(255,255,255,0.05)]">
                        <div className="h-2 rounded-full transition-all" style={{ width: `${p.pct}%`, backgroundColor: p.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,140,60,0.08)] rounded-xl p-5">
                <p className="text-xs text-[#5a554e] mb-4" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Recent Queries</p>
                <div className="space-y-2.5">
                  {[
                    { model: 'gpt-4o', cost: '$0.0130', tokens: '2,800', latency: '1.2s' },
                    { model: 'claude-3.5-sonnet', cost: '$0.0089', tokens: '1,450', latency: '0.9s' },
                    { model: 'gemini-1.5-pro', cost: '$0.0042', tokens: '3,200', latency: '1.8s' },
                    { model: 'gpt-4o-mini', cost: '$0.0006', tokens: '890', latency: '0.4s' },
                    { model: 'claude-3-haiku', cost: '$0.0003', tokens: '620', latency: '0.3s' },
                  ].map((q) => (
                    <div key={q.model} className="flex items-center justify-between py-1.5 border-b border-[rgba(255,140,60,0.05)] last:border-0">
                      <span className="text-xs text-[#8a8379] truncate" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{q.model}</span>
                      <div className="flex gap-4 text-xs shrink-0">
                        <span className="text-[#ff8c3c]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{q.cost}</span>
                        <span className="text-[#5a554e] hidden sm:inline" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{q.tokens} tok</span>
                        <span className="text-[#3d3935]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{q.latency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 mb-10">
        <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-12">
          <span className="text-xs text-[#3d3935] uppercase tracking-wider" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Works with</span>
          {providerLogos.map((p) => (
            <span key={p.name} className="text-sm font-medium" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: p.color, opacity: 0.7 }}>
              {p.name}
            </span>
          ))}
          <span className="text-xs text-[#3d3935]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>+ 15 more</span>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-[#ddd8d0] mb-4" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
            The problem is simple
          </h2>
          <p className="text-sm text-[#5a554e] max-w-lg mx-auto" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            You use multiple AI providers. Each has its own billing page. None of them show cost per query.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {painPoints.map((p, i) => (
            <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,140,60,0.08)] rounded-xl p-5 hover:border-[rgba(255,140,60,0.2)] transition-all">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-red-400/60 text-lg leading-none mt-0.5" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>&#x2717;</span>
                <p className="text-sm text-[#5a554e] line-through decoration-[rgba(255,140,60,0.2)]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{p.before}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#3ec96a] text-lg leading-none mt-0.5" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>&#x2713;</span>
                <p className="text-sm text-[#ddd8d0]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{p.after}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-[#ddd8d0] mb-4" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
            Up and running in 2 minutes
          </h2>
          <p className="text-sm text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            No infrastructure changes. No new dependencies. Just wrap and go.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="w-10 h-10 rounded-full bg-[rgba(255,140,60,0.1)] border border-[rgba(255,140,60,0.25)] flex items-center justify-center mb-4">
                <span className="text-sm font-bold text-[#ff8c3c]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold text-[#ddd8d0] mb-2" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>{step.title}</h3>
              <p className="text-xs text-[#5a554e] leading-relaxed" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-[rgba(0,0,0,0.45)] border border-[rgba(255,140,60,0.15)] rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgba(255,140,60,0.08)] bg-[rgba(0,0,0,0.3)]">
            <div className="w-2 h-2 rounded-full bg-[#ff5f57]"></div>
            <div className="w-2 h-2 rounded-full bg-[#febc2e]"></div>
            <div className="w-2 h-2 rounded-full bg-[#28c840]"></div>
            <span className="ml-2 text-[10px] text-[#3d3935]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>your-app.ts</span>
          </div>
          <div className="p-6" style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '13px', lineHeight: '2' }}>
            <div className="text-[#3d3935]">{'// Install: npm install @truecompute/sdk'}</div>
            <div className="mt-2">
              <span className="text-[#6ba4d4]">import</span>{' '}
              <span className="text-[#ddd8d0]">{'{ TrueCompute }'}</span>{' '}
              <span className="text-[#6ba4d4]">from</span>{' '}
              <span className="text-[#3ec96a]">{`'@truecompute/sdk'`}</span>;
            </div>
            <div className="mt-1">
              <span className="text-[#6ba4d4]">const</span>{' '}
              <span className="text-[#ddd8d0]">tc</span>{' = '}
              <span className="text-[#6ba4d4]">new</span>{' '}
              <span className="text-[#ddd8d0]">TrueCompute</span>
              <span className="text-[#5a554e]">{'({ apiKey: '}</span>
              <span className="text-[#3ec96a]">{`'tc_live_...'`}</span>
              <span className="text-[#5a554e]">{' })'}</span>;
            </div>
            <div>
              <span className="text-[#6ba4d4]">const</span>{' '}
              <span className="text-[#ddd8d0]">openai</span>{' = '}
              <span className="text-[#ddd8d0]">tc.wrap</span>
              <span className="text-[#5a554e]">(</span>
              <span className="text-[#6ba4d4]">new</span>{' '}
              <span className="text-[#ddd8d0]">OpenAI</span>
              <span className="text-[#5a554e]">());</span>
            </div>
            <div className="mt-3 text-[#3d3935]">{'// That\'s it. Use openai as normal.'}</div>
            <div>
              <span className="text-[#6ba4d4]">const</span>{' '}
              <span className="text-[#ddd8d0]">res</span>{' = '}
              <span className="text-[#6ba4d4]">await</span>{' '}
              <span className="text-[#ddd8d0]">openai.chat.completions.create</span>
              <span className="text-[#5a554e]">({'{ ... }'})</span>;
            </div>
            <div className="mt-3 pt-3 border-t border-[rgba(255,140,60,0.08)]">
              <span className="text-[#ffb87a]">{'// '}</span>
              <span className="text-[#ffb87a]">{'Dashboard automatically shows: $0.0043 | 1,247 tokens | 892ms'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-[#ddd8d0] mb-4" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
            What you get
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff8c3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              ),
              title: 'Per-Query Costs',
              desc: 'See exactly what each API call costs, down to the fraction of a cent.',
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff8c3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              ),
              title: 'Multi-Provider View',
              desc: 'OpenAI, Anthropic, Google, DeepSeek, Mistral — all in one place.',
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff8c3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10"></path>
                  <path d="M12 20V4"></path>
                  <path d="M6 20v-6"></path>
                </svg>
              ),
              title: 'Budget Alerts',
              desc: 'Set spending limits. Get notified before costs get out of hand.',
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff8c3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
                </svg>
              ),
              title: 'Zero Overhead',
              desc: 'No latency impact. Telemetry is fire-and-forget in the background.',
            },
          ].map((f) => (
            <div key={f.title} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,140,60,0.08)] rounded-xl p-6 hover:border-[rgba(255,140,60,0.2)] transition-all">
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-base font-semibold text-[#ddd8d0] mb-2" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>{f.title}</h3>
              <p className="text-xs text-[#5a554e] leading-relaxed" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-light text-[#ddd8d0] mb-4" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
            Simple pricing
          </h2>
          <p className="text-sm text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-7 ${
                plan.highlighted
                  ? 'bg-[rgba(255,140,60,0.06)] border-2 border-[rgba(255,140,60,0.3)] relative'
                  : 'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,140,60,0.08)]'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#ff8c3c] text-[#06080c]">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Most Popular</span>
                </div>
              )}
              <h3 className="text-xl text-[#ddd8d0]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>{plan.name}</h3>
              <p className="text-xs text-[#5a554e] mt-1 mb-4" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#ff8c3c]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{plan.price}</span>
                <span className="text-sm text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-xs text-[#8a8379]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
                    <span className="text-[#3ec96a]">&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`block w-full px-4 py-3 font-bold text-sm rounded-lg text-center transition-colors ${
                  plan.highlighted
                    ? 'bg-[#ff8c3c] text-[#06080c] hover:bg-[#ffb87a]'
                    : 'bg-[rgba(255,140,60,0.1)] text-[#ff8c3c] hover:bg-[rgba(255,140,60,0.2)]'
                }`}
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                {plan.name === 'Free' ? 'Get Started Free' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Pro Trial'}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-br from-[rgba(255,140,60,0.08)] to-[rgba(255,140,60,0.02)] border border-[rgba(255,140,60,0.15)] rounded-2xl p-10 sm:p-16">
          <h2 className="text-3xl sm:text-4xl font-light text-[#ddd8d0] mb-4" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
            Your AI bill shouldn&apos;t be a mystery
          </h2>
          <p className="text-sm text-[#5a554e] mb-10 max-w-md mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Sign up in 30 seconds. Add 3 lines of code. See your first cost report before your coffee gets cold.
          </p>
          <Link
            href="/signup"
            className="inline-block px-12 py-4 bg-[#ff8c3c] text-[#06080c] font-bold text-sm rounded-lg hover:bg-[#ffb87a] transition-all hover:shadow-[0_0_30px_rgba(255,140,60,0.3)]"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Create Free Account
          </Link>
        </div>
      </section>

      <footer className="border-t border-[rgba(255,140,60,0.08)] py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="text-xs text-[#3d3935]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            TrueCompute &copy; {new Date().getFullYear()}
          </span>
          <div className="flex gap-6">
            <a href="#how-it-works" className="text-xs text-[#3d3935] hover:text-[#5a554e] transition-colors" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              How It Works
            </a>
            <a href="#pricing" className="text-xs text-[#3d3935] hover:text-[#5a554e] transition-colors" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              Pricing
            </a>
            <Link href="/login" className="text-xs text-[#3d3935] hover:text-[#5a554e] transition-colors" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
