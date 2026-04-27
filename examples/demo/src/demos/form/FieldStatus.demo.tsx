import { Form, Field, SubmitButton } from '@skygraph/react'

/**
 * `validateStatus` paints the field with a custom state (`success` /
 * `warning` / `error` / `validating`) regardless of rules — useful when
 * status comes from an external source (API, server validation).
 *
 * `hasFeedback` renders a tiny status icon inside the control for quick
 * visual confirmation.
 */
export function FieldStatusForm() {
  return (
    <Form
      layout="vertical"
      defaultValues={{
        ok: 'ada@example.com',
        warn: 'Weak123',
        err: '',
        busy: '',
      }}
      onSubmit={() => {}}
      style={{ maxWidth: 460 }}
    >
      <Field
        name="ok"
        label="Success"
        hasFeedback
        validateStatus="success"
        help="Looks good!"
      />
      <Field
        name="warn"
        label="Warning"
        hasFeedback
        validateStatus="warning"
        help="Password is OK, but could be stronger"
      />
      <Field
        name="err"
        label="Error"
        hasFeedback
        validateStatus="error"
        help="Field is required"
      />
      <Field
        name="busy"
        label="Validating"
        hasFeedback
        validateStatus="validating"
        help="Checking with server…"
      />

      <SubmitButton>Continue</SubmitButton>
    </Form>
  )
}
