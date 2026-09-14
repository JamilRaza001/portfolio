import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/prepare-artwork.mjs <generated-source-directory>. Existing WebPs need no preparation.');
const assets = {
  'jamil-studio': 'exec-23141f78-6d25-47b0-9ce4-f4de2aa178c2.png',
  'projects/alphalens': 'exec-8463ed9f-3522-46a2-959c-97cd31b8c8b3.png',
  'projects/voice-agent': 'exec-47222016-02aa-4cc3-805d-fd1529e9528b.png',
  'projects/call-quality': 'exec-425d9d0f-f282-4f49-a384-f3a04c2f7735.png',
  'projects/qurbani-analytics': 'exec-65bcff5d-f3fa-4f24-b672-7572774223a0.png',
  'projects/receipt-automation': 'exec-5d089ba3-fc3e-47c0-b58e-229deba8da8a.png',
  'projects/voice-ordering': 'exec-876c9d06-e77c-4286-b1a9-057f9366b8b6.png',
  'projects/croplogic': 'exec-c9856cb0-b0a7-4925-99bf-916d2a82391d.png'
};
mkdirSync('public/images/projects', {recursive:true});
for (const [name,file] of Object.entries(assets)) {
  for (const width of [480,960]) {
    const info = await sharp(join(source,file)).resize({width}).webp({quality:78,effort:5}).toFile(`public/images/${name}-${width}.webp`);
    console.log(`${name}-${width}: ${info.size} bytes`);
  }
}
