// Data service abstraction layer
// Uses Supabase when available, falls back to localStorage.

import { supabase } from './supabaseClient';

const STORAGE_PREFIX = 'tracker-';
const GOALS_KEY = 'tracker-goals';

const DEFAULT_GOALS = {
  steps: 8000,
  water: 2,
  calories: 1750,
  protein: 145,
};

// ── Check if Supabase is configured ──
const isSupabaseReady = () => !!supabase;

// ══════════════════════════════════════════════
//  DAY ENTRIES
// ══════════════════════════════════════════════

export async function loadDay(dateKey) {
  if (isSupabaseReady()) {
    try {
      const { data, error } = await supabase
        .from('daily_entries')
        .select('*')
        .eq('date', dateKey)
        .single();
      if (error && error.code !== 'PGRST116') console.error('loadDay error:', error);
      return data ? data.entry_data : null;
    } catch (err) {
      console.error('Supabase loadDay failed, falling back to localStorage', err);
    }
  }
  // Fallback: localStorage
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${dateKey}`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export async function saveDay(dateKey, data) {
  // Always save to localStorage as cache
  localStorage.setItem(`${STORAGE_PREFIX}${dateKey}`, JSON.stringify(data));

  if (isSupabaseReady()) {
    try {
      const { error } = await supabase
        .from('daily_entries')
        .upsert({ date: dateKey, entry_data: data }, { onConflict: 'date' });
      if (error) console.error('saveDay error:', error);
    } catch (err) {
      console.error('Supabase saveDay failed', err);
    }
  }
}

export async function getAllDays() {
  if (isSupabaseReady()) {
    try {
      const { data, error } = await supabase
        .from('daily_entries')
        .select('*')
        .order('date', { ascending: true });
      if (error) console.error('getAllDays error:', error);
      if (data && data.length > 0) {
        return data.map(row => ({ date: row.date, ...row.entry_data }));
      }
    } catch (err) {
      console.error('Supabase getAllDays failed, falling back to localStorage', err);
    }
  }
  // Fallback: localStorage
  const entries = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(STORAGE_PREFIX) && key !== GOALS_KEY) {
      const dateKey = key.replace(STORAGE_PREFIX, '');
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
        try {
          const entryData = JSON.parse(localStorage.getItem(key));
          entries.push({ date: dateKey, ...entryData });
        } catch { /* skip corrupt entries */ }
      }
    }
  }
  entries.sort((a, b) => a.date.localeCompare(b.date));
  return entries;
}

// ══════════════════════════════════════════════
//  GOALS
// ══════════════════════════════════════════════

export async function loadGoals() {
  if (isSupabaseReady()) {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('id', 1)
        .single();
      if (!error && data) {
        return { ...DEFAULT_GOALS, ...data.goal_data };
      }
    } catch (err) {
      console.error('Supabase loadGoals failed', err);
    }
  }
  // Fallback: localStorage
  try {
    const raw = localStorage.getItem(GOALS_KEY);
    return raw ? { ...DEFAULT_GOALS, ...JSON.parse(raw) } : { ...DEFAULT_GOALS };
  } catch { return { ...DEFAULT_GOALS }; }
}

export async function saveGoals(goals) {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));

  if (isSupabaseReady()) {
    try {
      const { error } = await supabase
        .from('goals')
        .upsert({ id: 1, goal_data: goals }, { onConflict: 'id' });
      if (error) console.error('saveGoals error:', error);
    } catch (err) {
      console.error('Supabase saveGoals failed', err);
    }
  }
}

export async function deleteDay(dateKey) {
  localStorage.removeItem(`${STORAGE_PREFIX}${dateKey}`);

  if (isSupabaseReady()) {
    try {
      const { error } = await supabase
        .from('daily_entries')
        .delete()
        .eq('date', dateKey);
      if (error) console.error('deleteDay error:', error);
    } catch (err) {
      console.error('Supabase deleteDay failed', err);
    }
  }
}

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export const emptyForm = {
  weight: '',
  breakfast_cal: '', breakfast_pro: '',
  lunch_cal: '', lunch_pro: '',
  dinner_cal: '', dinner_pro: '',
  snacks_cal: '', snacks_pro: '',
  steps: '',
  water: '',
};

export { DEFAULT_GOALS };
