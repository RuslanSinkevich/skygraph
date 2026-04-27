import { useState } from 'react'
import { Slider, InputNumber } from '@skygraph/react'

/**
 * Pair the slider with an InputNumber for a "slider + precise value"
 * control. Both share the same state so the bar, handle and number
 * stay in sync.
 */
export function WithValueSlider() {
  const [value, setValue] = useState(32)
  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
      <Slider value={value} onChange={setValue} min={0} max={100} />
      <InputNumber
        value={value}
        onChange={(v) => setValue(v ?? 0)}
        min={0}
        max={100}
      />
    </div>
  )
}
