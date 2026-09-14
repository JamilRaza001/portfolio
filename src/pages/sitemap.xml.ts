import { getSettings } from '../lib/config';
import { projects } from '../data/projects';
export function GET() {
  const { origin, indexable } = getSettings(import.meta.env);
  const paths = ['/', '/projects/', ...projects.map(project => `/projects/${project.slug}/`)];
  const urls = origin && indexable ? paths.map(path => `<url><loc>${new URL(path, origin).href.replace(/&/g, '&amp;')}</loc></url>`).join('') : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
