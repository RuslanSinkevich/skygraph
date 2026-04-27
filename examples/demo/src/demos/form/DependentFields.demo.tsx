import { Form, Field, SubmitButton } from '@skygraph/react'

/**
 * `dependencies` tells a field to re-validate whenever the listed fields
 * change. The validator receives `getFieldValue` so it can compare against
 * another field's current value — the classic "confirm password" pattern.
 */
export function DependentFieldsForm() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ password: '', confirm: '' }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 420 }}
    >
      <Field
        name="password"
        label="Password"
        type="password"
        rules={[
          { required: true },
          { min: 6, message: 'At least 6 characters' },
        ]}
      />
      <Field
        name="confirm"
        label="Confirm password"
        type="password"
        dependencies={['password']}
        rules={[
          { required: true },
          {
            validator: (value, getFieldValue) =>
              value && value !== getFieldValue('password')
                ? 'Passwords do not match'
                : null,
          },
        ]}
      />
      <SubmitButton>Create account</SubmitButton>
    </Form>
  )
}
