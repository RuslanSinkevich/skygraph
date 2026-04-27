import { ConfigProvider, Button, Switch, Checkbox, Tag, Input } from '@skygraph/react'

export function ThemeScopeConfigProvider() {
  return (
    <div
      style={{
        ['--sg-color-primary' as string]: '#ea580c',
        ['--sg-color-primary-bg' as string]: 'rgba(234, 88, 12, 0.12)',
        ['--sg-color-primary-hover' as string]: '#f97316',
        ['--sg-border-radius' as string]: '10px',
        padding: 20,
        borderRadius: 12,
        border: '1px dashed var(--sg-color-border)',
      } as React.CSSProperties}
    >
      <ConfigProvider size="middle">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
            Theming and behaviour are orthogonal: CSS tokens are set on the wrapper,{' '}
            <code>ConfigProvider</code> handles size / disabled / locale. Scope them
            together to ship self-contained micro-themes.
          </p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button type="primary">Buy now</Button>
            <Button>Learn more</Button>
            <Input placeholder="Email" style={{ width: 180 }} />
            <Switch defaultChecked />
            <Checkbox defaultChecked>Opt in</Checkbox>
            <Tag color="processing">Orange scope</Tag>
          </div>
        </div>
      </ConfigProvider>
    </div>
  )
}
