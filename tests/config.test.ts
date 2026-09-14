import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveTheme } from '../src/lib/themes.ts';
import { publicOrigin, resumePath } from '../src/lib/config.ts';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import defaults from '../site.config.ts';

test('empty theme uses the configured default', () => {
  assert.equal(resolveTheme(undefined), defaults.theme);
  assert.equal(resolveTheme('  '), defaults.theme);
});

test('theme override selects each requested palette', () => {
  for (const name of ['black-studio', 'blue-amber', 'charcoal-copper', 'olive-champagne', 'aubergine-silver']) {
    assert.equal(resolveTheme(name), name);
  }
});

test('a typo or prototype property cannot silently pick another theme', () => {
  for (const name of ['blue', 'constructor', '__proto__']) {
    assert.throws(() => resolveTheme(name), /Unknown site theme/);
  }
});

test('canonical origin is optional and rejects unsafe or partial URLs', () => {
  assert.equal(publicOrigin(''), undefined);
  assert.equal(publicOrigin('https://portfolio.example/'), 'https://portfolio.example');
  for (const origin of ['javascript:alert(1)', 'https://user:secret@example.com', 'https://example.com/path', 'https://example.com/?q=1']) {
    assert.throws(() => publicOrigin(origin));
  }
});

test('resume is only exposed when a safe public PDF exists', () => {
  const dir = mkdtempSync(join(tmpdir(), 'portfolio-resume-test-'));
  try {
    assert.equal(resumePath('', dir), undefined);
    assert.throws(() => resumePath('/resumes/missing.pdf', dir), /does not exist/);
    assert.throws(() => resumePath('/resumes/../../.env', dir));
    assert.throws(() => resumePath('https://external.example/resume.pdf', dir));
    mkdirSync(join(dir, 'resumes'));
    writeFileSync(join(dir, 'resumes/jamil.pdf'), '%PDF-1.4');
    assert.equal(resumePath('/resumes/jamil.pdf', dir), '/resumes/jamil.pdf');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
