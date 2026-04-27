import { ColorPicker } from '@skygraph/react'

/**
 * `format` decides the shape of `onChange` and the trigger label:
 * `hex` emits "#rrggbb", `rgb` emits "rgb(r, g, b)". Internally both
 * pickers share the same HSV math.
 */
export function FormatsColorPicker() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <ColorPicker defaultValue="#52c41a" format="hex" showText />
      <ColorPicker defaultValue="#f5222d" format="rgb" showText />
    </div>
  )
}
