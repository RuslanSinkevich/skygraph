/**
 * English source of truth for Carousel doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const carouselDocEn = {
  pageTitle: 'Carousel',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbCarousel: 'Carousel',
  pageLead:
    'Rotating slide container with dot navigation, four dot positions, and slide / fade transitions.',
  pageWhen1:
    'When a group of content on the same level needs to rotate through a single viewport — hero banners, testimonials.',
  pageWhen2: 'When limited horizontal space must cycle through a few items rather than scroll.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Default slide transition, dots bottom-centre.',
  demoAutoplayTitle: 'Autoplay',
  demoAutoplayDesc: 'Auto-advance every `autoplaySpeed` ms.',
  demoFadeTitle: 'Fade',
  demoFadeDesc: 'Cross-fade slides via opacity.',
  demoDotPositionTitle: 'Dot position',
  demoDotPositionDesc: 'Top, bottom (default), left or right — left / right go vertical.',
  demoHiddenDotsTitle: 'Hidden dots',
  demoHiddenDotsDesc: '`dots={false}` for decorative carousels.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Wrap the component in an element with CSS variables — it repaints.',

  tableCarouselApi: 'Carousel API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Carousel has no component-local tokens. The dot colours come from the global palette — rebrand by scoping `--sg-color-primary` + `--sg-color-text-disabled` + `--sg-color-text-tertiary`.',

  propAutoplay: 'Advance to the next slide on an interval',
  propAutoplaySpeed: 'Interval between autoplay steps (ms)',
  propDots: 'Render the dot navigation strip',
  propDotPosition: 'Where to dock the dots (left / right flip the layout to vertical)',
  propEffect: 'Transition style — horizontal slide or crossfade',
  propChildren: 'Each direct child is one slide',
  propClassName: 'Extra class on the root',
  propStyle: 'Inline style on the root',
  propUnstyled: 'Drop sg-carousel-* styles — only the active slide and numbered buttons render',

  cssPrimary: 'Active dot colour (wider "pill")',
  cssTextDisabled: 'Idle dot colour',
  cssTextTertiary: 'Hovered dot colour',
  cssFontSize: 'Inherited font size inside the track',
  cssPaddingXs: 'Gap between dots',
  cssPaddingSm: 'Padding around the dot strip',
  cssTransitionDuration: 'Slide / fade duration + dot colour transition',
  cssTransitionTiming: 'Shared easing for transitions',
} as const

/** Writable string map — use for props / table builders (same keys as `carouselDocEn`). */
export type CarouselDocStrings = { -readonly [K in keyof typeof carouselDocEn]: string }
