import type { CSSProperties } from 'react'
import { Carousel } from '@skygraph/react'
import { slideBase, paletteColors } from './data'

/**
 * The active dot reads `--sg-color-primary`, idle dots use
 * `--sg-color-text-disabled`, hover uses
 * `--sg-color-text-tertiary`. Scope any of them to rebrand.
 */
const scope: CSSProperties = {
  ['--sg-color-primary' as never]: '#f97316',
  ['--sg-color-text-disabled' as never]: 'rgba(249, 115, 22, 0.25)',
  ['--sg-color-text-tertiary' as never]: 'rgba(249, 115, 22, 0.55)',
}

export function TokensOverrideCarousel() {
  return (
    <div style={scope}>
      <Carousel>
        {paletteColors.map((bg, i) => (
          <div key={i} style={{ ...slideBase, background: bg }}>Brand {i + 1}</div>
        ))}
      </Carousel>
    </div>
  )
}
