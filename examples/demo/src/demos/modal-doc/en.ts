/**
 * English source of truth for Modal doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const modalDocEn = {
  pageTitle: 'Modal',
  pageBadge: 'Feedback',
  crumbFeedback: 'Feedback',
  crumbModal: 'Modal',
  pageLead: 'Dialog with focus trap, Escape-to-close, and scoped token re-skinning.',
  pageWhen1:
    'When a user must complete a short task before returning to context (create, confirm, edit).',
  pageWhen2: 'When you need to show important details without navigating away.',
  pageWhen3:
    'For lightweight confirmations prefer <Popconfirm>. For stepwise flows consider <Drawer>.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Title, body, two-button footer.',
  demoDefaultFooterTitle: 'Default footer (onOk)',
  demoDefaultFooterDesc:
    'Omit `footer` and pass `onOk` — SkyGraph renders Cancel + OK wired to the locale. `confirmLoading` disables Cancel and spins OK.',
  demoAsyncTitle: 'Async confirmation',
  demoAsyncDesc: 'Loading footer + guarded Cancel while the task runs.',
  demoWidthsTitle: 'Widths',
  demoWidthsDesc: '`width` takes pixels or any CSS length.',
  demoNoFooterTitle: 'No footer',
  demoNoFooterDesc:
    'Pass `footer={null}` to drop the divider — read-only dialogs with only the close button.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Wrap the component in an element with CSS variables — it repaints.',

  tableModalApi: 'Modal API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Modal exposes structural spacing + colors. The content (Buttons, Forms) follows its own tokens.',

  propOpen: 'Controls visibility',
  propOnClose: 'Called on Escape, mask click, or close button',
  propTitle: 'Optional heading + accessible name',
  propFooter:
    'Override the footer area. Omit to use the default OK/Cancel when `onOk` is set. Pass `null` to drop the footer entirely.',
  propOnOk:
    'Called when the default OK button is clicked. Enables the default footer when `footer` is omitted.',
  propOkText: 'Default OK label. Falls back to `locale.modal.okText` → "OK".',
  propCancelText: 'Default Cancel label. Falls back to `locale.modal.cancelText` → "Cancel".',
  propOkType: 'Visual type of the default OK button.',
  propConfirmLoading: 'Puts the OK button in loading state and disables Cancel.',
  propChildren: 'Body content',
  propWidth: 'Dialog width (number = px, or any CSS length)',
  propClassName: 'Extra class on the dialog root',
  propUnstyled: 'Keep semantics, drop SkyGraph styles',

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

/** Writable string map — use for props / table builders (same keys as `modalDocEn`). */
export type ModalDocStrings = { -readonly [K in keyof typeof modalDocEn]: string }
