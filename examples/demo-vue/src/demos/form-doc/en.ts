/**
 * English doc strings for the Form component page (`FormDemo.vue`).
 * `ru.ts` must mirror these keys.
 */
export const formDocEn = {
  pageTitle: 'Form',
  pageBadge: 'Data Entry',
  crumbData: 'Data Entry',
  crumbForm: 'Form',
  pageLead:
    'Schema-less form engine: dotted field names, rule-based validation, layout/size context, distributed composition. Works the same in plain forms and in dynamic field arrays.',
  pageWhen1:
    'You collect data from a user and need validation, layout, focus management out of the box.',
  pageWhen2: 'You want one form context that flows through arbitrarily nested components.',

  demoBasicTitle: 'Basic',
  demoBasicDesc:
    'Multi-field form with submit handler. Default-slot exposes value/onChange/onBlur per field.',
  demoValidationTitle: 'Validation rules',
  demoValidationDesc: 'Required, length, regex and custom validators with per-rule messages.',
  demoLayoutVTitle: 'Layout — vertical',
  demoLayoutVDesc: 'Default layout: labels above controls.',
  demoLayoutHTitle: 'Layout — horizontal',
  demoLayoutHDesc: '24-column grid via labelCol / wrapperCol.',
  demoLayoutITitle: 'Layout — inline',
  demoLayoutIDesc: 'Filter / search bars where every field sits on a single row.',
  demoRequiredMarkTitle: 'Required mark',
  demoRequiredMarkDesc: 'Asterisk (default), no marker, or "(optional)" inverted convention.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'small / middle / large propagated to every control via context.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Form-level disabled flag turns off every control at once.',
  demoNestedTitle: 'Nested fields',
  demoNestedDesc: 'Dotted names auto-store into nested objects on the form value tree.',
  demoControlsTitle: 'Control gallery',
  demoControlsDesc:
    'Select, RadioGroup, Switch, Checkbox, InputNumber, Slider — all wired through the same default-slot pattern.',
  demoCompositionTitle: 'Distributed composition',
  demoCompositionDesc:
    'Three nested components share one form context — no prop-drilling of values.',

  demoAsyncTitle: 'Async validation',
  demoAsyncDesc:
    'Validators may return a Promise; the field shows the loading state while pending.',
  demoDependentTitle: 'Dependent fields',
  demoDependentDesc:
    '`dependencies` re-validates a field when listed siblings change — classic confirm-password.',
  demoFieldStatusTitle: 'Custom field status',
  demoFieldStatusDesc:
    '`validateStatus` paints success / warning / error / validating from external sources.',
  demoLiveWatchTitle: 'Live watch',
  demoLiveWatchDesc:
    '`useWatch(core, path)` subscribes only to one field — zero re-renders for siblings.',
  demoLoginCardTitle: 'Login card',
  demoLoginCardDesc: 'Real-world styling: centred card wrapper, semantic form untouched.',
  demoSearchBarTitle: 'Search bar',
  demoSearchBarDesc: 'Inline layout filter row with mixed text / select / date controls.',
  demoSchemaBasicTitle: 'SchemaForm — basic',
  demoSchemaBasicDesc: '`<SgSchemaForm>` derives fields, defaults and rules from a JSON Schema.',
  demoSchemaLayoutTitle: 'SchemaForm — layout',
  demoSchemaLayoutDesc: 'Horizontal + small, and inline + disabled, sharing the same schema.',
  demoFormListTitle: 'FormList — dynamic',
  demoFormListDesc:
    '`<SgFormList>` registers an array path and exposes `add` / `remove` / `move` operations; each child field addresses its slot via dotted paths.',
  demoProgrammaticTitle: 'Programmatic control',
  demoProgrammaticDesc:
    'Drive a form imperatively via `useForm()` — call `reset`, `setFieldsValue`, `validateFields`, `submit` from outside `<SgForm>`.',
  demoProfileSettingsTitle: 'Profile settings',
  demoProfileSettingsDesc:
    'Multi-section form with two-column grid, switches, date picker and upload — all wired through the same form context.',

  tableFormApi: 'Form API',
  tableFieldApi: 'Field API',

  propLayout: 'Label/control layout',
  propSize: 'Default size for nested controls',
  propDisabled: 'Disable every nested control at once',
  propRequiredMark: 'How required fields are marked',
  propLabelCol: 'Label column grid (horizontal layout)',
  propWrapperCol: 'Wrapper column grid (horizontal layout)',
  propLabelAlign: 'Label text alignment in horizontal layout',
  propValidateOn: 'When validation triggers fire',
  propScroll: 'Scroll the first invalid field into view after submit',
  propPreserve: 'Keep unmounted field values in the store',
  propDefaultValues: 'Initial values applied on mount',
  propColon: 'Append ":" to labels',
  emitFinish: 'Native submit succeeded — payload is the values map',
  emitFinishFailed: 'Native submit failed — payload is the errors map',
  emitValuesChange: 'Any field value changed',

  propFieldName: 'Path of the field in the form store (required, dotted)',
  propFieldLabel: 'Label text rendered above / beside the control',
  propFieldRequired: 'Convenience flag — adds a required rule',
  propFieldRules: 'Validation rules applied in order',
  propFieldHelp: 'Helper text rendered below the control',
  propFieldExtra: 'Auxiliary text rendered below the helper',
  propFieldHidden: 'Hide field but keep value in the store',
  propFieldNoStyle: 'Render only the slot content — no label, message, wrapper',
  propFieldNormalize: 'Maps raw value before committing',
  propFieldValidateFirst: 'Stop at the first failing rule',
  propFieldTooltip: 'Tooltip on the label',
} as const

export type FormDocStrings = { -readonly [K in keyof typeof formDocEn]: string }
