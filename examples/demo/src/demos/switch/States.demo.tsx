import { Switch } from '@skygraph/react'

/**
 * Disabled keeps the visual state but blocks interaction. Loading
 * swaps the on/off label for an inline spinner and also blocks clicks.
 */
export function StatesSwitch() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Switch disabled />
        <Switch disabled defaultChecked />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Switch loading />
        <Switch loading defaultChecked />
      </div>
    </div>
  )
}
