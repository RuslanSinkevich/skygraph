import { Switch } from '@skygraph/react'

/**
 * `checkedChildren` / `unCheckedChildren` render a tiny label inside
 * the track. Keep it to 1–3 chars so the thumb stays aligned.
 */
export function TextIconSwitch() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch defaultChecked checkedChildren="ON" unCheckedChildren="OFF" />
      <Switch checkedChildren="1" unCheckedChildren="0" />
      <Switch defaultChecked checkedChildren="✓" unCheckedChildren="✕" />
    </div>
  )
}
