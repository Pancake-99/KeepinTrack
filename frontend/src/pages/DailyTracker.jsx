import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { loadDay, saveDay, loadGoals, saveGoals, getTodayKey, emptyForm } from '../services/dataService';

export default function DailyTracker() {
  const dateKey = getTodayKey();
  const [form, setForm] = useState({ ...emptyForm });
  const [goals, setGoals] = useState({ steps: 8000, water: 2, calories: 1750, protein: 145 });
  const [showGoals, setShowGoals] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const saveTimeout = useRef(null);

  // Load data on mount
  useEffect(() => {
    (async () => {
      const [dayData, goalsData] = await Promise.all([loadDay(dateKey), loadGoals()]);
      if (dayData) setForm(dayData);
      if (goalsData) setGoals(goalsData);
      setLoaded(true);
    })();
  }, [dateKey]);

  // Debounced save for form
  useEffect(() => {
    if (!loaded) return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => { saveDay(dateKey, form); }, 400);
    return () => { if (saveTimeout.current) clearTimeout(saveTimeout.current); };
  }, [form, dateKey, loaded]);

  // Save goals on change
  const handleGoalSave = useCallback((newGoals) => {
    setGoals(newGoals);
    saveGoals(newGoals);
  }, []);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleGoalChange = (field) => (e) => {
    const updated = { ...goals, [field]: Number(e.target.value) || 0 };
    handleGoalSave(updated);
  };

  const totals = useMemo(() => {
    const n = (v) => Number(v) || 0;
    return {
      calories: n(form.breakfast_cal) + n(form.lunch_cal) + n(form.dinner_cal) + n(form.snacks_cal),
      protein: n(form.breakfast_pro) + n(form.lunch_pro) + n(form.dinner_pro) + n(form.snacks_pro),
      steps: n(form.steps),
      water: n(form.water),
    };
  }, [form]);

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const mealSections = [
    { title: 'Breakfast', calField: 'breakfast_cal', proField: 'breakfast_pro', icon: '🍳' },
    { title: 'Lunch', calField: 'lunch_cal', proField: 'lunch_pro', icon: '🥗' },
    { title: 'Dinner', calField: 'dinner_cal', proField: 'dinner_pro', icon: '🍖' },
    { title: 'Extras & Snacks', calField: 'snacks_cal', proField: 'snacks_pro', icon: '🍫' },
  ];

  return (
    <div className="wrap daily-tracker">
      <div className="tracker-top">
        <Link to="/" className="tracker-back">← Back</Link>
        <div>
          <div className="hero-label">Daily Log</div>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 52px)' }}>
            Track<em>Today</em>
          </h1>
          <div className="tracker-date">{todayFormatted}</div>
        </div>
      </div>

      <div className="tracker-progress">
        <ProgressBar label="Calories" current={totals.calories} goal={goals.calories}
          unit=" kcal" color="linear-gradient(90deg, #9a0012, #E8001C, #ff4455)" />
        <ProgressBar label="Protein" current={totals.protein} goal={goals.protein}
          unit="g" color="linear-gradient(90deg, #0a6e2e, #10b058, #2edb72)" />
        <ProgressBar label="Steps" current={totals.steps} goal={goals.steps}
          unit="" color="linear-gradient(90deg, #1a5fb4, #3584e4, #62a0ea)" />
        <ProgressBar label="Water" current={totals.water} goal={goals.water}
          unit="L" color="linear-gradient(90deg, #1a73b4, #26c6da, #4dd0e1)" />

        <button className="goals-toggle" onClick={() => setShowGoals(prev => !prev)}>
          {showGoals ? '✕ Close Goals' : '⚙ Edit Goals'}
        </button>

        {showGoals && (
          <div className="goals-editor">
            <div className="goals-row">
              <label>Calories<input type="number" value={goals.calories} onChange={handleGoalChange('calories')} /></label>
              <label>Protein (g)<input type="number" value={goals.protein} onChange={handleGoalChange('protein')} /></label>
              <label>Steps<input type="number" value={goals.steps} onChange={handleGoalChange('steps')} /></label>
              <label>Water (L)<input type="number" step="0.1" value={goals.water} onChange={handleGoalChange('water')} /></label>
            </div>
          </div>
        )}
      </div>

      <div className="tracker-section">
        <div className="section-mini-label">⚖️ Weight</div>
        <div className="tracker-field-single">
          <input type="number" step="0.1" placeholder="kg" value={form.weight} onChange={handleChange('weight')} />
        </div>
      </div>

      {mealSections.map((meal) => (
        <div key={meal.title} className="tracker-section">
          <div className="section-mini-label">{meal.icon} {meal.title}</div>
          <div className="tracker-field-row">
            <div className="tracker-field">
              <label>Calories</label>
              <input type="number" placeholder="kcal" value={form[meal.calField]} onChange={handleChange(meal.calField)} />
            </div>
            <div className="tracker-field">
              <label>Protein</label>
              <input type="number" placeholder="g" value={form[meal.proField]} onChange={handleChange(meal.proField)} />
            </div>
          </div>
        </div>
      ))}

      <div className="tracker-section">
        <div className="section-mini-label">🏃 Steps & 💧 Water</div>
        <div className="tracker-field-row">
          <div className="tracker-field">
            <label>Steps</label>
            <input type="number" placeholder="steps" value={form.steps} onChange={handleChange('steps')} />
          </div>
          <div className="tracker-field">
            <label>Water (L)</label>
            <input type="number" step="0.1" placeholder="liters" value={form.water} onChange={handleChange('water')} />
          </div>
        </div>
      </div>

      <div className="tracker-summary">
        <div className="target-cell">
          <div className="target-label">Total Calories</div>
          <div className="target-val">{totals.calories.toLocaleString()}</div>
          <div className="target-sub">of {goals.calories.toLocaleString()} kcal</div>
        </div>
        <div className="target-cell">
          <div className="target-label">Total Protein</div>
          <div className="target-val">{totals.protein}g</div>
          <div className="target-sub">of {goals.protein}g goal</div>
        </div>
        <div className="target-cell">
          <div className="target-label">Steps</div>
          <div className="target-val">{totals.steps.toLocaleString()}</div>
          <div className="target-sub">of {goals.steps.toLocaleString()}</div>
        </div>
        <div className="target-cell">
          <div className="target-label">Water</div>
          <div className="target-val">{totals.water}L</div>
          <div className="target-sub">of {goals.water}L</div>
        </div>
      </div>
    </div>
  );
}
