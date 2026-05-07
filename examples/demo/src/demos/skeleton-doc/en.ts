/**
 * English source of truth for Skeleton doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const skeletonDocEn = {
  pageTitle: 'Skeleton',
  pageLead:
    'Layout-aware placeholder while content loads — avatar, title, and paragraph blocks, with an optional shimmer animation.',
  pageWhen1: 'Feed / list items that rely on a network request.',
  pageWhen2: 'Cards and dashboard widgets that hydrate after mount.',
  pageWhen3: "Any screen where swapping from placeholder to content shouldn't jump the layout.",

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Title + 3 lines, no animation.',
  demoActiveTitle: 'Active animation',
  demoActiveDesc: 'Turn on the shimmer for long-lived placeholders.',
  demoAvatarTitle: 'With avatar',
  demoAvatarDesc: 'Profile / feed item shape.',
  demoRowsTitle: 'Paragraph rows & widths',
  demoRowsDesc: 'Match the line count + widths to the real content.',
  demoNoTitleTitle: 'Drop blocks',
  demoNoTitleDesc: 'Hide title / paragraph / avatar selectively.',
  demoLoadingTitle: 'Loading → content swap',
  demoLoadingDesc: 'Flip `loading` to swap the skeleton for `children` in place.',
  demoCardTitle: 'Card composition',
  demoCardDesc: 'Compose several Skeletons to mirror a card grid.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope the two bg tokens for a bespoke skeleton palette.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Keep aria + structure, bring your own styling.',

  tableSkeletonApi: 'Skeleton API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Skeleton has no component-private tokens — it reads `--sg-color-bg-hover` (fill) and `--sg-color-bg-secondary` (shimmer highlight). Swap both on a wrapper for a dark-mode or branded placeholder.',

  propActive: 'Turn on the shimmer animation',
  propAvatar: 'Show an avatar placeholder; object form tunes `size` and `shape`',
  propTitle: 'Show the heading bar; object form tunes `width`',
  propParagraph: 'Show paragraph lines; object form tunes `rows` and per-line `width`',
  propLoading: 'When `false`, render `children` instead of the skeleton',
  propChildren: 'Real content rendered when `loading` is `false`',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop every sg-skeleton-* class (headless mode)',

  cssBgHover: 'Placeholder fill colour (avatar / title / rows)',
  cssBgSecondary: 'Highlight colour in the shimmer gradient (`active`)',
  cssRadius: 'Square avatar corner radius',
  cssRadiusSm: 'Title + paragraph line corner radius',
  cssPaddingLg: 'Gap between avatar and content block',
  cssMarginSm: 'Gap between paragraph lines',
  cssMarginMd: 'Gap from title to paragraph block',
} as const

/** Writable string map — use for props / table builders (same keys as `skeletonDocEn`). */
export type SkeletonDocStrings = { -readonly [K in keyof typeof skeletonDocEn]: string }
