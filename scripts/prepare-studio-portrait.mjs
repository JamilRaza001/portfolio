import sharp from 'sharp';
const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/prepare-studio-portrait.mjs <generated-portrait.png>');
for (const width of [480,960]) {
  const info = await sharp(source).resize(width, width*1.25, {fit:'cover'}).webp({quality:82,effort:5}).toFile(`public/images/jamil-black-studio-${width}.webp`);
  console.log(`Black studio ${width}: ${info.size} bytes`);
}
