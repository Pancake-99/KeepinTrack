export default function ProgressBar({ label, current, goal, unit, color }) {
  const pct = Math.min((current / goal) * 100, 100);
  const isComplete = current >= goal;

  return (
    <div className={`pbar-wrap${isComplete ? ' pbar-complete' : ''}`}>
      <div className="pbar-header">
        <span className="pbar-label">{label}</span>
        <span className="pbar-values">
          <span className="pbar-current">{Number(current).toLocaleString()}</span>
          <span className="pbar-sep"> / </span>
          <span className="pbar-goal">{Number(goal).toLocaleString()}{unit}</span>
        </span>
      </div>
      <div className="pbar-track">
        <div
          className="pbar-fill"
          style={{
            width: `${pct}%`,
            background: color || 'linear-gradient(90deg, var(--red-dim), var(--red))',
          }}
        />
        <div className="pbar-glow" style={{ width: `${pct}%` }} />
      </div>
      <div className="pbar-pct">{Math.round(pct)}%</div>
    </div>
  );
}
