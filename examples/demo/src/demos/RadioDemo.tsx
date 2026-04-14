import { useState } from 'react'
import { RadioGroup } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const radioProps: PropDef[] = [
  { name: 'value', description: 'Current selected value', type: 'string | number' },
  { name: 'defaultValue', description: 'Default selected value', type: 'string | number' },
  { name: 'onChange', description: 'Callback when selection changes', type: '(value: string | number) => void' },
  { name: 'options', description: 'Array of radio options', type: 'Array<{ label, value, disabled? }>' },
  { name: 'disabled', description: 'Disable all radios', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show loading state', type: 'boolean', default: 'false' },
  { name: 'name', description: 'HTML name attribute for grouping', type: 'string' },
  { name: 'unstyled', description: 'Remove all built-in styles', type: 'boolean', default: 'false' },
]

export function RadioDemo() {
  const [value, setValue] = useState<string | number>('a')

  return (
    <ComponentDoc
      title="Radio"
      description="Radio is used to select a single state from multiple options."
      whenToUse={[
        'Used to select a single option among a set of alternatives.',
        'RadioGroup passes the selection state among a group of Radio buttons.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The simplest use — a group of radios with controlled value."
        code={`const [value, setValue] = useState('a')

<RadioGroup
  value={value}
  onChange={setValue}
  options={[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
    { label: 'Disabled', value: 'd', disabled: true },
  ]}
/>`}
      >
        <div>
          <RadioGroup
            value={value}
            onChange={setValue}
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
              { label: 'Option C', value: 'c' },
              { label: 'Disabled', value: 'd', disabled: true },
            ]}
          />
          <p style={{ marginTop: 8, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
            Selected: {String(value)}
          </p>
        </div>
      </DemoBox>

      <DemoBox
        title="Loading"
        description="Radio group in loading state."
        code={`<RadioGroup
  loading
  value="a"
  options={[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ]}
/>`}
      >
        <RadioGroup
          loading
          value="a"
          options={[
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
          ]}
        />
      </DemoBox>

      <PropsTable data={radioProps} />
    </ComponentDoc>
  )
}
