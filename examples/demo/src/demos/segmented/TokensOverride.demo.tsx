import type { CSSProperties } from 'react'
import { Segmented } from '@skygraph/react'

/**
 * Segmented reuses the global token scale. Override
 * `--sg-color-bg-secondary` for the track and
 * `--sg-color-bg-container` for the selected "thumb" (and
 * `--sg-shadow-sm` for its lift) to repaint the whole control
 * without writing component-specific CSS.
 */
const darkThumb: CSSProperties = {
  padding: 12,
  borderRadius: 12,
  background: '#0f172a',
  ['--sg-color-bg-secondary' as never]: '#1e293b',
  ['--sg-color-bg-container' as never]: '#0ea5e9',
  ['--sg-color-text' as never]: '#ffffff',
  ['--sg-color-text-secondary' as never]: 'rgba(255,255,255,0.75)',
  ['--sg-shadow-sm' as never]: '0 1px 2px rgba(0,0,0,0.45)',
}

export function TokensOverrideSegmented() {
  return (
    <div style={darkThumb}>
      <Segmented defaultValue="B" options={['A', 'B', 'C', 'D']} />
    </div>
  )
}
