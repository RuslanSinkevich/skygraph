import { ColorPicker } from '@skygraph/react'

/**
 * `trigger="hover"` opens the panel on mouse enter and closes it
 * after a short leave delay — useful for quick glanceable pickers in
 * toolbars. Keyboard users can still open it with Enter / Space.
 */
export function TriggerColorPicker() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <ColorPicker defaultValue="#1677ff" showText trigger="click" />
      <ColorPicker defaultValue="#fa541c" showText trigger="hover" />
    </div>
  )
}
