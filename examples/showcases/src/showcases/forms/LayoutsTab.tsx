import { useState } from 'react'
import {
  Button, Input, Switch, Select, Segmented, Form, Field, notification,
} from '@skygraph/react'

export function LayoutsTab() {
  const [layout, setLayout] = useState<'vertical' | 'horizontal' | 'inline'>('vertical')
  const [sizeMode, setSizeMode] = useState<'small' | 'middle' | 'large'>('middle')
  const [requiredMark, setRequiredMark] = useState<boolean | 'optional'>(true)

  return (
    <div className="forms-section">
      <div className="forms-toolbar">
        <div>
          <label className="forms-label">Layout</label>
          <Segmented
            value={layout}
            onChange={(v) => setLayout(v as typeof layout)}
            options={['vertical', 'horizontal', 'inline']}
          />
        </div>
        <div>
          <label className="forms-label">Size</label>
          <Segmented
            value={sizeMode}
            onChange={(v) => setSizeMode(v as typeof sizeMode)}
            options={['small', 'middle', 'large']}
          />
        </div>
        <div>
          <label className="forms-label">Required Mark</label>
          <Segmented
            value={String(requiredMark)}
            onChange={(v) => setRequiredMark(v === 'true' ? true : v === 'optional' ? 'optional' : false)}
            options={[
              { label: 'Show', value: 'true' },
              { label: 'Optional', value: 'optional' },
              { label: 'Hide', value: 'false' },
            ]}
          />
        </div>
      </div>

      <div style={{
        border: '1px solid var(--sg-color-border-secondary)',
        borderRadius: 8,
        padding: 24,
        marginTop: 16,
      }}>
        <Form
          layout={layout}
          size={sizeMode}
          requiredMark={requiredMark}
          labelCol={layout === 'horizontal' ? { span: 6 } : undefined}
          wrapperCol={layout === 'horizontal' ? { span: 18 } : undefined}
          onFinish={(values) => notification.success('Submitted', JSON.stringify(values))}
        >
          <Field name="firstName" label="First Name" required>
            {(f) => <Input value={f.value as string ?? ''} onChange={f.onChange} onBlur={f.onBlur} placeholder="John" />}
          </Field>
          <Field name="lastName" label="Last Name" required>
            {(f) => <Input value={f.value as string ?? ''} onChange={f.onChange} onBlur={f.onBlur} placeholder="Doe" />}
          </Field>
          <Field name="dept" label="Department">
            {(f) => (
              <Select
                value={f.value as string}
                onChange={f.onChange}
                options={[
                  { label: 'Engineering', value: 'eng' },
                  { label: 'Design', value: 'design' },
                  { label: 'Marketing', value: 'marketing' },
                ]}
                placeholder="Select..."
              />
            )}
          </Field>
          <Field name="active" label="Active">
            {(f) => <Switch checked={f.value as boolean} onChange={f.onChange} />}
          </Field>
          <div style={{
            display: 'flex',
            gap: 8,
            marginTop: 8,
            marginLeft: layout === 'horizontal' ? '25%' : 0,
          }}>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button htmlType="reset">Reset</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
