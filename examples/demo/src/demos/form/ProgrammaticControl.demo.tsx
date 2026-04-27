import { useState } from 'react'
import { Form, Field, SubmitButton, Button, useForm } from '@skygraph/react'

/**
 * Drive a form imperatively. `useForm()` returns an instance that exposes
 * `reset`, `setFieldsValue`, `validateFields`, `getFieldsValue`, and `submit`.
 * Pass it via the `form` prop to share state with code outside `<Form>`.
 */
export function ProgrammaticControlForm() {
  const form = useForm({ defaultValues: { name: '', email: '' } })
  const [snapshot, setSnapshot] = useState<string>('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button type="default" onClick={() => form.reset()}>Reset</Button>
        <Button
          type="default"
          onClick={() =>
            form.setFieldsValue({ name: 'Ada Lovelace', email: 'ada@example.com' })
          }
        >
          Fill sample
        </Button>
        <Button
          type="default"
          onClick={async () => {
            const res = await form.validateFields()
            setSnapshot(
              res.valid
                ? 'OK: ' + JSON.stringify(form.getFieldsValue())
                : 'Errors: ' + Object.keys(res.errors).join(', '),
            )
          }}
        >
          Validate
        </Button>
        <Button type="primary" onClick={() => form.submit()}>
          Trigger submit
        </Button>
      </div>

      <Form
        form={form}
        layout="vertical"
        onSubmit={(values) => setSnapshot('Submitted: ' + JSON.stringify(values))}
        style={{ maxWidth: 460 }}
      >
        <Field name="name" label="Name" rules={[{ required: true }]} />
        <Field name="email" label="Email" type="email" rules={[{ required: true }, { type: 'email' }]} />
        <SubmitButton>Save</SubmitButton>
      </Form>

      {snapshot && (
        <pre
          style={{
            margin: 0,
            padding: '10px 14px',
            background: 'var(--sg-color-bg-secondary)',
            borderRadius: 'var(--sg-border-radius)',
            border: '1px solid var(--sg-color-border-secondary)',
            fontSize: 12,
            color: 'var(--sg-color-text-secondary)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {snapshot}
        </pre>
      )}
    </div>
  )
}
