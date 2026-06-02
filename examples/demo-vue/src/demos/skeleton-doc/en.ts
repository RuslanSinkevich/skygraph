/**
 * English source of truth for Skeleton doc page strings.
 * Keep keys aligned with `ru.ts`.
 */
export const skeletonDocEn = {
  pageTitle: 'Skeleton',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbSkeleton: 'Skeleton',
  pageLead:
    'Layout placeholder for asynchronous content — title, paragraph, optional avatar. Use shape-matching skeletons to avoid layout jumps.',
  pageWhen1: 'Initial mount of cards / lists / detail panels.',
  pageWhen2: 'Long-running operations where you want a "still working" cue (`active`).',
  pageWhen3: 'Pre-fetched routes where the layout is known but content is loading.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Title + 3 paragraph lines, no animation.',
  demoActiveTitle: 'Active',
  demoActiveDesc: '`active` runs a 1.5s shimmer.',
  demoWithAvatarTitle: 'With avatar',
  demoWithAvatarDesc: '`avatar` adds a circle / square placeholder, configurable.',
  demoNoTitleTitle: 'Drop pieces',
  demoNoTitleDesc: 'Hide title or paragraph; toggle avatar; tweak widths.',
  demoLoadingTitle: 'Loading toggle',
  demoLoadingDesc: '`:loading="false"` shows the default-slot content instead.',
  demoRowsTitle: 'Custom rows',
  demoRowsDesc: '`:paragraph="{ rows, width }"` shapes the line block.',
  demoCardTitle: 'Card grid',
  demoCardDesc: 'Compose multiple Skeletons for the final layout.',
  demoTokensTitle: 'Custom skeleton themes',
  demoTokensDesc:
    'Three palettes (light card, indigo branded, dark mode) — only `--sg-skeleton-bg` and `--sg-skeleton-shimmer` change.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: '`unstyled` keeps aria-busy and block order, drops every class.',

  tableSkeletonApi: 'Skeleton API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Skeleton ships two dedicated tokens — `--sg-skeleton-bg` (placeholder fill) and `--sg-skeleton-shimmer` (animation highlight). Override both on a wrapper for a dark-mode or branded placeholder.',

  propActive: 'Enable shimmer animation',
  propAvatar: 'Show avatar block; pass `{ size, shape }` to tune',
  propTitle: 'Show title bar; pass `{ width }` for custom width',
  propParagraph: 'Show paragraph lines; pass `{ rows, width[] }` to tune',
  propLoading: 'When false, render the default slot instead of the skeleton',
  propUnstyled: 'Drop sg-skeleton-* classes (keep aria-busy + block order)',

  cssSkeletonBg: 'Placeholder fill colour',
  cssSkeletonShimmer: 'Animation highlight colour',
  cssBorderRadiusSm: 'Corner radius of bars',
  cssMotionDurationSlow: 'Shimmer duration',
} as const

export type SkeletonDocStrings = { -readonly [K in keyof typeof skeletonDocEn]: string }
