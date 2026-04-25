import { Segmented } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const segmentedProps: PropDef[] = [
  { name: 'options', description: 'Options for the segmented control', type: "string[] | { label, value, icon?, disabled? }[]" },
  { name: 'value', description: 'Currently selected value (controlled)', type: 'string' },
  { name: 'defaultValue', description: 'Initially selected value', type: 'string' },
  { name: 'onChange', description: 'Callback when value changes', type: '(value: string) => void' },
  { name: 'block', description: 'Fit the width of its parent', type: 'boolean', default: 'false' },
  { name: 'disabled', description: 'Disable the entire segmented control', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Size of the component', type: "'small' | 'middle' | 'large'", default: "'middle'" },
]

export function SegmentedDemo() {
  const [value, setValue] = useState('Map')

  return (
    <ComponentDoc
      title="Segmented"
      description="Segmented Controls — display multiple options and allow users to select a single one."
      whenToUse={[
        'When displaying a group of options and the user can select one.',
        'Use as an alternative to tabs when options are short and few.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The most basic usage."
        code={`import { Segmented } from '@skygraph/react'

<Segmented options={['Daily', 'Weekly', 'Monthly', 'Yearly']} />`}
      >
        <Segmented options={['Daily', 'Weekly', 'Monthly', 'Yearly']} />
      </DemoBox>

      <DemoBox
        title="Controlled"
        description="Controlled segmented."
        code={`const [value, setValue] = useState('Map')

<Segmented
  options={['Map', 'Transit', 'Satellite']}
  value={value}
  onChange={setValue}
/>`}
      >
        <Segmented
          options={['Map', 'Transit', 'Satellite']}
          value={value}
          onChange={setValue}
        />
        <span style={{ marginLeft: 12 }}>Selected: {value}</span>
      </DemoBox>

      <DemoBox
        title="Block"
        description="Block segmented control fits parent width."
        code={`<Segmented block options={['Option A', 'Option B', 'Option C']} />`}
      >
        <Segmented block options={['Option A', 'Option B', 'Option C']} />
      </DemoBox>

      <DemoBox
        title="Disabled"
        description="Disabled segmented or individual option."
        code={`<Segmented options={['Map', 'Transit', 'Satellite']} disabled />
<Segmented options={[
  { label: 'Map', value: 'Map' },
  { label: 'Transit', value: 'Transit', disabled: true },
  { label: 'Satellite', value: 'Satellite' },
]} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Segmented options={['Map', 'Transit', 'Satellite']} disabled />
          <Segmented options={[
            { label: 'Map', value: 'Map' },
            { label: 'Transit', value: 'Transit', disabled: true },
            { label: 'Satellite', value: 'Satellite' },
          ]} />
        </div>
      </DemoBox>

      <DemoBox
        title="Size"
        description="Three sizes available."
        code={`<Segmented size="small" options={['S', 'M', 'L']} />
<Segmented options={['S', 'M', 'L']} />
<Segmented size="large" options={['S', 'M', 'L']} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Segmented size="small" options={['Small', 'Middle', 'Large']} />
          <Segmented options={['Small', 'Middle', 'Large']} />
          <Segmented size="large" options={['Small', 'Middle', 'Large']} />
        </div>
      </DemoBox>

      <DemoBox
        title="Scoped brand"
        description="Selected thumb colour follows --sg-color-primary."
        code={`<div style={{ ['--sg-color-primary' as any]: '#7c3aed' }}>
  <Segmented options={['A', 'B', 'C']} />
</div>`}
      >
        <div style={{ ['--sg-color-primary' as never]: '#7c3aed' }}>
          <Segmented options={['A', 'B', 'C']} defaultValue="B" />
        </div>
      </DemoBox>

      <PropsTable data={segmentedProps} />
    </ComponentDoc>
  )
}
