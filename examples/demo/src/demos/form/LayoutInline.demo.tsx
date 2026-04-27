import { Form, Field, SubmitButton, Select } from '@skygraph/react'
import { statusOptions } from './shared'

/**
 * Inline layout — every field and the submit button live in a single row.
 * Ideal for search / filter bars at the top of a list view.
 */
export function LayoutInlineForm() {
  return (
    <Form
      layout="inline"
      defaultValues={{ q: '', status: 'all' }}
      onSubmit={(v) => console.log('search', v)}
    >
      <Field name="q" placeholder="Search orders…" />
      <Field name="status">
        {(f) => (
          <Select
            value={f.value as string}
            onChange={(v) => f.onChange(v)}
            options={statusOptions}
          />
        )}
      </Field>
      <SubmitButton>Search</SubmitButton>
    </Form>
  )
}
