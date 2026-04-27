import { Form, Field, Input, Textarea, SubmitButton } from '@skygraph/react'

/**
 * Input and Textarea both register as value-bearing controls inside
 * `<Field>`. Validation status flows to `aria-invalid` automatically.
 */
export function InFormInput() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ name: '', email: '', bio: '' }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 420 }}
    >
      <Field name="name" label="Name" rules={[{ required: true, message: 'Required' }]}>
        <Input placeholder="Jane Doe" />
      </Field>
      <Field
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Required' },
          {
            validator: (v) =>
              typeof v === 'string' && v.includes('@') ? null : 'Looks off',
          },
        ]}
      >
        <Input type="email" placeholder="name@example.com" />
      </Field>
      <Field name="bio" label="Short bio" rules={[{ max: 200, message: 'Keep it under 200 chars' }]}>
        <Textarea rows={3} maxLength={200} showCount placeholder="A line or two about you" />
      </Field>
      <SubmitButton>Save</SubmitButton>
    </Form>
  )
}
