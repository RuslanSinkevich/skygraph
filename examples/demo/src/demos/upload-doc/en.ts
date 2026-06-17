/**
 * English source of truth for Upload doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const uploadDocEn = {
  pageTitle: 'Upload',
  pageLead:
    'Hidden native file input with a swappable trigger and an optional controlled file list. No network layer — you own the transport.',
  pageWhen1:
    'When you need file selection inside a form; pair it with your own upload/progress logic.',
  pageWhen2: 'When the built-in list (uploading / done / error) is enough for UX feedback.',
  pageWhen3: 'When you want a branded trigger — Upload accepts any ReactNode as children.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Simulated upload with uploading → done transition.',
  demoMultipleTitle: 'Multiple',
  demoMultipleDesc: 'Pick several files at once, cap via maxCount.',
  demoAcceptTitle: 'Accept filter',
  demoAcceptDesc: 'Restrict the native picker to specific MIME types or extensions.',
  demoCustomTriggerTitle: 'Custom trigger',
  demoCustomTriggerDesc: 'Swap the default button for a branded card or drop zone.',
  demoWithProgressTitle: 'With progress bar',
  demoWithProgressDesc: 'Show Progress in parallel with the built-in dots.',
  demoErrorStateTitle: 'Error state',
  demoErrorStateDesc: 'Failed rows get the error theme and a remove button.',
  demoDisabledTitle: 'Disabled / loading',
  demoDisabledDesc: 'Block the trigger or swap it for a loading state.',
  demoTokensOverrideTitle: 'Tokens override',
  demoTokensOverrideDesc: 'Wrap the component in an element with CSS variables — it repaints.',

  tableUploadApi: 'Upload API',
  tableUploadFile: 'UploadFile',
  tableCssVars: 'CSS Variables',

  propAccept: 'Passed to the hidden <input type="file" accept>',
  propMultiple: 'Allow picking many files per dialog',
  propFileList: 'Controlled file list rendered under the trigger',
  propMaxCount: 'Limit how many new files pass through onUpload',
  propOnUpload: 'Called with native File objects after the picker resolves',
  propOnRemove: 'Called when the user clicks × on a list item',
  propDisabled: 'Block the trigger entirely',
  propLoading: 'Render the default trigger in loading state',
  propChildren: 'Custom trigger (defaults to a primary "Upload" button)',
  propClassName: 'Root wrapper className',
  propStyle: 'Root wrapper inline style',
  propUnstyled: 'Drop SkyGraph classes — keep only semantics',

  fileUid: 'Stable unique id (keys + remove callbacks)',
  fileName: 'Display file name',
  fileSize: 'File size in bytes',
  fileStatus: 'Row status variant',

  cssHint:
    'Upload itself has no --sg-upload-* tokens — it is fully driven by global palette/spacing. Override them on a scoped wrapper to re-skin a single instance.',

  cssSgColorBorderSecondary: 'File row border',
  cssSgColorText: 'File name color (done/uploading)',
  cssSgColorTextTertiary: 'Remove (×) button color',
  cssSgColorError: 'Error-row border, text and hover state of ×',
  cssSgBorderRadiusSm: 'File row radius',
  cssSgFontSize: 'Remove button font size',
  cssSgFontSizeSm: 'File row name font size',
  cssSgMarginSm: 'Gap between trigger and list',
  cssSgMarginXs: 'Gap between list rows',
  cssSgPaddingXs: 'Row vertical padding + inner gap',
  cssSgPaddingSm: 'Row horizontal padding',
  cssSgSpinColor: 'Inline loading spinner color',
} as const

/** Writable string map — use for props / table builders (same keys as `uploadDocEn`). */
export type UploadDocStrings = { -readonly [K in keyof typeof uploadDocEn]: string }
