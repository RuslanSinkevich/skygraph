import { useState } from 'react'
import { Spin, Switch, Button } from '@skygraph/react'

export function SpinDemo() {
  const [loading, setLoading] = useState(true)

  return (
    <section>
      <h2>Spin</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
        <Switch checked={loading} onChange={setLoading} />
        <span>Toggle spinning</span>
      </div>

      <h3>Sizes (standalone)</h3>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 16 }}>
        <Spin size="small" spinning={loading} />
        <Spin size="default" spinning={loading} />
        <Spin size="large" spinning={loading} />
      </div>

      <h3>With tip</h3>
      <div style={{ marginBottom: 16 }}>
        <Spin spinning={loading} tip="Loading..." />
      </div>

      <h3>Wrapping content (overlay)</h3>
      <Spin spinning={loading} tip="Fetching data...">
        <div style={{ padding: 24, background: 'var(--sg-color-bg-secondary)', borderRadius: 'var(--sg-border-radius)' }}>
          Content behind spinner. Toggle the switch above.
        </div>
      </Spin>

      <h3 style={{ marginTop: 16 }}>With delay (500ms)</h3>
      <Spin spinning={loading} delay={500}>
        <div style={{ padding: 16, background: 'var(--sg-color-bg-secondary)', borderRadius: 'var(--sg-border-radius)' }}>
          This spinner appears after 500ms delay.
        </div>
      </Spin>

      <h3 style={{ marginTop: 16 }}>Inside Button (inherits size and color)</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button loading>Default</Button>
        <Button type="primary" loading>Primary</Button>
        <Button size="small" loading>Small</Button>
        <Button size="large" type="primary" loading>Large</Button>
      </div>
    </section>
  )
}
