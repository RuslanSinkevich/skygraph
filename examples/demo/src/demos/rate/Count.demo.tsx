import { Rate } from '@skygraph/react'

/**
 * `count` picks the number of symbols. Three for "quick sentiment",
 * ten for "NPS-ish" questions.
 */
export function CountRate() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Rate count={3} defaultValue={2} />
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>3 stars (bad / ok / great)</span>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Rate count={10} defaultValue={7} />
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>10 stars (NPS-like)</span>
      </div>
    </div>
  )
}
