/**
 * Frontend sample attendance data.
 * Replace weekDays / monthDays / sessions with API responses later.
 * Target assumed: 5h (300 min) of club time per day for percentage calc.
 */

export type AttendanceSession = {
  id: string;
  date: string; // ISO YYYY-MM-DD
  checkIn: string; // HH:mm
  checkOut: string;
  durationMinutes: number;
};

export type DaySummary = {
  date: string;
  minutes: number;
};

export const TARGET_MINUTES_PER_DAY = 300;

/** GitHub-style intensity 0 (none) … 4 (heavy club day) */
export function intensityLevel(minutes: number): 0 | 1 | 2 | 3 | 4 {
  if (minutes <= 0) return 0;
  if (minutes < 90) return 1;
  if (minutes < 180) return 2;
  if (minutes < 300) return 3;
  return 4;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function totalMinutes(days: DaySummary[]): number {
  return days.reduce((sum, d) => sum + d.minutes, 0);
}

/** Attendance % vs targetMinutesPerDay × number of days in the range. */
export function attendancePercent(
  days: DaySummary[],
  targetMinutesPerDay: number = TARGET_MINUTES_PER_DAY,
): number {
  const target = targetMinutesPerDay * days.length;
  if (target <= 0) return 0;
  return Math.min(100, Math.round((totalMinutes(days) / target) * 1000) / 10);
}

export function formatDayHeading(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00`);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
}

export function groupSessionsByDate(
  sessions: AttendanceSession[],
): { date: string; sessions: AttendanceSession[] }[] {
  const map = new Map<string, AttendanceSession[]>();
  for (const s of sessions) {
    const list = map.get(s.date) ?? [];
    list.push(s);
    map.set(s.date, list);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([date, list]) => ({
      date,
      sessions: list.sort((x, y) => x.checkIn.localeCompare(y.checkIn)),
    }));
}

/** Current sample week: Mon 18 Aug – Sun 24 Aug 2026 */
export const weekDays: DaySummary[] = [
  { date: '2026-08-18', minutes: 245 },
  { date: '2026-08-19', minutes: 180 },
  { date: '2026-08-20', minutes: 320 },
  { date: '2026-08-21', minutes: 275 },
  { date: '2026-08-22', minutes: 90 },
  { date: '2026-08-23', minutes: 0 },
  { date: '2026-08-24', minutes: 210 },
];

/** Sample calendar month: 1–31 Aug 2026 (varied club time) */
export const monthDays: DaySummary[] = [
  { date: '2026-08-01', minutes: 0 },
  { date: '2026-08-02', minutes: 120 },
  { date: '2026-08-03', minutes: 260 },
  { date: '2026-08-04', minutes: 310 },
  { date: '2026-08-05', minutes: 95 },
  { date: '2026-08-06', minutes: 0 },
  { date: '2026-08-07', minutes: 200 },
  { date: '2026-08-08', minutes: 280 },
  { date: '2026-08-09', minutes: 150 },
  { date: '2026-08-10', minutes: 340 },
  { date: '2026-08-11', minutes: 220 },
  { date: '2026-08-12', minutes: 60 },
  { date: '2026-08-13', minutes: 0 },
  { date: '2026-08-14', minutes: 190 },
  { date: '2026-08-15', minutes: 0 },
  { date: '2026-08-16', minutes: 255 },
  { date: '2026-08-17', minutes: 300 },
  { date: '2026-08-18', minutes: 245 },
  { date: '2026-08-19', minutes: 180 },
  { date: '2026-08-20', minutes: 320 },
  { date: '2026-08-21', minutes: 275 },
  { date: '2026-08-22', minutes: 90 },
  { date: '2026-08-23', minutes: 0 },
  { date: '2026-08-24', minutes: 210 },
  { date: '2026-08-25', minutes: 160 },
  { date: '2026-08-26', minutes: 290 },
  { date: '2026-08-27', minutes: 110 },
  { date: '2026-08-28', minutes: 230 },
  { date: '2026-08-29', minutes: 0 },
  { date: '2026-08-30', minutes: 175 },
  { date: '2026-08-31', minutes: 205 },
];

export const sessions: AttendanceSession[] = [
  {
    id: 's1',
    date: '2026-08-21',
    checkIn: '10:15',
    checkOut: '13:40',
    durationMinutes: 205,
  },
  {
    id: 's2',
    date: '2026-08-21',
    checkIn: '15:00',
    checkOut: '16:10',
    durationMinutes: 70,
  },
  {
    id: 's3',
    date: '2026-08-20',
    checkIn: '09:30',
    checkOut: '12:45',
    durationMinutes: 195,
  },
  {
    id: 's4',
    date: '2026-08-20',
    checkIn: '14:00',
    checkOut: '16:05',
    durationMinutes: 125,
  },
  {
    id: 's5',
    date: '2026-08-19',
    checkIn: '11:00',
    checkOut: '14:00',
    durationMinutes: 180,
  },
  {
    id: 's6',
    date: '2026-08-18',
    checkIn: '10:00',
    checkOut: '14:05',
    durationMinutes: 245,
  },
  {
    id: 's7',
    date: '2026-08-17',
    checkIn: '09:45',
    checkOut: '14:45',
    durationMinutes: 300,
  },
  {
    id: 's8',
    date: '2026-08-16',
    checkIn: '13:10',
    checkOut: '17:25',
    durationMinutes: 255,
  },
  {
    id: 's9',
    date: '2026-08-14',
    checkIn: '10:20',
    checkOut: '13:30',
    durationMinutes: 190,
  },
  {
    id: 's10',
    date: '2026-08-22',
    checkIn: '16:00',
    checkOut: '17:30',
    durationMinutes: 90,
  },
];
