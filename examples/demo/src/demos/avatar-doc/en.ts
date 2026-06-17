/**
 * English source of truth for Avatar doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const avatarDocEn = {
  pageTitle: 'Avatar',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbAvatar: 'Avatar',
  pageLead:
    'Image, icon, or text avatar with three preset sizes and circle / square shapes. Degrades gracefully: photo → icon → initials.',
  pageWhen1: 'Profile picture in a menu or header.',
  pageWhen2: 'Compact "who is involved" list on a card, with a stacked group + overflow counter.',
  pageWhen3: 'Fallback chip when a photo URL is missing and you have a name.',

  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Preset tokens + any px number.',
  demoShapesTitle: 'Shapes',
  demoShapesDesc: 'Circle vs. rounded square.',
  demoFallbackTitle: 'Fallback order',
  demoFallbackDesc: 'src → icon → children.',
  demoColoredTitle: 'Coloured initials',
  demoColoredDesc: 'Hash the name into a palette for deterministic tints.',
  demoGroupTitle: 'Avatar group',
  demoGroupDesc: 'Stacked avatars with a +N overflow slot.',
  demoWithBadgeTitle: 'With Badge',
  demoWithBadgeDesc: 'Wrap the avatar in a Badge for presence / count.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Wrap the component in an element with CSS variables — it repaints.',

  tableAvatarApi: 'Avatar API',
  tableCssVars: 'CSS Variables',

  propSrc: 'Image URL (photo avatar)',
  propAlt: 'Alt text for the image',
  propAriaLabel: 'Accessible name when there is no visible text',
  propSize: 'Preset size token or explicit px number',
  propShape: 'Circle or rounded square',
  propIcon: 'Icon shown when src is missing',
  propChildren: 'Initials / text fallback when src and icon are missing',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style (overrides background etc.)',
  propUnstyled: 'Drop sg-avatar-* classes (headless mode)',

  cssHint:
    'Avatar has no dedicated tokens. The fallback background is `--sg-color-text-disabled`, the square radius is `--sg-border-radius`, and text is `--sg-color-white`. For per-instance colours, inline style={{ background, color }} is the simplest override.',

  cssSgColorTextDisabled: 'Fallback background when src / icon / children are absent',
  cssSgColorWhite: 'Foreground colour on the tinted background',
  cssSgBorderRadius: 'Corner radius for shape="square"',
  cssSgColorBgContainer: 'Recommended border colour when stacking avatars in a group',
} as const

/** Writable string map — use for props / table builders (same keys as `avatarDocEn`). */
export type AvatarDocStrings = { -readonly [K in keyof typeof avatarDocEn]: string }
