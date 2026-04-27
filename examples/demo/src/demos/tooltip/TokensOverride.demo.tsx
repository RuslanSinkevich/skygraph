import type { CSSProperties } from 'react'
import { Tooltip, Button } from '@skygraph/react'

/**
 * Tooltip ships with dedicated tokens: `--sg-color-tooltip-bg` and
 * `--sg-color-tooltip-text`. Override them on a wrapper to swap the
 * tip's look without touching the global theme.
 */
const scoped: CSSProperties = {
  ['--sg-color-tooltip-bg' as never]: '#7c3aed',
  ['--sg-color-tooltip-text' as never]: '#faf5ff',
  ['--sg-border-radius-sm' as never]: '8px',
}

export function TokensOverrideTooltip() {
  return (
    <div style={{ ...scoped, display: 'flex', gap: 12 }}>
      <Tooltip title="Brand-coloured tooltip">
        <Button>Brand tip</Button>
      </Tooltip>
      <Tooltip title="Rounder corners here too" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
    </div>
  )
}
