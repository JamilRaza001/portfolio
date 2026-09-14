import sharp from 'sharp';
import { getSettings } from '../lib/config';
export async function GET() {
  const { palette: p } = getSettings(import.meta.env);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${p.bg}"/><path d="M80 80h1040M80 550h1040" stroke="${p.border}"/><text x="80" y="150" fill="${p.accent}" font-size="28" font-family="Arial,sans-serif">Muhammad Jamil Raza / AI Engineer</text><text x="80" y="290" fill="${p.ink}" font-size="74" font-family="Arial,sans-serif" font-weight="700">Intelligent systems.</text><text x="80" y="390" fill="${p.ink}" font-size="74" font-family="Arial,sans-serif" font-weight="700">Real-world purpose.</text><text x="80" y="490" fill="${p.muted}" font-size="28" font-family="Arial,sans-serif">AI &amp; ML · Software · Data engineering · Analytics</text></svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
