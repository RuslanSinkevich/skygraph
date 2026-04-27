import type { CSSProperties } from 'react'
import { Spin } from '@skygraph/react'

/**
 * Two tokens matter for Spin: `--sg-spin-color` for the ring and
 * `--sg-spin-overlay-bg` for the backdrop covering wrapped content.
 * Both can be scoped on a wrapper for scoped rebrands.
 */
const scoped: CSSProperties = {
  ['--sg-spin-color' as never]: '#f59e0b',
  ['--sg-spin-overlay-bg' as never]: 'rgba(251, 191, 36, 0.2)',
  padding: 16,
  background: 'var(--sg-color-bg-container)',
  borderRadius: 'var(--sg-border-radius)',
  border: '1px solid var(--sg-color-border)',
}

export function TokensOverrideSpin() {
  return (
    <div style={scoped}>
      <Spin spinning tip="Loading...">
        <div style={{ padding: 24 }}>
          <p>Wrapped content — blurred by the amber overlay.</p>
        </div>
      </Spin>
    </div>
  )
}
