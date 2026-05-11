/**
 * English source of truth for SchemaFormEditor doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const schemaFormEditorDocEn = {
  pageTitle: 'SchemaFormEditor',
  pageBadge: 'Data Entry',
  crumbDataEntry: 'Data Entry',
  crumbSchemaFormEditor: 'SchemaFormEditor',
  pageLead:
    'Visual constructor over SchemaForm: drag fields from a palette onto a canvas, edit them in an inspector, and inspect the generated JSON Schema in real time.',
  pageWhen1: 'Build admin panels where end-users design their own forms.',
  pageWhen2: 'Prototype JSON-Schema payloads with a live preview.',
  pageWhen3: 'Pair with SchemaForm to turn the editor output into a runtime form.',

  demoBuilderTitle: 'Empty canvas',
  demoBuilderDesc: 'Drag any field from the palette onto the canvas to start building.',
  demoPrefilledTitle: 'Pre-filled schema',
  demoPrefilledDesc:
    'Editor seeded with five fields. Hit Reset to roll the schema back to the original payload.',

  tableEditorApi: 'SchemaFormEditor API',
  tableHookApi: 'useSchemaEditor() Options',

  propInitialSchema: 'Starting EditorSchema (uncontrolled)',
  propStore: 'External store from useSchemaEditor() (controlled)',
  propPaletteItems: 'Override palette catalogue',
  propOnChange: 'Fires after every successful mutation',
  propEmptyText: 'Empty-state CTA text',
  propHideSchemaView: 'Hide the bottom Preview / Schema toggle',

  propHookInitialSchema: 'Starting schema; defaults to empty',
  propHookCore: 'Bring your own Core instance',
  propHookOnChange: 'Fires after every successful mutation',
} as const

/** Writable string map — use for props / table builders (same keys as `schemaFormEditorDocEn`). */
export type SchemaFormEditorDocStrings = {
  -readonly [K in keyof typeof schemaFormEditorDocEn]: string
}
