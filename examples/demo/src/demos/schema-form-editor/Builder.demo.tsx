import { useState } from 'react'
import { SchemaFormEditor } from '@skygraph/react'
import type { EditorSchema } from '@skygraph/react'

/**
 * Empty-canvas builder. Drag fields from the palette on the left onto the
 * canvas, edit them in the inspector on the right, and inspect the generated
 * JSON Schema in the bottom "Schema" tab.
 */
export function BuilderDemo() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        Mutations so far: {count}
      </span>
      <SchemaFormEditor
        emptyText="Drop a field here"
        onChange={(_schema: EditorSchema) => setCount((c) => c + 1)}
        style={{ height: 600 }}
      />
    </div>
  )
}
