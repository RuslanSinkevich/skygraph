import { useState, type CSSProperties } from 'react'
import { ColorPicker, Button, Input } from '@skygraph/react'

/**
 * Wire a ColorPicker straight into `--sg-color-primary`. Every SkyGraph
 * component in the wrapper inherits the new brand colour — try it on
 * the button and the input.
 */
export function ThemeSwapColorPicker() {
  const [brand, setBrand] = useState('#1677ff')
  const scope: CSSProperties = {
    ['--sg-color-primary' as never]: brand,
    ['--sg-color-primary-hover' as never]: brand,
    ['--sg-color-primary-bg' as never]: `${brand}20`,
  }

  return (
    <div style={{ ...scope, display: 'grid', gap: 12, maxWidth: 320 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <ColorPicker value={brand} onChange={setBrand} showText />
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
          drives --sg-color-primary
        </span>
      </div>
      <Button type="primary">Primary button</Button>
      <Input placeholder="Focus me to see the new brand tint" />
    </div>
  )
}
