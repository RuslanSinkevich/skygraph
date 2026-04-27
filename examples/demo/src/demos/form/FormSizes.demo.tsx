import { Form, Field, SubmitButton } from '@skygraph/react'

/**
 * `size` propagates to every field and control rendered inside the form.
 * Use `small` for dense admin UIs, `large` for landing pages / onboarding.
 */
export function FormSizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['small', 'middle', 'large'] as const).map((size) => (
        <Form
          key={size}
          size={size}
          layout="vertical"
          defaultValues={{ value: '' }}
          onSubmit={() => {}}
        >
          <div style={{ fontSize: 12, color: 'var(--sg-color-text-tertiary)', marginBottom: 6 }}>
            size = {size}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Field
              name="value"
              rules={[{ required: true }]}
              placeholder={`${size} input`}
              style={{ flex: 1, marginBottom: 0 }}
            />
            <SubmitButton>Submit</SubmitButton>
          </div>
        </Form>
      ))}
    </div>
  )
}
