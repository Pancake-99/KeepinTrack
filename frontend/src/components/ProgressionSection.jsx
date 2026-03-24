import { progressionSteps } from '../data/routineData';

export default function ProgressionSection() {
  return (
    <div className="prog-section">
      <div className="prog-title">Progression Model</div>
      <div className="prog-grid">
        {progressionSteps.map((step, idx) => (
          <div key={idx} className="prog-card">
            <div className="prog-card-week">{step.week}</div>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
