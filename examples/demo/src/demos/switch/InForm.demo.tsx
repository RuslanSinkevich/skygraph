import { Form, Field, Switch, SubmitButton } from '@skygraph/react'

/**
 * Bind a Switch to a form field. Use `valuePropName="checked"` so the
 * form knows to read/write the boolean via `checked` rather than
 * `value`.
 */
export function InFormSwitch() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ notifications: true, marketing: false }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 380 }}
    >
      <Field name="notifications" label="Email notifications" valuePropName="checked">
        <Switch />
      </Field>
      <Field name="marketing" label="Marketing updates" valuePropName="checked">
        <Switch />
      </Field>
      <SubmitButton>Save</SubmitButton>
    </Form>
  )
}
