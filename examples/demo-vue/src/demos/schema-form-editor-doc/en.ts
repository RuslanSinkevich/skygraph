/**
 * English source of truth for SchemaFormEditor doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/SchemaFormEditorDemo.tsx`. SchemaFormEditor
 * has no `<CssVarsTable>` in React → also none in Vue (parity «снизу вверх»;
 * see `findings/T-Vue-Demo-Foundation.md` → `charts-no-css-vars-react`).
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
  tableUseSchemaEditorApi: 'useSchemaEditor() Options',

  propInitialSchema: 'Starting EditorSchema (uncontrolled)',
  propStore: 'External store from useSchemaEditor() (controlled)',
  propPaletteItems: 'Override palette catalogue',
  propEmitChange: 'Fires after every successful mutation',
  propEmptyText: 'Empty-state CTA text',
  propHideSchemaView: 'Hide the bottom Preview / Schema toggle',

  optInitialSchema: 'Starting schema; defaults to empty',
  optCore: 'Bring your own Core instance',
  optOnChange: 'Fires after every successful mutation',
} as const

/** Writable string map — used by props/table builders. */
export type SchemaFormEditorDocStrings = {
  -readonly [K in keyof typeof schemaFormEditorDocEn]: string
}
