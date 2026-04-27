import { ColorPicker } from '@skygraph/react'

/**
 * Disabled greys out the trigger and stops the panel from opening,
 * but the current value remains readable next to the swatch when
 * `showText` is on.
 */
export function DisabledColorPicker() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <ColorPicker defaultValue="#1677ff" disabled showText />
      <ColorPicker defaultValue="#52c41a" disabled />
    </div>
  )
}
