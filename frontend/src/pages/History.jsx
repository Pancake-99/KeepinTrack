import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAllDays, saveDay } from '../services/dataService';

const DAY_NAMES = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function getMonday(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const mon = new Date(d);
  mon.setDate(mon.getDate() + diff);
  return mon.toISOString().slice(0, 10);
}

function getDateForDayIndex(mondayStr, dayIndex) {
  const d = new Date(mondayStr + 'T12:00:00');
  d.setDate(d.getDate() + dayIndex);
  return d.toISOString().slice(0, 10);
}

function getDayIndex(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  const day = d.getDay();
  return day === 0 ? 6 : day - 1;
}

function n(v) { return Number(v) || 0; }

// Returns null if the field is empty/missing, otherwise the numeric value
function valOrNull(entry, field) {
  if (!entry) return null;
  const v = entry[field];
  if (v === '' || v === null || v === undefined) return null;
  return Number(v) || 0;
}

function computeRow(entries, field) {
  return DAY_NAMES.map((_, i) => {
    const entry = entries[i];
    return valOrNull(entry, field);
  });
}

function computeTotalCalRow(entries) {
  return DAY_NAMES.map((_, i) => {
    const e = entries[i];
    if (!e) return null;
    const bc = valOrNull(e, 'breakfast_cal');
    const lc = valOrNull(e, 'lunch_cal');
    const dc = valOrNull(e, 'dinner_cal');
    const sc = valOrNull(e, 'snacks_cal');
    if (bc === null && lc === null && dc === null && sc === null) return null;
    return n(e.breakfast_cal) + n(e.lunch_cal) + n(e.dinner_cal) + n(e.snacks_cal);
  });
}

function computeTotalProRow(entries) {
  return DAY_NAMES.map((_, i) => {
    const e = entries[i];
    if (!e) return null;
    const bp = valOrNull(e, 'breakfast_pro');
    const lp = valOrNull(e, 'lunch_pro');
    const dp = valOrNull(e, 'dinner_pro');
    const sp = valOrNull(e, 'snacks_pro');
    if (bp === null && lp === null && dp === null && sp === null) return null;
    return n(e.breakfast_pro) + n(e.lunch_pro) + n(e.dinner_pro) + n(e.snacks_pro);
  });
}

function avg(row) {
  const vals = row.filter(v => v !== null && v !== undefined && v !== 0);
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function fmtAvg(v, decimals = 1) {
  if (v === null || v === undefined) return '–';
  return Number(v).toFixed(decimals);
}

function fmtCell(v) {
  if (v === null || v === undefined) return '–';
  if (v === 0) return '0';
  return Number(v).toLocaleString();
}

// ── Inline Edit Cell ──
function EditableCell({ value, dayIndex, field, entry, monday, onSave, isDecimal, isEmpty }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState('');
  const inputRef = useRef(null);

  const startEdit = () => {
    if (isEmpty && !entry) return; // Can't edit if no entry exists for that day at all
    setVal(value !== null && value !== undefined ? String(value) : '');
    setEditing(true);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    const numVal = isDecimal ? parseFloat(val) : parseInt(val, 10);
    if (isNaN(numVal) && val !== '') return;
    const newVal = val === '' ? '' : numVal;

    // Build updated entry and save
    const dateKey = entry?.date || getDateForDayIndex(monday, dayIndex);
    const currentData = entry || {};
    const updated = { ...currentData, [field]: newVal };
    delete updated.date; // don't store date inside entry_data
    onSave(dateKey, dayIndex, updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') setEditing(false);
  };

  if (editing) {
    return (
      <td className="editing-cell">
        <input
          ref={inputRef}
          type="number"
          step={isDecimal ? '0.1' : '1'}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          className="cell-input"
        />
      </td>
    );
  }

  return (
    <td
      className={`${isEmpty ? 'empty-cell' : ''} editable-cell`}
      onClick={startEdit}
      title="Click to edit"
    >
      {isDecimal
        ? (value !== null && value !== 0 ? Number(value).toFixed(2) : fmtCell(value))
        : fmtCell(value)
      }
    </td>
  );
}

// ── Collapsible Group ──
function CollapsibleGroup({ label, totalRow, detailRows, color, totalColor, week, onSave }) {
  const [expanded, setExpanded] = useState(false);
  const totalValues = totalRow.compute(week.entries);
  const totalAvg = avg(totalValues);

  return (
    <>
      {/* Total row — always visible, click to expand */}
      <tr
        className={`${totalColor} total-row collapsible-header`}
        onClick={() => setExpanded(e => !e)}
      >
        <td className="ht-label">
          <span className="collapse-icon">{expanded ? '▾' : '▸'}</span>
          {label}
        </td>
        {totalValues.map((v, i) => (
          <td key={i} className={v === null ? 'empty-cell' : ''}>
            {fmtCell(v)}
          </td>
        ))}
        <td className="ht-avg">{fmtAvg(totalAvg, 1)}</td>
      </tr>

      {/* Detail rows — only shown when expanded */}
      {expanded && detailRows.map((row) => {
        const values = computeRow(week.entries, row.field);
        const rowAvg = avg(values);
        return (
          <tr key={row.label} className={`${color} detail-row`}>
            <td className="ht-label ht-label-detail">{row.label}</td>
            {values.map((v, i) => (
              <EditableCell
                key={i}
                value={v}
                dayIndex={i}
                field={row.field}
                entry={week.entries[i]}
                monday={week.monday}
                onSave={onSave}
                isEmpty={v === null}
              />
            ))}
            <td className="ht-avg">{fmtAvg(rowAvg, 1)}</td>
          </tr>
        );
      })}
    </>
  );
}

export default function History() {
  const [allDays, setAllDays] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const days = await getAllDays();
    setAllDays(days);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const weeks = (() => {
    if (allDays.length === 0) return [];
    const weekMap = {};
    allDays.forEach(entry => {
      const monday = getMonday(entry.date);
      if (!weekMap[monday]) weekMap[monday] = Array(7).fill(null);
      const idx = getDayIndex(entry.date);
      weekMap[monday][idx] = entry;
    });
    return Object.entries(weekMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([monday, entries], i) => ({ weekNum: i + 1, monday, entries }));
  })();

  // Handle saving an edited cell
  const handleCellSave = useCallback(async (dateKey, dayIndex, updatedEntry) => {
    await saveDay(dateKey, updatedEntry);
    // Update local state
    setAllDays(prev => {
      const existing = prev.findIndex(d => d.date === dateKey);
      const newEntry = { date: dateKey, ...updatedEntry };
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing] = newEntry;
        return copy;
      }
      return [...prev, newEntry].sort((a, b) => a.date.localeCompare(b.date));
    });
  }, []);

  const calDetailRows = [
    { label: 'Breakfast', field: 'breakfast_cal' },
    { label: 'Lunch', field: 'lunch_cal' },
    { label: 'Dinner', field: 'dinner_cal' },
    { label: 'Extras', field: 'snacks_cal' },
  ];

  const proDetailRows = [
    { label: 'Breakfast', field: 'breakfast_pro' },
    { label: 'Lunch', field: 'lunch_pro' },
    { label: 'Dinner', field: 'dinner_pro' },
    { label: 'Extras', field: 'snacks_pro' },
  ];

  const standaloneRows = [
    { label: 'Kg', field: 'weight', color: 'row-weight', isDecimal: true },
    { label: 'Steps', field: 'steps', color: 'row-steps', isDecimal: false },
    { label: 'Water (L)', field: 'water', color: 'row-water', isDecimal: true },
  ];

  return (
    <div className="wrap history-page">
      <div className="tracker-top">
        <Link to="/" className="tracker-back">← Back</Link>
        <div>
          <div className="hero-label">Progress</div>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 52px)' }}>
            Weekly<em>History</em>
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="history-empty"><p>Loading...</p></div>
      ) : weeks.length === 0 ? (
        <div className="history-empty">
          <div className="history-empty-icon">📊</div>
          <p>No data yet. Start logging your days in the <Link to="/daily">Daily Tracker</Link> and your progress will show up here.</p>
        </div>
      ) : (
        weeks.map((week) => (
          <div key={week.monday} className="week-group">
            <div className="week-header">
              <span className="week-num">Week {week.weekNum}</span>
              <span className="week-date">
                {new Date(week.monday + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                {' – '}
                {new Date(new Date(week.monday + 'T12:00:00').getTime() + 6 * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>

            <div className="history-table-wrap">
              <table className="history-table">
                <thead>
                  <tr>
                    <th className="ht-label-col"></th>
                    {DAY_NAMES.map(d => <th key={d}>{d}</th>)}
                    <th className="ht-avg-col">AVG</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Weight — standalone editable */}
                  {(() => {
                    const row = standaloneRows[0];
                    const values = computeRow(week.entries, row.field);
                    const rowAvg = avg(values);
                    return (
                      <tr className={row.color}>
                        <td className="ht-label">{row.label}</td>
                        {values.map((v, i) => (
                          <EditableCell
                            key={i}
                            value={v}
                            dayIndex={i}
                            field={row.field}
                            entry={week.entries[i]}
                            monday={week.monday}
                            onSave={handleCellSave}
                            isDecimal={row.isDecimal}
                            isEmpty={v === null}
                          />
                        ))}
                        <td className="ht-avg">{fmtAvg(rowAvg, 2)}</td>
                      </tr>
                    );
                  })()}

                  {/* Calories — collapsible */}
                  <CollapsibleGroup
                    label="Calories"
                    totalRow={{ compute: computeTotalCalRow }}
                    detailRows={calDetailRows}
                    color="row-cal"
                    totalColor="row-cal-total"
                    week={week}
                    onSave={handleCellSave}
                  />

                  {/* Protein — collapsible */}
                  <CollapsibleGroup
                    label="Protein"
                    totalRow={{ compute: computeTotalProRow }}
                    detailRows={proDetailRows}
                    color="row-pro"
                    totalColor="row-pro-total"
                    week={week}
                    onSave={handleCellSave}
                  />

                  {/* Steps — standalone editable */}
                  {standaloneRows.slice(1).map((row) => {
                    const values = computeRow(week.entries, row.field);
                    const rowAvg = avg(values);
                    const decimals = row.isDecimal ? 2 : 1;
                    return (
                      <tr key={row.label} className={row.color}>
                        <td className="ht-label">{row.label}</td>
                        {values.map((v, i) => (
                          <EditableCell
                            key={i}
                            value={v}
                            dayIndex={i}
                            field={row.field}
                            entry={week.entries[i]}
                            monday={week.monday}
                            onSave={handleCellSave}
                            isDecimal={row.isDecimal}
                            isEmpty={v === null}
                          />
                        ))}
                        <td className="ht-avg">{fmtAvg(rowAvg, decimals)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
