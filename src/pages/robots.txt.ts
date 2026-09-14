import { getSettings } from '../lib/config';
export function GET() {
  const { origin, indexable } = getSettings(import.meta.env);
  return new Response(indexable ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
