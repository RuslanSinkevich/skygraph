import { Slider } from '@skygraph/react'

/**
 * Disabled dims the whole control and blocks both pointer and
 * keyboard interaction. ARIA stays correct (`aria-disabled`).
 */
export function DisabledSlider() {
  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
      <Slider disabled defaultValue={30} />
      <Slider disabled defaultValue={70} />
    </div>
  )
}
