import { getSettings } from '../lib/config';
export function GET() {
  const { palette: p } = getSettings(import.meta.env);
  // A lowercase monogram echoes the header wordmark without a platform font dependency.
  return new Response(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${p.bg}"/><path d="M12 43V23h4v3c1.5-2.3 3.6-3.5 6-3.5 3 0 5 1.3 6 3.7 1.8-2.4 4-3.7 6.7-3.7 4.8 0 7.3 3 7.3 8V43h-4V31.5c0-3.6-1.4-5.3-4.1-5.3-3.2 0-5.2 2.5-5.2 6.2V43h-4V31.5c0-3.6-1.3-5.3-4-5.3-3.2 0-4.7 2.6-4.7 6.2V43z" fill="${p.ink}"/><circle cx="50" cy="40.5" r="2.5" fill="${p.ink}"/></svg>`, { headers: { 'Content-Type': 'image/svg+xml' } });
}
