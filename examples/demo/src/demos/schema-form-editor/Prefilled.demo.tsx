import { useMemo, useState } from 'react'
import { SchemaFormEditor, useSchemaEditor } from '@skygraph/react'
import type { EditorSchema } from '@skygraph/react'

/**
 * Pre-filled editor with five fields. The "Reset" button rolls the schema
 * back to the original payload via the imperative `setSchema` action on the
 * external store.
 */
export function PrefilledDemo() {
  const initialSchema = useMemo<EditorSchema>(
    () => ({
      title: 'Sign-up form',
      fields: [
        { id: 'sf1', name: 'fullName', label: 'Full name', type: 'string', required: true, min: 2 },
        { id: 'sf2', name: 'email', label: 'Email', type: 'email', required: true },
        { id: 'sf3', name: 'age', label: 'Age', type: 'number', min: 13, max: 120 },
        { id: 'sf4', name: 'role', label: 'Role', type: 'select', options: [
          { value: 'admin', label: 'Administrator' },
          { value: 'editor', label: 'Editor' },
          { value: 'viewer', label: 'Viewer' },
        ] },
        { id: 'sf5', name: 'newsletter', label: 'Subscribe to newsletter', type: 'boolean' },
      ],
    }),
    [],
  )

  const store = useSchemaEditor({ initialSchema })
  const [resetCount, setResetCount] = useState(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <button
          type="button"
          className="sg-button"
          onClick={() => {
            store.setSchema(initialSchema)
            setResetCount((c) => c + 1)
          }}
        >
          Reset {resetCount > 0 ? `(×${resetCount})` : ''}
        </button>
      </div>
      <SchemaFormEditor store={store} style={{ height: 600 }} />
    </div>
  )
}
