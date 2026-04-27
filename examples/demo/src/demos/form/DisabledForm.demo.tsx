import { useState } from 'react'
import { Form, Field, SubmitButton, Button, Switch } from '@skygraph/react'

/**
 * `disabled` at form-level turns off every child control in one go. Use it
 * while submitting or when the user lacks permission. Individual fields
 * can still opt back in via their own `disabled={false}` if needed.
 */
export function DisabledForm() {
  const [disabled, setDisabled] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Switch checked={disabled} onChange={setDisabled} />
        <span style={{ fontSize: 13 }}>Form disabled</span>
      </div>

      <Form
        layout="vertical"
        disabled={disabled}
        defaultValues={{ name: '', notes: '', token: 'sk_readonly_42' }}
        onSubmit={() => {}}
        style={{ maxWidth: 460 }}
      >
        <Field name="name" label="Name" rules={[{ required: true }]} />
        <Field name="notes" label="Notes" type="textarea" />
        <Field name="token" label="API token (always disabled)" disabled />

        <div style={{ display: 'flex', gap: 8 }}>
          <SubmitButton>Save</SubmitButton>
          <Button type="default" onClick={() => setDisabled((d) => !d)}>
            Toggle disabled
          </Button>
        </div>
      </Form>
    </div>
  )
}
