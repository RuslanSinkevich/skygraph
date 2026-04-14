import { Cascader } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const cascaderProps: PropDef[] = [
  { name: 'options', description: 'Data options of the cascader', type: 'CascaderOption[]' },
  { name: 'value', description: 'Selected value', type: '(string | number)[]' },
  { name: 'defaultValue', description: 'Default selected value', type: '(string | number)[]' },
  { name: 'onChange', description: 'Callback when selection changes', type: '(value, selectedOptions) => void' },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
  { name: 'allowClear', description: 'Show clear button', type: 'boolean', default: 'true' },
  { name: 'disabled', description: 'Disable the cascader', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Size of the input', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'expandTrigger', description: 'Trigger mode to expand child options', type: "'click' | 'hover'", default: "'click'" },
  { name: 'changeOnSelect', description: 'Allow selecting parent options', type: 'boolean', default: 'false' },
  { name: 'showSearch', description: 'Show search functionality', type: 'boolean', default: 'false' },
]

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake' },
          { value: 'xiasha', label: 'Xiasha' },
        ],
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        children: [
          { value: 'dongqian', label: 'Dongqian Lake' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          { value: 'zhonghua', label: 'Zhong Hua Men' },
        ],
      },
    ],
  },
]

export function CascaderDemo() {
  const [value, setValue] = useState<(string | number)[]>([])

  return (
    <ComponentDoc
      title="Cascader"
      description="Cascade selection box."
      whenToUse={[
        'When you need to select from a set of associated data, such as province/city/district.',
        'When selecting from a large data set with clear hierarchy.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The most basic cascader usage."
        code={`import { Cascader } from '@skygraph/react'

const options = [
  { value: 'zhejiang', label: 'Zhejiang', children: [
    { value: 'hangzhou', label: 'Hangzhou', children: [
      { value: 'xihu', label: 'West Lake' },
    ]},
  ]},
]

<Cascader options={options} placeholder="Please select" />`}
      >
        <div style={{ width: 300 }}>
          <Cascader
            options={options}
            placeholder="Please select"
            value={value}
            onChange={(v) => setValue(v)}
          />
        </div>
      </DemoBox>

      <DemoBox
        title="Default Value"
        description="Default selected value."
        code={`<Cascader
  options={options}
  defaultValue={['zhejiang', 'hangzhou', 'xihu']}
/>`}
      >
        <div style={{ width: 300 }}>
          <Cascader
            options={options}
            defaultValue={['zhejiang', 'hangzhou', 'xihu']}
          />
        </div>
      </DemoBox>

      <DemoBox
        title="Hover Trigger"
        description="Expand child options on hover."
        code={`<Cascader options={options} expandTrigger="hover" placeholder="Hover to expand" />`}
      >
        <div style={{ width: 300 }}>
          <Cascader options={options} expandTrigger="hover" placeholder="Hover to expand" />
        </div>
      </DemoBox>

      <DemoBox
        title="Change on Select"
        description="Allow selecting parent options."
        code={`<Cascader options={options} changeOnSelect placeholder="Change on select" />`}
      >
        <div style={{ width: 300 }}>
          <Cascader options={options} changeOnSelect placeholder="Change on select" />
        </div>
      </DemoBox>

      <PropsTable data={cascaderProps} />
    </ComponentDoc>
  )
}
