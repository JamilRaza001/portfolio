#!/usr/bin/env node
/**
 * PostToolUse gate for Edit|Write.
 * Runs the project's typecheck/lint script and feeds failures back to Claude.
 * No-ops silently until a package.json with those scripts exists (i.e. before Phase 3).
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const SOURCE_RE = /\.(ts|tsx|js|jsx|mjs|cjs|svelte|vue|astro|glsl|frag|vert)$/i;
const THROTTLE_MS = 15000;

let input = '';
try { input = fs.readFileSync(0, 'utf8'); } catch { process.exit(0); }

let payload = {};
try { payload = JSON.parse(input || '{}'); } catch { process.exit(0); }

const file = payload?.tool_input?.file_path || '';
if (!SOURCE_RE.test(file)) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const pkgPath = path.join(root, 'package.json');
if (!fs.existsSync(pkgPath)) process.exit(0);

let scripts = {};
try { scripts = JSON.parse(fs.readFileSync(pkgPath, 'utf8')).scripts || {}; } catch { process.exit(0); }

const target = ['typecheck', 'type-check', 'lint'].find((s) => scripts[s]);
if (!target) process.exit(0);

// Throttle: one run per THROTTLE_MS, so a burst of edits does not typecheck N times.
const stamp = path.join(root, 'node_modules', '.cache', 'claude-verify.stamp');
try {
  if (Date.now() - fs.statSync(stamp).mtimeMs < THROTTLE_MS) process.exit(0);
} catch { /* no stamp yet */ }
try {
  fs.mkdirSync(path.dirname(stamp), { recursive: true });
  fs.writeFileSync(stamp, '');
} catch { /* cache dir unavailable; run anyway */ }

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const res = spawnSync(npm, ['run', '--silent', target], {
  cwd: root, encoding: 'utf8', timeout: 120000, shell: true,
});

if (res.status !== 0) {
  const out = `${res.stdout || ''}${res.stderr || ''}`.trim().split('\n').slice(-40).join('\n');
  process.stderr.write(`\`npm run ${target}\` failed after editing ${path.basename(file)}:\n\n${out}\n\nFix this before continuing.\n`);
  process.exit(2); // 2 = blocking; stderr goes back to Claude
}
process.exit(0);
