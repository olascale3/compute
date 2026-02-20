'use client';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    features: ['1,000 queries/mo', '1 team member', '7-day data retention'],
    current: true,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/mo',
    features: ['50,000 queries/mo', '10 team members', '90-day retention', 'Budget alerts'],
    current: false,
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$499',
    period: '/mo',
    features: ['Unlimited queries', 'Unlimited members', '1-year retention', 'Priority support', 'SLA'],
    current: false,
  },
];

export default function BillingPage() {
  return (
    <div>
      <h1 className="text-2xl font-light text-[#ddd8d0] mb-6" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
        Billing
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg p-6 transition-all ${
              plan.highlighted
                ? 'bg-[rgba(255,140,60,0.06)] border-2 border-[rgba(255,140,60,0.3)]'
                : 'bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)]'
            }`}
          >
            <div className="mb-4">
              <h3 className="text-lg text-[#ddd8d0]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-[#ff8c3c]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{plan.price}</span>
                <span className="text-sm text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-[#8a8379]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
                  <span className="text-[#3ec96a]">&#10003;</span> {f}
                </li>
              ))}
            </ul>

            {plan.current ? (
              <div className="px-4 py-2 bg-[rgba(255,140,60,0.08)] text-[#5a554e] text-xs rounded-md text-center" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
                Current Plan
              </div>
            ) : (
              <button
                className={`w-full px-4 py-2 font-bold text-xs rounded-md transition-colors ${
                  plan.highlighted
                    ? 'bg-[#ff8c3c] text-[#06080c] hover:bg-[#ffb87a]'
                    : 'bg-[rgba(255,140,60,0.12)] text-[#ff8c3c] hover:bg-[rgba(255,140,60,0.2)]'
                }`}
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                onClick={() => alert('Stripe integration coming soon. Contact support@truecompute.io for Enterprise.')}
              >
                Upgrade to {plan.name}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
