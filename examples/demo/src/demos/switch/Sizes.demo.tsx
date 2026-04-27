import { Switch } from '@skygraph/react'

/**
 * Two visual sizes: `small` (compact toolbars) and the default.
 * (`large` is accepted by the prop but currently renders like default.)
 */
export function SizesSwitch() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch size="small" defaultChecked />
      <Switch defaultChecked />
    </div>
  )
}
