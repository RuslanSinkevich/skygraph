import { useState } from 'react'
import { Slider } from '@skygraph/react'

/**
 * Controlled slider. Drag the handle or focus it and use the arrow
 * keys — every value change goes through `onChange`.
 */
export function BasicSlider() {
  const [value, setValue] = useState(40)
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
      <Slider value={value} onChange={setValue} />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        value: {value}
      </span>
    </div>
  )
}
