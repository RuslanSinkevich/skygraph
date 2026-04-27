import type { CSSProperties } from 'react'
import { AutoComplete } from '@skygraph/react'
import { frameworkOptions } from './data'

/**
 * AutoComplete reuses `--sg-input-*` for the field and global tokens
 * for the dropdown. Scope both on a wrapper to rebrand a single group.
 */
const scoped: CSSProperties = {
  ['--sg-input-border' as never]: '#f59e0b',
  ['--sg-input-radius' as never]: '12px',
  ['--sg-color-bg-elevated' as never]: '#fff7ed',
  ['--sg-color-bg-hover' as never]: '#fed7aa',
  ['--sg-color-text' as never]: '#7c2d12',
}

export function TokensOverrideAutoComplete() {
  return (
    <div style={{ ...scoped, maxWidth: 320 }}>
      <AutoComplete options={frameworkOptions} placeholder="Scoped amber theme" />
    </div>
  )
}
