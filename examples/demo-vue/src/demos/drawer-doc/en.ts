/**
 * English source of truth for Drawer doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Vue-side delta vs React:
 *   - Closing emits `@close` (React: `onClose`).
 *   - `title` and `footer` are slots / strings (React: `ReactNode`).
 *   - `<SgDrawer>` mounts via `<Teleport to="body">` — same
 *     `sg-drawer-mask` / `sg-drawer` DOM as React.
 */
export const drawerDocEn = {
  pageTitle: 'Drawer',
  pageBadge: 'Feedback',
  crumbCategory: 'Feedback',
  crumbDrawer: 'Drawer',
  pageLead:
    'Edge-anchored panel that slides in from any side. Uses a focus trap, ESC-to-close, and an optional mask. Body scrolls while header / footer stay pinned.',
  pageWhen1: 'Edit a record or filter a list without losing page context.',
  pageWhen2: 'Show supplementary navigation / notifications tray.',
  pageWhen3: "Reveal a side form that's too heavy for a Popover and too light for a Modal.",

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Right-side drawer with focus trap + ESC support.',
  demoPlacementTitle: 'Placement',
  demoPlacementDesc: 'Slide in from any edge; width / height switch automatically.',
  demoSizeTitle: 'Custom size',
  demoSizeDesc: 'Any CSS length works — px, %, vw. Use % for mobile-friendly drawers.',
  demoFooterTitle: 'Sticky footer',
  demoFooterDesc: 'Body scrolls, footer stays pinned (use the `#footer` slot).',
  demoNoMaskTitle: 'Mask options',
  demoNoMaskDesc: 'Turn off the mask, or keep it but force the × / ESC.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
  tableDrawerApi: 'Drawer API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Drawer has no dedicated tokens — the panel is `--sg-color-bg-elevated`, the mask is `--sg-color-overlay`, and the lift is `--sg-shadow-lg`. Override them on a wrapper to restyle without editing the global theme.',

  propOpen: 'Whether the Drawer is visible',
  propTitle: 'Header text next to the close control',
  propPlacement: 'Edge the panel slides in from',
  propWidth: 'Panel width (horizontal placement)',
  propHeight: 'Panel height (vertical placement)',
  propClosable: 'Show the × header button',
  propMask: 'Render the dimmed backdrop',
  propMaskClosable: 'Clicking the mask emits @close',
  propUnstyled: 'Drop every sg-drawer-* class (headless mode)',
  emitClose: 'Emitted on ESC, mask click, or × button',
  slotDefault: 'Scrollable body content',
  slotFooter: 'Sticky footer row for actions',

  cssBgElevated: 'Panel background',
  cssOverlay: 'Mask colour + opacity',
  cssBorderSecondary: 'Header / footer divider',
  cssText: 'Title colour',
  cssTextTertiary: '× close button colour',
  cssFontSizeLg: 'Title font size',
  cssFontSizeXl: '× close glyph size',
  cssPaddingMd: 'Header / footer vertical padding',
  cssPaddingXl: 'Body padding + header / footer horizontal padding',
  cssShadowLg: 'Panel elevation',
  cssTransitionDuration: 'Slide-in / fade-in speed',
  cssTransitionTiming: 'Shared easing',
  cssZModal: 'Stacking layer for the drawer root',
} as const

/** Writable string map — used by table builders. */
export type DrawerDocStrings = { -readonly [K in keyof typeof drawerDocEn]: string }
