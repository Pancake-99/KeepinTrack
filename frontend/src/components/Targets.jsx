import { targets } from '../data/routineData';

export default function Targets() {
  return (
    <div className="targets">
      {targets.map((target, idx) => (
        <div key={idx} className="target-cell">
          <div className="target-label">{target.label}</div>
          <div className="target-val">{target.val}</div>
          <div className="target-sub">{target.sub}</div>
        </div>
      ))}
    </div>
  );
}
