import { altitudeInfo } from '../data/routineData';

export default function AltitudeBanner() {
  return (
    <div className="altitude-banner">
      <div className="alt-icon">⛰️</div>
      <div>
        <div className="alt-title">{altitudeInfo.title}</div>
        <div className="alt-text">
          {altitudeInfo.text}
        </div>
        <div className="alt-pills">
          {altitudeInfo.pills.map((pill, idx) => (
            <span key={idx} className="alt-pill">{pill}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
