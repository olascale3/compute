'use client';

export default function TeamPage() {
  return (
    <div>
      <h1 className="text-2xl font-light text-[#ddd8d0] mb-6" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
        Team
      </h1>

      <div className="bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm text-[#8a8379]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Members</h2>
          <button
            disabled
            className="px-4 py-2 bg-[rgba(255,140,60,0.12)] text-[#5a554e] font-bold text-xs rounded-md cursor-not-allowed"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Invite Member (Coming Soon)
          </button>
        </div>

        <div className="border border-[rgba(255,140,60,0.08)] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#ddd8d0]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>You</div>
              <div className="text-xs text-[#5a554e]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Owner</div>
            </div>
            <span className="px-2 py-1 text-[9px] font-bold uppercase bg-[rgba(255,140,60,0.12)] text-[#ff8c3c] rounded" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              owner
            </span>
          </div>
        </div>

        <p className="mt-4 text-xs text-[#3d3935]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
          Team invites will be available on Pro and Enterprise plans.
        </p>
      </div>
    </div>
  );
}
