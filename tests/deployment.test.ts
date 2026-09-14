import test from 'node:test';
import assert from 'node:assert/strict';
import { deploymentMetadata, getSettings } from '../src/lib/config.ts';

test('Vercel production uses the stable project domain, never a temporary deployment URL', () => {
  assert.deepEqual(deploymentMetadata({VERCEL_ENV:'production',VERCEL_PROJECT_PRODUCTION_URL:'jamil-portfolio.vercel.app',VERCEL_URL:'temporary-hash.vercel.app'}),{
    origin:'https://jamil-portfolio.vercel.app',indexable:true,
  });
  assert.equal(deploymentMetadata({VERCEL_ENV:'production',PUBLIC_SITE_URL:'https://portfolio.example',VERCEL_PROJECT_PRODUCTION_URL:'jamil-portfolio.vercel.app'}).origin,'https://portfolio.example');
});

test('preview and custom environments cannot become indexable through a production domain', () => {
  for (const target of ['preview','development','staging']) {
    assert.deepEqual(deploymentMetadata({VERCEL_ENV:target,VERCEL_PROJECT_PRODUCTION_URL:'jamil-portfolio.vercel.app'}),{
      origin:'https://jamil-portfolio.vercel.app',indexable:false,
    });
  }
  assert.equal(deploymentMetadata({PUBLIC_SITE_URL:'https://portfolio.example',DEV:true}).indexable,false);
  assert.deepEqual(deploymentMetadata({}),{origin:undefined,indexable:false});
});

test('production fails before publishing broken or insecure canonical metadata', () => {
  assert.throws(() => deploymentMetadata({VERCEL_ENV:'production',VERCEL_URL:'temporary.vercel.app'}),/Production requires/);
  assert.throws(() => deploymentMetadata({VERCEL_ENV:'production',PUBLIC_SITE_URL:'http://portfolio.example'}),/HTTPS/);
  for (const host of ['https://portfolio.example','portfolio.example/path','user:password@portfolio.example']) {
    assert.throws(() => deploymentMetadata({VERCEL_ENV:'production',VERCEL_PROJECT_PRODUCTION_URL:host}),/hostname/);
  }
});

test('getSettings uses the Node build environment for Vercel system metadata', () => {
  const settings = getSettings({DEV:false}, {
    VERCEL_ENV:'production',
    VERCEL_PROJECT_PRODUCTION_URL:'muhammad-jamil-raza.vercel.app',
  });
  assert.equal(settings.origin,'https://muhammad-jamil-raza.vercel.app');
  assert.equal(settings.indexable,true);
});
