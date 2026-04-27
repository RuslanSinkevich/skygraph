import { ConfigProvider, Button, Input } from '@skygraph/react'

export function NestedConfigProvider() {
  return (
    <ConfigProvider size="large">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <section>
          <h4 style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--sg-color-text-tertiary)' }}>
            Outer provider — size=&quot;large&quot;
          </h4>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="primary">Outer</Button>
            <Input placeholder="Large input" style={{ width: 200 }} />
          </div>
        </section>
        <ConfigProvider size="small">
          <section>
            <h4 style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--sg-color-text-tertiary)' }}>
              Inner provider — size=&quot;small&quot; overrides
            </h4>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button type="primary">Inner</Button>
              <Input placeholder="Small input" style={{ width: 200 }} />
            </div>
          </section>
        </ConfigProvider>
        <section>
          <h4 style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--sg-color-text-tertiary)' }}>
            Per-component prop always wins
          </h4>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="primary" size="small">
              Explicit size=&quot;small&quot;
            </Button>
            <Input size="middle" placeholder="Explicit middle" style={{ width: 200 }} />
          </div>
        </section>
      </div>
    </ConfigProvider>
  )
}
