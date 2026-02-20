import Link from 'next/link';

const providers = ['OpenAI', 'Anthropic', 'Google', 'DeepSeek', 'Mistral', '15+ more'];

const features = [
  {
    icon: '$',
    title: 'Real-Time Cost Tracking',
    desc: 'Per-query cost across 30+ AI models. See exactly what each API call costs — down to the fraction of a cent.',
  },
  {
    icon: '#',
    title: 'Multi-Provider Dashboard',
    desc: 'One dashboard for OpenAI, Anthropic, Google, DeepSeek, and Mistral. Break down by provider, model, or team.',
  },
  {
    icon: '!',
    title: 'Budget Alerts',
    desc: 'Set monthly limits. Get alerted at 80%. Never get surprised by your AI bill again.',
  },
  {
    icon: '>',
    title: '3-Line Integration',
    desc: 'Wrap your existing AI client in one line. Zero latency overhead. Fire-and-forget telemetry.',
  },
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: ['1,000 queries/mo', '1 team member', '7-day data retention', 'Basic dashboard'],
  },
  {
    name: 'Pro',
    price: '$49',
    features: ['50,000 queries/mo', '10 team members', '90-day retention', 'Budget alerts', 'Model comparison'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$499',
    features: ['Unlimited queries', 'Unlimited members', '1-year retention', 'Priority support', 'SLA guarantee', 'Custom integrations'],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#06080c' }}>
      {/* Nav */}
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-xl font-light tracking-tight text-[#ff8c3c]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
          TrueCompute
        </span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-[#8a8379] hover:text-[#ddd8d0] transition-colors" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-[#ff8c3c] text-[#06080c] font-bold text-sm rounded-md hover:bg-[#ffb87a] transition-colors"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Start Free
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <p className="text-[10px] uppercase tracking-[7px] text-[#ff8c3c] opacity-70 mb-5" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
          AI Cost Intelligence
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6" style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          background: 'linear-gradient(135deg, #ff8c3c, #ffb87a, #ff8c3c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-2px',
        }}>
          Know the true cost of<br />every AI query
        </h1>
        <p className="text-lg text-[#8a8379] max-w-xl mx-auto mb-10 font-light italic" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
          Real-time cost tracking across OpenAI, Anthropic, Google, and 15+ providers.
          Per-query, per-model, per-team — in one dashboard.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-3 bg-[#ff8c3c] text-[#06080c] font-bold text-sm rounded-md hover:bg-[#ffb87a] transition-colors"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Start Free
          </Link>
          <a
            href="#pricing"
            className="px-8 py-3 border border-[rgba(255,140,60,0.25)] text-[#ddd8d0] text-sm rounded-md hover:bg-[rgba(255,140,60,0.05)] transition-colors"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            View Pricing
          </a>
        </div>
      </section>

      {/* Provider bar */}
      <section className="border-y border-[rgba(255,140,60,0.08)] py-5">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center flex-wrap gap-6">
          <span className="text-xs text-[#3d3935]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Tracks costs for:</span>
          {providers.map((p) => (
            <span key={p} className="text-xs text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{p}</span>
          ))}
        </div>
      </section>

      {/* Code example */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-light text-[#ddd8d0] mb-3" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
            Three lines. Zero overhead.
          </h2>
          <p className="text-sm text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Wrap your existing AI client. Everything else stays the same.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-[rgba(0,0,0,0.45)] border border-[rgba(255,140,60,0.15)] rounded-xl p-7" style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '13px', lineHeight: '2' }}>
          <div className="text-[#ff8c3c]">{'// npm install @truecompute/sdk'}</div>
          <div className="mt-1">
            <span className="text-[#6ba4d4]">import</span>{' '}
            <span className="text-[#ddd8d0]">{'{ TrueCompute }'}</span>{' '}
            <span className="text-[#6ba4d4]">from</span>{' '}
            <span className="text-[#3ec96a]">{`'@truecompute/sdk'`}</span>;
          </div>
          <div>
            <span className="text-[#6ba4d4]">const</span>{' '}
            <span className="text-[#ddd8d0]">tc</span>{' '}
            <span className="text-[#ddd8d0]">=</span>{' '}
            <span className="text-[#6ba4d4]">new</span>{' '}
            <span className="text-[#ddd8d0]">TrueCompute</span>
            <span className="text-[#5a554e]">{'({ apiKey: '}</span>
            <span className="text-[#3ec96a]">{`'tc_live_...'`}</span>
            <span className="text-[#5a554e]">{' })'}</span>;
          </div>
          <div>
            <span className="text-[#6ba4d4]">const</span>{' '}
            <span className="text-[#ddd8d0]">openai</span>{' '}
            <span className="text-[#ddd8d0]">=</span>{' '}
            <span className="text-[#ddd8d0]">tc.wrap</span>
            <span className="text-[#5a554e]">(</span>
            <span className="text-[#6ba4d4]">new</span>{' '}
            <span className="text-[#ddd8d0]">OpenAI</span>
            <span className="text-[#5a554e]">());</span>
          </div>
          <div className="mt-3 text-[#3d3935]">{'// Use openai as normal — all calls tracked automatically'}</div>
          <div>
            <span className="text-[#6ba4d4]">const</span>{' '}
            <span className="text-[#ddd8d0]">res</span>{' '}
            <span className="text-[#ddd8d0]">=</span>{' '}
            <span className="text-[#6ba4d4]">await</span>{' '}
            <span className="text-[#ddd8d0]">openai.chat.completions.create</span>
            <span className="text-[#5a554e]">({'{ ... }'})</span>;
          </div>
          <div className="mt-3 text-[#3d3935]">{'// Dashboard shows:'}</div>
          <div className="text-[#ffb87a]">{'// Cost: $0.0043 | Tokens: 1,247 | Latency: 892ms'}</div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-[#ddd8d0]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
            Everything you need to control AI costs
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg p-6 hover:border-[rgba(255,140,60,0.25)] transition-all hover:-translate-y-0.5">
              <div className="text-2xl mb-3 text-[#ff8c3c]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{f.icon}</div>
              <h3 className="text-lg font-semibold text-[#ff8c3c] mb-2" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>{f.title}</h3>
              <p className="text-xs text-[#5a554e] leading-relaxed" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-[#ddd8d0]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
            Simple, transparent pricing
          </h2>
          <p className="text-sm text-[#5a554e] mt-2" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Start free. Scale when ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-7 ${
                plan.highlighted
                  ? 'bg-[rgba(255,140,60,0.06)] border-2 border-[rgba(255,140,60,0.3)]'
                  : 'bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)]'
              }`}
            >
              {plan.highlighted && (
                <div className="text-[9px] uppercase tracking-widest text-[#ff8c3c] font-bold mb-3" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
                  Most Popular
                </div>
              )}
              <h3 className="text-xl text-[#ddd8d0]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-2 mb-6">
                <span className="text-4xl font-bold text-[#ff8c3c]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{plan.price}</span>
                <span className="text-sm text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-[#8a8379]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
                    <span className="text-[#3ec96a]">&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`block w-full px-4 py-2.5 font-bold text-sm rounded-md text-center transition-colors ${
                  plan.highlighted
                    ? 'bg-[#ff8c3c] text-[#06080c] hover:bg-[#ffb87a]'
                    : 'bg-[rgba(255,140,60,0.12)] text-[#ff8c3c] hover:bg-[rgba(255,140,60,0.2)]'
                }`}
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                {plan.name === 'Free' ? 'Get Started' : `Start ${plan.name}`}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="bg-[rgba(255,140,60,0.06)] border border-[rgba(255,140,60,0.15)] rounded-xl p-12">
          <h2 className="text-3xl font-light text-[#ddd8d0] mb-3" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
            Start tracking in 30 seconds
          </h2>
          <p className="text-sm text-[#5a554e] mb-8" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Free tier. No credit card required. 3 lines of code.
          </p>
          <Link
            href="/signup"
            className="inline-block px-10 py-3 bg-[#ff8c3c] text-[#06080c] font-bold text-sm rounded-md hover:bg-[#ffb87a] transition-colors"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,140,60,0.08)] py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <span className="text-xs text-[#3d3935]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            TrueCompute &copy; {new Date().getFullYear()}
          </span>
          <div className="flex gap-6">
            <Link href="/login" className="text-xs text-[#3d3935] hover:text-[#5a554e] transition-colors" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              Sign In
            </Link>
            <Link href="/signup" className="text-xs text-[#3d3935] hover:text-[#5a554e] transition-colors" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
