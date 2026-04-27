import type { CSSProperties } from 'react'
import { Button } from '@skygraph/react'

/**
 * Every variant reads the semantic primary palette. Override
 * `--sg-color-primary*` on a wrapper to rebrand a whole subtree
 * without touching the Button itself — Link and Primary both
 * follow along.
 */
const greenScope: CSSProperties = {
  ['--sg-color-primary' as never]: '#16a34a',
  ['--sg-color-primary-hover' as never]: '#15803d',
  ['--sg-color-primary-active' as never]: '#14532d',
  ['--sg-color-primary-bg' as never]: '#dcfce7',
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap',
}

export function ScopedBrandButton() {
  return (
    <div style={greenScope}>
      <Button type="primary">Primary (green)</Button>
      <Button>Default</Button>
      <Button type="link">Link</Button>
    </div>
  )
}
