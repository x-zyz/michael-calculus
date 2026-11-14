export type Theme = 'light' | 'dark';
export function readTheme(): Theme {
  try { return localStorage.getItem('mc-theme') === 'dark' ? 'dark' : 'light'; } catch { return 'light'; }
}
export function saveTheme(theme: Theme) {
  try { localStorage.setItem('mc-theme', theme); } catch { /* Preference storage is optional. */ }
}
