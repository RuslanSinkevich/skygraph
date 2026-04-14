import { ColorPicker } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const colorPickerProps: PropDef[] = [
  { name: 'value', description: 'Current color value', type: 'string' },
  { name: 'defaultValue', description: 'Default color value', type: 'string', default: "'#1677ff'" },
  { name: 'onChange', description: 'Callback when color changes', type: '(color: string) => void' },
  { name: 'presets', description: 'Preset color palettes', type: 'Array<{ label: string; colors: string[] }>' },
  { name: 'showText', description: 'Show color text value', type: 'boolean | ((color: string) => ReactNode)', default: 'false' },
  { name: 'format', description: 'Color format', type: "'hex' | 'rgb'", default: "'hex'" },
  { name: 'trigger', description: 'Trigger mode to open picker', type: "'click' | 'hover'", default: "'click'" },
  { name: 'disabled', description: 'Whether the picker is disabled', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Size of the trigger', type: "'small' | 'middle' | 'large'", default: "'middle'" },
]

export function ColorPickerDemo() {
  const [color, setColor] = useState('#1677ff')

  return (
    <ComponentDoc
      title="ColorPicker"
      description="Components providing color selection."
      whenToUse={[
        'When you need a user to pick a custom color.',
        'When you want to provide preset color palettes for quick selection.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Basic usage."
        code={`import { ColorPicker } from '@skygraph/react'

<ColorPicker defaultValue="#1677ff" />`}
      >
        <ColorPicker defaultValue="#1677ff" />
      </DemoBox>

      <DemoBox
        title="Controlled"
        description="Controlled color value."
        code={`const [color, setColor] = useState('#1677ff')

<ColorPicker value={color} onChange={setColor} showText />`}
      >
        <ColorPicker value={color} onChange={setColor} showText />
        <span style={{ marginLeft: 12 }}>Selected: {color}</span>
      </DemoBox>

      <DemoBox
        title="Presets"
        description="With preset color palettes."
        code={`<ColorPicker
  presets={[{
    label: 'Recommended',
    colors: ['#F5222D', '#FA8C16', '#FADB14', '#52C41A', '#1677FF', '#722ED1'],
  }]}
/>`}
      >
        <ColorPicker
          presets={[{
            label: 'Recommended',
            colors: ['#F5222D', '#FA8C16', '#FADB14', '#52C41A', '#1677FF', '#722ED1'],
          }]}
        />
      </DemoBox>

      <DemoBox
        title="Size"
        description="Three sizes available."
        code={`<ColorPicker size="small" defaultValue="#52c41a" />
<ColorPicker defaultValue="#1677ff" />
<ColorPicker size="large" defaultValue="#722ed1" />`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <ColorPicker size="small" defaultValue="#52c41a" />
          <ColorPicker defaultValue="#1677ff" />
          <ColorPicker size="large" defaultValue="#722ed1" />
        </div>
      </DemoBox>

      <PropsTable data={colorPickerProps} />
    </ComponentDoc>
  )
}
