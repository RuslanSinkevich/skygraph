/**
 * English source of truth for Notification doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const notificationDocEn = {
  pageTitle: 'Notification',
  pageLead:
    'Corner-pinned toasts driven by a global store. Call `notification.open(config)` (or the shorthand helpers) from anywhere — as long as a `NotificationContainer` is mounted for the matching `placement`.',
  pageWhen1: 'System-level feedback that needs more content than a simple inline message.',
  pageWhen2: 'Background task progress or completion (uploads, saves, long fetches).',
  pageWhen3: 'Route-independent announcements triggered from deep component trees.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Simplest usage — title + description, auto-closes after 4.5s.',
  demoTypesTitle: 'Types',
  demoTypesDesc: 'Semantic variants map to icon colour + accent background.',
  demoDurationTitle: 'Duration',
  demoDurationDesc: 'Set `duration` in ms; pass `0` to disable auto-close.',
  demoPlacementTitle: 'Placement',
  demoPlacementDesc:
    'Toasts render in the corner that matches the `placement` option. Each corner needs its own mounted `NotificationContainer` (the demo site mounts three — `topRight`, `topLeft`, `bottomRight`; `bottomLeft` is reserved for the Unstyled example).',
  demoOnCloseTitle: 'onClose callback',
  demoOnCloseDesc:
    'Observe when a toast is actually removed — manually or by the auto-dismiss timer.',
  demoRichTitle: 'Rich content',
  demoRichDesc:
    '`message` and `description` accept any ReactNode — wire up buttons, links, progress bars, anything.',
  demoDestroyTitle: 'Destroy all',
  demoDestroyDesc: '`notification.destroy()` clears the entire store regardless of placement.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Card visuals come from global design tokens — swap them on `:root` or a high-level wrapper that also contains `<NotificationContainer/>`.',

  tableConfig: 'NotificationConfig',
  tableContainer: 'NotificationContainer',
  tableUtility: 'notification utility',
  tableCssVars: 'CSS Variables',
  cssHint:
    'All tokens are global — the store renders toasts in the ancestor that hosts `<NotificationContainer/>`, so scoping tokens on an inner demo box does not reach the card. Override on `:root`, a theme wrapper, or by mounting a dedicated container inside a scoped wrapper with a distinct `placement`.',

  // NotificationConfig props
  cfgType: 'Visual variant; picks icon + accent colour',
  cfgMessage: 'Primary line (title).',
  cfgDescription: 'Secondary detail below the message.',
  cfgDuration: 'Auto-dismiss delay in ms; `0` disables auto-close.',
  cfgPlacement: 'Corner stack; must match a mounted `NotificationContainer`.',
  cfgKey: 'Stable id used as React key + for manual removal. Auto-generated if omitted.',
  cfgOnClose: 'Fired after the toast leaves the store (manual or auto).',
  cfgClassName: 'Extra class on the toast root — useful for scoped theming.',
  cfgStyle:
    'Inline style on the toast root; accepts CSS custom properties for per-toast token overrides.',

  // NotificationContainer props
  containerPlacement: 'Corner this instance listens to. Mount one per corner you use.',
  containerUnstyled: 'Drop every `sg-notification-*` class from the container and cards.',
  containerClassName: 'Extra wrapper className.',
  containerStyle: 'Inline style for the wrapper.',

  // Utility methods
  utilOpen: 'Open a toast with full config.',
  utilSuccess: 'Shortcut for `{ type: "success" }`.',
  utilError: 'Shortcut for `{ type: "error" }`.',
  utilWarning: 'Shortcut for `{ type: "warning" }`.',
  utilInfo: 'Shortcut for `{ type: "info" }`.',
  utilDestroy: 'Remove every active toast at once.',

  // CSS vars
  cssZ: 'z-index for all `sg-notification-container` stacks',
  cssPaddingXl: 'Distance from viewport corner (top/right/bottom/left)',
  cssPaddingMd: 'Card vertical padding',
  cssPaddingLg: 'Card horizontal padding',
  cssPaddingSm: 'Gap between icon / content / close button',
  cssMarginSm: 'Gap between stacked toasts',
  cssMarginXs: 'Gap between message and description lines',
  cssBgElevated: 'Card background (elevated surface)',
  cssBorderSecondary: 'Card border',
  cssRadiusLg: 'Card corner radius',
  cssShadowLg: 'Card drop shadow',
  cssTransitionDuration: 'Enter / leave animation duration + close-button hover',
  cssTransitionTiming: 'Enter / leave animation easing',
  cssFontSize: 'Message (title) font size',
  cssFontSizeSm: 'Description + icon glyph size',
  cssFontSizeLg: 'Close button (×) size',
  cssText: 'Message (title) colour + close button hover',
  cssTextSecondary: 'Description colour',
  cssTextTertiary: 'Close button (×) default colour',
  cssSuccess: '`type="success"` icon colour',
  cssSuccessBg: '`type="success"` icon background',
  cssError: '`type="error"` icon colour',
  cssErrorBg: '`type="error"` icon background',
  cssWarning: '`type="warning"` icon colour',
  cssWarningBg: '`type="warning"` icon background',
  cssPrimary: '`type="info"` icon colour',
  cssPrimaryBg: '`type="info"` icon background',
} as const

/** Writable string map — use for props / table builders (same keys as `notificationDocEn`). */
export type NotificationDocStrings = { -readonly [K in keyof typeof notificationDocEn]: string }
