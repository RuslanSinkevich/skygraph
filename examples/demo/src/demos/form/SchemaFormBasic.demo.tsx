import { useState } from 'react'
import { SchemaForm } from '@skygraph/react'

const profileSchema = {
  properties: {
    name: { type: 'string', title: 'Full name', minLength: 2, maxLength: 60 },
    email: { type: 'string', format: 'email', title: 'Email' },
    age: { type: 'number', title: 'Age', minimum: 0, maximum: 120 },
    role: {
      type: 'string',
      title: 'Role',
      enum: ['admin', 'user', 'editor'],
      enumNames: ['Administrator', 'User', 'Editor'],
    },
    bio: { type: 'string', title: 'Bio', maxLength: 500 },
    active: { type: 'boolean', title: 'Active' },
  },
  required: ['name', 'email'],
}

export function SchemaFormBasic() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <SchemaForm
        schema={profileSchema}
        submitText="Save profile"
        onSubmit={(values) => {
          setSubmitted(JSON.stringify(values, null, 2))
        }}
      />
      {submitted && (
        <pre
          style={{
            margin: 0,
            padding: 12,
            background: 'var(--sg-color-bg-secondary)',
            borderRadius: 'var(--sg-border-radius)',
            fontSize: 12,
            overflow: 'auto',
          }}
        >
          {submitted}
        </pre>
      )}
    </div>
  )
}
