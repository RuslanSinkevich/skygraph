import { useState } from 'react'
import {
  Collapse, Switch, Input, InputNumber, Select, notification,
} from '@skygraph/react'
import { systemSettings } from './data'

export function SettingsTab() {
  const [settings, setSettings] = useState(systemSettings)
  const categories = [...new Set(settings.map(s => s.category))]

  const update = (key: string, value: string | boolean | number) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s))
    notification.success(`Setting "${key}" updated (mock)`)
  }

  return (
    <Collapse
      defaultActiveKey={[categories[0]]}
      items={categories.map(cat => ({
        key: cat,
        label: <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{cat}</span>,
        children: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {settings.filter(s => s.category === cat).map(s => (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 0', borderBottom: '1px solid var(--sg-color-border-secondary)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{s.description}</div>
                </div>
                <div style={{ width: 220, flexShrink: 0 }}>
                  {s.type === 'toggle' && (
                    <Switch checked={s.value as boolean} onChange={(v) => update(s.key, v)} />
                  )}
                  {s.type === 'text' && (
                    <Input value={s.value as string} onChange={(v) => update(s.key, v)} size="small" />
                  )}
                  {s.type === 'number' && (
                    <InputNumber
                      value={s.value as number}
                      onChange={(v) => update(s.key, v ?? 0)}
                      size="small"
                      style={{ width: '100%' }}
                    />
                  )}
                  {s.type === 'select' && (
                    <Select
                      value={s.value as string}
                      onChange={(v) => update(s.key, v)}
                      options={(s.options ?? []).map(o => ({ label: o, value: o }))}
                      size="small"
                      style={{ width: '100%' }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ),
      }))}
    />
  )
}
