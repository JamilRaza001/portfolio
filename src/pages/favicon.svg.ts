import { getSettings } from '../lib/config';
export function GET() {
  const { palette: p } = getSettings(import.meta.env);
  return new Response(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${p.bg}"/><path d="M12 45V22h6l7 12 7-12h6v23h-7V34l-6 10-6-10v11z" fill="${p.ink}"/><circle cx="48" cy="41" r="5" fill="${p.accent}"/></svg>`, { headers: { 'Content-Type': 'image/svg+xml' } });
}
