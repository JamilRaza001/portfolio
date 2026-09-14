import defaults from '../../site.config.ts';

export const themes = {
  'black-studio': { name: 'Black studio', bg: '#080808', surface: '#141414', raised: '#242424', ink: '#F5F5F3', muted: '#B8B8B5', accent: '#E4E4DF', border: '#515151' },
  'blue-amber': { name: 'Blue & amber', bg: '#081A2C', surface: '#0E2A44', raised: '#14395A', ink: '#EAF2F7', muted: '#B6C6D2', accent: '#F5B42C', border: '#466078' },
  'charcoal-copper': { name: 'Charcoal & copper', bg: '#191917', surface: '#22221F', raised: '#2D2C28', ink: '#F2EFE8', muted: '#C1BDB4', accent: '#D99A6C', border: '#5C574E' },
  'olive-champagne': { name: 'Olive & champagne', bg: '#191E19', surface: '#232B23', raised: '#2E382D', ink: '#F1F0E7', muted: '#BBC5B5', accent: '#D8C69F', border: '#57634F' },
  'aubergine-silver': { name: 'Aubergine & silver', bg: '#211A24', surface: '#2D2431', raised: '#3A2E40', ink: '#F2EDF3', muted: '#C9BDCE', accent: '#C3B6CC', border: '#6A576F' },
} as const;
export type ThemeName = keyof typeof themes;

export function resolveTheme(value?: string): ThemeName {
  const name = value?.trim() || defaults.theme;
  if (!Object.hasOwn(themes, name)) {
    throw new Error(`Unknown site theme. Choose: ${Object.keys(themes).join(', ')}.`);
  }
  return name as ThemeName;
}
