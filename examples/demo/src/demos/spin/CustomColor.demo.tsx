import type { CSSProperties } from 'react'
import { Spin } from '@skygraph/react'

/**
 * `--sg-spin-color` is the one token that controls the ring. Scope
 * it on a wrapper for per-section brand tints without touching
 * the global `--sg-color-primary`.
 */
const rose: CSSProperties = { ['--sg-spin-color' as never]: '#e11d48' }
const green: CSSProperties = { ['--sg-spin-color' as never]: '#059669' }

export function CustomColorSpin() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={rose}>
        <Spin size="large" />
      </div>
      <div style={green}>
        <Spin size="large" />
      </div>
      <Spin size="large" />
    </div>
  )
}
