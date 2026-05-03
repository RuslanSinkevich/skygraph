import type { CSSProperties } from 'react'
import { RadioGroup } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    brandA: 'Brand A',
    brandB: 'Brand B',
    brandC: 'Brand C',
  },
  ru: {
    brandA: 'Бренд A',
    brandB: 'Бренд B',
    brandC: 'Бренд C',
  },
} as const

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
  const t = useDemoStrings(STRINGS)
  return (
    <div style={scoped}>
      <RadioGroup
        defaultValue="b"
        options={[
          { label: t.brandA, value: 'a' },
          { label: t.brandB, value: 'b' },
          { label: t.brandC, value: 'c' },
        ]}
      />
    </div>
  )
}
