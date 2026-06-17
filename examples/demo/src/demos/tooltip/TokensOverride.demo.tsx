import { Tooltip, Button } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-hover': '#93c5fd',
} as CSSProperties

export function TokensOverrideTooltip() {
  return (
    <div style={dark}>
      <Tooltip title="Press ⌘K to search" placement="top">
        <Button type="primary">Hover me</Button>
      </Tooltip>
    </div>
  )
}
