import { spawnSync } from 'node:child_process';
// Keep build/dev operation local: no Astro telemetry or global config writes.
const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', ...process.argv.slice(2)], {
  stdio: 'inherit', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
});
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
