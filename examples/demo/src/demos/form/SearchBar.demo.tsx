import { useState } from 'react'
import { Form, Field, SubmitButton, Button, Select, DatePicker } from '@skygraph/react'
import { roleOptions, statusOptions } from './shared'
import './styles.css'

/**
 * Inline search bar pattern — wraps `<Form layout="inline">` in a styled
 * card. The form collects `{ q, role, status, createdAfter }` and reports
 * the last submitted snapshot below.
 */
export function SearchBarForm() {
  const [last, setLast] = useState<Record<string, unknown> | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Form
        layout="inline"
        className="demo-search-bar"
        defaultValues={{ q: '', role: '', status: 'all', createdAfter: null }}
        onSubmit={(values) => setLast(values as Record<string, unknown>)}
      >
        <Field name="q" placeholder="Search by name or email…" style={{ minWidth: 220 }} />
        <Field name="role">
          {(f) => (
            <Select
              value={f.value as string}
              onChange={(v) => f.onChange(v)}
              options={[{ label: 'Any role', value: '' }, ...roleOptions]}
              placeholder="Any role"
            />
          )}
        </Field>
        <Field name="status">
          {(f) => (
            <Select
              value={f.value as string}
              onChange={(v) => f.onChange(v)}
              options={statusOptions}
            />
          )}
        </Field>
        <Field name="createdAfter">
          {(f) => (
            <DatePicker
              value={(f.value as Date | undefined) ?? undefined}
              onChange={(d) => f.onChange(d)}
              placeholder="Created after"
            />
          )}
        </Field>
        <SubmitButton>Search</SubmitButton>
        <Button type="default">Reset</Button>
      </Form>

      {last && (
        <pre
          style={{
            margin: 0,
            padding: '10px 14px',
            background: 'var(--sg-color-bg-secondary)',
            borderRadius: 'var(--sg-border-radius)',
            border: '1px solid var(--sg-color-border-secondary)',
            fontSize: 12,
            color: 'var(--sg-color-text-secondary)',
          }}
        >
          {JSON.stringify(last, null, 2)}
        </pre>
      )}
    </div>
  )
}
