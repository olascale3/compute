export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg p-5 text-center hover:border-[rgba(255,140,60,0.25)] transition-all hover:-translate-y-0.5">
      <div className="text-3xl font-bold text-[#ff8c3c]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
        {value}
      </div>
      <div className="text-xs text-[#8a8379] mt-2" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '13px' }}>
        {label}
      </div>
      {sub && (
        <div className="text-[10px] text-[#3d3935] mt-1" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
          {sub}
        </div>
      )}
    </div>
  );
}
