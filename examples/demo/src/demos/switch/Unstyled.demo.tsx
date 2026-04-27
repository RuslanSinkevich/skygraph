import { Switch } from '@skygraph/react'

/**
 * `unstyled` drops every SkyGraph class and the visual track. Semantics
 * stay (`role="switch"`, `aria-checked`) — style it yourself, or use
 * `checkedChildren` / `unCheckedChildren` for the on/off labels.
 */
export function UnstyledSwitch() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Switch
        unstyled
        defaultChecked
        checkedChildren="On"
        unCheckedChildren="Off"
        style={{
          padding: '4px 10px',
          border: '1px solid var(--sg-color-border)',
          borderRadius: 999,
          background: 'transparent',
        }}
      />
      <Switch
        unstyled
        checkedChildren="On"
        unCheckedChildren="Off"
        style={{
          padding: '4px 10px',
          border: '1px solid var(--sg-color-border)',
          borderRadius: 999,
          background: 'transparent',
        }}
      />
    </div>
  )
}
