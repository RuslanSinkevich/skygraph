import { useState } from 'react'
import {
  Button,
  Input,
  Switch,
  Select,
  Segmented,
  Form,
  Field,
  notification,
} from '@skygraph/react'
import { useAppLocale } from '../_shared'

export function LayoutsTab() {
  const l = useAppLocale('forms').layouts
  const [layout, setLayout] = useState<'vertical' | 'horizontal' | 'inline'>('vertical')
  const [sizeMode, setSizeMode] = useState<'small' | 'middle' | 'large'>('middle')
  const [requiredMark, setRequiredMark] = useState<boolean | 'optional'>(true)

  return (
    <div className="forms-section">
      <div className="forms-toolbar">
        <div>
          <label className="forms-label">{l.layoutLabel}</label>
          <Segmented
            value={layout}
            onChange={(v) => setLayout(v as typeof layout)}
            options={['vertical', 'horizontal', 'inline']}
          />
        </div>
        <div>
          <label className="forms-label">{l.sizeLabel}</label>
          <Segmented
            value={sizeMode}
            onChange={(v) => setSizeMode(v as typeof sizeMode)}
            options={['small', 'middle', 'large']}
          />
        </div>
        <div>
          <label className="forms-label">{l.requiredMarkLabel}</label>
          <Segmented
            value={String(requiredMark)}
            onChange={(v) =>
              setRequiredMark(v === 'true' ? true : v === 'optional' ? 'optional' : false)
            }
            options={[
              { label: l.requiredOptions.show, value: 'true' },
              { label: l.requiredOptions.optional, value: 'optional' },
              { label: l.requiredOptions.hide, value: 'false' },
            ]}
          />
        </div>
      </div>

      <div
        style={{
          border: '1px solid var(--sg-color-border-secondary)',
          borderRadius: 8,
          padding: 24,
          marginTop: 16,
        }}
      >
        <Form
          layout={layout}
          size={sizeMode}
          requiredMark={requiredMark}
          labelCol={layout === 'horizontal' ? { span: 6 } : undefined}
          wrapperCol={layout === 'horizontal' ? { span: 18 } : undefined}
          onFinish={(values) => notification.success(l.submittedToast, JSON.stringify(values))}
        >
          <Field name="firstName" label={l.fields.firstName} required>
            {(f) => (
              <Input
                value={(f.value as string) ?? ''}
                onChange={f.onChange}
                onBlur={f.onBlur}
                placeholder={l.placeholders.first}
              />
            )}
          </Field>
          <Field name="lastName" label={l.fields.lastName} required>
            {(f) => (
              <Input
                value={(f.value as string) ?? ''}
                onChange={f.onChange}
                onBlur={f.onBlur}
                placeholder={l.placeholders.last}
              />
            )}
          </Field>
          <Field name="dept" label={l.fields.department}>
            {(f) => (
              <Select
                value={f.value as string}
                onChange={f.onChange}
                options={[
                  { label: l.deptOptions.eng, value: 'eng' },
                  { label: l.deptOptions.design, value: 'design' },
                  { label: l.deptOptions.marketing, value: 'marketing' },
                ]}
                placeholder={l.placeholders.select}
              />
            )}
          </Field>
          <Field name="active" label={l.fields.active}>
            {(f) => <Switch checked={f.value as boolean} onChange={f.onChange} />}
          </Field>
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginTop: 8,
              marginLeft: layout === 'horizontal' ? '25%' : 0,
            }}
          >
            <Button type="primary" htmlType="submit">
              {l.save}
            </Button>
            <Button htmlType="reset">{l.reset}</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
