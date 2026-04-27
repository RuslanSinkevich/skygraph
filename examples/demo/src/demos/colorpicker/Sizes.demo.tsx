import { ColorPicker } from '@skygraph/react'

/**
 * Three sizes change trigger height and swatch size. The dropdown is
 * the same width at every size.
 */
export function SizesColorPicker() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <ColorPicker size="small" defaultValue="#52c41a" showText />
      <ColorPicker defaultValue="#1677ff" showText />
      <ColorPicker size="large" defaultValue="#722ed1" showText />
    </div>
  )
}
