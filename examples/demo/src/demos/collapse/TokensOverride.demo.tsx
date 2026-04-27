import type { CSSProperties } from 'react'
import { Collapse } from '@skygraph/react'
import { sampleItems } from './data'

/**
 * Collapse has no dedicated tokens — it reads the global surface
 * palette (`--sg-color-bg-container`, `--sg-color-bg-secondary`,
 * `--sg-color-bg-hover`) and border tokens. Scope them for a dark
 * panel look like this.
 */
const scoped: CSSProperties = {
  ['--sg-color-bg-container' as never]: '#1f2937',
  ['--sg-color-bg-secondary' as never]: '#111827',
  ['--sg-color-bg-hover' as never]: '#374151',
  ['--sg-color-text' as never]: '#f9fafb',
  ['--sg-color-text-secondary' as never]: '#cbd5e1',
  ['--sg-color-border-secondary' as never]: '#334155',
  ['--sg-border-radius-lg' as never]: '10px',
  padding: 16,
  background: '#0f172a',
  borderRadius: 12,
}

export function TokensOverrideCollapse() {
  return (
    <div style={scoped}>
      <Collapse items={sampleItems} defaultActiveKey={['1']} />
    </div>
  )
}
