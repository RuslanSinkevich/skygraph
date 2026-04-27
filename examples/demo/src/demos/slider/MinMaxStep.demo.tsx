import { Slider } from '@skygraph/react'

/**
 * `min` / `max` set the range. `step` quantises both pointer drags
 * and arrow-key presses — handy for ratings, rounded pricing, etc.
 */
export function MinMaxStepSlider() {
  return (
    <div style={{ display: 'grid', gap: 24, maxWidth: 360 }}>
      <label style={{ display: 'grid', gap: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>0 – 10, step 1</span>
        <Slider min={0} max={10} defaultValue={4} />
      </label>
      <label style={{ display: 'grid', gap: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>−50 – 50, step 5</span>
        <Slider min={-50} max={50} step={5} defaultValue={0} />
      </label>
      <label style={{ display: 'grid', gap: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>0 – 1, step 0.05</span>
        <Slider min={0} max={1} step={0.05} defaultValue={0.25} />
      </label>
    </div>
  )
}
