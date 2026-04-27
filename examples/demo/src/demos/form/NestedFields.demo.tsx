import { Form, Field, SubmitButton } from '@skygraph/react'
import './styles.css'

/**
 * Nested field paths work out of the box — use dotted names (`address.city`)
 * and the value is stored in the matching nested object on submit.
 */
export function NestedFieldsForm() {
  return (
    <Form
      layout="vertical"
      defaultValues={{
        profile: { firstName: '', lastName: '' },
        address: { city: '', zip: '' },
      }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 520 }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: 'var(--sg-color-text-tertiary)',
          marginBottom: 8,
        }}
      >
        profile.*
      </div>
      <div className="demo-form-grid-2">
        <Field name="profile.firstName" label="First name" rules={[{ required: true }]} />
        <Field name="profile.lastName" label="Last name" rules={[{ required: true }]} />
      </div>

      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: 'var(--sg-color-text-tertiary)',
          margin: '12px 0 8px',
        }}
      >
        address.*
      </div>
      <div className="demo-form-grid-2">
        <Field name="address.city" label="City" rules={[{ required: true }]} />
        <Field
          name="address.zip"
          label="ZIP"
          rules={[{ pattern: /^\d{3,6}$/, message: '3–6 digits' }]}
        />
      </div>

      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}
