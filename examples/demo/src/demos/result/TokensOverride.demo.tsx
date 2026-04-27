import type { CSSProperties } from 'react'
import { Result, Button } from '@skygraph/react'

/**
 * Result has no component-private tokens — it reads `--sg-color-
 * success/error/warning/primary` for icon tints, the text palette
 * for title/subtitle, and `--sg-color-bg-secondary` for the body
 * panel. Scope them on a wrapper to rebrand.
 */
const scoped: CSSProperties = {
  ['--sg-color-success' as never]: '#059669',
  ['--sg-color-primary' as never]: '#0ea5e9',
  ['--sg-color-bg-secondary' as never]: '#f0fdfa',
  ['--sg-font-size-xl' as never]: '24px',
  ['--sg-border-radius' as never]: '12px',
}

export function TokensOverrideResult() {
  return (
    <div style={scoped}>
      <Result
        status="success"
        title="All good"
        subTitle="Brand scoped to teal via --sg-color-primary / --sg-color-success"
        extra={<Button type="primary">Continue</Button>}
      >
        <span>Extra info panel also follows the scoped background token.</span>
      </Result>
    </div>
  )
}
