import test from 'node:test';
import assert from 'node:assert/strict';
import { projects, getProject } from '../src/data/projects.ts';
import { themes } from '../src/lib/themes.ts';

test('all project links resolve and private sources cannot produce repository links', () => {
  const slugs = projects.map(project => project.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const project of projects) {
    assert.equal(getProject(project.slug), project);
    for (const related of project.related) assert.ok(getProject(related));
    if (project.visibility === 'private') assert.equal(project.repo, undefined);
    if (project.repo) assert.equal(new URL(project.repo).hostname, 'github.com');
  }
  assert.equal(getProject('../../.env'), undefined);
});

test('work in progress and missing evidence are not upgraded to production claims', () => {
  const retrieval = getProject('alphalens')!;
  assert.match(retrieval.status, /progress/i);
  assert.ok(retrieval.limitations.length > 0);
  assert.deepEqual(getProject('receipt-automation')!.stack, []);
});

function luminance(hex: string) {
  const values = hex.slice(1).match(/../g)!.map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return values[0] * .2126 + values[1] * .7152 + values[2] * .0722;
}
function contrast(a: string, b: string) {
  const values = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (values[0] + .05) / (values[1] + .05);
}
test('body, metadata and action labels remain readable in every palette', () => {
  for (const theme of Object.values(themes)) {
    for (const ground of [theme.bg, theme.surface, theme.raised]) {
      assert.ok(contrast(theme.ink, ground) >= 4.5, `${theme.name} ink contrast`);
      assert.ok(contrast(theme.muted, ground) >= 4.5, `${theme.name} metadata contrast`);
      assert.ok(contrast(theme.accent, ground) >= 4.5, `${theme.name} accent contrast`);
    }
    assert.ok(contrast(theme.accent, theme.bg) >= 4.5, `${theme.name} button label`);
  }
});
