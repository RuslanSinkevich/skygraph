import type { CSSProperties } from 'react'
import { Descriptions } from '@skygraph/react'
import { userItems } from './data'

/**
 * Rebrand by scoping `--sg-color-bg-secondary` (label column
 * background), `--sg-color-border-secondary` (dividers) and
 * `--sg-border-radius` (outer corners).
 */
const scope: CSSProperties = {
  padding: 12,
  ['--sg-color-bg-secondary' as never]: '#ede9fe',
  ['--sg-color-border-secondary' as never]: '#c4b5fd',
  ['--sg-color-text-secondary' as never]: '#5b21b6',
  ['--sg-border-radius' as never]: '12px',
}

export function TokensOverrideDescriptions() {
  return (
    <div style={scope}>
      <Descriptions bordered title="Rebranded" items={userItems} />
    </div>
  )
}
