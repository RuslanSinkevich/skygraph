/**
 * English source of truth for Modal doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Vue-side delta vs React:
 *   - Closing emits `@close` (React: `onClose`).
 *   - The default OK / Cancel footer is enabled by setting `okHandler`
 *     (React: `onOk` callback). The component also emits `@ok`.
 *   - `footer` prop is the literal `'default' | 'none'` enum (React:
 *     `ReactNode | null`). Custom footer markup goes into the
 *     `#footer` slot.
 *   - There is no `className` prop — pass `class` and Vue's
 *     attribute fallthrough applies it inside the Teleport.
 *   - Renders through Vue `<Teleport to="body">` (parity with React's
 *     `createPortal` — same `sg-modal-mask` / `sg-modal` DOM).
 */
export const modalDocEn = {
  pageTitle: 'Modal',
  pageBadge: 'Feedback',
  crumbCategory: 'Feedback',
  crumbModal: 'Modal',
  pageLead: 'Dialog with focus trap, Escape-to-close, and scoped token re-skinning.',
  pageWhen1:
    'When a user must complete a short task before returning to context (create, confirm, edit).',
  pageWhen2: 'When you need to show important details without navigating away.',
  pageWhen3:
    'For lightweight confirmations prefer <SgPopconfirm>. For stepwise flows consider <SgDrawer>.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Title, body, two-button footer (provided via `#footer` slot).',
  demoDefaultFooterTitle: 'Default footer (okHandler)',
  demoDefaultFooterDesc:
    'Pass `okHandler` and SkyGraph renders Cancel + OK wired to the locale. `confirmLoading` disables Cancel and spins OK.',
  demoAsyncTitle: 'Async confirmation',
  demoAsyncDesc: 'Loading footer + guarded Cancel while the task runs.',
  demoWidthsTitle: 'Widths',
  demoWidthsDesc: '`width` takes pixels or any CSS length.',
  demoNoFooterTitle: 'No footer',
  demoNoFooterDesc:
    'Set `footer="none"` to drop the divider — read-only dialogs with only the close button.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
  tableModalApi: 'Modal API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Modal exposes structural spacing + colors. The content (Buttons, Forms) follows its own tokens.',

  propOpen: 'Controls visibility',
  propTitle: 'Optional heading + accessible name',
  propFooter:
    "`'default'` (auto OK/Cancel when `okHandler` is set) or `'none'` (drop the area). Custom layout goes into the `#footer` slot.",
  propWidth: 'Dialog width (number = px, or any CSS length)',
  propOkHandler: 'Callback fired by the default OK button. Enables the default footer.',
  propOkText: 'Default OK label. Falls back to `locale.modal.okText` → "OK".',
  propCancelText: 'Default Cancel label. Falls back to `locale.modal.cancelText` → "Cancel".',
  propOkType: 'Visual type of the default OK button.',
  propConfirmLoading: 'Puts the OK button in loading state and disables Cancel.',
  propUnstyled: 'Keep semantics, drop SkyGraph styles',
  emitClose: 'Emitted on Escape, mask click, or the close button',
  emitOk: 'Emitted alongside the default OK button click (before `okHandler` runs)',
  slotDefault: 'Body content',
  slotFooter: 'Custom footer area — replaces the auto OK/Cancel pair',

  cssZModal: 'Stacking layer for the mask + dialog',
  cssOverlay: 'Backdrop fill — dark-theme tuned automatically',
  cssBgElevated: 'Dialog background',
  cssBorderSecondary: 'Header / footer divider lines',
  cssText: 'Title + body text',
  cssTextTertiary: 'Close icon (× button)',
  cssBgHover: 'Close icon hover background',
  cssRadiusLg: 'Dialog corner radius',
  cssRadiusSm: 'Close icon hit-area radius',
  cssShadowLg: 'Dialog drop shadow',
  cssPaddingLg: 'Header + body padding',
  cssPaddingMd: 'Footer vertical padding',
  cssPaddingSm: 'Gap between footer buttons',
  cssPaddingXl: 'Spacious empty-state / centered layout padding',
  cssFontSizeLg: 'Title font size',
  cssFontSizeXl: 'Close icon font size',
} as const

/** Writable string map — used by table builders. */
export type ModalDocStrings = { -readonly [K in keyof typeof modalDocEn]: string }
