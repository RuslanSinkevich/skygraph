import {
  Form, Field, Input, Select, Switch, Button,
} from '@skygraph/react'
import type { SystemUser } from './data'
import { roles } from './data'

export interface UserFormProps {
  initialValues?: Partial<SystemUser>
  onSubmit: (values: Partial<SystemUser>) => void
  onCancel?: () => void
  submitLabel?: string
  showStatus?: boolean
}

const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Support', 'Finance', 'HR']

export function UserForm({ initialValues, onSubmit, onCancel, submitLabel = 'Save', showStatus = false }: UserFormProps) {
  return (
    <Form initialValues={initialValues} onFinish={(v) => onSubmit(v as Partial<SystemUser>)}>
      <Field name="name" label="Full Name" rules={[{ required: true }]}>
        <Input placeholder="John Doe" />
      </Field>
      <Field name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="john@company.io" />
      </Field>
      <Field name="department" label="Department" rules={[{ required: true }]}>
        <Select options={departments.map(d => ({ label: d, value: d }))} placeholder="Select department" />
      </Field>
      <Field name="role" label="Role" rules={[{ required: true }]}>
        <Select options={roles.map(r => ({ label: r.name, value: r.key }))} placeholder="Select role" />
      </Field>
      {showStatus && (
        <Field name="status" label="Status">
          <Select
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Suspended', value: 'suspended' },
              { label: 'Pending', value: 'pending' },
              { label: 'Deactivated', value: 'deactivated' },
            ]}
          />
        </Field>
      )}
      <Field name="twoFactor" label="Require 2FA">
        <Switch />
      </Field>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        <Button type="primary" htmlType="submit">{submitLabel}</Button>
      </div>
    </Form>
  )
}
