/**
 * English source of truth for Upload doc page strings (Vue port).
 *
 * Vue parity gaps vs React (see `findings/T-Vue-Demo-Forms.md`
 * → `upload-vue-feature-gaps`):
 * - no `loading` prop (no spinner-mode trigger)
 * - no separate `onUpload(file: File[])` callback — Vue handles the
 *   file pipeline internally and exposes `customRequest` instead.
 *
 * Vue supersets vs React:
 * - `drag` (drop-zone trigger), `listType="picture-card"`,
 *   `beforeUpload`, `maxSize`, built-in `percent` rendering.
 *
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const uploadDocEn = {
  pageTitle: 'Upload',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbUpload: 'Upload',

  pageLead:
    'Hidden native file input with a swappable trigger, drag-area mode and a controlled file list. No network layer — you own the transport via `custom-request`.',
  pageWhen1:
    'When you need file selection inside a form; pair it with your own upload/progress logic via `custom-request`.',
  pageWhen2:
    'When the built-in list (uploading / done / error / `percent`) is enough for UX feedback.',
  pageWhen3: 'When you want a branded trigger — `SgUpload` accepts any element via the default slot.',

  demoBasicTitle: 'Basic',
  demoBasicDesc:
    'Simulated upload with `uploading → done` transition via `custom-request`.',
  demoMultipleTitle: 'Multiple',
  demoMultipleDesc: 'Pick several files at once, cap via `max-count`.',
  demoAcceptTitle: 'Accept filter',
  demoAcceptDesc:
    'Restrict the native picker to specific MIME types or extensions.',
  demoCustomTriggerTitle: 'Custom trigger',
  demoCustomTriggerDesc:
    'Default slot replaces the trigger button — branded card, dashed tile, etc.',
  demoWithProgressTitle: 'With progress bar',
  demoWithProgressDesc:
    'Use `custom-request` + the per-file `percent` field to power an external `SgProgress`.',
  demoErrorStateTitle: 'Error state',
  demoErrorStateDesc:
    'Failed rows get the error theme and a remove button; uploading rows show inline `percent`.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc:
    'Block the trigger entirely. Vue has no `loading` prop — the React loading-row variant is dropped.',
  demoTokensOverrideTitle: 'Tokens override',
  demoTokensOverrideDesc: 'Scope global tokens on a wrapper to re-skin the list.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Just semantics — paint with your own CSS.',

  tableUploadApi: 'Upload API',
  tableUploadFile: 'UploadFile',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model binding (Vue idiom) for the file list',
  propFileList: 'Compat alias for `modelValue`',
  propDefaultFileList: 'Initial file list when uncontrolled',
  propAccept: 'Passed to the hidden `<input type="file" accept>`',
  propMultiple: 'Allow picking many files per dialog',
  propDrag: 'Render a drop zone instead of the trigger button',
  propListType: 'Layout for the rendered file list',
  propShowUploadList: 'Toggle the built-in list rendering',
  propMaxCount: 'Cap the total list length after multiple-pick',
  propMaxSize: 'Skip files larger than this many bytes',
  propBeforeUpload:
    'Pre-upload hook (return false / Promise<false> to skip a file)',
  propCustomRequest:
    'Take over transport — receives `{ file, onProgress, onSuccess, onError }`',
  propDisabled: 'Block the trigger entirely',
  propUnstyled: 'Drop SkyGraph wrapper classes — keep only semantics',
  emitUpdateModelValue:
    'Emitted whenever the file list changes (v-model)',
  emitChange: 'Mirror of `update:modelValue` — fires on every list mutation',
  emitRemove: 'Emitted when the user clicks × on a list item',

  fileUid: 'Stable unique id (used for v-for keys + remove callbacks)',
  fileName: 'Display file name',
  fileSize: 'File size in bytes',
  fileStatus: 'Row status variant',
  filePercent: 'Upload progress 0-100 — rendered inline next to the name',
  fileType: 'MIME type forwarded from the picked `File`',
  fileUrl: 'Optional preview URL (used by `picture` / `picture-card` layouts)',
  fileError: 'Free-form error metadata when `status === "error"`',
  fileRaw: 'Original native `File` reference (for `custom-request`)',

  cssHint:
    'Upload itself has no `--sg-upload-*` tokens — it is fully driven by global palette/spacing. Override them on a scoped wrapper to re-skin a single instance.',

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
} as const

/** Writable string map — use for props / table builders (same keys as `uploadDocEn`). */
export type UploadDocStrings = { -readonly [K in keyof typeof uploadDocEn]: string }
