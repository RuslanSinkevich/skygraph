import { ColorPicker } from '@skygraph/react'

/**
 * `unstyled` strips every SkyGraph class so you can ship a completely
 * custom look while reusing the picker's HSV math, drag behaviour and
 * keyboard handling.
 */
export function UnstyledColorPicker() {
  return (
    <div
      style={{
        padding: 12,
        background: '#0f172a',
        color: '#e2e8f0',
        borderRadius: 8,
        width: 'fit-content',
      }}
    >
      <ColorPicker unstyled defaultValue="#38bdf8" showText />
    </div>
  )
}
