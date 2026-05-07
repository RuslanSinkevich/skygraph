import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { BuilderDemo } from './schema-form-editor/Builder.demo'
import BuilderSource from './schema-form-editor/Builder.demo?raw'
import { PrefilledDemo } from './schema-form-editor/Prefilled.demo'
import PrefilledSource from './schema-form-editor/Prefilled.demo?raw'

const editorProps: PropDef[] = [
  { name: 'initialSchema', description: 'Starting EditorSchema (uncontrolled)', type: 'EditorSchema' },
  { name: 'store', description: 'External store from useSchemaEditor() (controlled)', type: 'SchemaEditorStore' },
  { name: 'paletteItems', description: 'Override palette catalogue', type: 'PaletteItem[]' },
  { name: 'onChange', description: 'Fires after every successful mutation', type: '(schema: EditorSchema) => void' },
  { name: 'emptyText', description: 'Empty-state CTA text', type: 'string', default: "'Drop a field here'" },
  { name: 'hideSchemaView', description: 'Hide the bottom Preview / Schema toggle', type: 'boolean', default: 'false' },
]

const useSchemaEditorProps: PropDef[] = [
  { name: 'initialSchema', description: 'Starting schema; defaults to empty', type: 'EditorSchema' },
  { name: 'core', description: 'Bring your own Core instance', type: 'Core' },
  { name: 'onChange', description: 'Fires after every successful mutation', type: '(schema: EditorSchema) => void' },
]

export function SchemaFormEditorDemo() {
  return (
    <ComponentDoc
      title="SchemaFormEditor"
      description="Visual constructor over SchemaForm: drag fields from a palette onto a canvas, edit them in an inspector, and inspect the generated JSON Schema in real time."
      whenToUse={[
        'Build admin panels where end-users design their own forms.',
        'Prototype JSON-Schema payloads with a live preview.',
        'Pair with SchemaForm to turn the editor output into a runtime form.',
      ]}
    >
      <DemoBox
        title="Empty canvas"
        description="Drag any field from the palette onto the canvas to start building."
        code={BuilderSource}
      >
        <BuilderDemo />
      </DemoBox>

      <DemoBox
        title="Pre-filled schema"
        description="Editor seeded with five fields. Hit Reset to roll the schema back to the original payload."
        code={PrefilledSource}
      >
        <PrefilledDemo />
      </DemoBox>

      <PropsTable title="SchemaFormEditor API" data={editorProps} />
      <PropsTable title="useSchemaEditor() Options" data={useSchemaEditorProps} />
    </ComponentDoc>
  )
}
