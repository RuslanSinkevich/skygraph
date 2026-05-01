import {
  Form, Field, Input, Select, InputNumber, Button,
} from '@skygraph/react'
import type { Contact, ContactStatus } from './data'

export interface ContactFormProps {
  initialValues?: Partial<Contact>
  onSubmit: (values: Partial<Contact>) => void
  onCancel?: () => void
  submitLabel?: string
}

const statusOptions: Array<{ label: string; value: ContactStatus }> = [
  { label: 'Lead', value: 'lead' },
  { label: 'Prospect', value: 'prospect' },
  { label: 'Customer', value: 'customer' },
  { label: 'Churned', value: 'churned' },
]

/**
 * Single Contact form. Used by Modal create AND edit — replaces the
 * previous duplicate `+New Contact` tab + edit modal pair.
 */
export function ContactForm({ initialValues, onSubmit, onCancel, submitLabel = 'Save' }: ContactFormProps) {
  return (
    <Form initialValues={initialValues} onFinish={(v) => onSubmit(v as Partial<Contact>)}>
      <Field name="name" label="Full Name" rules={[{ required: true }]}>
        <Input placeholder="John Doe" />
      </Field>
      <Field name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="john@example.com" />
      </Field>
      <Field name="company" label="Company">
        <Input placeholder="Acme Inc" />
      </Field>
      <Field name="phone" label="Phone">
        <Input placeholder="+1 (555) 000-0000" />
      </Field>
      <Field name="status" label="Status" rules={[{ required: true }]}>
        <Select options={statusOptions} placeholder="Select status" />
      </Field>
      <Field name="revenue" label="Revenue ($)">
        <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
      </Field>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        <Button type="primary" htmlType="submit">{submitLabel}</Button>
      </div>
    </Form>
  )
}
