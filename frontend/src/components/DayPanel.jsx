import ExerciseTable from './ExerciseTable';
import ConditioningSection from './ConditioningSection';

export default function DayPanel({ dayData, isActive }) {
  if (!isActive || !dayData) return null;

  return (
    <div className="day-panel active">
      <div className="day-header">
        <div className="day-title">
          <small>{dayData.dayName}</small>
          {dayData.dayTitle}
        </div>
        <div className="day-focus-tag">{dayData.focusTag}</div>
      </div>
      
      {dayData.pMessage && (
        <p style={{ fontSize: '13.5px', color: '#bbb', marginBottom: '24px', lineHeight: '1.7' }}>
          {dayData.pMessage.split('fat loss engine').map((part, i, arr) => 
            i < arr.length - 1 ? <span key={i}>{part}<strong style={{ color: 'var(--text)' }}>fat loss engine</strong></span> : part
          )}
        </p>
      )}

      {dayData.restCallouts && dayData.restCallouts.length > 0 && (
        <div className="rest-callout">
          {dayData.restCallouts.map((rest, idx) => (
            <div key={idx} className="rest-pill">
              {rest.text} <strong>{rest.bold}</strong>{rest.suffix || ''}
            </div>
          ))}
        </div>
      )}

      {dayData.isConditioningDay && (
        <div className="section-mini-label">Core Circuit — 3 rounds · 30s rest between exercises</div>
      )}

      <ExerciseTable exercises={dayData.exercises} />

      {dayData.isConditioningDay && <ConditioningSection />}
    </div>
  );
}
