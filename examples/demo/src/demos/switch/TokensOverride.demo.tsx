import { Switch } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-switch-bg': '#475569',
  '--sg-switch-bg-checked': '#60a5fa',
  '--sg-color-text': '#f8fafc',
} as CSSProperties

export function TokensOverrideSwitch() {
  return (
    <div style={dark}>
      <Switch defaultChecked />
      <Switch defaultChecked checkedChildren="ON" unCheckedChildren="OFF" />
    </div>
  )
}
