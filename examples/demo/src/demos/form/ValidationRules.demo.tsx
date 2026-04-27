import { Form, Field, SubmitButton } from '@skygraph/react'

/**
 * Every common rule shape: required, length, regex, builtin type, and a
 * custom validator. Each rule can carry its own `message`.
 */
export function ValidationRulesForm() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ username: '', age: null, url: '', password: '' }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 460 }}
    >
      <Field
        name="username"
        label="Username"
        rules={[
          { required: true },
          { min: 3, message: 'At least 3 characters' },
          { max: 16, message: 'Max 16 characters' },
          { pattern: /^[a-z0-9_]+$/, message: 'Only lowercase, digits, _' },
        ]}
        placeholder="e.g. ada_42"
      />
      <Field
        name="age"
        label="Age"
        type="number"
        rules={[
          { required: true },
          {
            validator: (v) => {
              const n = Number(v)
              if (Number.isNaN(n)) return 'Must be a number'
              if (n < 18) return 'Must be at least 18'
              if (n > 120) return 'Are you sure?'
              return null
            },
          },
        ]}
        placeholder="18+"
      />
      <Field
        name="url"
        label="Website"
        rules={[{ type: 'url', message: 'Must be a valid URL' }]}
        placeholder="https://example.com"
      />
      <Field
        name="password"
        label="Password"
        type="password"
        rules={[
          { required: true },
          { min: 8, message: 'Min 8 characters' },
          { pattern: /[A-Z]/, message: 'Needs an uppercase letter' },
          { pattern: /\d/, message: 'Needs a digit' },
        ]}
      />
      <SubmitButton>Validate</SubmitButton>
    </Form>
  )
}
