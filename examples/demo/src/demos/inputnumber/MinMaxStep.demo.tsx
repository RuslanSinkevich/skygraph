import { InputNumber } from '@skygraph/react'

/**
 * `min` / `max` clamp the value both on type and via the stepper, and
 * also gray out the relevant `+` or `−` button when the limit is hit.
 * `step` controls what the buttons add/subtract.
 */
export function MinMaxStepInputNumber() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <label style={{ display: 'grid', gap: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>0 – 10, step 1</span>
        <InputNumber defaultValue={5} min={0} max={10} />
      </label>
      <label style={{ display: 'grid', gap: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>step 5</span>
        <InputNumber defaultValue={25} step={5} />
      </label>
      <label style={{ display: 'grid', gap: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>negative allowed</span>
        <InputNumber defaultValue={-3} min={-10} max={10} />
      </label>
    </div>
  )
}
