import { useState } from 'react'
import { ColorPicker } from '@skygraph/react'

/**
 * Controlled ColorPicker. The value is the raw string in the active
 * `format` (hex by default) — not an HSV object — so it roundtrips to
 * CSS variables and network payloads without adapters.
 */
export function BasicColorPicker() {
  const [color, setColor] = useState('#1677ff')
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <ColorPicker value={color} onChange={setColor} showText />
      <div
        aria-hidden="true"
        style={{
          width: 120,
          height: 36,
          borderRadius: 8,
          background: color,
          border: '1px solid var(--sg-color-border)',
        }}
      />
    </div>
  )
}
