import { Form, Field, RadioGroup, SubmitButton } from '@skygraph/react'

/**
 * Use `<Field>` to bind a `RadioGroup` to a named path. Required
 * validation makes the group an explicit choice (no silent default).
 */
export function InFormRadio() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ plan: '' }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 420 }}
    >
      <Field
        name="plan"
        label="Choose a plan"
        rules={[{ required: true, message: 'Pick a plan to continue' }]}
      >
        <RadioGroup
          direction="vertical"
          options={[
            { label: 'Hobby — free, 1 user', value: 'hobby' },
            { label: 'Pro — $12/mo per user', value: 'pro' },
            { label: 'Team — $30/mo per user', value: 'team' },
            { label: 'Enterprise — contact us', value: 'enterprise' },
          ]}
        />
      </Field>
      <SubmitButton>Continue</SubmitButton>
    </Form>
  )
}
