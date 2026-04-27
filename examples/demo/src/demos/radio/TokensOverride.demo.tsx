import type { CSSProperties } from 'react'
import { RadioGroup } from '@skygraph/react'

/**
 * Radio has no component tokens — the checked dot is driven by
 * `accent-color: var(--sg-color-primary)`. Scope the global tokens on
 * a wrapper to rebrand a single group.
 */
const scoped: CSSProperties = {
  ['--sg-color-primary' as never]: 'var(--sg-green-6)',
  ['--sg-color-text' as never]: 'var(--sg-green-9, #0b4417)',
  ['--sg-padding-md' as never]: '24px',
}

export function TokensOverrideRadio() {
  return (
    <div style={scoped}>
      <RadioGroup
        defaultValue="b"
        options={[
          { label: 'Brand A', value: 'a' },
          { label: 'Brand B', value: 'b' },
          { label: 'Brand C', value: 'c' },
        ]}
      />
    </div>
  )
}
