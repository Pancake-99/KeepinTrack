import { conditioningOptions } from '../data/routineData';

export default function ConditioningSection() {
  return (
    <div className="cond-section">
      <div className="section-mini-label">Conditioning — Pick one · Rotate each week</div>
      <div className="cond-options">
        <div className="cond-alt-note">
          <strong>⛰️ Altitude rule:</strong> At 3,640m, a brisk incline walk at 5 km/h hits the same cardiovascular demand as jogging at sea level. Never push to breathlessness. Use perceived exertion (6–7/10) not pace or HR targets. Rest 1 min between intervals if needed.
        </div>
        {conditioningOptions.map((opt, idx) => (
          <div key={idx} className="cond-card">
            <div className="cond-card-label">{opt.label}</div>
            <p>{opt.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
