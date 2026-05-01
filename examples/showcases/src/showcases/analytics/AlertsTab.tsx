import { useState } from 'react'
import {
  Tag, Button, Modal, Form, Field, Input, InputNumber, Select, Switch, notification,
} from '@skygraph/react'
import { Toolbar } from '../_shared'

interface Alert {
  id: number
  name: string
  metric: string
  condition: string
  threshold: number
  enabled: boolean
  channel: string
}

const initialAlerts: Alert[] = [
  { id: 1, name: 'Revenue Drop Alert', metric: 'revenue', condition: 'below', threshold: 2000, enabled: true, channel: 'email' },
  { id: 2, name: 'Low Conversion', metric: 'conversion', condition: 'below', threshold: 2.0, enabled: true, channel: 'slack' },
  { id: 3, name: 'High Return Rate', metric: 'returnRate', condition: 'above', threshold: 5.0, enabled: false, channel: 'email' },
  { id: 4, name: 'Traffic Spike', metric: 'visitors', condition: 'above', threshold: 2000, enabled: true, channel: 'slack' },
]

export function AlertsTab() {
  const [createOpen, setCreateOpen] = useState(false)
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)

  const toggle = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a))
  }

  return (
    <>
      <Toolbar
        actions={<Button type="primary" onClick={() => setCreateOpen(true)}>+ Create Alert</Button>}
      />
      <div className="sc-card-grid">
        {alerts.map(a => (
          <div key={a.id} className="sc-card" style={{ opacity: a.enabled ? 1 : 0.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>{a.name}</span>
              <Tag color={a.enabled ? 'success' : 'default'}>{a.enabled ? 'Active' : 'Disabled'}</Tag>
            </div>
            <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
              When <code>{a.metric}</code> is {a.condition} <strong>{a.threshold}</strong>
            </div>
            <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
              Notify via: {a.channel}
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
              <Button size="small" onClick={() => notification.info(`Edit ${a.name} (mock)`)}>Edit</Button>
              <Button size="small" onClick={() => notification.info(`Test fired (mock)`)}>Test</Button>
              <Button size="small" onClick={() => toggle(a.id)}>{a.enabled ? 'Disable' : 'Enable'}</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create Alert" footer={null} width={480}>
        <Form onFinish={(values) => {
          const newAlert: Alert = {
            id: Date.now(),
            name: String(values.name),
            metric: String(values.metric),
            condition: String(values.condition),
            threshold: Number(values.threshold),
            channel: String(values.channel),
            enabled: Boolean(values.enabled ?? true),
          }
          setAlerts(prev => [newAlert, ...prev])
          notification.success('Alert created (mock)')
          setCreateOpen(false)
        }}>
          <Field name="name" label="Alert Name" rules={[{ required: true }]}>
            <Input placeholder="Revenue Drop Alert" />
          </Field>
          <Field name="metric" label="Metric" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'Revenue', value: 'revenue' },
                { label: 'Orders', value: 'orders' },
                { label: 'Visitors', value: 'visitors' },
                { label: 'Conversion Rate', value: 'conversion' },
                { label: 'AOV', value: 'avgOrderValue' },
                { label: 'Return Rate', value: 'returnRate' },
              ]}
              placeholder="Select metric"
            />
          </Field>
          <Field name="condition" label="Condition" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'Is above', value: 'above' },
                { label: 'Is below', value: 'below' },
                { label: 'Changes by more than', value: 'change' },
              ]}
              placeholder="Select condition"
            />
          </Field>
          <Field name="threshold" label="Threshold" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Enter value" />
          </Field>
          <Field name="channel" label="Notification Channel" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'Email', value: 'email' },
                { label: 'Slack', value: 'slack' },
                { label: 'Webhook', value: 'webhook' },
              ]}
              placeholder="Select channel"
            />
          </Field>
          <Field name="enabled" label="Enable immediately">
            <Switch />
          </Field>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Create Alert</Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}
