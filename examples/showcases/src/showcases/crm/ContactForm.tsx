import { Form, Field, Input, Select, InputNumber, Button } from '@skygraph/react'
import type { Contact, ContactStatus } from './data'
import { useAppLocale } from '../_shared'

export interface ContactFormProps {
  initialValues?: Partial<Contact>
  onSubmit: (values: Partial<Contact>) => void
  onCancel?: () => void
  submitLabel?: string
}

/**
 * Single Contact form. Used by Modal create AND edit — replaces the
 * previous duplicate `+New Contact` tab + edit modal pair.
 */
export function ContactForm({ initialValues, onSubmit, onCancel, submitLabel }: ContactFormProps) {
  const f = useAppLocale('crm').contactForm
  const statusOptions: Array<{ label: string; value: ContactStatus }> = [
    { label: f.statusOptions.lead, value: 'lead' },
    { label: f.statusOptions.prospect, value: 'prospect' },
    { label: f.statusOptions.customer, value: 'customer' },
    { label: f.statusOptions.churned, value: 'churned' },
  ]
  return (
    <Form initialValues={initialValues} onFinish={(v) => onSubmit(v as Partial<Contact>)}>
      <Field name="name" label={f.fullName} rules={[{ required: true }]}>
        <Input placeholder={f.fullNamePh} />
      </Field>
      <Field name="email" label={f.email} rules={[{ required: true, type: 'email' }]}>
        <Input placeholder={f.emailPh} />
      </Field>
      <Field name="company" label={f.company}>
        <Input placeholder={f.companyPh} />
      </Field>
      <Field name="phone" label={f.phone}>
        <Input placeholder={f.phonePh} />
      </Field>
      <Field name="status" label={f.status} rules={[{ required: true }]}>
        <Select options={statusOptions} placeholder={f.statusPh} />
      </Field>
      <Field name="revenue" label={f.revenue}>
        <InputNumber min={0} style={{ width: '100%' }} placeholder={f.revenuePh} />
      </Field>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        {onCancel && <Button onClick={onCancel}>{f.cancel}</Button>}
        <Button type="primary" htmlType="submit">
          {submitLabel ?? f.submitDefault}
        </Button>
      </div>
    </Form>
  )
}
