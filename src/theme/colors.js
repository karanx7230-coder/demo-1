/**
 * Karnail — design tokens
 * ------------------------------------------------------------------
 * Single source of truth for every colour used across the site.
 * Names are intentionally short, semantic and role-based:
 *
 *   ink        primary dark surface + body text
 *   pine       brand teal, used for depth and secondary surfaces
 *   cream      warm paper / light surface
 *   marigold   accent — calls to action and highlights
 *   sand       quiet borders and dividers
 *   clay       earthy supporting accent
 *
 * Tailwind consumes this file, and CSS custom properties mirror the
 * same values in `src/index.css`. Change a value here and the whole
 * interface follows.
 */

const ink = {
  DEFAULT: '#26383B',
  soft: '#2F4346',
  muted: '#52666A',
};

const pine = {
  DEFAULT: '#315D5C',
  deep: '#203E40',
  soft: '#3D6E6D',
  light: '#477D7B',
};

const cream = {
  DEFAULT: '#F8F6F0',
  light: '#FDFCF9',
  deep: '#EFF0EB',
};

const marigold = {
  DEFAULT: '#E9874D',
  soft: '#F3B48D',
  deep: '#C9682F',
};

export const palette = {
  ink,
  pine,
  cream,
  marigold,
  sand: '#E5E8E3',
  clay: '#B85C33',
};

/**
 * Semantic aliases — prefer these in new components.
 * They describe intent rather than hue.
 */
export const semantic = {
  canvas: cream.DEFAULT,
  surface: cream.light,
  'surface-muted': cream.deep,
  brand: pine.DEFAULT,
  'brand-deep': pine.deep,
  accent: marigold.DEFAULT,
  'accent-soft': marigold.soft,
  'text-primary': ink.DEFAULT,
  'text-muted': ink.muted,
  line: '#E5E8E3',
};

/** Legacy aliases kept so older screens keep working. */
export const legacy = {
  navy: ink.DEFAULT,
  teal: pine.DEFAULT,
  orange: marigold.DEFAULT,
  light: cream.DEFAULT,
  blue: '#176C9B',
  border: '#E5E8E3',
};

export const colors = {
  ...palette,
  ...semantic,
  ...legacy,
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  current: 'currentColor',
};

export default colors;
