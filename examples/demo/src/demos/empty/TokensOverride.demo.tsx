import type { CSSProperties } from 'react'
import { Empty } from '@skygraph/react'

/**
 * Empty has no component-private tokens. The illustration uses
 * `--sg-color-text-disabled`, the caption uses
 * `--sg-color-text-tertiary`. Scope those to tweak the mood.
 */
const scoped: CSSProperties = {
  ['--sg-color-text-disabled' as never]: '#7c3aed',
  ['--sg-color-text-tertiary' as never]: '#4c1d95',
  background: '#faf5ff',
  border: '1px dashed #c4b5fd',
  borderRadius: 12,
  padding: 16,
}

export function TokensOverrideEmpty() {
  return (
    <div className="demo-card-host" style={scoped}>
      <Empty description="Rebrand me via CSS variables" />
    </div>
  )
}
