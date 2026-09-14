import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import defaults from '../../site.config.ts';
import { resolveTheme, themes } from './themes.ts';

export function publicOrigin(value: string): string | undefined {
  if (!value.trim()) return undefined;
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('PUBLIC_SITE_URL must be an http(s) origin without credentials, query or path.');
  }
  return url.origin;
}

export function resumePath(value: string, publicDir = resolve('public')): string | undefined {
  if (!value.trim()) return undefined;
  if (!/^\/resumes\/[a-zA-Z0-9_-]+\.pdf$/.test(value)) {
    throw new Error('PUBLIC_RESUME_PATH must look like /resumes/jamil-raza.pdf.');
  }
  if (!existsSync(resolve(publicDir, value.slice(1)))) {
    throw new Error('Configured public resume PDF does not exist. Add the approved PDF or leave PUBLIC_RESUME_PATH empty.');
  }
  return value;
}

type Environment = Record<string, string | boolean | undefined>;

export function deploymentMetadata(env: Environment) {
  const explicit = String(env.PUBLIC_SITE_URL || defaults.url).trim();
  const productionHost = String(env.VERCEL_PROJECT_PRODUCTION_URL || '').trim();
  // Never use a temporary VERCEL_URL as the canonical domain.
  if (!explicit && productionHost && !/^[a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z0-9-]+$/i.test(productionHost)) {
    throw new Error('VERCEL_PROJECT_PRODUCTION_URL must be a hostname without a scheme or path.');
  }
  const origin = publicOrigin(explicit || (productionHost ? `https://${productionHost}` : ''));
  const target = String(env.VERCEL_ENV || '');
  if (target === 'production' && (!origin || !origin.startsWith('https://'))) {
    throw new Error('Production requires an HTTPS PUBLIC_SITE_URL or VERCEL_PROJECT_PRODUCTION_URL.');
  }
  return {origin, indexable: Boolean(origin) && (!target || target === 'production') && env.DEV !== true};
}

export function getSettings(env: Environment, serverEnv: Environment = process.env) {
  // Vite exposes PUBLIC_ variables on import.meta.env, but Vercel's own
  // system variables are only guaranteed on the Node build process.
  const source: Environment = {
    ...env,
    PUBLIC_SITE_THEME: serverEnv.PUBLIC_SITE_THEME ?? env.PUBLIC_SITE_THEME,
    PUBLIC_SITE_URL: serverEnv.PUBLIC_SITE_URL ?? env.PUBLIC_SITE_URL,
    PUBLIC_RESUME_PATH: serverEnv.PUBLIC_RESUME_PATH ?? env.PUBLIC_RESUME_PATH,
    VERCEL_ENV: serverEnv.VERCEL_ENV ?? env.VERCEL_ENV,
    VERCEL_PROJECT_PRODUCTION_URL: serverEnv.VERCEL_PROJECT_PRODUCTION_URL ?? env.VERCEL_PROJECT_PRODUCTION_URL,
  };
  const theme = resolveTheme(typeof source.PUBLIC_SITE_THEME === 'string' ? source.PUBLIC_SITE_THEME : undefined);
  return {
    theme, palette: themes[theme],
    ...deploymentMetadata(source),
    resume: resumePath(String(source.PUBLIC_RESUME_PATH || defaults.resume)),
  };
}

export const identity = {
  name: 'Muhammad Jamil Raza',
  fullName: 'Muhammad Jamil Raza Attari',
  email: 'jamilraza001@gmail.com',
  github: 'https://github.com/JamilRaza001',
  linkedin: 'https://www.linkedin.com/in/jamilrazaa/',
  resumeRequest: 'mailto:jamilraza001@gmail.com?subject=Resume%20request',
};
