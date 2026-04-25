import { useState } from 'react'
import { Select } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const selectProps: PropDef[] = [
  { name: 'value', description: 'Currently selected value', type: 'string | number' },
  { name: 'defaultValue', description: 'Default selected value', type: 'string | number' },
  { name: 'onChange', description: 'Callback when selection changes', type: '(value: string | number) => void' },
  { name: 'options', description: 'Data for options', type: 'Array<{ label, value, disabled?, loading? }>' },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
  { name: 'size', description: 'Select size', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Disable the selector', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show loading spinner for the whole select', type: 'boolean', default: 'false' },
  { name: 'allowClear', description: 'Show clear button', type: 'boolean', default: 'false' },
  { name: 'showSearch', description: 'Enable search filtering', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Remove all built-in styles (headless mode)', type: 'boolean', default: 'false' },
]

export function SelectDemo() {
  const [val, setVal] = useState<string | number>('')

  return (
    <ComponentDoc
      title="Select"
      description="Select component to select a value from options."
      whenToUse={[
        'When a user needs to select from a predefined list of options.',
        'When the number of options is relatively small (for long lists, consider AutoComplete).',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Basic select usage with controlled value."
        code={`import { Select } from '@skygraph/react'

const [val, setVal] = useState('')

<Select
  placeholder="Choose city"
  value={val}
  onChange={setVal}
  options={[
    { label: 'Moscow', value: 'moscow' },
    { label: 'Berlin', value: 'berlin' },
    { label: 'Tokyo', value: 'tokyo' },
    { label: 'Disabled', value: 'x', disabled: true },
  ]}
/>`}
      >
        <Select
          placeholder="Choose city"
          value={val}
          onChange={setVal}
          options={[
            { label: 'Moscow', value: 'moscow' },
            { label: 'Berlin', value: 'berlin' },
            { label: 'Tokyo', value: 'tokyo' },
            { label: 'Disabled', value: 'x', disabled: true },
          ]}
        />
      </DemoBox>

      <DemoBox
        title="Size"
        description="Select comes in three sizes."
        code={`<Select size="small" placeholder="Small" options={...} />
<Select placeholder="Default" options={...} />
<Select size="large" placeholder="Large" options={...} />`}
      >
        <Select
          size="small"
          placeholder="Small"
          options={[{ label: 'One', value: 1 }, { label: 'Two', value: 2 }]}
        />
        <Select
          placeholder="Default"
          options={[{ label: 'One', value: 1 }, { label: 'Two', value: 2 }]}
        />
        <Select
          size="large"
          placeholder="Large"
          options={[{ label: 'One', value: 1 }, { label: 'Two', value: 2 }]}
        />
      </DemoBox>

      <DemoBox
        title="Loading"
        description="Show a loading indicator. Can also set loading on individual options."
        code={`<Select loading placeholder="Loading all..." options={[]} />
<Select
  placeholder="Option loading"
  options={[
    { label: 'Ready', value: 'ready' },
    { label: 'Syncing...', value: 'sync', loading: true },
  ]}
/>`}
      >
        <Select loading placeholder="Loading all..." options={[]} />
        <Select
          placeholder="Option loading"
          options={[
            { label: 'Ready', value: 'ready' },
            { label: 'Syncing...', value: 'sync', loading: true },
            { label: 'Failed', value: 'fail', disabled: true },
          ]}
        />
      </DemoBox>

      <DemoBox
        title="Component tokens"
        description="Override --sg-input-* — Select shares the input tokens."
        code={`<div style={{
  ['--sg-input-height' as any]: '44px',
  ['--sg-input-radius' as any]: '14px',
}}>
  <Select options={options} placeholder="Large soft" />
</div>`}
      >
        <div
          style={{
            ['--sg-input-height' as never]: '44px',
            ['--sg-input-radius' as never]: '14px',
          }}
        >
          <Select
            placeholder="Large soft"
            options={[
              { label: 'One', value: 1 },
              { label: 'Two', value: 2 },
            ]}
          />
        </div>
      </DemoBox>

      <DemoBox
        title="Scoped brand"
        description="Highlighted option follows --sg-color-primary."
        code={`<div style={{ ['--sg-color-primary' as any]: '#059669' }}>
  <Select options={...} />
</div>`}
      >
        <div style={{ ['--sg-color-primary' as never]: '#059669' }}>
          <Select
            placeholder="Green select"
            options={[
              { label: 'Apple', value: 'a' },
              { label: 'Pear', value: 'p' },
              { label: 'Mango', value: 'm' },
            ]}
          />
        </div>
      </DemoBox>

      <PropsTable data={selectProps} />
    </ComponentDoc>
  )
}
