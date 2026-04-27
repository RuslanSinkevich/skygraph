import { ConfigProvider, Button, Input, Switch, Checkbox, Select } from '@skygraph/react'

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
]

export function DisabledConfigProvider() {
  return (
    <ConfigProvider disabled>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button type="primary">Save</Button>
        <Button>Cancel</Button>
        <Input placeholder="Locked" style={{ width: 160 }} />
        <Select options={options} placeholder="Locked" style={{ width: 140 }} />
        <Switch defaultChecked />
        <Checkbox defaultChecked>Subscribe</Checkbox>
      </div>
    </ConfigProvider>
  )
}
