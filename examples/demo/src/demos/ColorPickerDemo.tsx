import { useState } from 'react'
import { ColorPicker } from '../../../../packages/react/src/components/ui/ColorPicker'

const presets = [
  {
    label: 'Brand',
    colors: ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1'],
  },
  {
    label: 'Neutrals',
    colors: ['#ffffff', '#f5f5f5', '#d9d9d9', '#595959', '#141414'],
  },
]

export function ColorPickerDemo() {
  const [hex, setHex] = useState('#1677ff')
  const [rgbOpen, setRgbOpen] = useState(false)

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2>ColorPicker</h2>

      <section>
        <h3>Basic</h3>
        <ColorPicker defaultValue="#3b82f6" onChange={(c) => setHex(c)} />
        <p style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>Last change: {hex}</p>
      </section>

      <section>
        <h3>With presets</h3>
        <ColorPicker presets={presets} defaultValue="#faad14" />
      </section>

      <section>
        <h3>showText (boolean and custom render)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <ColorPicker showText defaultValue="#52c41a" />
          <ColorPicker
            showText={(c) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{c}</span>}
            defaultValue="#eb2f96"
          />
        </div>
      </section>

      <section>
        <h3>Formats: hex vs rgb</h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <ColorPicker format="hex" defaultValue="#1677ff" showText />
          <ColorPicker format="rgb" defaultValue="#1677ff" showText />
        </div>
      </section>

      <section>
        <h3>Disabled &amp; controlled open (rgb panel)</h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <ColorPicker disabled defaultValue="#999999" showText />
          <ColorPicker
            format="rgb"
            open={rgbOpen}
            onOpenChange={setRgbOpen}
            defaultValue="rgb(22, 119, 255)"
            showText
          />
          <button type="button" onClick={() => setRgbOpen((o) => !o)}>
            Toggle dropdown
          </button>
        </div>
      </section>

      <section>
        <h3>Sizes</h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <ColorPicker size="small" defaultValue="#f5222d" showText />
          <ColorPicker size="middle" defaultValue="#52c41a" showText />
          <ColorPicker size="large" defaultValue="#722ed1" showText />
        </div>
      </section>

      <section>
        <h3>Hover trigger</h3>
        <ColorPicker trigger="hover" defaultValue="#13c2c2" showText />
      </section>

      <section>
        <h3>Preset-only workflow</h3>
        <p style={{ fontSize: 12, opacity: 0.75, marginBottom: 8 }}>
          Pickers still expose the full panel; presets speed up brand colors.
        </p>
        <ColorPicker
          presets={[{ label: 'Skygraph', colors: ['#1677ff', '#0958d9', '#69b1ff', '#e6f4ff'] }]}
          defaultValue="#1677ff"
          showText
        />
      </section>
    </section>
  )
}
