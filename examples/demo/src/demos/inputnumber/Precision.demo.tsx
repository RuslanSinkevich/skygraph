import { InputNumber } from '@skygraph/react'

/**
 * `precision` rounds the value to a fixed number of decimal places
 * after clamping — useful for currencies or percentages where you
 * don't want "0.30000000000000004" slipping through.
 */
export function PrecisionInputNumber() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <label style={{ display: 'grid', gap: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>precision = 0</span>
        <InputNumber defaultValue={10} step={0.5} precision={0} />
      </label>
      <label style={{ display: 'grid', gap: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>precision = 2</span>
        <InputNumber defaultValue={1.25} step={0.05} precision={2} />
      </label>
      <label style={{ display: 'grid', gap: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>precision = 4</span>
        <InputNumber defaultValue={0.1234} step={0.0001} precision={4} />
      </label>
    </div>
  )
}
