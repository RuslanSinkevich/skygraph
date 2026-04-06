import { Switch } from '@skygraph/react'

export function SwitchDemo() {
  return (
    <section>
      <h2>Switch</h2>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Switch defaultChecked />
        <Switch size="small" />
        <Switch disabled />
        <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
        <Switch loading />
        <Switch loading defaultChecked />
      </div>
    </section>
  )
}
