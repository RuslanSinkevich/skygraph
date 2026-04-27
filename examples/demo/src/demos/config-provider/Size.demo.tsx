import { ConfigProvider, Button, Input, Select, Switch, Checkbox } from '@skygraph/react'

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

export function SizeConfigProvider() {
  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {(['small', 'middle', 'large'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--sg-color-text-tertiary)' }}>
            size="{size}"
          </span>
          <ConfigProvider size={size}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <Button type="primary">Action</Button>
              <Input placeholder="Name" style={{ width: 160 }} />
              <Select options={options} placeholder="Framework" style={{ width: 160 }} />
              <Switch defaultChecked />
              <Checkbox>Agree</Checkbox>
            </div>
          </ConfigProvider>
        </div>
      ))}
    </div>
  )
}
