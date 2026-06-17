/**
 * English source of truth for Notification doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Vue-side delta vs React:
 *   - `message` and `description` are `string` (React: `ReactNode`).
 *     The React `RichContent.demo` cannot be reproduced 1:1 and is
 *     replaced with a plain-text variant that documents the gap.
 *   - The container component is `SgNotificationContainer` and must
 *     be mounted in the page subtree (the React App mounts them
 *     once globally — the Vue demo mounts them in the aggregator).
 */
export const notificationDocEn = {
  pageTitle: 'Notification',
  pageBadge: 'Feedback',
  crumbCategory: 'Feedback',
  crumbNotification: 'Notification',
  pageLead:
    'Corner-pinned toasts driven by a global store. Call `notification.open(config)` (or the shorthand helpers) from anywhere — as long as a `SgNotificationContainer` is mounted for the matching `placement`.',
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
    'Toasts render in the corner that matches the `placement` option. Each corner needs its own mounted `SgNotificationContainer`.',
  demoOnCloseTitle: 'onClose callback',
  demoOnCloseDesc:
    'Observe when a toast is actually removed — manually or by the auto-dismiss timer.',
  demoRichTitle: 'Rich content (Vue limitation)',
  demoRichDesc:
    '`message` and `description` are strings in `@skygraph/vue` — rich VNode/HTML content from React is not portable. Inline-format the text and lean on locale instead.',
  demoDestroyTitle: 'Destroy all',
  demoDestroyDesc: '`notification.destroy()` clears the entire store regardless of placement.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
  tableConfig: 'NotificationConfig',
  tableContainer: 'SgNotificationContainer',
  tableUtility: 'notification utility',
  tableCssVars: 'CSS Variables',
  cssHint:
    'All tokens are global — the store renders toasts in the ancestor that hosts `<SgNotificationContainer/>`, so scoping tokens on an inner demo box does not reach the card. Override on `:root`, a theme wrapper, or by mounting a dedicated container inside a scoped wrapper with a distinct `placement`.',

  cfgType: 'Visual variant; picks icon + accent colour',
  cfgMessage: 'Primary line (title) — string only in Vue.',
  cfgDescription: 'Secondary detail below the message — string only in Vue.',
  cfgDuration: 'Auto-dismiss delay in ms; `0` disables auto-close.',
  cfgPlacement: 'Corner stack; must match a mounted `SgNotificationContainer`.',
  cfgKey: 'Stable id used for deduplication + manual removal. Auto-generated if omitted.',
  cfgOnClose: 'Fired after the toast leaves the store (manual or auto).',

  containerPlacement: 'Corner this instance listens to. Mount one per corner you use.',
  containerUnstyled: 'Drop every `sg-notification-*` class from the container and cards.',

  utilOpen: 'Open a toast with full config.',
  utilSuccess: 'Shortcut for `{ type: "success" }`.',
  utilError: 'Shortcut for `{ type: "error" }`.',
  utilWarning: 'Shortcut for `{ type: "warning" }`.',
  utilInfo: 'Shortcut for `{ type: "info" }`.',
  utilDestroy: 'Remove every active toast at once.',

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

/** Writable string map — used by table builders. */
export type NotificationDocStrings = {
  -readonly [K in keyof typeof notificationDocEn]: string
}
