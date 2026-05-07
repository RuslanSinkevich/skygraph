/**
 * English source of truth for Form doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const formDocEn = {
  pageTitle: 'Form',
  pageLead:
    'High-performance form with field-level validation, dependencies, dynamic arrays, and imperative control.',
  pageWhen1: 'When you need to create or edit data with validation.',
  pageWhen2: 'When the form has dependent fields (e.g. confirm password).',
  pageWhen3: 'For dynamic arrays — phones, tags, addresses.',
  pageWhen4: 'For search/filter bars using `layout="inline"`.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Minimal form: two fields with rules and a submit button.',
  demoValidationRulesTitle: 'Validation rules',
  demoValidationRulesDesc:
    'Required, length, regex, builtin types (`email`, `url`), and custom validators — each with its own message.',
  demoDependentFieldsTitle: 'Dependent fields',
  demoDependentFieldsDesc:
    '`dependencies` triggers re-validation when the linked field changes. Classic password / confirm pattern.',
  demoAsyncValidationTitle: 'Async validation',
  demoAsyncValidationDesc: 'Validators may return a Promise. The field shows a spinner while the check runs.',
  demoLayoutVerticalTitle: 'Layout — vertical',
  demoLayoutVerticalDesc: 'Labels above controls. Default and recommended for signup / profile forms.',
  demoLayoutHorizontalTitle: 'Layout — horizontal',
  demoLayoutHorizontalDesc: '24-column grid via `labelCol` / `wrapperCol`. Great for admin settings.',
  demoLayoutInlineTitle: 'Layout — inline',
  demoLayoutInlineDesc: 'Everything in a single row — perfect for search / filter bars.',
  demoRequiredMarkTitle: 'Required mark',
  demoRequiredMarkDesc:
    "Choose how required fields are highlighted: asterisk, nothing, or the inverted 'optional' convention.",
  demoSizesTitle: 'Sizes',
  demoSizesDesc: '`size` on the form propagates to every control inside.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc:
    'Form-level disable turns off every control in one go; individual fields can opt in or out.',
  demoControlsTitle: 'Controls gallery',
  demoControlsDesc:
    'One form wired to every supported control — Select, Checkbox, RadioGroup, Switch, InputNumber, DatePicker, TimePicker, AutoComplete, Slider, Rate.',
  demoFieldStatusTitle: 'Field status & feedback',
  demoFieldStatusDesc:
    '`validateStatus` + `hasFeedback` for manual status (success / warning / error / validating).',
  demoFormListTitle: 'Dynamic list (FormList)',
  demoFormListDesc:
    'Add / remove / reorder array items. Each row is an independent `<Field>` and validates on its own.',
  demoNestedFieldsTitle: 'Nested fields',
  demoNestedFieldsDesc: 'Dotted names (`address.city`) auto-store into nested objects.',
  demoDistributedTitle: 'Distributed composition',
  demoDistributedDesc:
    'Three nested components — root holds `<Form>`, middle adds section chrome, leaf renders `<Field>` nodes. Same form context throughout; no prop-drilling of values.',
  demoProgrammaticTitle: 'Programmatic control',
  demoProgrammaticDesc:
    '`useForm()` exposes `reset`, `setFieldsValue`, `validate`, `submit`. Share the instance via the `form` prop.',
  demoLiveWatchTitle: 'Live values (useWatch)',
  demoLiveWatchDesc:
    '`useWatch(core, path)` re-renders only when that field changes — ideal for live previews.',
  demoLoginCardTitle: 'Login card',
  demoLoginCardDesc:
    'A real-world styled container — the form itself stays semantic, all look-and-feel lives in `.demo-login-card`.',
  demoSearchBarTitle: 'Search bar',
  demoSearchBarDesc:
    'Inline layout wrapped in a styled card. The panel collects `q`, role, status, and a date filter.',
  demoProfileSettingsTitle: 'Profile settings',
  demoProfileSettingsDesc:
    'Sectioned multi-column form: personal info, notifications (Switches), and avatar upload.',
  demoSchemaFormBasicTitle: 'SchemaForm — JSON Schema',
  demoSchemaFormBasicDesc:
    '`<SchemaForm schema={...}/>` derives fields, rules and default values from a JSON Schema. Pass a Zod schema instead — it is converted via `zodToJsonSchema` before rendering.',
  demoSchemaFormLayoutTitle: 'SchemaForm — layout & size',
  demoSchemaFormLayoutDesc:
    '`layout`, `size`, `disabled`, `labelCol`, `wrapperCol` are passed through to the underlying Form — no wrapper needed.',

  tableFormApi: 'Form API',
  tableFieldApi: 'Field API',
  tableFormListApi: 'FormList API',
  tableSchemaFormApi: 'SchemaForm API',
  tableCssVars: 'CSS Variables',

  formLayout: 'Form layout',
  formDefaultValues: 'Initial form values',
  formOnSubmit: 'Submit handler',
  formOnSubmitInvalid: 'Called if validation fails on submit',
  formOnValuesChange: 'Callback when any value changes',
  formValidateTrigger: 'When to validate',
  formScrollToFirstError: 'Scroll to first error on submit',
  formPreserve: 'Preserve values of unmounted fields',
  formDisabled: 'Disable all form controls',
  formSize: 'Form controls size',
  formRequiredMark: 'How required fields are marked',
  formColon: 'Append colon after labels',
  formLabelCol: 'Label grid (horizontal layout)',
  formWrapperCol: 'Control grid (horizontal layout)',
  formLabelAlign: 'Label alignment (horizontal layout)',
  formFeedbackIcons: 'Custom icons per validation state',
  formFormProp: 'External useForm instance (for imperative control)',

  fieldName: 'Field name (path in form values)',
  fieldLabel: 'Field label',
  fieldRequired: 'Shorthand for `{ required: true }` rule',
  fieldRules: 'Validation rules array',
  fieldWarningRules: 'Rules that produce warnings (non-blocking)',
  fieldDependencies: 'Fields to watch for re-validation',
  fieldType: 'Built-in input type when no children are passed',
  fieldPlaceholder: 'Placeholder text',
  fieldDisabled: 'Disables this field (overrides form-level)',
  fieldHidden: 'Hides the field but keeps its value registered',
  fieldTooltip: 'Help tooltip next to label',
  fieldHelp: 'Help text below the control',
  fieldExtra: 'Extra supplementary content below',
  fieldValidateStatus: 'Manual validation state badge',
  fieldHasFeedback: 'Show status icon inside the control',
  fieldNormalize: 'Maps raw change values before committing',
  fieldValuePropName: 'Prop name holding the value on child control',
  fieldValidateFirst: 'Stop after the first failing rule',
  fieldPreserve: 'Keep value on unregister (overrides form)',
  fieldLabelCol: 'Overrides form labelCol for this field',
  fieldWrapperCol: 'Overrides form wrapperCol for this field',
  fieldChildren: 'Render prop for custom controls',

  formListName: 'Array field name in form values',
  formListInitialValue: 'Seed value if path is empty on mount',
  formListDraggable: 'Provide dragProps on each row for HTML5 DnD',
  formListChildren: '(fields, { add, remove, move, replace }, meta) => ReactNode',

  schemaFormSchema: 'JSON Schema object or a Zod schema (`_def` present) — converted to JSON Schema internally',
  schemaFormOnSubmit: 'Receives all values after a successful submit',
  schemaFormLayout: 'Passed through to the inner Form',
  schemaFormSize: 'Controls size for all generated fields',
  schemaFormDisabled: 'Disables every generated control + inner Form',
  schemaFormLabelCol: '24-column span for labels (horizontal layout)',
  schemaFormWrapperCol: '24-column span for controls (horizontal layout)',
  schemaFormForm: 'External `useForm()` instance (skip the internal one created from schema defaults)',
  schemaFormSubmitText: 'Label of the default submit button when `children` is omitted',
  schemaFormChildren: 'Custom submit button / footer (replaces the default `<button type="submit">`)',

  cssHint:
    'Form inherits most styling from its inner Input. Override these to retune errors, spacing, or typography just for this form.',

  cssSgColorError: 'Error text + border on invalid fields',
  cssSgColorErrorBg: 'Focus ring tint on invalid fields',
  cssSgColorText: 'Label + input text color',
  cssSgColorTextTertiary: 'Help / extra hint text',
  cssSgFontSize: 'Field text size',
  cssSgFontSizeSm: 'Help / error message size',
  cssSgMarginXs: 'Gap between label and control',
  cssSgMarginMd: 'Bottom spacing between fields',
  cssSgPaddingMd: 'Horizontal gap in horizontal layout',
  cssSgPaddingSm: 'Inline-layout gap between controls',
  cssSgLineHeight: 'Label / help line height',
  cssSgInputBorder: 'Overridden to --sg-color-error on invalid field (via Input tokens)',
} as const

/** Writable string map — use for props / table builders (same keys as `formDocEn`). */
export type FormDocStrings = { -readonly [K in keyof typeof formDocEn]: string }
