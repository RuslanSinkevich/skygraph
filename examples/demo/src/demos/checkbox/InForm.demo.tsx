import { Form, Field, Checkbox, SubmitButton } from '@skygraph/react'

/**
 * Inside `<Form>`, use `<Field>` to wire the checkbox to a named path.
 * Validation works via the standard rules prop — here we require the
 * terms checkbox to be `true`.
 */
export function InFormCheckbox() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ news: true, beta: false, terms: false }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 420 }}
    >
      <Field name="news" valuePropName="checked">
        <Checkbox>Subscribe to monthly release notes</Checkbox>
      </Field>
      <Field name="beta" valuePropName="checked">
        <Checkbox>Enable experimental (beta) components</Checkbox>
      </Field>
      <Field
        name="terms"
        valuePropName="checked"
        rules={[{
          validator: (v: unknown) => (v === true ? null : 'You must accept to continue'),
        }]}
      >
        <Checkbox>I accept the Terms of Service</Checkbox>
      </Field>
      <div style={{ marginTop: 8 }}>
        <SubmitButton>Save preferences</SubmitButton>
      </div>
    </Form>
  )
}
