import { Button } from '@skygraph/react'

export function ButtonDemo() {
  return (
    <section>
      <h2>Button</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
        <Button type="link">Link</Button>
        <Button type="primary" size="small">Small</Button>
        <Button type="primary" size="large">Large</Button>
        <Button disabled>Disabled</Button>
      </div>
      <h3 style={{ marginTop: 16 }}>Loading state (Spin inside Button)</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button loading>Default Loading</Button>
        <Button type="primary" loading>Primary Loading</Button>
        <Button type="dashed" loading>Dashed Loading</Button>
        <Button size="small" loading>Small</Button>
        <Button size="large" type="primary" loading>Large</Button>
      </div>
    </section>
  )
}
