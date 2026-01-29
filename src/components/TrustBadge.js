export const TrustBadge = ({ level, signalsCount }) => {
  const getBadgeStyle = () => {
    switch (level) {
      case 'Community Pillar':
        return 'bg-emerald-50 text-emerald-700 border-emerald-700';
      case 'Regular':
        return 'bg-amber-50 text-amber-700 border-amber-700';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-700';
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider border ${getBadgeStyle()}`}
      data-testid="trust-badge"
    >
      <span className="text-xl" role="img" aria-label="trust-icon">
        {level === 'Community Pillar' ? '⭐' : level === 'Regular' ? '✓' : '○'}
      </span>
      <span>{level}</span>
      {signalsCount > 0 && <span className="opacity-70">• {signalsCount}</span>}
    </div>
  );
};

export default TrustBadge;