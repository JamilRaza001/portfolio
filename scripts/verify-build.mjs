import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';
import { brotliCompressSync } from 'node:zlib';
const root = resolve('dist');
function walk(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? walk(join(dir, item.name)) : [join(dir, item.name)]); }
const files = walk(root);
const pages = files.filter(file => file.endsWith('.html'));
assert.equal(pages.length, 10, 'Expected homepage, listing, seven cases and 404');
const expectedTheme = process.env.PUBLIC_SITE_THEME?.trim();
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  assert.match(html, /<!DOCTYPE html>/i);
  assert.match(html, /lang="en"/);
  assert.match(html, /name="viewport"/);
  assert.match(html, /<main id="main"/);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${page}: exactly one main heading`);
  if (expectedTheme) assert.ok(html.includes(`data-theme="${expectedTheme}"`), `${page}: theme override`);
  for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"?#]*)[^"]*"/g)) {
    if (href.startsWith('//')) continue;
    const path = join(root, decodeURIComponent(href));
    const target = existsSync(path) && statSync(path).isDirectory() ? join(path, 'index.html') : path;
    assert.ok(existsSync(target), `${page}: broken local resource ${href}`);
  }
  assert.ok(!/STITCH_API_KEY|CONTEXT7_API_KEY|settings\.local\.json/.test(html), 'Build must not expose tooling secrets');
}
assert.ok(!files.some(file => /(?:^|[\\/])\.env(?:\.|$)|MJR_CV|Profile\.pdf|prototype-g-lair/.test(file)), 'Raw source files excluded');
assert.ok(readFileSync(join(root, 'social.png')).subarray(1,4).equals(Buffer.from('PNG')), 'Share image is PNG');
const assetFiles = files.filter(file => /\.(?:css|js|woff2?)$/.test(file));
const totals = assetFiles.reduce((out, file) => {
  const data = readFileSync(file); out.raw += data.length;
  out.transfer += /\.woff2?$/.test(file) ? data.length : brotliCompressSync(data).length;
  if (extname(file) === '.js') out.js += data.length;
  return out;
}, { raw: 0, transfer: 0, js: 0 });
const homepage = readFileSync(join(root, 'index.html'), 'utf8');
const canonical = homepage.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
const indexable = !homepage.includes('content="noindex, nofollow"');
const sitemap = readFileSync(join(root,'sitemap.xml'),'utf8');
const robots = readFileSync(join(root,'robots.txt'),'utf8');
if (indexable) {
  assert.ok(canonical,'An indexable build needs its production canonical URL');
  const origin = new URL(canonical).origin;
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.equal([...sitemap.matchAll(/<loc>/g)].length,9,'Nine public pages in the production sitemap');
  assert.ok(homepage.includes(`content="${origin}/social.png"`),'Absolute social image URL');
} else {
  assert.ok(robots.includes('Disallow: /'),'Non-production builds must discourage indexing');
  assert.ok(!sitemap.includes('<loc>'),'Non-production builds do not advertise indexable routes');
}
for (const page of pages) {
  const html = readFileSync(page,'utf8');
  const is404 = page.endsWith('404.html');
  assert.equal(html.includes('content="noindex, nofollow"'),!indexable || is404,`${page}: indexing policy`);
  if (is404) assert.ok(!html.includes('rel="canonical"'),'404 is not a canonical content page');
  else if (canonical) assert.ok(html.includes(`href="${new URL(canonical).origin}/`),`${page}: production URLs`);
}
const resume = homepage.match(/class="resume-link" href="([^"]+)"/)?.[1];
assert.ok(resume?.startsWith('/resumes/') && resume.endsWith('.pdf'),'Public resume download is configured');
const resumeBytes = readFileSync(join(root,resume));
assert.ok(resumeBytes.subarray(0,5).equals(Buffer.from('%PDF-')),'Resume is a PDF');
assert.ok(resumeBytes.equals(readFileSync(join('public',resume))),'Published resume matches the approved local file');
assert.equal(files.filter(file=>file.endsWith('.pdf')).length,1,'Only the approved resume PDF is published');
for (const page of pages) {
  const html = readFileSync(page,'utf8');
  assert.equal([...html.matchAll(/download="Muhammad-Jamil-Raza-Resume.pdf"/g)].length,2,`${page}: header and footer downloads`);
}
const homepageImages = [...new Set([...homepage.matchAll(/<img[^>]+src="(\/[^"?#]+)"/g)].map(match => match[1]))];
const imageBytes = homepageImages.reduce((sum, path) => sum + statSync(join(root, path)).size, 0);
const initial = totals.transfer + brotliCompressSync(Buffer.from(homepage)).length + imageBytes;
assert.ok(initial < 600000, `Conservative homepage asset budget exceeded: ${initial}`);
console.log(JSON.stringify({ pages: pages.length, theme: expectedTheme || 'configured default', allSharedAssetBytes: totals.raw, externalDecodedJS: totals.js, homepageImageBytes: imageBytes, conservativeHomepageBrotliBytes: initial }, null, 2));
console.log('Built routes, local links, resume, indexing policy, theme, metadata, privacy and asset budget verified.');
