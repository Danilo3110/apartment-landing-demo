import { SEASONS } from '../data/apartment.js';

const DAY_MS = 24 * 60 * 60 * 1000;

/** 'YYYY-MM-DD' (an <input type="date"> value) -> Date at local midnight. */
export function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  // Reject impossible dates (2026-02-31 would otherwise roll over to March 3).
  return date.getMonth() === month - 1 ? date : null;
}

/** Date -> 'YYYY-MM-DD' for <input type="date">. */
export function toInputDate(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function nightsBetween(arrival, departure) {
  // Rounding absorbs daylight saving changes (23- or 25-hour days).
  return Math.round((departure - arrival) / DAY_MS);
}

export function seasonOf(date) {
  return SEASONS.find((season) => season.months.includes(date.getMonth()));
}

/**
 * Prices a stay by season: each night is charged at the rate of the season it starts in.
 * Returns null if a date is missing or departure is not after arrival.
 */
export function estimateStay(arrivalValue, departureValue) {
  const arrival = parseDate(arrivalValue);
  const departure = parseDate(departureValue);
  if (!arrival || !departure || departure <= arrival) return null;

  const bySeason = new Map();
  for (let night = arrival; night < departure; night = addDays(night, 1)) {
    const season = seasonOf(night);
    const line = bySeason.get(season.id) ?? { season, nights: 0 };
    line.nights += 1;
    bySeason.set(season.id, line);
  }

  const lines = [...bySeason.values()];
  return {
    nights: nightsBetween(arrival, departure),
    lines,
    total: lines.reduce((sum, line) => sum + line.nights * line.season.price, 0),
  };
}
