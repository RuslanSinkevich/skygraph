import type { CSSProperties } from 'react'
import { Slider } from '@skygraph/react'

/**
 * Slider uses only global tokens. The fill and handle follow
 * `--sg-color-primary`, the rail follows `--sg-color-border`, so
 * scoping those on a wrapper rebrands the whole control.
 */
const scoped: CSSProperties = {
  ['--sg-color-primary' as never]: '#f97316',
  ['--sg-color-primary-bg' as never]: 'rgba(249, 115, 22, 0.2)',
  ['--sg-color-border' as never]: '#fed7aa',
}

export function TokensOverrideSlider() {
  return (
    <div style={{ ...scoped, maxWidth: 360 }}>
      <Slider defaultValue={60} />
    </div>
  )
}
