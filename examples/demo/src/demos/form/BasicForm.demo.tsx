import { Form, Field, SubmitButton } from '@skygraph/react'

/**
 * Minimal form. `Field` auto-renders the right input for its `type`, wires
 * itself to the form store via `name`, and validates through `rules`.
 */
export function BasicForm() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ name: '', email: '' }}
      onSubmit={(values) => {
        console.log('submit', values)
      }}
      style={{ maxWidth: 420 }}
    >
      <Field
        name="name"
        label="Full name"
        rules={[{ required: true, message: 'Name is required' }]}
        placeholder="Ada Lovelace"
      />
      <Field
        name="email"
        label="Email"
        type="email"
        rules={[{ required: true }, { type: 'email' }]}
        placeholder="ada@example.com"
      />
      <SubmitButton>Create account</SubmitButton>
    </Form>
  )
}
