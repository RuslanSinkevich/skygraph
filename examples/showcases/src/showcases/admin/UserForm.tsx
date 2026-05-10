import { Form, Field, Input, Select, Switch, Button } from '@skygraph/react'
import type { SystemUser } from './data'
import { roles } from './data'
import { useAppLocale } from '../_shared'

export interface UserFormProps {
  initialValues?: Partial<SystemUser>
  onSubmit: (values: Partial<SystemUser>) => void
  onCancel?: () => void
  submitLabel?: string
  showStatus?: boolean
}

const departments = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Support',
  'Finance',
  'HR',
]

export function UserForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  showStatus = false,
}: UserFormProps) {
  const f = useAppLocale('admin').userForm
  return (
    <Form initialValues={initialValues} onFinish={(v) => onSubmit(v as Partial<SystemUser>)}>
      <Field name="name" label={f.fullName} rules={[{ required: true }]}>
        <Input placeholder={f.fullNamePh} />
      </Field>
      <Field name="email" label={f.email} rules={[{ required: true, type: 'email' }]}>
        <Input placeholder={f.emailPh} />
      </Field>
      <Field name="department" label={f.department} rules={[{ required: true }]}>
        <Select options={departments.map((d) => ({ label: d, value: d }))} placeholder={f.deptPh} />
      </Field>
      <Field name="role" label={f.role} rules={[{ required: true }]}>
        <Select
          options={roles.map((r) => ({ label: r.name, value: r.key }))}
          placeholder={f.rolePh}
        />
      </Field>
      {showStatus && (
        <Field name="status" label={f.status}>
          <Select
            options={[
              { label: f.statusOptions.active, value: 'active' },
              { label: f.statusOptions.suspended, value: 'suspended' },
              { label: f.statusOptions.pending, value: 'pending' },
              { label: f.statusOptions.deactivated, value: 'deactivated' },
            ]}
          />
        </Field>
      )}
      <Field name="twoFactor" label={f.twoFa}>
        <Switch />
      </Field>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        {onCancel && <Button onClick={onCancel}>{f.cancel}</Button>}
        <Button type="primary" htmlType="submit">
          {submitLabel ?? ''}
        </Button>
      </div>
    </Form>
  )
}
