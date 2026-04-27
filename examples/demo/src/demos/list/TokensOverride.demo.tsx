import type { CSSProperties } from 'react'
import { List } from '@skygraph/react'
import { shortData } from './data'

/**
 * List doesn't expose component-local tokens — it reads the
 * shared palette. Scope `--sg-color-bg-hover` for the row
 * highlight, `--sg-color-border` for the outline, and
 * `--sg-color-bg-secondary` for the header / footer tint.
 */
const scope: CSSProperties = {
  ['--sg-color-bg-hover' as never]: 'var(--sg-color-primary-bg)',
  ['--sg-color-border' as never]:
    'color-mix(in srgb, var(--sg-color-primary) 25%, var(--sg-color-border-secondary) 75%)',
  ['--sg-color-bg-secondary' as never]: 'var(--sg-color-primary-bg)',
}

export function TokensOverrideList() {
  return (
    <div style={scope}>
      <List
        bordered
        header="Token-styled list"
        dataSource={shortData}
        renderItem={(item) => <div style={{ padding: '8px 0' }}>{item}</div>}
      />
    </div>
  )
}
